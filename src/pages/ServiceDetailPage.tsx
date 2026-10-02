import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { initialServices } from '../data/services';
import { ServiceDetail } from '../types/content';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { SEOHead } from '../components/common/SEOHead';
import { api } from '../services/api';
import { TaxSpecialistIllustration } from '../components/illustrations/TaxSpecialistIllustration';
import { Check, Clock, Cpu, ArrowLeft } from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadService = async () => {
      try {
        const services = await api.getServices();
        const found = (services && services.length > 0 ? services : initialServices).find((s) => s.slug === slug);
        setService(found || null);
      } catch (e) {
        const fallback = initialServices.find((s) => s.slug === slug);
        setService(fallback || null);
      } finally {
        setLoading(false);
      }
    };
    loadService();
  }, [slug]);

  if (loading) {
    return <div className="py-20 text-center text-[#475569]">Loading capability details...</div>;
  }

  if (!service) {
    return (
      <div className="py-12 sm:py-16 md:py-20 min-h-screen bg-[#FFFFFF] dark:bg-[#0B1220] w-full">
        <Container size="narrow" className="text-center py-12">
          <SectionHeading
            title="Service Not Located"
            description="The requested capability module could not be identified in the active service catalog."
            align="center"
          />
          <div className="pt-4 flex justify-center">
            <Button href="/services" variant="primary">
              Browse All Capabilities
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-14 md:py-20 bg-[#FFFFFF] dark:bg-[#0B1220] min-h-screen transition-colors w-full">
      <SEOHead
        title={`${service.title} – ApexLedger Advisory`}
        description={service.shortDescription}
      />

      <Container size="wide">
        {/* Back Link */}
        <div className="mb-6 sm:mb-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-[#06B6D4] hover:underline transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Services</span>
          </Link>
        </div>

        {/* Hero Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16 pb-12 sm:pb-16 border-b border-[#172554]/10 dark:border-white/10 w-full">
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 min-w-0">
            <span
              className="block font-bold tracking-widest text-[#2563EB] dark:text-[#06B6D4] uppercase text-xs"
            >
              CAPABILITY · {service.category.toUpperCase()}
            </span>

            <h1
              className="font-extrabold tracking-tight text-[#172554] dark:text-[#FFFFFF] break-words text-3xl sm:text-4xl"
              style={{
                lineHeight: 1.08,
                overflowWrap: 'break-word',
              }}
            >
              {service.title}
            </h1>

            <p
              className="text-[#475569] dark:text-[#FFFFFF]/80 max-w-xl font-medium break-words text-base sm:text-lg"
              style={{
                lineHeight: 1.6,
                overflowWrap: 'break-word',
              }}
            >
              {service.fullOverview}
            </p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#475569] dark:text-[#FFFFFF]/60 pt-2 font-semibold">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span className="break-words">Turnaround: {service.turnaroundTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span className="break-words">Cloud Stack Integrated</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <Button href="/book-consultation" variant="primary" size="lg" className="w-full sm:w-auto min-h-[48px] justify-center">
                Schedule Consultation
              </Button>
              <Button href="/pricing" variant="secondary" size="lg" className="w-full sm:w-auto min-h-[48px] justify-center">
                View Pricing Plans
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 w-full min-w-0">
            <TaxSpecialistIllustration />
          </div>
        </div>

        {/* Key Deliverables & Tech Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 w-full">
          {/* Key Deliverables */}
          <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#172554] border-2 border-[#172554]/15 dark:border-white/10 shadow-sm w-full min-w-0">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#172554] dark:text-[#FFFFFF] mb-4 sm:mb-6 break-words">
              Standard Engagement Deliverables
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {service.deliverables.map((item: string) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-[#2563EB] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-[#172554]/80 dark:text-[#FFFFFF]/80 leading-relaxed font-medium break-words">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Strategic Benefits */}
          <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#172554] border-2 border-[#172554]/15 dark:border-white/10 shadow-sm w-full min-w-0">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#172554] dark:text-[#FFFFFF] mb-4 sm:mb-6 break-words">
              Core Strategic Outcomes
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {service.keyBenefits.map((benefit: string) => (
                <li key={benefit} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-[#2563EB] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-[#172554]/80 dark:text-[#FFFFFF]/80 leading-relaxed font-medium break-words">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            {/* Software Environment */}
            <div className="mt-8 pt-6 border-t border-[#172554]/10 dark:border-white/10">
              <span className="text-xs font-bold text-[#2563EB] dark:text-[#06B6D4] uppercase tracking-wider block mb-3">
                Software & Platform Compatibility
              </span>
              <div className="flex flex-wrap gap-2">
                {service.techStack.map((tech: string) => (
                  <span
                    key={tech}
                    className="text-xs font-semibold text-[#2563EB] bg-[#FFFFFF] dark:bg-[#0B1220] px-3.5 py-1.5 rounded-xl border border-[#2563EB]/20 break-words"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Bottom Banner on Deep Navy */}
        <div className="p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-[#172554] text-[#FFFFFF] text-center flex flex-col items-center shadow-xl w-full min-w-0 border border-[#172554]">
          <h3
            className="font-extrabold text-[#FFFFFF] mb-3 break-words text-2xl sm:text-3xl"
            style={{
              lineHeight: 1.12,
              textWrap: 'balance',
            }}
          >
            Deploy {service.title} For Your Organization
          </h3>
          <p
            className="text-[#FFFFFF]/85 max-w-lg mb-6 font-medium break-words text-base"
            style={{
              lineHeight: 1.6,
            }}
          >
            Connect directly with a dedicated CPA lead to establish scope, SLAs, and kickoff timelines.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Button href="/book-consultation" variant="primary" className="w-full sm:w-auto min-h-[48px] justify-center bg-[#FFFFFF] !text-[#172554] hover:!bg-white">
              Book Scoping Call
            </Button>
            <Button href="/contact" variant="secondary" className="w-full sm:w-auto min-h-[48px] justify-center border-white/40 text-[#FFFFFF] hover:bg-white/10 hover:border-white">
              Submit Inquiry
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
