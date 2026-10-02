/**
 * Global Settings, Navigation, Footer, Security Policy & Backup Controller
 */

import { Response } from 'express';
import { storage } from './storage.ts';
import { securityEngine } from './securityEngine.ts';
import { AuthenticatedRequest } from './authController.ts';

export const settingsController = {
  // Website Settings
  async getWebsiteSettings(req: AuthenticatedRequest, res: Response): Promise<void> {
    res.json({ settings: storage.getSiteSettings() });
  },

  async updateWebsiteSettings(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { settings } = req.body;
    const updated = storage.updateSiteSettings(settings);

    securityEngine.logEvent({
      actorId: req.adminSession?.userId,
      actorName: req.adminSession?.username,
      role: req.adminSession?.role,
      action: 'website_settings_updated',
      resource: 'settings:website',
      ip: req.ip || '127.0.0.1',
      result: 'success',
      riskLevel: 'LOW',
    });

    res.json({ success: true, settings: updated });
  },

  // Navigation
  async getNavigation(req: AuthenticatedRequest, res: Response): Promise<void> {
    res.json({ navigation: storage.getNavigation() });
  },

  async updateNavigation(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { navigation } = req.body;
    const updated = storage.updateNavigation(navigation);

    securityEngine.logEvent({
      actorId: req.adminSession?.userId,
      actorName: req.adminSession?.username,
      role: req.adminSession?.role,
      action: 'navigation_updated',
      resource: 'settings:navigation',
      ip: req.ip || '127.0.0.1',
      result: 'success',
      riskLevel: 'LOW',
    });

    res.json({ success: true, navigation: updated });
  },

  // Footer
  async getFooter(req: AuthenticatedRequest, res: Response): Promise<void> {
    res.json({ footer: storage.getFooter() });
  },

  async updateFooter(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { footer } = req.body;
    const updated = storage.updateFooter(footer);

    securityEngine.logEvent({
      actorId: req.adminSession?.userId,
      actorName: req.adminSession?.username,
      role: req.adminSession?.role,
      action: 'footer_updated',
      resource: 'settings:footer',
      ip: req.ip || '127.0.0.1',
      result: 'success',
      riskLevel: 'LOW',
    });

    res.json({ success: true, footer: updated });
  },

  // Security Settings
  async getSecuritySettings(req: AuthenticatedRequest, res: Response): Promise<void> {
    res.json({ settings: storage.getSecuritySettings() });
  },

  async updateSecuritySettings(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { settings } = req.body;
    const updated = storage.updateSecuritySettings(settings);

    securityEngine.logEvent({
      actorId: req.adminSession?.userId,
      actorName: req.adminSession?.username,
      role: req.adminSession?.role,
      action: 'security_policy_updated',
      resource: 'settings:security',
      ip: req.ip || '127.0.0.1',
      result: 'success',
      riskLevel: 'MEDIUM',
      details: settings,
    });

    res.json({ success: true, settings: updated });
  },

  // Administrators management
  async listAdministrators(req: AuthenticatedRequest, res: Response): Promise<void> {
    const users = storage.getAllUsers().map((u) => ({
      id: u.id,
      username: u.username,
      email: u.email,
      fullName: u.fullName,
      role: u.role,
      mfaEnabled: u.mfaEnabled,
      createdAt: u.createdAt,
      lastLoginAt: u.lastLoginAt,
    }));
    res.json({ users });
  },

  // System Backup & Snapshot
  async createBackup(req: AuthenticatedRequest, res: Response): Promise<void> {
    const snapshot = storage.createSnapshot();

    securityEngine.logEvent({
      actorId: req.adminSession?.userId,
      actorName: req.adminSession?.username,
      role: req.adminSession?.role,
      action: 'system_backup_generated',
      resource: 'system:backup',
      ip: req.ip || '127.0.0.1',
      result: 'success',
      riskLevel: 'LOW',
    });

    res.json({
      success: true,
      backupId: `bkp_${Date.now()}`,
      generatedAt: new Date().toISOString(),
      snapshot,
    });
  },

  // Notifications
  async getNotifications(req: AuthenticatedRequest, res: Response): Promise<void> {
    res.json({ notifications: storage.getNotifications() });
  },

  async markNotificationRead(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;
    storage.markNotificationAsRead(id);
    res.json({ success: true });
  },

  async markAllNotificationsRead(req: AuthenticatedRequest, res: Response): Promise<void> {
    storage.markAllNotificationsAsRead();
    res.json({ success: true });
  },
};
