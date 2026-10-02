/**
 * CMS Content and Architecture Types for ApexLedger Advisory
 * Built for dynamic CMS rendering, zero hardcoded section layouts, and API scalability.
 */

export type MediaType = 'illustration' | 'animated_illustration' | 'image' | 'video';

export interface DynamicMediaConfig {
  type: MediaType;
  component?: string; // Identifier for registered SVG illustration component
  src?: string;
  poster?: string;
  alt?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  aspectRatio?: '16:9' | '4:3' | '1:1' | 'auto';
}

export interface ButtonConfig {
  id: string;
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  icon?: string;
  isExternal?: boolean;
}

export interface SectionBase {
  pageId: string;
  sectionId: string;
  type: string;
  enabled: boolean;
  order: number;
}

export interface HeroSectionData extends SectionBase {
  type: 'hero';
  content: {
    eyebrow?: string;
    title: string;
    description: string;
    primaryButton?: ButtonConfig;
    secondaryButton?: ButtonConfig;
    media: DynamicMediaConfig;
  };
}

export interface TrustStripData extends SectionBase {
  type: 'trustStrip';
  content: {
    items: Array<{
      id: string;
      icon: string;
      label: string;
    }>;
  };
}

export interface AudienceCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  illustrationKey?: string;
}

export interface AudienceGridData extends SectionBase {
  type: 'audienceGrid';
  content: {
    eyebrow?: string;
    title: string;
    description: string;
    cards: AudienceCard[];
  };
}

export interface ServiceCardItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  category: 'core' | 'tax' | 'outsourcing' | 'advisory';
  featured?: boolean;
}

export interface ServiceGridData extends SectionBase {
  type: 'serviceGrid';
  content: {
    eyebrow?: string;
    title: string;
    description: string;
    viewAllHref?: string;
    services: ServiceCardItem[];
  };
}

export interface OutsourcingSectionData extends SectionBase {
  type: 'outsourcing';
  content: {
    eyebrow?: string;
    title: string;
    description: string;
    chips: string[];
    primaryButton: ButtonConfig;
    media: DynamicMediaConfig;
  };
}

export interface ProfessionalRoleCard {
  id: string;
  role: string;
  deliverables: string;
  experienceLevel: string;
  illustrationKey: string;
  availability: string;
}

export interface ProfessionalHiringGridData extends SectionBase {
  type: 'professionals';
  content: {
    eyebrow?: string;
    title: string;
    description: string;
    roles: ProfessionalRoleCard[];
    ctaButton?: ButtonConfig;
  };
}

export interface IndustriesSoftwareData extends SectionBase {
  type: 'industriesSoftware';
  content: {
    eyebrow?: string;
    title: string;
    description: string;
    industries: Array<{ id: string; name: string; icon: string }>;
    software: Array<{ id: string; name: string; tag: string }>;
  };
}

export interface StatItem {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
}

export interface StatsSectionData extends SectionBase {
  type: 'stats';
  content: {
    eyebrow?: string;
    title: string;
    stats: StatItem[];
  };
}

export interface ProcessStep {
  step: string;
  number: string;
  title: string;
  shortDescription: string;
  icon: string;
  tagline?: string;
  keyPoints?: string[];
}

export interface ProcessSectionData extends SectionBase {
  type: 'process';
  content: {
    eyebrow?: string;
    title: string;
    description: string;
    steps: ProcessStep[];
  };
}

export interface VisualBreakData extends SectionBase {
  type: 'visualBreak';
  content: {
    eyebrow?: string;
    title: string;
    description: string;
    metricLabel: string;
    metricValue: string;
    highlightPill?: string;
  };
}

export interface CTASectionData extends SectionBase {
  type: 'cta';
  content: {
    eyebrow?: string;
    title: string;
    description: string;
    primaryButton: ButtonConfig;
    secondaryButton?: ButtonConfig;
    media?: DynamicMediaConfig;
  };
}

export interface PricingPlansSectionData extends SectionBase {
  type: 'pricingPlans';
  content: {
    eyebrow?: string;
    title: string;
    description: string;
  };
}

export type SectionData =
  | HeroSectionData
  | TrustStripData
  | AudienceGridData
  | ServiceGridData
  | OutsourcingSectionData
  | ProfessionalHiringGridData
  | IndustriesSoftwareData
  | StatsSectionData
  | ProcessSectionData
  | VisualBreakData
  | CTASectionData
  | PricingPlansSectionData;

export interface PageData {
  pageId: string;
  title: string;
  seo: {
    title: string;
    description: string;
    keywords?: string[];
    canonical?: string;
  };
  sections: SectionData[];
}

export interface ServiceDetail {
  slug: string;
  title: string;
  shortDescription: string;
  fullOverview: string;
  keyBenefits: string[];
  deliverables: string[];
  techStack: string[];
  turnaroundTime: string;
  category: 'core' | 'tax' | 'outsourcing' | 'advisory';
  relatedServices: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: {
    name: string;
    role: string;
  };
  date: string;
  readTime: string;
  content: Array<{
    heading?: string;
    paragraph: string;
    bullets?: string[];
  }>;
  seo: {
    title: string;
    description: string;
  };
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  shortDescription: string;
  email: string;
  phone: string;
  address: string;
  hours: string;
  socials: Array<{ name: string; href: string; icon: string }>;
}
