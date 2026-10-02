import React from 'react';
import { IndustriesSoftwareData } from '../../types/content';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { IconRenderer } from '../common/IconRenderer';
import { Cpu, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface IndustriesSoftwareSectionProps {
  data: IndustriesSoftwareData;
}

export const IndustriesSoftwareSection: React.FC<IndustriesSoftwareSectionProps> = ({ data }) => {
  const { content } = data;

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-[#0B1220] transition-colors">
      <Container size="wide">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Panel 1: Target Industries */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-[#FFFFFF] dark:bg-[#172554] border-2 border-[#172554]/10 dark:border-white/10 flex flex-col justify-between shadow-sm min-w-0"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#172554] dark:text-[#FFFFFF] tracking-tight break-words">
                  Industry Specializations
                </h3>
              </div>

              <div className="space-y-3">
                {content.industries.map((ind) => (
                  <div
                    key={ind.id}
                    className="flex flex-col min-[380px]:flex-row min-[380px]:items-center justify-between gap-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-[#0B1220] border border-[#172554]/10 dark:border-white/5 hover:border-[#2563EB] transition-colors min-w-0 shadow-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 text-[#2563EB] dark:text-[#06B6D4] flex items-center justify-center shrink-0">
                        <IconRenderer name={ind.icon} className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-[#172554] dark:text-[#FFFFFF] break-words">
                        {ind.name}
                      </span>
                    </div>
                    <span className="text-xs text-[#2563EB] dark:text-[#06B6D4] font-bold shrink-0 self-start min-[380px]:self-auto">
                      Standardized Chart
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 sm:mt-8 text-xs text-[#475569] dark:text-[#FFFFFF]/60 pt-4 border-t border-[#172554]/10 dark:border-white/5 font-medium break-words">
              GAAP compliant chart of accounts customized per vertical.
            </p>
          </motion.div>

          {/* Panel 2: Certified Software Stack */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-[#FFFFFF] dark:bg-[#172554] border-2 border-[#172554]/10 dark:border-white/10 flex flex-col justify-between shadow-sm min-w-0"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-[#172554] text-white flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5 text-[#2563EB]" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#172554] dark:text-[#FFFFFF] tracking-tight break-words">
                  Certified Accounting Stack
                </h3>
              </div>

              <div className="space-y-3">
                {content.software.map((sw) => (
                  <div
                    key={sw.id}
                    className="flex flex-col min-[380px]:flex-row min-[380px]:items-center justify-between gap-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-[#0B1220] border border-[#172554]/10 dark:border-white/5 hover:border-[#2563EB] transition-colors min-w-0 shadow-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#172554] text-[#FFFFFF] flex items-center justify-center font-bold text-xs shrink-0">
                        {sw.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-[#172554] dark:text-[#FFFFFF] break-words">
                        {sw.name}
                      </span>
                    </div>
                    <span className="text-xs text-[#2563EB] dark:text-[#06B6D4] font-bold shrink-0 self-start min-[380px]:self-auto">
                      {sw.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 sm:mt-8 text-xs text-[#475569] dark:text-[#FFFFFF]/60 pt-4 border-t border-[#172554]/10 dark:border-white/5 font-medium break-words">
              Direct cloud API integration with zero manual CSV importing.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
