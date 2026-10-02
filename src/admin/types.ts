/**
 * Shared Type Definitions for ApexLedger Admin CMS
 */

export type UserRole =
  | 'super_admin'
  | 'content_admin'
  | 'seo_manager'
  | 'security_admin'
  | 'editor'
  | 'viewer';

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
  mfaEnabled: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export interface AdminSession {
  id: string;
  userId: string;
  username: string;
  role: UserRole;
  ip: string;
  userAgent: string;
  createdAt: string;
  expiresAt: string;
  lastActiveAt: string;
}

export interface PageSummary {
  pageId: string;
  slug: string;
  title: string;
  status: 'published' | 'draft';
  hasDraftChanges: boolean;
  lastModified: string;
  modifiedBy: string;
  publishedAt?: string;
  sectionCount: number;
  seoHealth: string;
}

export interface PageVersion {
  id: string;
  pageId: string;
  versionNumber: number;
  timestamp: string;
  modifiedBy: string;
  changeSummary: string;
  sections: any[];
  seo: any;
}

export interface MediaAsset {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  dimensions?: { width: number; height: number };
  url: string;
  altText: string;
  title: string;
  caption?: string;
  type: 'image' | 'video' | 'gif' | 'svg' | 'animation' | 'chart';
  componentKey?: string;
  uploadedAt: string;
  uploadedBy: string;
  usageLocations?: Array<{ pageId: string; sectionId: string; elementId: string; label: string }>;
}

export type RiskLevel = 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface AuditEvent {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  role: string;
  action: string;
  resource: string;
  pageId?: string;
  sectionId?: string;
  elementId?: string;
  ip: string;
  userAgent: string;
  result: 'success' | 'failure';
  riskLevel: RiskLevel;
  detectionSignal?: string;
  previousValue?: string;
  newValue?: string;
  details?: Record<string, any>;
}

export interface SecurityIncident {
  id: string;
  severity: RiskLevel;
  type: string;
  title: string;
  summary: string;
  detectedAt: string;
  status: 'new' | 'acknowledged' | 'investigating' | 'resolved' | 'false_positive';
  affectedResource: string;
  sourceIp: string;
  relatedEventCount: number;
  relatedEventIds: string[];
  investigationNotes?: string[];
  resolvedAt?: string;
  resolvedBy?: string;
}

export interface LeadRecord {
  id: string;
  type: 'contact' | 'consultation' | 'pricing';
  fullName: string;
  email: string;
  phone?: string;
  companyName?: string;
  annualRevenue?: string;
  servicesNeeded?: string[];
  serviceSlug?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  sourcePage: string;
  status: 'new' | 'in_progress' | 'contacted' | 'closed' | 'spam';
  submittedAt: string;
  internalNotes?: string;
}

export interface RedirectRecord {
  id: string;
  source: string;
  target: string;
  statusCode: 301 | 302;
  enabled: boolean;
  createdAt: string;
  hitCount: number;
}
