export interface FooterColumn {
  title: string;
  links: Array<{ label: string; href: string }>;
}

export const footerConfig = {
  columns: [
    {
      title: 'Services',
      links: [
        { label: 'Tax Preparation', href: '/services/tax-preparation' },
        { label: 'Corporate Accounting', href: '/services/accounting' },
        { label: 'Bookkeeping & Close', href: '/services/bookkeeping' },
        { label: 'Payroll Operations', href: '/services/payroll' },
        { label: 'Virtual CFO Advisory', href: '/services/virtual-cfo' },
      ],
    },
    {
      title: 'Capabilities',
      links: [
        { label: 'CPA Firm Outsourcing', href: '/services/cpa-outsourcing' },
        { label: 'Accounts Payable & Receivable', href: '/services/ap-ar' },
        { label: 'Financial Reporting', href: '/services/financial-reporting' },
        { label: 'IRS Representation', href: '/services/irs-representation' },
        { label: 'Tax Planning & Advisory', href: '/services/tax-planning' },
      ],
    },
    {
      title: 'Company & Resources',
      links: [
        { label: 'About ApexLedger', href: '/about' },
        { label: 'Tax Resources & Tools', href: '/tax-resources' },
        { label: 'Consultancy Insights', href: '/blog' },
        { label: 'Transparent Pricing', href: '/pricing' },
        { label: 'Book Consultation', href: '/book-consultation' },
      ],
    },
  ] as FooterColumn[],
  disclaimer: 'ApexLedger Advisory LLC is a licensed corporate accounting and tax advisory firm. All client records are protected under 256-bit encryption.',
  copyright: `© ${new Date().getFullYear()} ApexLedger Advisory LLC. All rights reserved.`,
};
