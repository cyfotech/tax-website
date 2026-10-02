/**
 * Complete SEO Manager Controller
 * Page-level meta tags, OpenGraph previews, SERP preview, redirects, and automated sitemap.
 */

import { Request, Response } from 'express';
import { storage } from './storage.ts';
import { securityEngine } from './securityEngine.ts';
import { AuthenticatedRequest } from './authController.ts';

export const seoController = {
  /**
   * GET /api/admin/seo
   * Returns SEO health across all published pages
   */
  async getOverview(req: AuthenticatedRequest, res: Response): Promise<void> {
    const pages = storage.getAllPages();
    const redirects = storage.getAllRedirects();

    const auditItems = pages.map((p) => {
      const seo = p.draftSeo || p.seo || {};
      const issues: string[] = [];

      if (!seo.title || seo.title.length < 20) issues.push('Title too short (< 20 chars)');
      if (seo.title && seo.title.length > 70) issues.push('Title too long (> 70 chars)');
      if (!seo.description || seo.description.length < 50) issues.push('Description too short (< 50 chars)');
      if (seo.description && seo.description.length > 160) issues.push('Description too long (> 160 chars)');
      if (seo.robotsIndex === false) issues.push('Page marked noindex');

      return {
        pageId: p.pageId,
        slug: p.slug,
        title: p.title,
        seoTitle: seo.title || '',
        seoDescription: seo.description || '',
        robotsIndex: seo.robotsIndex ?? true,
        robotsFollow: seo.robotsFollow ?? true,
        ogTitle: seo.ogTitle || seo.title || '',
        ogDescription: seo.ogDescription || seo.description || '',
        ogImage: seo.ogImage || '',
        canonical: seo.canonical || '',
        score: Math.max(0, 100 - issues.length * 20),
        issues,
      };
    });

    res.json({
      overview: {
        totalPages: pages.length,
        averageScore: Math.round(auditItems.reduce((acc, i) => acc + i.score, 0) / pages.length),
        redirectCount: redirects.length,
        items: auditItems,
      },
    });
  },

  /**
   * PATCH /api/admin/seo/:pageId
   * Updates page-level SEO configuration
   */
  async updatePageSeo(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { pageId } = req.params;
    const { seo } = req.body;
    const actor = req.adminSession?.username || 'Admin';

    const page = storage.getPage(pageId);
    if (!page) {
      res.status(404).json({ error: `Page "${pageId}" not found.` });
      return;
    }

    const prevSeo = JSON.stringify(page.seo);
    page.seo = { ...page.seo, ...seo };
    page.lastModified = new Date().toISOString();
    page.modifiedBy = actor;
    storage.scheduleSave();

    securityEngine.logEvent({
      actorId: req.adminSession?.userId,
      actorName: actor,
      role: req.adminSession?.role,
      action: 'seo_settings_updated',
      resource: `seo:${pageId}`,
      pageId,
      ip: req.ip || '127.0.0.1',
      result: 'success',
      riskLevel: 'INFO',
      previousValue: prevSeo.slice(0, 150),
      newValue: JSON.stringify(page.seo).slice(0, 150),
    });

    res.json({ success: true, seo: page.seo });
  },

  /**
   * GET /api/admin/seo/redirects
   */
  async getRedirects(req: AuthenticatedRequest, res: Response): Promise<void> {
    res.json({ redirects: storage.getAllRedirects() });
  },

  /**
   * POST /api/admin/seo/redirects
   */
  async addRedirect(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { source, target, statusCode } = req.body;
    if (!source || !target) {
      res.status(400).json({ error: 'Source and target URLs are required.' });
      return;
    }

    const redirect = {
      id: `red_${Date.now()}`,
      source: source.startsWith('/') ? source : `/${source}`,
      target: target.startsWith('/') ? target : `/${target}`,
      statusCode: (statusCode === 302 ? 302 : 301) as 301 | 302,
      enabled: true,
      createdAt: new Date().toISOString(),
      hitCount: 0,
    };

    storage.addRedirect(redirect);
    res.json({ success: true, redirect });
  },

  /**
   * DELETE /api/admin/seo/redirects/:id
   */
  async deleteRedirect(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;
    storage.deleteRedirect(id);
    res.json({ success: true });
  },

  /**
   * GET /sitemap.xml (Public & Admin preview)
   */
  async generateSitemap(req: Request, res: Response): Promise<void> {
    const pages = storage.getAllPages();
    const site = storage.getSiteSettings();
    const baseUrl = site?.companyUrl || 'https://apexledger.com';

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    pages.forEach((p) => {
      if (p.status === 'published' && p.seo?.robotsIndex !== false) {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}${p.slug === '/' ? '' : p.slug}</loc>\n`;
        xml += `    <lastmod>${p.lastModified ? p.lastModified.split('T')[0] : '2026-09-29'}</lastmod>\n`;
        xml += `    <changefreq>${p.pageId === 'home' ? 'daily' : 'weekly'}</changefreq>\n`;
        xml += `    <priority>${p.pageId === 'home' ? '1.0' : '0.8'}</priority>\n`;
        xml += `  </url>\n`;
      }
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  },
};
