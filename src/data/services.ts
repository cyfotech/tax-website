import { ServiceCardItem, ServiceDetail } from '../types/content';

export const allServices: ServiceDetail[] = [
  {
    slug: 'tax-preparation',
    title: 'Tax Preparation',
    shortDescription: 'Accurate state and federal filings with maximum legitimate savings.',
    fullOverview: 'Complete federal, state, and multi-entity tax filing prepared by senior CPAs with multi-tiered review cycles.',
    keyBenefits: [
      'Zero penalty guarantee with audited filing trail',
      'Multi-state nexus compliance and local return filing',
      'Direct partner review on complex pass-through entities',
    ],
    deliverables: [
      'Form 1040, 1065, 1120, 1120-S filings',
      'Year-round tax projection matrix',
      'Electronic filing confirmation receipt pack',
    ],
    techStack: ['Drake Software', 'UltraTax CS', 'ProConnect', 'SafeSend'],
    turnaroundTime: '5–7 business days',
    category: 'tax',
    relatedServices: ['tax-planning', 'irs-representation', 'bookkeeping'],
  },
  {
    slug: 'accounting',
    title: 'Accounting',
    shortDescription: 'Clean GAAP-compliant general ledger management and reconciliations.',
    fullOverview: 'Full-cycle corporate accounting designed to give leadership spotless financial clarity at every monthly close.',
    keyBenefits: [
      'Timely monthly ledger close within 5 business days',
      'Automated bank and merchant account reconciliations',
      'Audit-ready trial balances and journal documentation',
    ],
    deliverables: [
      'Monthly balance sheet and income statement',
      'Account reconciliation binders',
      'Cash flow activity statements',
    ],
    techStack: ['QuickBooks Online Advanced', 'Xero', 'Sage Intacct', 'NetSuite'],
    turnaroundTime: 'Continuous monthly cycle',
    category: 'core',
    relatedServices: ['bookkeeping', 'financial-reporting', 'virtual-cfo'],
  },
  {
    slug: 'bookkeeping',
    title: 'Bookkeeping',
    shortDescription: 'Daily transaction categorization and real-time ledger updates.',
    fullOverview: 'Systematic daily transaction logging, receipt matching, and merchant ledger classification without messy backlog.',
    keyBenefits: [
      'Daily automated transaction tagging and sync',
      'Receipt and bill attachment for every expense',
      'Seamless coordination with your payroll provider',
    ],
    deliverables: [
      'Reconciled general ledger in cloud software',
      'Uncategorized transaction resolution portal',
      'Monthly ledger health scorecard',
    ],
    techStack: ['QuickBooks Online', 'Xero', 'Dext Prepare', 'Hubdoc'],
    turnaroundTime: 'Daily sync & weekly close',
    category: 'core',
    relatedServices: ['accounting', 'payroll', 'ap-ar'],
  },
  {
    slug: 'payroll',
    title: 'Payroll',
    shortDescription: 'Flawless payroll runs, tax withholdings, and filings.',
    fullOverview: 'Automated payroll administration for W-2 salaried employees, hourly teams, and 1099 contractors with strict compliance.',
    keyBenefits: [
      '100% on-time direct deposit execution',
      'State unemployment & federal tax withholding',
      'Automated year-end W-2 and 1099-NEC generation',
    ],
    deliverables: [
      'Bi-weekly payroll run audits',
      'Quarterly Form 941 & annual Form 940 filings',
      'Employee self-service onboarding portal',
    ],
    techStack: ['Gusto', 'Rippling', 'ADP Run', 'QuickBooks Payroll'],
    turnaroundTime: 'Automated schedule',
    category: 'core',
    relatedServices: ['accounting', 'bookkeeping', 'tax-preparation'],
  },
  {
    slug: 'ap-ar',
    title: 'Accounts Payable & Receivable',
    shortDescription: 'Accelerate vendor payments and collect receivables faster.',
    fullOverview: 'End-to-end bill processing, approvals, vendor management, and structured invoicing to safeguard operating working capital.',
    keyBenefits: [
      'Eliminate duplicate invoices and unauthorized payments',
      'Reduce average DSO (Days Sales Outstanding) by 35%',
      'Strict multi-level manager approval workflows',
    ],
    deliverables: [
      'Weekly automated AP run disbursements',
      'Aging receivable reporting with payment reminders',
      'Vendor 1099 collection and verification records',
    ],
    techStack: ['Bill.com', 'Melio', 'Stripe Invoicing', 'Ramp AP'],
    turnaroundTime: '24-hour turnaround on bills',
    category: 'core',
    relatedServices: ['accounting', 'bookkeeping', 'virtual-cfo'],
  },
  {
    slug: 'financial-reporting',
    title: 'Financial Reporting',
    shortDescription: 'Actionable executive board decks and monthly KPI packs.',
    fullOverview: 'Board-level reporting packages transforming raw transactional numbers into crisp visuals, variance analyses, and cash forecasts.',
    keyBenefits: [
      'Clean interactive executive dashboards',
      'Budget vs. actual variance analysis and commentary',
      'Unit economics and gross margin breakdown by channel',
    ],
    deliverables: [
      'Monthly Executive Financial Packet (PDF & Live Dashboard)',
      '13-week rolling cash flow forecast model',
      'Key Performance Indicator (KPI) benchmark dashboard',
    ],
    techStack: ['Fathom', 'Jirav', 'PowerBI', 'Excel Financial Modeling'],
    turnaroundTime: 'By the 7th of every month',
    category: 'advisory',
    relatedServices: ['virtual-cfo', 'accounting', 'tax-planning'],
  },
  {
    slug: 'tax-planning',
    title: 'Tax Planning',
    shortDescription: 'Proactive strategies that slash your annual tax liabilities legally.',
    fullOverview: 'Forward-looking tax planning designed before year-end to deploy deductions, credits, asset depreciation, and optimal entity structuring.',
    keyBenefits: [
      'Average client annual tax reduction of $18,400+',
      'R&D tax credits and Section 179 depreciation mapping',
      'Entity restructuring (LLC to S-Corp / C-Corp)',
    ],
    deliverables: [
      'Custom Multi-Year Tax Optimization Blueprint',
      'Quarterly estimated tax voucher calculations',
      'Entity structure risk and savings review',
    ],
    techStack: ['Corvee Tax Planning', 'Bloomberg Tax', 'TaxPlanner Pro'],
    turnaroundTime: 'Quarterly strategic sprint',
    category: 'tax',
    relatedServices: ['tax-preparation', 'virtual-cfo', 'irs-representation'],
  },
  {
    slug: 'irs-representation',
    title: 'IRS Representation',
    shortDescription: 'Enrolled Agents and CPAs resolving audits and penalty notices.',
    fullOverview: 'Direct representation before the IRS and state taxing authorities, defending audits, resolving notices, and negotiating penalty relief.',
    keyBenefits: [
      'Never speak directly to an IRS revenue officer',
      'Notice analysis and formal response drafting within 48 hours',
      'First-time penalty abatement and offer in compromise expertise',
    ],
    deliverables: [
      'Power of Attorney Form 2848 submission',
      'Audit defense binder and substantiated records',
      'Formal penalty reduction and dispute resolution letters',
    ],
    techStack: ['IRS e-Services', 'Canopy Tax Resolution', 'PitBullTax'],
    turnaroundTime: 'Emergency 24-hr response on notices',
    category: 'tax',
    relatedServices: ['tax-preparation', 'tax-planning'],
  },
  {
    slug: 'virtual-cfo',
    title: 'Virtual CFO',
    shortDescription: 'High-level financial strategy without executive compensation costs.',
    fullOverview: 'Fractional Chief Financial Officer leadership for growing companies navigating fundraising, capital allocation, pricing strategy, and growth.',
    keyBenefits: [
      'C-level guidance at a fraction of full-time executive salary',
      'Investor presentation decks and cap table modeling',
      'Strategic runway management and scenario planning',
    ],
    deliverables: [
      'Weekly leadership sync and financial briefing',
      'Dynamic 3-statement financial model (P&L, Balance, Cash)',
      'Bank and investor compliance reporting packages',
    ],
    techStack: ['Mosaic', 'Causal', 'Fathom', 'Runway Financial'],
    turnaroundTime: 'Ongoing dedicated fractional partner',
    category: 'advisory',
    relatedServices: ['financial-reporting', 'accounting', 'tax-planning'],
  },
  {
    slug: 'cpa-outsourcing',
    title: 'CPA Firm Outsourcing',
    shortDescription: 'White-label staff augmentation for overwhelmed accounting firms.',
    fullOverview: 'Scale your practice during peak tax and busy season with verified senior preparers, reviewers, and CAS bookkeepers working directly in your tools.',
    keyBenefits: [
      'Eliminate hiring bottlenecks and overtime burnout',
      'Standardized workpapers matching your firm templates',
      'US-managed quality assurance with 99.4% first-pass accuracy',
    ],
    deliverables: [
      'Dedicated offshore / nearshore accounting pods',
      'Secure SOC2-compliant remote desktop access',
      'Daily time tracking and workpaper check-in reports',
    ],
    techStack: ['Drake', 'UltraTax', 'CCH Axcess', 'ProSeries', 'QBO'],
    turnaroundTime: 'Immediate deployment in 48 hours',
    category: 'outsourcing',
    relatedServices: ['tax-preparation', 'bookkeeping', 'accounting'],
  },
];

export const serviceCardItems: ServiceCardItem[] = allServices.map((s) => ({
  id: s.slug,
  slug: s.slug,
  title: s.title,
  shortDescription: s.shortDescription,
  icon: getServiceIconName(s.slug),
  category: s.category,
  featured: ['tax-preparation', 'accounting', 'bookkeeping', 'virtual-cfo'].includes(s.slug),
}));

function getServiceIconName(slug: string): string {
  switch (slug) {
    case 'tax-preparation':
      return 'FileText';
    case 'accounting':
      return 'Calculator';
    case 'bookkeeping':
      return 'BookOpen';
    case 'payroll':
      return 'Users';
    case 'ap-ar':
      return 'ArrowLeftRight';
    case 'financial-reporting':
      return 'BarChart3';
    case 'tax-planning':
      return 'TrendingUp';
    case 'irs-representation':
      return 'ShieldCheck';
    case 'virtual-cfo':
      return 'Briefcase';
    case 'cpa-outsourcing':
      return 'Layers';
    default:
      return 'FileCheck';
  }
}

export const initialServices = allServices;
