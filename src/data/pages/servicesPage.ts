import { PageData } from '../../types/content';
import { serviceCardItems } from '../services';

export const servicesPageData: PageData = {
  pageId: 'services',
  title: 'Our Services – ApexLedger Advisory',
  seo: {
    title: 'Comprehensive Financial & Tax Services – ApexLedger Advisory',
    description: 'Corporate accounting, tax filings, bookkeeping, and white-label CPA outsourcing solutions.',
  },
  sections: [
    {
      pageId: 'services',
      sectionId: 'services-hero',
      type: 'hero',
      enabled: true,
      order: 1,
      content: {
        eyebrow: 'FULL-SPECTRUM ADVISORY',
        title: 'Precision financial services for every growth stage.',
        description: 'From monthly bookkeeping to complex multi-state corporate tax strategy.',
        primaryButton: {
          id: 'serv-cta-estimate',
          label: 'Get Custom Estimate',
          href: '/pricing',
          variant: 'primary',
          icon: 'Calculator',
        },
        secondaryButton: {
          id: 'serv-cta-consult',
          label: 'Book Consultation',
          href: '/book-consultation',
          variant: 'outline',
          icon: 'Calendar',
        },
        media: {
          type: 'animated_illustration',
          component: 'tax-specialist',
          aspectRatio: '16:9',
        },
      },
    },
    {
      pageId: 'services',
      sectionId: 'services-grid',
      type: 'serviceGrid',
      enabled: true,
      order: 2,
      content: {
        eyebrow: 'EXPLORE CAPABILITIES',
        title: 'Tailored solutions for modern finance teams.',
        description: 'Click any capability to review full scope, deliverables, and technology integrations.',
        services: serviceCardItems,
      },
    },
    {
      pageId: 'services',
      sectionId: 'services-process',
      type: 'process',
      enabled: true,
      order: 3,
      content: {
        eyebrow: 'ENGAGEMENT LIFECYCLE',
        title: 'How we onboard and scale your engagement.',
        description: 'A structured transition from your existing books to a reliable monthly accounting rhythm.',
        steps: [
          {
            step: '01',
            number: '01',
            title: 'Ledger Audit',
            shortDescription: 'Understand where you are.',
            icon: 'Search',
            tagline: 'Review your existing chart of accounts and historical ledger balances.',
            keyPoints: [
              'Chart of accounts review',
              'Opening balances verification',
              'Existing workflow diagnosis',
            ],
          },
          {
            step: '02',
            number: '02',
            title: 'System Bridge',
            shortDescription: 'Connect your financial stack.',
            icon: 'Link',
            tagline: 'Secure API feeds bridging your bank, billing engine, and cloud ledger.',
            keyPoints: [
              'Bank & merchant feed sync',
              'ERP / QBO / Xero integration',
              'Read-only security protocol',
            ],
          },
          {
            step: '03',
            number: '03',
            title: 'Catch-up & Clean',
            shortDescription: 'Fix what needs attention.',
            icon: 'CheckSquare',
            tagline: 'Historical cleanup eliminating suspense accounts and discrepancies.',
            keyPoints: [
              'Uncategorized balance remediation',
              'Bank & credit card reconciliations',
              'Audit-ready workpaper binder',
            ],
          },
          {
            step: '04',
            number: '04',
            title: 'Monthly Routine',
            shortDescription: 'Stay accurate every month.',
            icon: 'Calendar',
            tagline: 'Predictable closing cadence delivering fresh financials by day 10.',
            keyPoints: [
              'Weekly transaction categorization',
              'Mid-month reconciliation audits',
              'Day 10 partner-reviewed close',
            ],
          },
        ],
      },
    },
    {
      pageId: 'services',
      sectionId: 'services-cta',
      type: 'cta',
      enabled: true,
      order: 4,
      content: {
        eyebrow: 'GET STARTED',
        title: 'Discuss your specific financial requirements.',
        description: 'Our senior CPAs will design a custom scope tailored to your operational rhythm.',
        primaryButton: {
          id: 'serv-cta-primary',
          label: 'Schedule Scoping Session',
          href: '/book-consultation',
          variant: 'primary',
          icon: 'Calendar',
        },
      },
    },
  ],
};
