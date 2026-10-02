import React from 'react';
import { PageData, SectionData } from '../types/content';
import { HeroSection } from './sections/HeroSection';
import { TrustStrip } from './sections/TrustStrip';
import { AudienceGrid } from './sections/AudienceGrid';
import { ServiceGrid } from './sections/ServiceGrid';
import { OutsourcingSection } from './sections/OutsourcingSection';
import { ProfessionalHiringGrid } from './sections/ProfessionalHiringGrid';
import { IndustriesSoftwareSection } from './sections/IndustriesSoftwareSection';
import { StatsSection } from './sections/StatsSection';
import { ProcessSection } from './sections/ProcessSection';
import { VisualBreak } from './sections/VisualBreak';
import { CTASection } from './sections/CTASection';
import { PricingPlansSection } from './sections/PricingPlansSection';
import { SEOHead } from './common/SEOHead';
import { EmptyState } from './common/EmptyState';

// Component registry mapping CMS section types to React section components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sectionRegistry: Record<string, React.FC<{ data: any }>> = {
  hero: HeroSection,
  trustStrip: TrustStrip,
  audienceGrid: AudienceGrid,
  serviceGrid: ServiceGrid,
  outsourcing: OutsourcingSection,
  professionals: ProfessionalHiringGrid,
  industriesSoftware: IndustriesSoftwareSection,
  stats: StatsSection,
  process: ProcessSection,
  visualBreak: VisualBreak,
  cta: CTASection,
  pricingPlans: PricingPlansSection,
};

interface PageRendererProps {
  pageData: PageData;
}

export const PageRenderer: React.FC<PageRendererProps> = ({ pageData }) => {
  if (!pageData || !pageData.sections) {
    return (
      <div className="py-24">
        <EmptyState
          title="Page Unavailable"
          description="The requested page structure could not be retrieved from the CMS."
          actionLabel="Return Home"
          actionHref="/"
        />
      </div>
    );
  }

  // Filter only enabled sections and sort strictly by order
  const activeSections = pageData.sections
    .filter((section: SectionData) => section.enabled !== false)
    .sort((a: SectionData, b: SectionData) => a.order - b.order);

  return (
    <div className="w-full min-h-screen bg-[#FFFFFF] dark:bg-[#0B1220] text-[#172554] dark:text-[#FFFFFF] transition-colors">
      <SEOHead
        title={pageData.seo?.title || pageData.title}
        description={pageData.seo?.description || 'ApexLedger Corporate Accounting & Tax Advisory'}
        canonical={pageData.seo?.canonical}
      />

      {activeSections.map((section: SectionData) => {
        const Component = sectionRegistry[section.type];
        if (!Component) {
          console.warn(`[PageRenderer] Unknown section type "${section.type}" for section "${section.sectionId}"`);
          return null;
        }

        return <Component key={section.sectionId} data={section} />;
      })}
    </div>
  );
};
