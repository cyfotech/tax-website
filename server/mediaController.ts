/**
 * Media Library & Asset Manager Controller
 * Supports asset uploading, MIME inspection, usage tracking, metadata editing, and deletion guards.
 */

import { Response } from 'express';
import crypto from 'crypto';
import { storage, MediaAsset } from './storage.ts';
import { securityEngine } from './securityEngine.ts';
import { AuthenticatedRequest } from './authController.ts';

export const mediaController = {
  /**
   * GET /api/admin/media
   * Lists assets with usage analysis and filtering
   */
  async listMedia(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { type, search } = req.query;
    let media = storage.getAllMedia();

    if (type && type !== 'all') {
      media = media.filter((m) => m.type === type);
    }

    if (search) {
      const q = String(search).toLowerCase();
      media = media.filter(
        (m) =>
          m.originalName.toLowerCase().includes(q) ||
          m.altText.toLowerCase().includes(q) ||
          m.title.toLowerCase().includes(q) ||
          m.filename.toLowerCase().includes(q)
      );
    }

    // Refresh dynamic usage locations by scanning current pages
    const pages = storage.getAllPages();
    media.forEach((asset) => {
      const detectedUsage: Array<{ pageId: string; sectionId: string; elementId: string; label: string }> = [];

      pages.forEach((p) => {
        const sections = p.draftSections || p.sections;
        sections.forEach((sec: any) => {
          if (
            sec.content?.media?.component === asset.componentKey ||
            sec.content?.media?.src === asset.url ||
            JSON.stringify(sec.content).includes(asset.filename)
          ) {
            detectedUsage.push({
              pageId: p.pageId,
              sectionId: sec.sectionId,
              elementId: `${p.pageId}-${sec.sectionId}-media`,
              label: `${p.title} → ${sec.type.toUpperCase()}`,
            });
          }
        });
      });

      asset.usageLocations = detectedUsage;
    });

    res.json({ media });
  },

  /**
   * POST /api/admin/media/upload
   * Validates file mime, size limits, and sanitizes filename
   */
  async uploadMedia(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { filename, mimeType, base64Data, altText, title, type } = req.body;
    const actor = req.adminSession?.username || 'Admin';

    if (!filename || !mimeType) {
      res.status(400).json({ error: 'Filename and MIME type are required.' });
      return;
    }

    const settings = storage.getSecuritySettings();
    const maxBytes = settings.maxUploadSizeMB * 1024 * 1024;

    // Estimate size from base64
    const approxSize = base64Data ? Math.round((base64Data.length * 3) / 4) : 10240;
    if (approxSize > maxBytes) {
      securityEngine.logEvent({
        actorId: req.adminSession?.userId,
        actorName: actor,
        role: req.adminSession?.role,
        action: 'file_upload_rejected_size',
        resource: 'media:upload',
        ip: req.ip || '127.0.0.1',
        result: 'failure',
        riskLevel: 'MEDIUM',
        details: { filename, size: approxSize, limit: maxBytes },
      });
      res.status(413).json({ error: `File size exceeds the ${settings.maxUploadSizeMB}MB upload limit.` });
      return;
    }

    // Server-side MIME validation
    if (!settings.allowedFileTypes.includes(mimeType)) {
      securityEngine.logEvent({
        actorId: req.adminSession?.userId,
        actorName: actor,
        role: req.adminSession?.role,
        action: 'file_upload_blocked_type',
        resource: 'media:upload',
        ip: req.ip || '127.0.0.1',
        result: 'failure',
        riskLevel: 'HIGH',
        detectionSignal: 'blocked_mime_type_upload_attempt',
        details: { filename, mimeType, allowed: settings.allowedFileTypes },
      });
      res.status(415).json({ error: `File type "${mimeType}" is not permitted.` });
      return;
    }

    // Sanitize filename to alphanumeric and safe dashes
    const sanitizedName = filename
      .replace(/[^a-zA-Z0-9._-]/g, '_')
      .replace(/\.\./g, '');
    const assetId = `med_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
    const url = base64Data?.startsWith('data:') ? base64Data : `/media/${sanitizedName}`;

    // Deduce visual type
    let assetType: MediaAsset['type'] = 'image';
    if (type) {
      assetType = type;
    } else if (mimeType === 'image/svg+xml') {
      assetType = 'svg';
    } else if (mimeType.startsWith('video/')) {
      assetType = 'video';
    } else if (mimeType === 'image/gif') {
      assetType = 'gif';
    }

    const newAsset: MediaAsset = {
      id: assetId,
      filename: sanitizedName,
      originalName: filename,
      mimeType,
      size: approxSize,
      dimensions: { width: 800, height: 600 },
      url,
      altText: altText || sanitizedName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      title: title || sanitizedName,
      type: assetType,
      uploadedAt: new Date().toISOString(),
      uploadedBy: actor,
      usageLocations: [],
    };

    storage.addMedia(newAsset);

    securityEngine.logEvent({
      actorId: req.adminSession?.userId,
      actorName: actor,
      role: req.adminSession?.role,
      action: 'media_uploaded',
      resource: `media:${assetId}`,
      ip: req.ip || '127.0.0.1',
      result: 'success',
      riskLevel: 'INFO',
      details: { filename: sanitizedName, size: approxSize, mimeType },
    });

    res.json({ success: true, asset: newAsset });
  },

  /**
   * PATCH /api/admin/media/:id
   * Updates metadata (alt text, title, caption)
   */
  async updateMedia(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const { altText, title, caption } = req.body;

    try {
      const updated = storage.updateMedia(id, { altText, title, caption });
      res.json({ success: true, asset: updated });
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  },

  /**
   * DELETE /api/admin/media/:id
   * Checks usage before deletion to protect production links
   */
  async deleteMedia(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const { force } = req.query;
    const actor = req.adminSession?.username || 'Admin';

    const asset = storage.getMediaById(id);
    if (!asset) {
      res.status(404).json({ error: 'Asset not found.' });
      return;
    }

    // Check usage
    if (asset.usageLocations && asset.usageLocations.length > 0 && force !== 'true') {
      res.status(409).json({
        error: `Asset is currently in use across ${asset.usageLocations.length} location(s).`,
        usageLocations: asset.usageLocations,
        warning: 'Deleting this asset will result in missing visuals on the public website.',
      });
      return;
    }

    storage.deleteMedia(id);
    securityEngine.logEvent({
      actorId: req.adminSession?.userId,
      actorName: actor,
      role: req.adminSession?.role,
      action: 'media_deleted',
      resource: `media:${id}`,
      ip: req.ip || '127.0.0.1',
      result: 'success',
      riskLevel: 'LOW',
      details: { filename: asset.filename, hadUsage: asset.usageLocations?.length || 0 },
    });

    res.json({ success: true, message: `Asset "${asset.filename}" deleted.` });
  },
};
