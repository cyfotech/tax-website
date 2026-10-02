import { PageData } from '../../types/content';

export const taxResourcesPageData: PageData = {
  pageId: 'tax-resources',
  title: 'Tax Resources & Tools – ApexLedger Advisory',
  seo: {
    title: 'Tax Deadlines, Tools & Strategy Guide – ApexLedger Advisory',
    description: 'Federal and state tax filing calendars, deduction guides, and compliance checklists.',
  },
  sections: [
    {
      pageId: 'tax-resources',
      sectionId: 'tax-hero',
      type: 'hero',
      enabled: true,
      order: 1,
      content: {
        eyebrow: 'INTELLIGENT TAX PLANNING',
        title: 'Essential resources to navigate your corporate tax liabilities.',
        description: 'Key filing deadlines, verified deduction checklists, and multi-tier review standards.',
        primaryButton: {
          id: 'tax-btn-consult',
          label: 'Book Tax Review',
          href: '/book-consultation',
          variant: 'primary',
          icon: 'Calendar',
        },
        secondaryButton: {
          id: 'tax-btn-pricing',
          label: 'View Tax Pricing',
          href: '/pricing',
          variant: 'outline',
          icon: 'ArrowRight',
        },
        media: {
          type: 'animated_illustration',
          component: 'tax-specialist',
          aspectRatio: '16:9',
        },
      },
    },
    {
      pageId: 'tax-resources',
      sectionId: 'tax-visual-break',
      type: 'visualBreak',
      enabled: true,
      order: 2,
      content: {
        eyebrow: 'FILING ACCURACY',
        title: 'Verified Corporate Tax Compliance Protocol',
        description: 'Multi-tiered partner review cycle protecting your company from IRS notices and penalties.',
        metricLabel: 'On-Time Filing Guarantee',
        metricValue: '100% Guaranteed',
      },
    },
    {
      pageId: 'tax-resources',
      sectionId: 'tax-trust',
      type: 'trustStrip',
      enabled: true,
      order: 3,
      content: {
        items: [
          { id: 'tr1', icon: 'Shield', label: '100% Audit Penalty Protection' },
          { id: 'tr2', icon: 'FileText', label: 'E-File Confirmation Receipts' },
          { id: 'tr3', icon: 'Clock', label: 'Quarterly Estimated Vouchers' },
          { id: 'tr4', icon: 'CheckCircle2', label: 'Multi-State Nexus Audited' },
        ],
      },
    },
    {
      pageId: 'tax-resources',
      sectionId: 'tax-cta',
      type: 'cta',
      enabled: true,
      order: 4,
      content: {
        eyebrow: 'NEVER MISS A DEADLINE',
        title: 'Let our certified tax specialists handle your returns.',
        description: 'Eliminate penalties and maximize proactive entity deductions this season.',
        primaryButton: {
          id: 'tax-cta-btn',
          label: 'Schedule Tax Review',
          href: '/book-consultation',
          variant: 'primary',
          icon: 'Calendar',
        },
      },
    },
  ],
};
