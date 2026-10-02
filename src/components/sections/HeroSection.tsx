import React from 'react';
import { HeroSectionData } from '../../types/content';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { DynamicMedia } from '../common/DynamicMedia';
import { motion } from 'motion/react';
import { ShieldCheck, Award, Clock } from 'lucide-react';

interface HeroSectionProps {
  data: HeroSectionData;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const { content } = data;

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 md:pt-14 md:pb-20 overflow-hidden bg-[#FFFFFF] dark:bg-[#0B1220] transition-colors w-full">
      {/* Background friendly radial highlight in Teal & Navy */}
      <div
        className="absolute top-0 right-1/4 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #2563EB 0%, rgba(247, 244, 237, 0) 70%)',
        }}
      />

      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center w-full">
          {/* Left Column: Large confident Deep Navy typography & simple actions */}
          <motion.div
            className="lg:col-span-6 space-y-5 sm:space-y-6 text-center lg:text-left min-w-0 w-full"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {content.eyebrow && (
              <span
                className="inline-flex items-center gap-1.5 font-bold tracking-widest text-[#2563EB] dark:text-[#06B6D4] uppercase text-xs"
              >
                <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                <span>{content.eyebrow}</span>
              </span>
            )}

            <h1
              className="font-extrabold tracking-tight text-[#172554] dark:text-[#FFFFFF] leading-[1.08] break-words"
              style={{
                fontSize: 'clamp(2rem, 9vw, 2.75rem)',
                lineHeight: 1.08,
                textWrap: 'balance',
                overflowWrap: 'break-word',
                wordBreak: 'normal',
                whiteSpace: 'normal',
              }}
            >
              {content.title}
            </h1>

            <p
              className="text-[#475569] dark:text-[#FFFFFF]/80 max-w-xl mx-auto lg:mx-0 font-medium leading-[1.6] break-words text-base sm:text-lg"
              style={{
                lineHeight: 1.6,
                overflowWrap: 'break-word',
                wordBreak: 'normal',
                whiteSpace: 'normal',
              }}
            >
              {content.description}
            </p>

            {/* Confident Primary & Secondary CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto">
              {content.primaryButton && (
                <Button
                  href={content.primaryButton.href}
                  variant="primary"
                  icon={content.primaryButton.icon}
                  size="lg"
                  className="w-full sm:w-auto justify-center min-h-[48px]"
                >
                  {content.primaryButton.label}
                </Button>
              )}
              {content.secondaryButton && (
                <Button
                  href={content.secondaryButton.href}
                  variant="secondary"
                  icon={content.secondaryButton.icon}
                  size="lg"
                  className="w-full sm:w-auto justify-center min-h-[48px]"
                >
                  {content.secondaryButton.label}
                </Button>
              )}
            </div>

            {/* Reassuring micro-badges with Teal icons */}
            <div className="pt-3 sm:pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 text-xs text-[#172554]/75 dark:text-[#FFFFFF]/75 font-semibold">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>SOC-2 Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>US Partner Led</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>99.4% Accuracy</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Friendly 2D Professional Fintech Illustration */}
          <motion.div
            className="lg:col-span-6 w-full max-w-[600px] lg:max-w-none mx-auto min-w-0"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <DynamicMedia media={content.media} />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
