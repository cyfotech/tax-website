import React, { useState } from 'react';
import { VisualBreakData } from '../../types/content';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { ShieldCheck, Award, CheckCircle2 } from 'lucide-react';

interface VisualBreakProps {
  data: VisualBreakData;
}

export const VisualBreak: React.FC<VisualBreakProps> = ({ data }) => {
  const { content } = data;
  const [selectedEntity, setSelectedEntity] = useState<'scorp' | 'llc' | 'ccorp'>('scorp');

  const entityDetails = {
    scorp: {
      title: 'S-Corporation Advisory Protocol',
      tagline: 'Optimal for owner-operated profitable businesses generating over $100k net.',
      highlights: [
        'Proactive officer reasonable compensation benchmarking',
        'Direct pass-through savings on self-employment payroll taxes',
        'Multi-state pass-through entity (PTE) tax credit optimization',
      ],
      complianceCheck: 'Form 1120-S & Schedule K-1 Certified',
    },
    llc: {
      title: 'LLC & Partnership Advisory Protocol',
      tagline: 'Ideal for multi-member ventures, real estate syndicates, and agile professional practices.',
      highlights: [
        'Capital account tracking and special allocation auditing',
        'Multi-state nexus review for distributed consulting teams',
        'Seamless annual election review (disregarded, S-Corp, or partnership)',
      ],
      complianceCheck: 'Form 1065 & Operating Agreement Aligned',
    },
    ccorp: {
      title: 'C-Corporation Advisory Protocol',
      tagline: 'Engineered for venture-backed startups and growth enterprises seeking institutional funding.',
      highlights: [
        'Qualified Small Business Stock (QSBS) Section 1202 documentation',
        'Audit-ready GAAP equity capitalization and stock options accounting',
        'R&D payroll tax credit offset against employer FICA liabilities',
      ],
      complianceCheck: 'Form 1120 & Institutional Due-Diligence Ready',
    },
  };

  const current = entityDetails[selectedEntity];

  return (
    <section className="py-14 sm:py-20 md:py-28 bg-[#172554] text-[#FFFFFF] relative overflow-hidden transition-colors">
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle at 70% 30%, #2563EB 0%, transparent 60%)',
        }}
      />

      <Container size="wide">
        <div className="p-5 sm:p-8 md:p-12 lg:p-16 rounded-2xl sm:rounded-3xl bg-[#0B1220] border-2 border-white/10 shadow-2xl relative w-full max-w-full min-w-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Client Assurance & Protocol Selector */}
            <div className="lg:col-span-7 space-y-6 min-w-0">
              <div>
                <span
                  className="font-bold tracking-widest text-[#2563EB] uppercase block mb-2 text-xs"
                >
                  {content.eyebrow}
                </span>
                <h2
                  className="font-extrabold text-[#FFFFFF] tracking-tight leading-[1.12] break-words text-2xl sm:text-3xl lg:text-4xl"
                >
                  {content.title}
                </h2>
                <p
                  className="text-[#FFFFFF]/80 mt-3 font-medium break-words text-base"
                >
                  {content.description}
                </p>
              </div>

              {/* Entity Structure Selector Tabs */}
              <div className="w-full">
                <span
                  className="block font-bold text-[#FFFFFF]/90 uppercase tracking-wider mb-3 text-xs"
                >
                  Select Your Entity Structure
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full">
                  {(['scorp', 'llc', 'ccorp'] as const).map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setSelectedEntity(type)}
                      className={`py-3.5 px-4 rounded-xl text-sm font-bold transition-all border-2 cursor-pointer min-h-[48px] flex items-center justify-center text-center w-full ${
                        selectedEntity === type
                          ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-md ring-2 ring-[#2563EB]/20'
                          : 'bg-[#172554] border-white/10 text-white/70 hover:border-white/30'
                      }`}
                    >
                      <span className="whitespace-normal leading-tight break-words">
                        {type === 'scorp' ? 'S-Corporation' : type === 'llc' ? 'LLC / Pass-Thru' : 'C-Corporation'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Entity Highlights */}
              <div className="p-4 sm:p-6 rounded-2xl bg-[#172554] border border-white/10 space-y-3 w-full">
                <h4 className="text-sm sm:text-base font-bold text-white break-words">{current.title}</h4>
                <p className="text-xs sm:text-sm text-[#FFFFFF]/80 leading-relaxed break-words">{current.tagline}</p>
                <ul className="space-y-2 pt-2">
                  {current.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#FFFFFF]/90">
                      <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                      <span className="leading-snug break-words">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Confidence Guarantee Card */}
            <div className="lg:col-span-5 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#FFFFFF] text-[#172554] shadow-xl flex flex-col justify-between space-y-6 w-full min-w-0">
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>

                <div>
                  <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider block">
                    {content.metricLabel}
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#172554] tracking-tight mt-1">
                    {content.metricValue}
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-[#475569] font-medium">
                  <div className="flex items-start gap-2.5">
                    <Award className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <span className="leading-snug">Every filing signed by licensed CPA / Enrolled Agent</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Award className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <span className="leading-snug">Multi-tiered workpaper quality verification</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Award className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <span className="leading-snug">Zero penalty guarantee on all timely filings</span>
                  </div>
                </div>
              </div>

              <Button href="/book-consultation" variant="primary" className="w-full justify-center min-h-[48px]">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
