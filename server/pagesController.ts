/**
 * Website Page Manager & Visual CMS Controller
 * Supports click-to-edit, section reordering, element targeting, draft/publish workflow, and revisions.
 */

import { Response } from 'express';
import { storage, PageRecord } from './storage.ts';
import { securityEngine } from './securityEngine.ts';
import { AuthenticatedRequest } from './authController.ts';

export const pagesController = {
  /**
   * GET /api/admin/pages
   * List all pages with draft status, SEO status, and last modified metadata
   */
  async listPages(req: AuthenticatedRequest, res: Response): Promise<void> {
    const pages = storage.getAllPages().map((p) => ({
      pageId: p.pageId,
      slug: p.slug,
      title: p.title,
      status: p.status,
      hasDraftChanges: p.hasDraftChanges,
      lastModified: p.lastModified,
      modifiedBy: p.modifiedBy,
      publishedAt: p.publishedAt,
      sectionCount: (p.draftSections || p.sections).length,
      seoHealth: p.seo?.title && p.seo?.description ? 'Good' : 'Needs Attention',
    }));

    res.json({ pages });
  },

  /**
   * GET /api/admin/pages/:pageId
   * Return page content (either draft or published depending on query)
   */
  async getPage(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { pageId } = req.params;
    const { view } = req.query; // 'draft' | 'published'

    const page = storage.getPage(pageId);
    if (!page) {
      res.status(404).json({ error: `Page "${pageId}" not found.` });
      return;
    }

    // In visual builder (default), return draft if exists, else published
    const activeSections = view === 'published' ? page.sections : page.draftSections || page.sections;
    const activeSeo = view === 'published' ? page.seo : page.draftSeo || page.seo;

    res.json({
      page: {
        ...page,
        sections: activeSections,
        seo: activeSeo,
        publishedSections: page.sections,
        publishedSeo: page.seo,
      },
    });
  },

  /**
   * POST /api/admin/pages/:pageId/draft
   * Save draft changes without pushing to production public site
   */
  async saveDraft(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { pageId } = req.params;
    const { sections, seo } = req.body;
    const actor = req.adminSession?.username || 'Admin';

    if (!Array.isArray(sections)) {
      res.status(400).json({ error: 'Sections array is required.' });
      return;
    }

    try {
      const updated = storage.savePageDraft(pageId, sections, seo, actor);
      securityEngine.logEvent({
        actorId: req.adminSession?.userId,
        actorName: actor,
        role: req.adminSession?.role,
        action: 'page_draft_saved',
        resource: `page:${pageId}`,
        pageId,
        ip: req.ip || '127.0.0.1',
        result: 'success',
        riskLevel: 'INFO',
        details: { sectionCount: sections.length },
      });

      res.json({ success: true, page: updated });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * POST /api/admin/pages/:pageId/publish
   * Promotes draft sections to production, creates version history, logs audit event
   */
  async publishPage(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { pageId } = req.params;
    const { summary } = req.body;
    const actor = req.adminSession?.username || 'Admin';

    try {
      const published = storage.publishPage(pageId, actor, summary);

      securityEngine.logEvent({
        actorId: req.adminSession?.userId,
        actorName: actor,
        role: req.adminSession?.role,
        action: 'page_published',
        resource: `page:${pageId}`,
        pageId,
        ip: req.ip || '127.0.0.1',
        result: 'success',
        riskLevel: 'INFO',
        detectionSignal: 'authorized_cms_publish',
        details: { summary: summary || 'Page changes published to live website' },
      });

      // Notification
      storage.addNotification({
        id: `notif_${Date.now()}`,
        type: 'content',
        title: `Page Published: ${published.title}`,
        message: `${published.title} (${pageId}) was published by ${actor}.`,
        link: `/admin/pages`,
        read: false,
        createdAt: new Date().toISOString(),
      });

      res.json({ success: true, page: published });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * PATCH /api/admin/pages/:pageId/sections/reorder
   * Reorders sections inside page draft
   */
  async reorderSections(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { pageId } = req.params;
    const { sectionIds } = req.body; // array of ordered sectionIds
    const actor = req.adminSession?.username || 'Admin';

    if (!Array.isArray(sectionIds)) {
      res.status(400).json({ error: 'Ordered array of sectionIds is required.' });
      return;
    }

    const page = storage.getPage(pageId);
    if (!page) {
      res.status(404).json({ error: `Page "${pageId}" not found.` });
      return;
    }

    const currentSections = JSON.parse(JSON.stringify(page.draftSections || page.sections));
    const sectionMap = new Map<string, any>(currentSections.map((s: any) => [s.sectionId, s]));

    const reordered: any[] = [];
    sectionIds.forEach((id: string, index: number) => {
      const s = sectionMap.get(id);
      if (s) {
        s.order = index + 1;
        reordered.push(s);
      }
    });

    storage.savePageDraft(pageId, reordered, page.draftSeo || page.seo, actor);
    res.json({ success: true, sections: reordered });
  },

  /**
   * PATCH /api/admin/pages/:pageId/sections/:sectionId
   * Modifies ONLY the specified section/component
   */
  async updateSection(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { pageId, sectionId } = req.params;
    const { content, enabled, styling, animation } = req.body;
    const actor = req.adminSession?.username || 'Admin';

    const page = storage.getPage(pageId);
    if (!page) {
      res.status(404).json({ error: `Page "${pageId}" not found.` });
      return;
    }

    const sections = JSON.parse(JSON.stringify(page.draftSections || page.sections));
    const targetSection = sections.find((s: any) => s.sectionId === sectionId);

    if (!targetSection) {
      res.status(404).json({ error: `Section "${sectionId}" not found in page "${pageId}".` });
      return;
    }

    const prevSnapshot = JSON.stringify(targetSection.content);

    // Apply updates isolated to this exact section
    if (content !== undefined) {
      targetSection.content = { ...targetSection.content, ...content };
    }
    if (enabled !== undefined) {
      targetSection.enabled = Boolean(enabled);
    }
    if (styling !== undefined) {
      targetSection.styling = { ...targetSection.styling, ...styling };
    }
    if (animation !== undefined) {
      targetSection.animation = { ...targetSection.animation, ...animation };
    }

    storage.savePageDraft(pageId, sections, page.draftSeo || page.seo, actor);

    securityEngine.logEvent({
      actorId: req.adminSession?.userId,
      actorName: actor,
      role: req.adminSession?.role,
      action: 'section_updated',
      resource: `section:${pageId}/${sectionId}`,
      pageId,
      sectionId,
      ip: req.ip || '127.0.0.1',
      result: 'success',
      riskLevel: 'INFO',
      previousValue: prevSnapshot.slice(0, 150),
      newValue: JSON.stringify(targetSection.content).slice(0, 150),
    });

    res.json({ success: true, section: targetSection });
  },

  /**
   * POST /api/admin/pages/:pageId/sections
   * Adds a new section to page draft from Component Registry
   */
  async addSection(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { pageId } = req.params;
    const { type, title } = req.body;
    const actor = req.adminSession?.username || 'Admin';

    const page = storage.getPage(pageId);
    if (!page) {
      res.status(404).json({ error: `Page "${pageId}" not found.` });
      return;
    }

    const sections = JSON.parse(JSON.stringify(page.draftSections || page.sections));
    const newSectionId = `${pageId}-${type}-${Date.now().toString(36)}`;

    // Build default section skeleton based on component type
    let newSection: any = {
      pageId,
      sectionId: newSectionId,
      type,
      enabled: true,
      order: sections.length + 1,
      content: {
        eyebrow: 'New Section',
        title: title || 'Executive Financial Strategy',
        description: 'Custom corporate advisory module tailored to high-growth businesses.',
      },
    };

    if (type === 'cta') {
      newSection.content.primaryButton = {
        id: `btn-${Date.now()}`,
        label: 'Schedule Strategy Session',
        href: '/book-consultation',
        variant: 'primary',
      };
    } else if (type === 'stats') {
      newSection.content.stats = [
        { id: 'st-1', value: 99.4, suffix: '%', label: 'Ledger Accuracy' },
        { id: 'st-2', value: 3.2, suffix: ' Days', label: 'Monthly Close' },
        { id: 'st-3', value: 140, prefix: '$', suffix: 'M+', label: 'Client Revenue Handled' },
      ];
    } else if (type === 'trustStrip') {
      newSection.content.items = [
        { id: 'tr-1', icon: 'ShieldCheck', label: 'SOC-2 Type II Certified' },
        { id: 'tr-2', icon: 'Award', label: 'Top 1% Senior CPAs' },
        { id: 'tr-3', icon: 'Lock', label: '256-Bit Bank-Grade Security' },
      ];
    }

    sections.push(newSection);
    storage.savePageDraft(pageId, sections, page.draftSeo || page.seo, actor);

    res.json({ success: true, section: newSection });
  },

  /**
   * DELETE /api/admin/pages/:pageId/sections/:sectionId
   */
  async deleteSection(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { pageId, sectionId } = req.params;
    const actor = req.adminSession?.username || 'Admin';

    const page = storage.getPage(pageId);
    if (!page) {
      res.status(404).json({ error: `Page "${pageId}" not found.` });
      return;
    }

    let sections = JSON.parse(JSON.stringify(page.draftSections || page.sections));
    sections = sections.filter((s: any) => s.sectionId !== sectionId);

    // Re-index order
    sections.forEach((s: any, idx: number) => {
      s.order = idx + 1;
    });

    storage.savePageDraft(pageId, sections, page.draftSeo || page.seo, actor);
    res.json({ success: true, message: `Section "${sectionId}" removed from draft.` });
  },

  /**
   * GET /api/admin/pages/:pageId/history
   */
  async getHistory(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { pageId } = req.params;
    const versions = storage.getPageVersions(pageId);
    res.json({ versions });
  },

  /**
   * POST /api/admin/pages/:pageId/rollback/:versionId
   */
  async rollback(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { pageId, versionId } = req.params;
    const actor = req.adminSession?.username || 'Admin';

    try {
      const restored = storage.rollbackPage(pageId, versionId, actor);
      securityEngine.logEvent({
        actorId: req.adminSession?.userId,
        actorName: actor,
        role: req.adminSession?.role,
        action: 'page_version_rollback',
        resource: `page:${pageId}`,
        pageId,
        ip: req.ip || '127.0.0.1',
        result: 'success',
        riskLevel: 'LOW',
        details: { restoredVersionId: versionId },
      });

      res.json({ success: true, page: restored });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
};
