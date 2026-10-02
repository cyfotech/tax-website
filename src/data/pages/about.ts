import { PageData } from '../../types/content';

export const aboutPageData: PageData = {
  pageId: 'about',
  title: 'About Us – ApexLedger Advisory',
  seo: {
    title: 'About Us – ApexLedger Advisory',
    description: 'A modern financial consultancy built by veteran CPAs and technologists for forward-thinking businesses.',
  },
  sections: [
    {
      pageId: 'about',
      sectionId: 'about-hero',
      type: 'hero',
      enabled: true,
      order: 1,
      content: {
        eyebrow: 'WHO WE ARE',
        title: 'Clarity, precision, and partnership in every ledger.',
        description: 'We built ApexLedger to replace legacy accounting headaches with modern financial velocity.',
        primaryButton: {
          id: 'about-consult',
          label: 'Meet Our Leadership',
          href: '/book-consultation',
          variant: 'primary',
          icon: 'Users',
        },
        secondaryButton: {
          id: 'about-services-link',
          label: 'View Services',
          href: '/services',
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
      pageId: 'about',
      sectionId: 'about-stats',
      type: 'stats',
      enabled: true,
      order: 2,
      content: {
        eyebrow: 'PROVEN IMPACT',
        title: 'Built on enduring financial trust.',
        stats: [
          { id: 'as1', value: 15, suffix: '+', label: 'Years Advisory History' },
          { id: 'as2', value: 99, suffix: '%', label: 'Filing Accuracy Rate' },
          { id: 'as3', value: 120, suffix: '+', label: 'Certified Professionals' },
          { id: 'as4', value: 100, suffix: '%', label: 'US-Led QA & Review' },
        ],
      },
    },
    {
      pageId: 'about',
      sectionId: 'about-audience',
      type: 'audienceGrid',
      enabled: true,
      order: 3,
      content: {
        eyebrow: 'OUR PRINCIPLES',
        title: 'Core standards that guide our delivery.',
        description: 'How we guarantee predictable quality across every engagement.',
        cards: [
          {
            id: 'prin-1',
            title: 'Absolute Integrity',
            description: 'Zero ambiguity on tax laws and disclosures.',
            icon: 'Shield',
            href: '/services/tax-preparation',
          },
          {
            id: 'prin-2',
            title: 'Technological Speed',
            description: 'Cloud accounting workflows with automated reconciliation.',
            icon: 'Cpu',
            href: '/services/accounting',
          },
          {
            id: 'prin-3',
            title: 'Senior Oversight',
            description: 'Every statement is verified by a licensed partner.',
            icon: 'CheckCircle',
            href: '/services/cpa-outsourcing',
          },
          {
            id: 'prin-4',
            title: 'Radical Transparency',
            description: 'Flat, predictable pricing with zero billing surprises.',
            icon: 'FileText',
            href: '/pricing',
          },
        ],
      },
    },
    {
      pageId: 'about',
      sectionId: 'about-cta',
      type: 'cta',
      enabled: true,
      order: 4,
      content: {
        eyebrow: 'PARTNER WITH US',
        title: 'Experience accounting built for the modern era.',
        description: 'Connect with a senior advisory partner today for an objective assessment.',
        primaryButton: {
          id: 'about-cta-btn',
          label: 'Book Free Consultation',
          href: '/book-consultation',
          variant: 'primary',
          icon: 'Calendar',
        },
        secondaryButton: {
          id: 'about-cta-pricing',
          label: 'Explore Pricing Plans',
          href: '/pricing',
          variant: 'outline',
          icon: 'ArrowRight',
        },
        media: {
          type: 'animated_illustration',
          component: 'accounting-workflow',
        },
      },
    },
  ],
};
