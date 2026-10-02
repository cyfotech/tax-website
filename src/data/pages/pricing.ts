import { PageData } from '../../types/content';

export const pricingPageData: PageData = {
  pageId: 'pricing',
  title: 'Transparent Pricing – ApexLedger Advisory',
  seo: {
    title: 'Transparent Pricing & Plans – ApexLedger Advisory',
    description: 'Predictable, flat monthly pricing for accounting, bookkeeping, corporate tax, and CPA outsourcing.',
  },
  sections: [
    {
      pageId: 'pricing',
      sectionId: 'pricing-hero',
      type: 'hero',
      enabled: true,
      order: 1,
      content: {
        eyebrow: 'TRANSPARENT PRICING',
        title: 'Straightforward investment. Zero hidden fees.',
        description: 'Fixed monthly tiers tailored to your transaction volume and advisory complexity.',
        primaryButton: {
          id: 'pricing-btn-consult',
          label: 'Book Consultation',
          href: '/book-consultation',
          variant: 'primary',
          icon: 'Calendar',
        },
        secondaryButton: {
          id: 'pricing-btn-services',
          label: 'Review Services',
          href: '/services',
          variant: 'outline',
          icon: 'ArrowRight',
        },
        media: {
          type: 'animated_illustration',
          component: 'accountant-hero',
          aspectRatio: '16:9',
        },
      },
    },
    {
      pageId: 'pricing',
      sectionId: 'pricing-plans-section',
      type: 'pricingPlans',
      enabled: true,
      order: 2,
      content: {
        eyebrow: 'ADVISORY TIERS',
        title: 'Select the right level of financial support.',
        description: 'Simple, transparent monthly pricing with flexible month-to-month agreements.',
      },
    },
    {
      pageId: 'pricing',
      sectionId: 'pricing-trust',
      type: 'trustStrip',
      enabled: true,
      order: 3,
      content: {
        items: [
          { id: 'pr-t1', icon: 'Lock', label: 'Month-to-Month Flexibility' },
          { id: 'pr-t2', icon: 'ShieldCheck', label: '100% Tax Accuracy Guarantee' },
          { id: 'pr-t3', icon: 'Clock', label: 'Dedicated Account Lead' },
          { id: 'pr-t4', icon: 'Zap', label: 'Software Setup Included' },
        ],
      },
    },
    {
      pageId: 'pricing',
      sectionId: 'pricing-cta',
      type: 'cta',
      enabled: true,
      order: 4,
      content: {
        eyebrow: 'CUSTOM SCOPE',
        title: 'Need a customized CPA outsourcing agreement?',
        description: 'We structure dedicated offshore pods and white-label packages for firms.',
        primaryButton: {
          id: 'pricing-cta-custom',
          label: 'Request Custom Proposal',
          href: '/contact',
          variant: 'primary',
          icon: 'FileText',
        },
      },
    },
  ],
};
