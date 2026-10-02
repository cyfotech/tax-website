/**
 * Persistent Data Storage Engine for ApexLedger Admin CMS & Public Content
 * Persists data to a local JSON database with in-memory caching for sub-millisecond responses.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { homePageData } from '../src/data/pages/home';
import { aboutPageData } from '../src/data/pages/about';
import { servicesPageData } from '../src/data/pages/servicesPage';
import { taxResourcesPageData } from '../src/data/pages/taxResources';
import { pricingPageData } from '../src/data/pages/pricing';
import { contactPageData } from '../src/data/pages/contact';
import { allServices } from '../src/data/services';
import { blogPosts } from '../src/data/blog';
import { navigationLinks, headerCTA } from '../src/data/navigation';
import { footerConfig } from '../src/data/footer';
import { siteConfig } from '../src/data/siteConfig';

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
  passwordHash: string;
  passwordSalt: string;
  role: UserRole;
  mfaEnabled: boolean;
  mfaSecret?: string;
  recoveryCodes?: string[];
  failedLoginAttempts: number;
  lockoutUntil?: number;
  lastLoginAt?: string;
  lastLoginIp?: string;
  createdAt: string;
}

export interface AdminSession {
  id: string;
  token: string;
  userId: string;
  username: string;
  role: UserRole;
  ip: string;
  userAgent: string;
  createdAt: string;
  expiresAt: string;
  lastActiveAt: string;
  isValid: boolean;
}

export interface PageRecord {
  pageId: string;
  slug: string;
  title: string;
  status: 'published' | 'draft';
  lastModified: string;
  modifiedBy: string;
  publishedAt?: string;
  seo: {
    title: string;
    description: string;
    keywords?: string[];
    canonical?: string;
    robotsIndex: boolean;
    robotsFollow: boolean;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterImage?: string;
  };
  sections: any[];
  draftSections?: any[];
  draftSeo?: any;
  hasDraftChanges: boolean;
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
  usageLocations: Array<{ pageId: string; sectionId: string; elementId: string; label: string }>;
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
  id: string; // e.g. SEC-2026-0041
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

export interface SecuritySettings {
  mfaRequired: boolean;
  sessionTimeoutMinutes: number;
  maxFailedAttempts: number;
  lockoutDurationMinutes: number;
  emailAlertThreshold: RiskLevel;
  alertRecipientEmail: string;
  maxUploadSizeMB: number;
  allowedFileTypes: string[];
}

export interface DatabaseSchema {
  users: AdminUser[];
  sessions: AdminSession[];
  pages: Record<string, PageRecord>;
  pageVersions: PageVersion[];
  media: MediaAsset[];
  redirects: RedirectRecord[];
  blogPosts: any[];
  services: any[];
  leads: LeadRecord[];
  auditLogs: AuditEvent[];
  securityIncidents: SecurityIncident[];
  securitySettings: SecuritySettings;
  siteSettings: any;
  navigation: any;
  footer: any;
  notifications: Array<{
    id: string;
    type: 'security' | 'content' | 'lead' | 'system';
    title: string;
    message: string;
    link?: string;
    read: boolean;
    createdAt: string;
    severity?: RiskLevel;
  }>;
}

const DATA_DIR = path.resolve(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Helper password hasher using PBKDF2
export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const finalSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, finalSalt, 10000, 64, 'sha512').toString('hex');
  return { hash, salt: finalSalt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const result = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(result), Buffer.from(hash));
}

// Initial Seed Setup
function createInitialDatabase(): DatabaseSchema {
  // Passwords:
  // Super Admin: ApexAdmin2026!
  // Content Admin: ApexContent2026!
  // Security Admin: ApexSec2026!
  // Editor: ApexEditor2026!
  const superAdminPass = hashPassword('ApexAdmin2026!');
  const contentAdminPass = hashPassword('ApexContent2026!');
  const secAdminPass = hashPassword('ApexSec2026!');
  const editorPass = hashPassword('ApexEditor2026!');

  const initialUsers: AdminUser[] = [
    {
      id: 'usr_super_1',
      username: 'admin',
      email: 'admin@apexledger.com',
      fullName: 'Chief Partner Admin',
      passwordHash: superAdminPass.hash,
      passwordSalt: superAdminPass.salt,
      role: 'super_admin',
      mfaEnabled: false,
      failedLoginAttempts: 0,
      createdAt: '2026-01-15T08:00:00Z',
    },
    {
      id: 'usr_content_2',
      username: 'content_admin',
      email: 'content@apexledger.com',
      fullName: 'Evelyn Brooks (Content Lead)',
      passwordHash: contentAdminPass.hash,
      passwordSalt: contentAdminPass.salt,
      role: 'content_admin',
      mfaEnabled: false,
      failedLoginAttempts: 0,
      createdAt: '2026-02-01T09:30:00Z',
    },
    {
      id: 'usr_sec_3',
      username: 'security_admin',
      email: 'security@apexledger.com',
      fullName: 'Marcus Vance (CISO)',
      passwordHash: secAdminPass.hash,
      passwordSalt: secAdminPass.salt,
      role: 'security_admin',
      mfaEnabled: true,
      recoveryCodes: ['APX-9821-4402', 'APX-7719-3382', 'APX-1120-9943'],
      failedLoginAttempts: 0,
      createdAt: '2026-01-20T10:15:00Z',
    },
    {
      id: 'usr_editor_4',
      username: 'editor',
      email: 'editor@apexledger.com',
      fullName: 'Sarah Chen (Senior Editor)',
      passwordHash: editorPass.hash,
      passwordSalt: editorPass.salt,
      role: 'editor',
      mfaEnabled: false,
      failedLoginAttempts: 0,
      createdAt: '2026-03-01T11:00:00Z',
    },
  ];

  const pagesMap: Record<string, PageRecord> = {
    home: {
      pageId: 'home',
      slug: '/',
      title: 'Home – ApexLedger Advisory',
      status: 'published',
      lastModified: '2026-09-29T13:30:00Z',
      modifiedBy: 'Chief Partner Admin',
      publishedAt: '2026-09-29T13:30:00Z',
      seo: {
        title: homePageData.seo.title,
        description: homePageData.seo.description,
        robotsIndex: true,
        robotsFollow: true,
        ogTitle: homePageData.seo.title,
        ogDescription: homePageData.seo.description,
        ogImage: '/media/og-home.png',
      },
      sections: homePageData.sections,
      hasDraftChanges: false,
    },
    about: {
      pageId: 'about',
      slug: '/about',
      title: 'About Us – ApexLedger Advisory',
      status: 'published',
      lastModified: '2026-09-28T10:00:00Z',
      modifiedBy: 'Evelyn Brooks',
      publishedAt: '2026-09-28T10:00:00Z',
      seo: {
        title: aboutPageData.seo.title,
        description: aboutPageData.seo.description,
        robotsIndex: true,
        robotsFollow: true,
        ogTitle: aboutPageData.seo.title,
        ogDescription: aboutPageData.seo.description,
      },
      sections: aboutPageData.sections,
      hasDraftChanges: false,
    },
    services: {
      pageId: 'services',
      slug: '/services',
      title: 'Services – Corporate Accounting & Advisory',
      status: 'published',
      lastModified: '2026-09-27T14:15:00Z',
      modifiedBy: 'Chief Partner Admin',
      publishedAt: '2026-09-27T14:15:00Z',
      seo: {
        title: servicesPageData.seo.title,
        description: servicesPageData.seo.description,
        robotsIndex: true,
        robotsFollow: true,
        ogTitle: servicesPageData.seo.title,
        ogDescription: servicesPageData.seo.description,
      },
      sections: servicesPageData.sections,
      hasDraftChanges: false,
    },
    'tax-resources': {
      pageId: 'tax-resources',
      slug: '/tax-resources',
      title: 'Tax Resources & 2026 Calendar',
      status: 'published',
      lastModified: '2026-09-25T11:20:00Z',
      modifiedBy: 'Evelyn Brooks',
      publishedAt: '2026-09-25T11:20:00Z',
      seo: {
        title: taxResourcesPageData.seo.title,
        description: taxResourcesPageData.seo.description,
        robotsIndex: true,
        robotsFollow: true,
      },
      sections: taxResourcesPageData.sections,
      hasDraftChanges: false,
    },
    pricing: {
      pageId: 'pricing',
      slug: '/pricing',
      title: 'Transparent Pricing Plans',
      status: 'published',
      lastModified: '2026-09-26T16:45:00Z',
      modifiedBy: 'Chief Partner Admin',
      publishedAt: '2026-09-26T16:45:00Z',
      seo: {
        title: pricingPageData.seo.title,
        description: pricingPageData.seo.description,
        robotsIndex: true,
        robotsFollow: true,
      },
      sections: pricingPageData.sections,
      hasDraftChanges: false,
    },
    contact: {
      pageId: 'contact',
      slug: '/contact',
      title: 'Contact Senior CPAs',
      status: 'published',
      lastModified: '2026-09-24T09:10:00Z',
      modifiedBy: 'Sarah Chen',
      publishedAt: '2026-09-24T09:10:00Z',
      seo: {
        title: contactPageData.seo.title,
        description: contactPageData.seo.description,
        robotsIndex: true,
        robotsFollow: true,
      },
      sections: contactPageData.sections,
      hasDraftChanges: false,
    },
  };

  const initialMedia: MediaAsset[] = [
    {
      id: 'med_hero_accountant',
      filename: 'accountant-live-dashboard.svg',
      originalName: 'Accountant Hero Interactive',
      mimeType: 'image/svg+xml',
      size: 14200,
      dimensions: { width: 600, height: 420 },
      url: '/media/accountant-hero.svg',
      altText: 'Senior CPA reviewing live corporate financial ledger',
      title: 'Hero Interactive Accountant Visual',
      type: 'animation',
      componentKey: 'accountant-hero',
      uploadedAt: '2026-01-20T10:00:00Z',
      uploadedBy: 'Chief Partner Admin',
      usageLocations: [
        { pageId: 'home', sectionId: 'hero', elementId: 'home-hero-media', label: 'Home Page Hero' },
      ],
    },
    {
      id: 'med_outsourcing_team',
      filename: 'outsourcing-team.svg',
      originalName: 'Outsourcing Team Illustration',
      mimeType: 'image/svg+xml',
      size: 9840,
      dimensions: { width: 500, height: 400 },
      url: '/media/outsourcing-team.svg',
      altText: 'Dedicated CPA accounting team collaborating remotely',
      title: 'Outsourcing Team Visual',
      type: 'animation',
      componentKey: 'outsourcing-team',
      uploadedAt: '2026-01-22T14:30:00Z',
      uploadedBy: 'Evelyn Brooks',
      usageLocations: [
        { pageId: 'home', sectionId: 'outsourcing', elementId: 'home-outsourcing-media', label: 'Home Outsourcing Section' },
      ],
    },
    {
      id: 'med_tax_specialist',
      filename: 'tax-specialist.svg',
      originalName: 'Tax Specialist Illustration',
      mimeType: 'image/svg+xml',
      size: 11200,
      dimensions: { width: 500, height: 400 },
      url: '/media/tax-specialist.svg',
      altText: 'Tax specialist analyzing multi-entity tax reduction strategies',
      title: 'Tax Specialist Visual',
      type: 'animation',
      componentKey: 'tax-specialist',
      uploadedAt: '2026-02-05T11:00:00Z',
      uploadedBy: 'Evelyn Brooks',
      usageLocations: [
        { pageId: 'about', sectionId: 'hero', elementId: 'about-hero-media', label: 'About Page Hero' },
      ],
    },
    {
      id: 'med_accounting_workflow',
      filename: 'modern-workflow.svg',
      originalName: 'Modern Accounting Workflow',
      mimeType: 'image/svg+xml',
      size: 12500,
      dimensions: { width: 600, height: 400 },
      url: '/media/accounting-workflow.svg',
      altText: 'Automated ledger close, bank reconciliation, and board reporting',
      title: 'Modern Accounting Workflow',
      type: 'animation',
      componentKey: 'accounting-workflow',
      uploadedAt: '2026-02-10T16:00:00Z',
      uploadedBy: 'Chief Partner Admin',
      usageLocations: [
        { pageId: 'services', sectionId: 'hero', elementId: 'services-hero-media', label: 'Services Page Hero' },
      ],
    },
    {
      id: 'med_brand_logo',
      filename: 'apexledger-logo.svg',
      originalName: 'ApexLedger Primary Monogram',
      mimeType: 'image/svg+xml',
      size: 4200,
      dimensions: { width: 180, height: 48 },
      url: '/media/apexledger-logo.svg',
      altText: 'ApexLedger Corporate CPA & Advisory Logo',
      title: 'ApexLedger Brand Logo',
      type: 'svg',
      uploadedAt: '2026-01-10T08:00:00Z',
      uploadedBy: 'Chief Partner Admin',
      usageLocations: [
        { pageId: 'global', sectionId: 'navbar', elementId: 'navbar-logo', label: 'Global Navbar' },
        { pageId: 'global', sectionId: 'footer', elementId: 'footer-logo', label: 'Global Footer' },
      ],
    },
  ];

  const initialAuditLogs: AuditEvent[] = [];

  const initialSecurityIncidents: SecurityIncident[] = [];

  const initialLeads: LeadRecord[] = [];

  return {
    users: initialUsers,
    sessions: [],
    pages: pagesMap,
    pageVersions: [
      {
        id: 'ver_home_17',
        pageId: 'home',
        versionNumber: 17,
        timestamp: '2026-09-28T16:00:00Z',
        modifiedBy: 'Chief Partner Admin',
        changeSummary: 'Updated trust strip partner certifications and visual metrics',
        sections: homePageData.sections,
        seo: homePageData.seo,
      },
    ],
    media: initialMedia,
    redirects: [
      {
        id: 'red_1',
        source: '/cfo-services',
        target: '/services/fractional-cfo',
        statusCode: 301,
        enabled: true,
        createdAt: '2026-01-15T00:00:00Z',
        hitCount: 142,
      },
      {
        id: 'red_2',
        source: '/tax-filing',
        target: '/services/corporate-tax',
        statusCode: 301,
        enabled: true,
        createdAt: '2026-02-01T00:00:00Z',
        hitCount: 88,
      },
    ],
    blogPosts: blogPosts,
    services: allServices,
    leads: initialLeads,
    auditLogs: initialAuditLogs,
    securityIncidents: initialSecurityIncidents,
    securitySettings: {
      mfaRequired: false,
      sessionTimeoutMinutes: 60,
      maxFailedAttempts: 5,
      lockoutDurationMinutes: 15,
      emailAlertThreshold: 'HIGH',
      alertRecipientEmail: 'security-alerts@apexledger.com',
      maxUploadSizeMB: 10,
      allowedFileTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif', 'video/mp4'],
    },
    siteSettings: siteConfig,
    navigation: {
      links: navigationLinks,
      cta: headerCTA,
    },
    footer: footerConfig,
    notifications: [
      {
        id: 'notif_1',
        type: 'security',
        title: 'High Security Alert: SEC-2026-0041',
        message: 'Repeated failed admin authentication attempts detected from IP 185.220.101.5',
        link: '/admin/security/alerts',
        read: false,
        createdAt: '2026-09-29T08:23:05Z',
        severity: 'HIGH',
      },
      {
        id: 'notif_2',
        type: 'lead',
        title: 'New Executive Consultation Lead',
        message: 'David Sterling from Vanguard Technologies submitted a consultation request.',
        link: '/admin/leads',
        read: false,
        createdAt: '2026-09-29T10:45:00Z',
        severity: 'INFO',
      },
    ],
  };
}

class StorageEngine {
  private data: DatabaseSchema;
  private saveTimeout: NodeJS.Timeout | null = null;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DatabaseSchema {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        return { ...createInitialDatabase(), ...parsed };
      }
    } catch (err) {
      console.warn('[StorageEngine] Error loading db.json, creating initial state:', err);
    }

    const initial = createInitialDatabase();
    this.persistSync(initial);
    return initial;
  }

  private persistSync(data: DatabaseSchema) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[StorageEngine] Failed to save db.json:', err);
    }
  }

  public scheduleSave() {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    this.saveTimeout = setTimeout(() => {
      this.persistSync(this.data);
      this.saveTimeout = null;
    }, 250);
  }

  // --- Users & Auth ---
  public findUserByUsernameOrEmail(identifier: string): AdminUser | undefined {
    const clean = identifier.trim().toLowerCase();
    return this.data.users.find(
      (u) => u.username.toLowerCase() === clean || u.email.toLowerCase() === clean
    );
  }

  public findUserById(id: string): AdminUser | undefined {
    return this.data.users.find((u) => u.id === id);
  }

  public getAllUsers(): AdminUser[] {
    return this.data.users;
  }

  public updateUser(user: AdminUser) {
    const index = this.data.users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      this.data.users[index] = user;
      this.scheduleSave();
    }
  }

  public createUser(user: AdminUser) {
    this.data.users.push(user);
    this.scheduleSave();
  }

  // --- Sessions ---
  public createSession(session: AdminSession) {
    this.data.sessions.push(session);
    this.scheduleSave();
  }

  public findSessionByToken(token: string): AdminSession | undefined {
    const session = this.data.sessions.find((s) => s.token === token && s.isValid);
    if (!session) return undefined;
    if (new Date(session.expiresAt).getTime() < Date.now()) {
      session.isValid = false;
      this.scheduleSave();
      return undefined;
    }
    session.lastActiveAt = new Date().toISOString();
    return session;
  }

  public getActiveSessionsForUser(userId: string): AdminSession[] {
    const now = Date.now();
    return this.data.sessions.filter(
      (s) => s.userId === userId && s.isValid && new Date(s.expiresAt).getTime() > now
    );
  }

  public getAllActiveSessions(): AdminSession[] {
    const now = Date.now();
    return this.data.sessions.filter((s) => s.isValid && new Date(s.expiresAt).getTime() > now);
  }

  public revokeSession(sessionId: string) {
    const session = this.data.sessions.find((s) => s.id === sessionId);
    if (session) {
      session.isValid = false;
      this.scheduleSave();
    }
  }

  public revokeAllSessionsForUser(userId: string, exceptSessionId?: string) {
    this.data.sessions.forEach((s) => {
      if (s.userId === userId && s.id !== exceptSessionId) {
        s.isValid = false;
      }
    });
    this.scheduleSave();
  }

  // --- Pages & Visual CMS ---
  public getAllPages(): PageRecord[] {
    return Object.values(this.data.pages);
  }

  public getPage(pageId: string): PageRecord | undefined {
    return this.data.pages[pageId];
  }

  public getPublishedPage(pageId: string): PageRecord | undefined {
    const page = this.data.pages[pageId];
    if (!page) return undefined;
    // Return published view without active drafts
    return {
      ...page,
      sections: page.sections,
      seo: page.seo,
    };
  }

  public savePageDraft(
    pageId: string,
    draftSections: any[],
    draftSeo: any,
    modifiedBy: string
  ): PageRecord {
    let page = this.data.pages[pageId];
    if (!page) {
      throw new Error(`Page "${pageId}" not found.`);
    }

    page.draftSections = draftSections;
    page.draftSeo = draftSeo || page.seo;
    page.hasDraftChanges = true;
    page.lastModified = new Date().toISOString();
    page.modifiedBy = modifiedBy;
    this.scheduleSave();
    return page;
  }

  public publishPage(pageId: string, modifiedBy: string, summary?: string): PageRecord {
    const page = this.data.pages[pageId];
    if (!page) {
      throw new Error(`Page "${pageId}" not found.`);
    }

    // Capture version revision
    const existingVersions = this.data.pageVersions.filter((v) => v.pageId === pageId);
    const newVersionNumber = existingVersions.length + 1;
    const newVersion: PageVersion = {
      id: `ver_${pageId}_${newVersionNumber}_${Date.now()}`,
      pageId,
      versionNumber: newVersionNumber,
      timestamp: new Date().toISOString(),
      modifiedBy,
      changeSummary: summary || `Published version ${newVersionNumber} from Visual CMS`,
      sections: JSON.parse(JSON.stringify(page.sections)),
      seo: JSON.parse(JSON.stringify(page.seo)),
    };
    this.data.pageVersions.unshift(newVersion);

    // Commit drafts to published
    if (page.draftSections) {
      page.sections = page.draftSections;
      delete page.draftSections;
    }
    if (page.draftSeo) {
      page.seo = page.draftSeo;
      delete page.draftSeo;
    }

    page.hasDraftChanges = false;
    page.status = 'published';
    page.publishedAt = new Date().toISOString();
    page.lastModified = new Date().toISOString();
    page.modifiedBy = modifiedBy;

    this.scheduleSave();
    return page;
  }

  public rollbackPage(pageId: string, versionId: string, actor: string): PageRecord {
    const page = this.data.pages[pageId];
    if (!page) throw new Error(`Page "${pageId}" not found.`);

    const version = this.data.pageVersions.find((v) => v.id === versionId && v.pageId === pageId);
    if (!version) throw new Error(`Version "${versionId}" not found.`);

    // Archive current before rollback
    const rollbackVersionNum = this.data.pageVersions.filter((v) => v.pageId === pageId).length + 1;
    this.data.pageVersions.unshift({
      id: `ver_${pageId}_${rollbackVersionNum}_${Date.now()}`,
      pageId,
      versionNumber: rollbackVersionNum,
      timestamp: new Date().toISOString(),
      modifiedBy: actor,
      changeSummary: `Restored to revision #${version.versionNumber}`,
      sections: JSON.parse(JSON.stringify(version.sections)),
      seo: JSON.parse(JSON.stringify(version.seo)),
    });

    page.sections = JSON.parse(JSON.stringify(version.sections));
    page.seo = JSON.parse(JSON.stringify(version.seo));
    delete page.draftSections;
    delete page.draftSeo;
    page.hasDraftChanges = false;
    page.lastModified = new Date().toISOString();
    page.modifiedBy = actor;

    this.scheduleSave();
    return page;
  }

  public getPageVersions(pageId: string): PageVersion[] {
    return this.data.pageVersions.filter((v) => v.pageId === pageId);
  }

  // --- Media Library ---
  public getAllMedia(): MediaAsset[] {
    return this.data.media;
  }

  public getMediaById(id: string): MediaAsset | undefined {
    return this.data.media.find((m) => m.id === id);
  }

  public addMedia(asset: MediaAsset) {
    this.data.media.unshift(asset);
    this.scheduleSave();
  }

  public updateMedia(id: string, updates: Partial<MediaAsset>): MediaAsset {
    const asset = this.data.media.find((m) => m.id === id);
    if (!asset) throw new Error(`Media asset "${id}" not found.`);
    Object.assign(asset, updates);
    this.scheduleSave();
    return asset;
  }

  public deleteMedia(id: string): boolean {
    const index = this.data.media.findIndex((m) => m.id === id);
    if (index === -1) return false;
    this.data.media.splice(index, 1);
    this.scheduleSave();
    return true;
  }

  // --- Audit Logs & Security Engine ---
  public addAuditEvent(event: AuditEvent) {
    this.data.auditLogs.unshift(event);
    // Keep max 10,000 logs in storage
    if (this.data.auditLogs.length > 10000) {
      this.data.auditLogs.pop();
    }
    this.scheduleSave();
  }

  public getAuditLogs(filter?: {
    search?: string;
    riskLevel?: string;
    action?: string;
    actor?: string;
    pageId?: string;
    limit?: number;
    offset?: number;
  }): { logs: AuditEvent[]; total: number } {
    let logs = this.data.auditLogs;

    if (filter?.riskLevel) {
      logs = logs.filter((l) => l.riskLevel === filter.riskLevel);
    }
    if (filter?.action) {
      logs = logs.filter((l) => l.action.toLowerCase().includes(filter.action!.toLowerCase()));
    }
    if (filter?.actor) {
      logs = logs.filter((l) => l.actorName.toLowerCase().includes(filter.actor!.toLowerCase()));
    }
    if (filter?.pageId) {
      logs = logs.filter((l) => l.pageId === filter.pageId);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      logs = logs.filter(
        (l) =>
          l.id.toLowerCase().includes(q) ||
          l.action.toLowerCase().includes(q) ||
          l.actorName.toLowerCase().includes(q) ||
          l.resource.toLowerCase().includes(q) ||
          l.ip.toLowerCase().includes(q) ||
          (l.details && JSON.stringify(l.details).toLowerCase().includes(q))
      );
    }

    const total = logs.length;
    const offset = filter?.offset || 0;
    const limit = filter?.limit || 50;
    const paged = logs.slice(offset, offset + limit);

    return { logs: paged, total };
  }

  public getAllSecurityIncidents(): SecurityIncident[] {
    return this.data.securityIncidents;
  }

  public getSecurityIncidentById(id: string): SecurityIncident | undefined {
    return this.data.securityIncidents.find((inc) => inc.id === id);
  }

  public addSecurityIncident(incident: SecurityIncident) {
    this.data.securityIncidents.unshift(incident);
    this.scheduleSave();
  }

  public updateSecurityIncident(
    id: string,
    updates: Partial<SecurityIncident>
  ): SecurityIncident | undefined {
    const inc = this.data.securityIncidents.find((i) => i.id === id);
    if (!inc) return undefined;
    Object.assign(inc, updates);
    this.scheduleSave();
    return inc;
  }

  public getSecuritySettings(): SecuritySettings {
    return this.data.securitySettings;
  }

  public updateSecuritySettings(updates: Partial<SecuritySettings>): SecuritySettings {
    Object.assign(this.data.securitySettings, updates);
    this.scheduleSave();
    return this.data.securitySettings;
  }

  // --- Leads ---
  public getAllLeads(): LeadRecord[] {
    return this.data.leads;
  }

  public addLead(lead: LeadRecord) {
    this.data.leads.unshift(lead);
    this.scheduleSave();
  }

  public updateLead(id: string, updates: Partial<LeadRecord>): LeadRecord | undefined {
    const lead = this.data.leads.find((l) => l.id === id);
    if (!lead) return undefined;
    Object.assign(lead, updates);
    this.scheduleSave();
    return lead;
  }

  public deleteLead(id: string): boolean {
    const index = this.data.leads.findIndex((l) => l.id === id);
    if (index === -1) return false;
    this.data.leads.splice(index, 1);
    this.scheduleSave();
    return true;
  }

  // --- Blog ---
  public getAllBlogPosts(): any[] {
    return this.data.blogPosts;
  }

  public getBlogPostBySlug(slug: string): any | undefined {
    return this.data.blogPosts.find((p) => p.slug === slug);
  }

  public saveBlogPost(post: any) {
    const idx = this.data.blogPosts.findIndex((p) => p.id === post.id);
    if (idx !== -1) {
      this.data.blogPosts[idx] = post;
    } else {
      this.data.blogPosts.unshift(post);
    }
    this.scheduleSave();
    return post;
  }

  public deleteBlogPost(id: string): boolean {
    const idx = this.data.blogPosts.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    this.data.blogPosts.splice(idx, 1);
    this.scheduleSave();
    return true;
  }

  // --- Redirects ---
  public getAllRedirects(): RedirectRecord[] {
    return this.data.redirects;
  }

  public addRedirect(redirect: RedirectRecord) {
    this.data.redirects.push(redirect);
    this.scheduleSave();
  }

  public deleteRedirect(id: string): boolean {
    const idx = this.data.redirects.findIndex((r) => r.id === id);
    if (idx === -1) return false;
    this.data.redirects.splice(idx, 1);
    this.scheduleSave();
    return true;
  }

  // --- Site Config, Nav, Footer ---
  public getSiteSettings() {
    return this.data.siteSettings;
  }

  public updateSiteSettings(settings: any) {
    this.data.siteSettings = settings;
    this.scheduleSave();
    return this.data.siteSettings;
  }

  public getNavigation() {
    return this.data.navigation;
  }

  public updateNavigation(nav: any) {
    this.data.navigation = nav;
    this.scheduleSave();
    return this.data.navigation;
  }

  public getFooter() {
    return this.data.footer;
  }

  public updateFooter(footer: any) {
    this.data.footer = footer;
    this.scheduleSave();
    return this.data.footer;
  }

  // --- Notifications ---
  public getNotifications() {
    return this.data.notifications;
  }

  public addNotification(notification: any) {
    this.data.notifications.unshift(notification);
    this.scheduleSave();
  }

  public markNotificationAsRead(id: string) {
    const notif = this.data.notifications.find((n) => n.id === id);
    if (notif) {
      notif.read = true;
      this.scheduleSave();
    }
  }

  public markAllNotificationsAsRead() {
    this.data.notifications.forEach((n) => (n.read = true));
    this.scheduleSave();
  }

  // --- System Backup ---
  public createSnapshot() {
    return JSON.parse(JSON.stringify(this.data));
  }

  public restoreSnapshot(snapshot: DatabaseSchema) {
    this.data = snapshot;
    this.scheduleSave();
  }
}

export const storage = new StorageEngine();
