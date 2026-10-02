/**
 * Server-Side Security & Threat Detection Engine for ApexLedger Admin
 * Implements deterministic risk evaluation, brute force defense, audit logging,
 * rate limiting, and alert deduplication.
 */

import { storage, AuditEvent, SecurityIncident, RiskLevel } from './storage.ts';
import crypto from 'crypto';

interface FailureTracker {
  count: number;
  firstSeen: number;
  lastSeen: number;
  incidentId?: string;
}

const ipFailureMap = new Map<string, FailureTracker>();
const ipRateLimitMap = new Map<string, { count: number; resetTime: number }>();

export const securityEngine = {
  /**
   * Log an administrative or system audit event with automatic risk evaluation
   */
  logEvent(params: {
    actorId?: string;
    actorName?: string;
    role?: string;
    action: string;
    resource: string;
    pageId?: string;
    sectionId?: string;
    elementId?: string;
    ip?: string;
    userAgent?: string;
    result: 'success' | 'failure';
    riskLevel?: RiskLevel;
    detectionSignal?: string;
    previousValue?: string;
    newValue?: string;
    details?: Record<string, any>;
  }): AuditEvent {
    const eventId = `evt_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
    const timestamp = new Date().toISOString();
    const ip = params.ip || '127.0.0.1';

    // Mask any accidental password or token keys in details
    const sanitizedDetails = params.details ? this.sanitizeRecord(params.details) : undefined;

    // Automatic risk level determination if not provided
    let calculatedRisk: RiskLevel = params.riskLevel || 'INFO';
    let signal = params.detectionSignal || 'standard_audit_trail';

    if (params.result === 'failure') {
      if (params.action.includes('login') || params.action.includes('auth')) {
        calculatedRisk = 'MEDIUM';
        signal = 'authentication_failure';
      } else if (params.action.includes('permission') || params.action.includes('unauthorized')) {
        calculatedRisk = 'HIGH';
        signal = 'unauthorized_access_attempt';
      }
    }

    const event: AuditEvent = {
      id: eventId,
      timestamp,
      actorId: params.actorId || 'anonymous',
      actorName: params.actorName || 'Anonymous / Guest',
      role: params.role || 'public',
      action: params.action,
      resource: params.resource,
      pageId: params.pageId,
      sectionId: params.sectionId,
      elementId: params.elementId,
      ip,
      userAgent: params.userAgent || 'Unknown Agent',
      result: params.result,
      riskLevel: calculatedRisk,
      detectionSignal: signal,
      previousValue: params.previousValue,
      newValue: params.newValue,
      details: sanitizedDetails,
    };

    storage.addAuditEvent(event);
    return event;
  },

  /**
   * Record a failed login attempt, track frequency, and trigger/update high-severity incident
   */
  recordFailedLogin(params: {
    ip: string;
    attemptedUsername: string;
    userAgent?: string;
    failReason: string;
  }): { lockedOut: boolean; lockoutMinutes: number; incident?: SecurityIncident } {
    const now = Date.now();
    const tracker = ipFailureMap.get(params.ip) || {
      count: 0,
      firstSeen: now,
      lastSeen: now,
    };

    // Reset tracker if older than 15 minutes
    if (now - tracker.lastSeen > 15 * 60 * 1000) {
      tracker.count = 0;
      tracker.firstSeen = now;
      tracker.incidentId = undefined;
    }

    tracker.count += 1;
    tracker.lastSeen = now;
    ipFailureMap.set(params.ip, tracker);

    const settings = storage.getSecuritySettings();
    const isLockedOut = tracker.count >= settings.maxFailedAttempts;

    // Log the audit event with progressive risk
    const risk: RiskLevel = tracker.count >= 5 ? 'HIGH' : tracker.count >= 3 ? 'MEDIUM' : 'LOW';
    const auditEvent = this.logEvent({
      action: 'admin_login_failed',
      resource: '/api/admin/auth/login',
      ip: params.ip,
      userAgent: params.userAgent,
      result: 'failure',
      riskLevel: risk,
      detectionSignal:
        tracker.count >= 5
          ? 'repeated_failed_logins_threshold'
          : 'invalid_credentials_supplied',
      details: {
        attemptedUsername: params.attemptedUsername,
        failReason: params.failReason,
        consecutiveFailures: tracker.count,
        ipLockedOut: isLockedOut,
      },
    });

    let incident: SecurityIncident | undefined;

    // If failures reach threshold, create or deduplicate into an active SecurityIncident
    if (tracker.count >= 3) {
      if (tracker.incidentId) {
        // Update existing incident
        const existing = storage.getSecurityIncidentById(tracker.incidentId);
        if (existing && existing.status !== 'resolved') {
          existing.relatedEventCount = tracker.count;
          if (!existing.relatedEventIds.includes(auditEvent.id)) {
            existing.relatedEventIds.push(auditEvent.id);
          }
          existing.severity = tracker.count >= 5 ? 'HIGH' : 'MEDIUM';
          existing.summary = `Sequenced administrative authentication failures from IP ${params.ip}. Detected ${tracker.count} attempts in the last ${Math.round((now - tracker.firstSeen) / 60000)} minutes.`;
          storage.updateSecurityIncident(existing.id, existing);
          incident = existing;
        }
      }

      if (!incident) {
        // Create new deduplicated Incident
        const incidentId = `SEC-2026-${String(Math.floor(1000 + Math.random() * 9000))}`;
        const newIncident: SecurityIncident = {
          id: incidentId,
          severity: tracker.count >= 5 ? 'HIGH' : 'MEDIUM',
          type: 'Repeated Admin Authentication Failures',
          title: `Multiple Failed Authentication Attempts (${tracker.count}) from IP ${params.ip}`,
          summary: `Sequenced administrative authentication failures targeting account "${params.attemptedUsername}" from IP ${params.ip}. Rate-limit controls activated.`,
          detectedAt: new Date().toISOString(),
          status: 'new',
          affectedResource: '/api/admin/auth/login',
          sourceIp: params.ip,
          relatedEventCount: tracker.count,
          relatedEventIds: [auditEvent.id],
          investigationNotes: [
            `Automated progressive delay engaged. Lockout threshold: ${settings.maxFailedAttempts} attempts.`,
          ],
        };

        storage.addSecurityIncident(newIncident);
        tracker.incidentId = incidentId;
        incident = newIncident;

        // Create Admin Notification
        storage.addNotification({
          id: `notif_${Date.now()}`,
          type: 'security',
          title: `${newIncident.severity} Security Alert: ${newIncident.id}`,
          message: newIncident.summary,
          link: `/admin/security/alerts`,
          read: false,
          createdAt: new Date().toISOString(),
          severity: newIncident.severity,
        });
      }
    }

    return {
      lockedOut: isLockedOut,
      lockoutMinutes: settings.lockoutDurationMinutes,
      incident,
    };
  },

  /**
   * Reset failed login counter for an IP upon successful authenticated session
   */
  recordSuccessfulLogin(params: {
    ip: string;
    userId: string;
    username: string;
    role: string;
    userAgent?: string;
  }) {
    ipFailureMap.delete(params.ip);

    this.logEvent({
      actorId: params.userId,
      actorName: params.username,
      role: params.role,
      action: 'admin_login_success',
      resource: '/api/admin/auth/login',
      ip: params.ip,
      userAgent: params.userAgent,
      result: 'success',
      riskLevel: 'INFO',
      detectionSignal: 'valid_credentials_verified',
      details: {
        sessionInitiated: true,
      },
    });
  },

  /**
   * Rate limiting utility: returns false if rate limit exceeded
   */
  checkRateLimit(ip: string, maxRequests = 100, windowMs = 60000): boolean {
    const now = Date.now();
    const entry = ipRateLimitMap.get(ip);

    if (!entry || now > entry.resetTime) {
      ipRateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
      return true;
    }

    entry.count += 1;
    if (entry.count > maxRequests) {
      if (entry.count === maxRequests + 1) {
        this.logEvent({
          action: 'rate_limit_exceeded',
          resource: 'api_gateway',
          ip,
          result: 'failure',
          riskLevel: 'MEDIUM',
          detectionSignal: 'request_velocity_threshold_exceeded',
          details: { requestCount: entry.count, windowMs },
        });
      }
      return false;
    }
    return true;
  },

  /**
   * Redact sensitive fields from any logged payload
   */
  sanitizeRecord(obj: Record<string, any>): Record<string, any> {
    const sanitized: Record<string, any> = {};
    const blockedKeys = ['password', 'passwordhash', 'passwordsalt', 'token', 'secret', 'mfasecret', 'cvv', 'creditcard'];

    for (const [key, value] of Object.entries(obj)) {
      if (blockedKeys.some((b) => key.toLowerCase().includes(b))) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitizeRecord(value);
      } else {
        sanitized[key] = value;
      }
    }
    return sanitized;
  },
};
