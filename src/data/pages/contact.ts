import { PageData } from '../../types/content';

export const contactPageData: PageData = {
  pageId: 'contact',
  title: 'Contact Us – ApexLedger Advisory',
  seo: {
    title: 'Contact ApexLedger Advisory – Accounting, Tax & Outsourcing',
    description: 'Speak with our senior CPAs and corporate advisory team. We respond within one business day.',
  },
  sections: [
    {
      pageId: 'contact',
      sectionId: 'contact-hero',
      type: 'hero',
      enabled: true,
      order: 1,
      content: {
        eyebrow: 'DIRECT ACCESS',
        title: 'Speak directly with our senior accounting partners.',
        description: 'No junior sales gatekeepers. Direct consultation with licensed professionals.',
        primaryButton: {
          id: 'contact-btn-schedule',
          label: 'Book Live Calendar Time',
          href: '/book-consultation',
          variant: 'primary',
          icon: 'Calendar',
        },
        secondaryButton: {
          id: 'contact-btn-pricing',
          label: 'View Pricing',
          href: '/pricing',
          variant: 'outline',
          icon: 'ArrowRight',
        },
        media: {
          type: 'animated_illustration',
          component: 'outsourcing-team',
          aspectRatio: '16:9',
        },
      },
    },
    {
      pageId: 'contact',
      sectionId: 'contact-trust',
      type: 'trustStrip',
      enabled: true,
      order: 2,
      content: {
        items: [
          { id: 'ct1', icon: 'Clock', label: '24-Hour Business Response' },
          { id: 'ct2', icon: 'Shield', label: 'Non-Disclosure Protected' },
          { id: 'ct3', icon: 'CheckCircle', label: 'Zero Obligation Review' },
          { id: 'ct4', icon: 'Lock', label: 'Encrypted Communication' },
        ],
      },
    },
  ],
};
