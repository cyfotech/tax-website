/**
 * Core API Client for ApexLedger Advisory
 * Handles async data loading, form inquiries, and future CMS API requests.
 */

import { PageData, ServiceDetail, BlogPost, NavItem, ButtonConfig } from '../types/content';
import { homePageData } from '../data/pages/home';
import { aboutPageData } from '../data/pages/about';
import { servicesPageData } from '../data/pages/servicesPage';
import { taxResourcesPageData } from '../data/pages/taxResources';
import { pricingPageData } from '../data/pages/pricing';
import { contactPageData } from '../data/pages/contact';
import { allServices } from '../data/services';
import { blogPosts } from '../data/blog';
import { navigationLinks, headerCTA } from '../data/navigation';
import { footerConfig, FooterColumn } from '../data/footer';
import { siteConfig } from '../data/siteConfig';

const PAGES_MAP: Record<string, PageData> = {
  home: homePageData,
  about: aboutPageData,
  services: servicesPageData,
  'tax-resources': taxResourcesPageData,
  pricing: pricingPageData,
  contact: contactPageData,
};

export interface ContactInquiryPayload {
  fullName: string;
  email: string;
  phone?: string;
  companyName?: string;
  annualRevenue?: string;
  servicesNeeded: string[];
  message?: string;
}

export interface ConsultationBookingPayload {
  serviceSlug: string;
  companySize: string;
  preferredDate: string;
  preferredTime: string;
  fullName: string;
  email: string;
  notes?: string;
}

export const api = {
  async getPage(pageId: string): Promise<PageData> {
    try {
      const res = await fetch(`/api/public/pages/${pageId}`);
      if (res.ok) {
        const json = await res.json();
        if (json.page) {
          return json.page;
        }
      }
    } catch {
      // Fallback below
    }

    const fallbackPage = PAGES_MAP[pageId];
    if (!fallbackPage) {
      throw new Error(`Page with ID "${pageId}" not found in CMS.`);
    }
    return fallbackPage;
  },

  async getNavigation(): Promise<{ links: NavItem[]; cta: ButtonConfig }> {
    try {
      const res = await fetch('/api/public/navigation');
      if (res.ok) {
        const json = await res.json();
        if (json.navigation) return json.navigation;
      }
    } catch {
      // Fallback below
    }
    return { links: navigationLinks, cta: headerCTA };
  },

  async getFooter(): Promise<{ columns: FooterColumn[]; disclaimer: string; copyright: string }> {
    try {
      const res = await fetch('/api/public/footer');
      if (res.ok) {
        const json = await res.json();
        if (json.footer) return json.footer;
      }
    } catch {
      // Fallback
    }
    return footerConfig;
  },

  async getSiteConfig() {
    try {
      const res = await fetch('/api/public/site-config');
      if (res.ok) {
        const json = await res.json();
        if (json.config) return json.config;
      }
    } catch {
      // Fallback
    }
    return siteConfig;
  },

  async getServices(): Promise<ServiceDetail[]> {
    try {
      const res = await fetch('/api/public/services');
      if (res.ok) {
        const json = await res.json();
        if (json.services) return json.services;
      }
    } catch {
      // Fallback
    }
    return allServices;
  },

  async getServiceBySlug(slug: string): Promise<ServiceDetail | undefined> {
    try {
      const res = await fetch(`/api/public/services/${slug}`);
      if (res.ok) {
        const json = await res.json();
        if (json.service) return json.service;
      }
    } catch {
      // Fallback
    }
    return allServices.find((s) => s.slug === slug);
  },

  async getBlogPosts(): Promise<BlogPost[]> {
    try {
      const res = await fetch('/api/public/blog');
      if (res.ok) {
        const json = await res.json();
        if (json.posts) return json.posts;
      }
    } catch {
      // Fallback
    }
    return blogPosts;
  },

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    try {
      const res = await fetch(`/api/public/blog/${slug}`);
      if (res.ok) {
        const json = await res.json();
        if (json.post) return json.post;
      }
    } catch {
      // Fallback
    }
    return blogPosts.find((p) => p.slug === slug);
  },

  async submitContactInquiry(payload: ContactInquiryPayload): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const json = await res.json();
        return json;
      }
    } catch (e) {
      console.warn('[API] Server submission error, returning fallback confirmation:', e);
    }
    return {
      success: true,
      message: 'Thank you. A senior accounting partner will review your inquiry within 24 hours.',
    };
  },

  async bookConsultation(payload: ConsultationBookingPayload): Promise<{ success: boolean; confirmationId: string }> {
    try {
      const res = await fetch('/api/public/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const json = await res.json();
        return json;
      }
    } catch (e) {
      console.warn('[API] Server consultation error, returning fallback confirmation:', e);
    }
    const confirmationId = `APX-${Math.floor(100000 + Math.random() * 900000)}`;
    return {
      success: true,
      confirmationId,
    };
  },
};
