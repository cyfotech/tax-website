/**
 * Full-Stack Express Server for ApexLedger Advisory & Visual CMS
 * Runs on Port 3000. Serves authenticated Admin APIs, public content APIs,
 * and mounts Vite development middleware.
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { storage } from './server/storage.ts';
import { securityEngine } from './server/securityEngine.ts';
import {
  authController,
  requireAdminAuth,
  requireRoles,
  AuthenticatedRequest,
} from './server/authController.ts';
import { pagesController } from './server/pagesController.ts';
import { mediaController } from './server/mediaController.ts';
import { seoController } from './server/seoController.ts';
import { blogController } from './server/blogController.ts';
import { leadsController } from './server/leadsController.ts';
import { settingsController } from './server/settingsController.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.set('trust proxy', true);
  const PORT = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  // Body parsers with generous limits for media uploads
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // Global Rate Limiting & Security Inspection middleware
  app.use((req, res, next) => {
    const ip = req.ip || req.socket.remoteAddress || '127.0.0.1';
    // Allow up to 300 requests per minute per IP
    const allowed = securityEngine.checkRateLimit(ip, 300, 60000);
    if (!allowed) {
      res.status(429).json({ error: 'Too many requests. Please slow down.' });
      return;
    }
    next();
  });

  // Sitemap.xml public route
  app.get('/sitemap.xml', (req, res) => seoController.generateSitemap(req, res));

  // ==========================================
  // PUBLIC WEBSITE CONTENT APIS (/api/public/*)
  // Consumed by public visitor frontend
  // ==========================================
  const publicRouter = express.Router();

  publicRouter.get('/pages/:pageId', (req, res) => {
    const page = storage.getPublishedPage(req.params.pageId);
    if (!page) {
      res.status(404).json({ error: `Page "${req.params.pageId}" not found.` });
      return;
    }
    res.json({ page });
  });

  publicRouter.get('/navigation', (req, res) => {
    res.json({ navigation: storage.getNavigation() });
  });

  publicRouter.get('/footer', (req, res) => {
    res.json({ footer: storage.getFooter() });
  });

  publicRouter.get('/site-config', (req, res) => {
    res.json({ config: storage.getSiteSettings() });
  });

  publicRouter.get('/services', (req, res) => {
    res.json({ services: storage.createSnapshot().services || [] });
  });

  publicRouter.get('/services/:slug', (req, res) => {
    const services = storage.createSnapshot().services || [];
    const item = services.find((s: any) => s.slug === req.params.slug);
    if (!item) {
      res.status(404).json({ error: 'Service not found.' });
      return;
    }
    res.json({ service: item });
  });

  publicRouter.get('/blog', (req, res) => {
    const posts = storage.getAllBlogPosts().filter((p) => p.status !== 'draft');
    res.json({ posts });
  });

  publicRouter.get('/blog/:slug', (req, res) => {
    const post = storage.getBlogPostBySlug(req.params.slug);
    if (!post) {
      res.status(404).json({ error: 'Post not found.' });
      return;
    }
    res.json({ post });
  });

  // Public Lead & Form Submissions
  publicRouter.post('/contact', (req, res) => {
    const { fullName, email, phone, companyName, annualRevenue, servicesNeeded, message } = req.body;
    if (!fullName || !email) {
      res.status(400).json({ error: 'Name and email are required.' });
      return;
    }

    const leadId = `lead_${Date.now()}`;
    storage.addLead({
      id: leadId,
      type: 'contact',
      fullName,
      email,
      phone,
      companyName,
      annualRevenue,
      servicesNeeded,
      message,
      sourcePage: req.headers.referer || '/contact',
      status: 'new',
      submittedAt: new Date().toISOString(),
    });

    storage.addNotification({
      id: `notif_${Date.now()}`,
      type: 'lead',
      title: `New Inquiry: ${fullName}`,
      message: `${fullName} from ${companyName || 'Private Client'} submitted an inquiry.`,
      link: '/admin/leads',
      read: false,
      createdAt: new Date().toISOString(),
      severity: 'INFO',
    });

    securityEngine.logEvent({
      action: 'public_lead_submitted',
      resource: 'lead:contact',
      ip: req.ip || '127.0.0.1',
      userAgent: req.headers['user-agent'] as string,
      result: 'success',
      riskLevel: 'INFO',
      details: { leadId, company: companyName },
    });

    res.json({ success: true, message: 'Inquiry received. A senior CPA partner will respond within 24 hours.' });
  });

  publicRouter.post('/consultation', (req, res) => {
    const { fullName, email, phone, companySize, preferredDate, preferredTime, serviceSlug, notes } = req.body;
    if (!fullName || !email) {
      res.status(400).json({ error: 'Name and email are required.' });
      return;
    }

    const leadId = `lead_${Date.now()}`;
    storage.addLead({
      id: leadId,
      type: 'consultation',
      fullName,
      email,
      phone,
      companyName: companySize,
      preferredDate,
      preferredTime,
      serviceSlug,
      message: notes,
      sourcePage: req.headers.referer || '/book-consultation',
      status: 'new',
      submittedAt: new Date().toISOString(),
    });

    storage.addNotification({
      id: `notif_${Date.now()}`,
      type: 'lead',
      title: `Executive Consultation Booked: ${fullName}`,
      message: `Consultation request on ${preferredDate} at ${preferredTime}.`,
      link: '/admin/leads',
      read: false,
      createdAt: new Date().toISOString(),
      severity: 'INFO',
    });

    res.json({ success: true, confirmationId: `APX-${Math.floor(100000 + Math.random() * 900000)}` });
  });

  app.use('/api/public', publicRouter);

  // ==========================================
  // ADMIN AUTHENTICATED APIS (/api/admin/*)
  // Protected with session verification & RBAC
  // ==========================================
  const adminRouter = express.Router();

  // Public within Admin (Login / MFA)
  adminRouter.post('/auth/login', authController.login);
  adminRouter.post('/auth/mfa-verify', authController.verifyMfa);

  // Protected Admin Routes
  adminRouter.use(requireAdminAuth);

  // Auth & Session Management
  adminRouter.get('/auth/me', (req: AuthenticatedRequest, res) => authController.me(req, res));
  adminRouter.post('/auth/logout', (req: AuthenticatedRequest, res) => authController.logout(req, res));
  adminRouter.get('/auth/sessions', (req: AuthenticatedRequest, res) => authController.getSessions(req, res));
  adminRouter.post('/auth/revoke-session', (req: AuthenticatedRequest, res) => authController.revokeSession(req, res));
  adminRouter.post('/auth/mfa-setup', (req: AuthenticatedRequest, res) => authController.setupMfa(req, res));
  adminRouter.post('/auth/mfa-toggle', (req: AuthenticatedRequest, res) => authController.toggleMfa(req, res));

  // Pages & Visual Builder
  adminRouter.get('/pages', (req: AuthenticatedRequest, res) => pagesController.listPages(req, res));
  adminRouter.get('/pages/:pageId', (req: AuthenticatedRequest, res) => pagesController.getPage(req, res));
  adminRouter.post('/pages/:pageId/draft', requireRoles('super_admin', 'content_admin', 'editor'), (req: AuthenticatedRequest, res) => pagesController.saveDraft(req, res));
  adminRouter.post('/pages/:pageId/publish', requireRoles('super_admin', 'content_admin', 'editor'), (req: AuthenticatedRequest, res) => pagesController.publishPage(req, res));
  adminRouter.patch('/pages/:pageId/sections/reorder', requireRoles('super_admin', 'content_admin', 'editor'), (req: AuthenticatedRequest, res) => pagesController.reorderSections(req, res));
  adminRouter.patch('/pages/:pageId/sections/:sectionId', requireRoles('super_admin', 'content_admin', 'editor'), (req: AuthenticatedRequest, res) => pagesController.updateSection(req, res));
  adminRouter.post('/pages/:pageId/sections', requireRoles('super_admin', 'content_admin', 'editor'), (req: AuthenticatedRequest, res) => pagesController.addSection(req, res));
  adminRouter.delete('/pages/:pageId/sections/:sectionId', requireRoles('super_admin', 'content_admin', 'editor'), (req: AuthenticatedRequest, res) => pagesController.deleteSection(req, res));
  adminRouter.get('/pages/:pageId/history', (req: AuthenticatedRequest, res) => pagesController.getHistory(req, res));
  adminRouter.post('/pages/:pageId/rollback/:versionId', requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => pagesController.rollback(req, res));

  // Media Library
  adminRouter.get('/media', (req: AuthenticatedRequest, res) => mediaController.listMedia(req, res));
  adminRouter.post('/media/upload', requireRoles('super_admin', 'content_admin', 'editor'), (req: AuthenticatedRequest, res) => mediaController.uploadMedia(req, res));
  adminRouter.patch('/media/:id', requireRoles('super_admin', 'content_admin', 'editor'), (req: AuthenticatedRequest, res) => mediaController.updateMedia(req, res));
  adminRouter.delete('/media/:id', requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => mediaController.deleteMedia(req, res));

  // SEO Management
  adminRouter.get('/seo', (req: AuthenticatedRequest, res) => seoController.getOverview(req, res));
  adminRouter.patch('/seo/:pageId', requireRoles('super_admin', 'content_admin', 'seo_manager'), (req: AuthenticatedRequest, res) => seoController.updatePageSeo(req, res));
  adminRouter.get('/seo/redirects', (req: AuthenticatedRequest, res) => seoController.getRedirects(req, res));
  adminRouter.post('/seo/redirects', requireRoles('super_admin', 'content_admin', 'seo_manager'), (req: AuthenticatedRequest, res) => seoController.addRedirect(req, res));
  adminRouter.delete('/seo/redirects/:id', requireRoles('super_admin', 'content_admin', 'seo_manager'), (req: AuthenticatedRequest, res) => seoController.deleteRedirect(req, res));

  // Blog Management
  adminRouter.get('/blog', (req: AuthenticatedRequest, res) => blogController.listPosts(req, res));
  adminRouter.post('/blog', requireRoles('super_admin', 'content_admin', 'editor'), (req: AuthenticatedRequest, res) => blogController.savePost(req, res));
  adminRouter.delete('/blog/:id', requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => blogController.deletePost(req, res));

  // Leads & Inquiries
  adminRouter.get('/leads', (req: AuthenticatedRequest, res) => leadsController.listLeads(req, res));
  adminRouter.patch('/leads/:id', requireRoles('super_admin', 'content_admin', 'editor'), (req: AuthenticatedRequest, res) => leadsController.updateLead(req, res));
  adminRouter.delete('/leads/:id', requireRoles('super_admin'), (req: AuthenticatedRequest, res) => leadsController.deleteLead(req, res));

  // Security & Audit Engine
  adminRouter.get('/logs', requireRoles('super_admin', 'security_admin', 'viewer'), (req: AuthenticatedRequest, res) => {
    const { search, riskLevel, action, actor, pageId, limit, offset } = req.query;
    const result = storage.getAuditLogs({
      search: search as string,
      riskLevel: riskLevel as string,
      action: action as string,
      actor: actor as string,
      pageId: pageId as string,
      limit: limit ? Number(limit) : 50,
      offset: offset ? Number(offset) : 0,
    });
    res.json(result);
  });

  adminRouter.get('/security/incidents', requireRoles('super_admin', 'security_admin'), (req: AuthenticatedRequest, res) => {
    res.json({ incidents: storage.getAllSecurityIncidents() });
  });

  adminRouter.patch('/security/incidents/:id', requireRoles('super_admin', 'security_admin'), (req: AuthenticatedRequest, res) => {
    const { status, note } = req.body;
    const inc = storage.getSecurityIncidentById(req.params.id);
    if (!inc) {
      res.status(404).json({ error: 'Incident not found.' });
      return;
    }
    if (status) inc.status = status;
    if (note) {
      inc.investigationNotes = inc.investigationNotes || [];
      inc.investigationNotes.push(`[${new Date().toISOString()}] ${req.adminSession!.username}: ${note}`);
    }
    storage.updateSecurityIncident(inc.id, inc);
    res.json({ success: true, incident: inc });
  });

  adminRouter.get('/security/settings', requireRoles('super_admin', 'security_admin'), (req: AuthenticatedRequest, res) => settingsController.getSecuritySettings(req, res));
  adminRouter.patch('/security/settings', requireRoles('super_admin', 'security_admin'), (req: AuthenticatedRequest, res) => settingsController.updateSecuritySettings(req, res));

  // Global Settings, Navigation, Footer, Backup
  adminRouter.get('/settings/website', (req: AuthenticatedRequest, res) => settingsController.getWebsiteSettings(req, res));
  adminRouter.patch('/settings/website', requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => settingsController.updateWebsiteSettings(req, res));
  adminRouter.get('/settings/navigation', (req: AuthenticatedRequest, res) => settingsController.getNavigation(req, res));
  adminRouter.patch('/settings/navigation', requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => settingsController.updateNavigation(req, res));
  adminRouter.get('/settings/footer', (req: AuthenticatedRequest, res) => settingsController.getFooter(req, res));
  adminRouter.patch('/settings/footer', requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => settingsController.updateFooter(req, res));
  adminRouter.get('/settings/administrators', requireRoles('super_admin'), (req: AuthenticatedRequest, res) => settingsController.listAdministrators(req, res));
  adminRouter.post('/settings/backup', requireRoles('super_admin'), (req: AuthenticatedRequest, res) => settingsController.createBackup(req, res));

  // Notifications
  adminRouter.get('/notifications', (req: AuthenticatedRequest, res) => settingsController.getNotifications(req, res));
  adminRouter.post('/notifications/:id/read', (req: AuthenticatedRequest, res) => settingsController.markNotificationRead(req, res));
  adminRouter.post('/notifications/read-all', (req: AuthenticatedRequest, res) => settingsController.markAllNotificationsRead(req, res));

  app.use('/api/admin', adminRouter);

  // ==========================================
  // FRONTEND MOUNTING: VITE DEV OR STATIC DIST
  // ==========================================
  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ApexLedger Server] Running on http://0.0.0.0:${PORT}`);
    console.log(`[ApexLedger Admin] Dedicated route active at /admin`);
  });
}

startServer().catch((err) => {
  console.error('[ApexLedger Server] Fatal startup failure:', err);
  process.exit(1);
});
