import { api } from './api';
import { PageData, ServiceDetail, BlogPost } from '../types/content';

export const contentService = {
  async getPage(pageId: string): Promise<PageData> {
    try {
      return await api.getPage(pageId);
    } catch (err) {
      console.warn(`[ContentService] Fallback for pageId "${pageId}":`, err);
      // Safe fallback returns minimal valid page
      return {
        pageId,
        title: 'ApexLedger Advisory',
        seo: {
          title: 'ApexLedger Advisory',
          description: 'Premier accounting, tax, and corporate advisory services.',
        },
        sections: [],
      };
    }
  },

  async getAllServices(): Promise<ServiceDetail[]> {
    return await api.getServices();
  },

  async getServiceBySlug(slug: string): Promise<ServiceDetail | undefined> {
    return await api.getServiceBySlug(slug);
  },

  async getBlogPosts(): Promise<BlogPost[]> {
    return await api.getBlogPosts();
  },

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return await api.getBlogPostBySlug(slug);
  },

  async getNavigation() {
    return await api.getNavigation();
  },

  async getFooter() {
    return await api.getFooter();
  },
};
