import React from 'react';
import { Link } from 'react-router-dom';
import { CTASectionData } from '../../types/content';
import { Container } from '../common/Container';
import { DynamicMedia } from '../common/DynamicMedia';
import { ModernAccountingWorkflowVisual } from '../illustrations/ModernAccountingWorkflowVisual';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface CTASectionProps {
  data: CTASectionData;
}

export const CTASection: React.FC<CTASectionProps> = ({ data }) => {
  const { content } = data;

  return (
    <section className="py-14 sm:py-20 md:py-28 bg-[#FFFFFF] dark:bg-[#0B1220] relative overflow-hidden transition-colors w-full">
      <Container size="wide">
        <div className="p-5 sm:p-8 md:p-12 lg:p-14 rounded-2xl sm:rounded-3xl bg-[#172554] text-[#FFFFFF] shadow-2xl relative overflow-hidden border border-[#172554] w-full min-w-0">
          {/* Subtle background ambient Teal geometric & financial shapes */}
          <div
            className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full opacity-25 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute -left-16 -top-16 w-80 h-80 rounded-full opacity-15 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)',
            }}
          />

          {/* Desktop: 52-55% Left, 45-48% Right */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-8 w-full relative z-10">
            {/* LEFT CONTENT (53%) */}
            <motion.div
              className="w-full lg:w-[53%] space-y-5 sm:space-y-6 text-center lg:text-left z-10 min-w-0"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {content.eyebrow && (
                <span
                  className="font-bold tracking-widest text-[#2563EB] uppercase text-xs inline-block"
                >
                  {content.eyebrow}
                </span>
              )}

              <h2
                className="font-extrabold tracking-tight text-[#FFFFFF] break-words"
                style={{
                  fontSize: 'clamp(1.75rem, 7vw, 2.25rem)',
                  lineHeight: 1.12,
                  textWrap: 'balance',
                  overflowWrap: 'break-word',
                  wordBreak: 'normal',
                  whiteSpace: 'normal',
                }}
              >
                {content.title || 'Experience accounting built for the modern era.'}
              </h2>

              <p
                className="text-[#FFFFFF]/80 max-w-lg mx-auto lg:mx-0 font-medium break-words text-base"
                style={{
                  lineHeight: 1.6,
                  overflowWrap: 'break-word',
                  wordBreak: 'normal',
                  whiteSpace: 'normal',
                }}
              >
                {content.description}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto">
                {/* Primary CTA: Warm Ivory background with Deep Navy text */}
                <Link
                  to={content.primaryButton.href}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 min-h-[48px] rounded-xl sm:rounded-2xl bg-[#FFFFFF] text-[#172554] font-extrabold text-sm sm:text-base shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 select-none text-center"
                >
                  <Calendar className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12 text-[#2563EB] shrink-0" />
                  <span className="break-words leading-tight">{content.primaryButton.label}</span>
                </Link>

                {/* Secondary CTA: Transparent with light border */}
                {content.secondaryButton && (
                  <Link
                    to={content.secondaryButton.href}
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 min-h-[48px] rounded-xl sm:rounded-2xl border-2 border-white/40 text-[#FFFFFF] font-extrabold text-sm sm:text-base hover:bg-white/10 hover:border-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 select-none text-center"
                  >
                    <span className="break-words leading-tight">{content.secondaryButton.label}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 shrink-0 text-[#2563EB]" />
                  </Link>
                )}
              </div>
            </motion.div>

            {/* RIGHT ILLUSTRATION (47%) */}
            <motion.div
              className="w-full lg:w-[47%] flex items-center justify-center z-10"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
            >
              {content.media && content.media.component !== 'accounting-workflow' && content.media.component !== 'tax-specialist' ? (
                <DynamicMedia media={content.media} className="w-full" />
              ) : (
                <ModernAccountingWorkflowVisual className="w-full" />
              )}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};
