import React from 'react';
import { OutsourcingSectionData } from '../../types/content';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { DynamicMedia } from '../common/DynamicMedia';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';

interface OutsourcingSectionProps {
  data: OutsourcingSectionData;
}

export const OutsourcingSection: React.FC<OutsourcingSectionProps> = ({ data }) => {
  const { content } = data;

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-[#0B1220] relative overflow-hidden transition-colors">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left: Animated professional team illustration */}
          <motion.div
            className="lg:col-span-6 order-2 lg:order-1"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <DynamicMedia media={content.media} />
          </motion.div>

          {/* Right: Copy & Capability Chips */}
          <motion.div
            className="lg:col-span-6 space-y-6 order-1 lg:order-2 text-center lg:text-left"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {content.eyebrow && (
              <span
                className="inline-block font-bold tracking-widest text-[#2563EB] dark:text-[#06B6D4] uppercase text-xs"
              >
                {content.eyebrow}
              </span>
            )}

            <h2
              className="font-extrabold tracking-tight text-[#172554] dark:text-[#FFFFFF] break-words"
              style={{
                fontSize: 'clamp(1.75rem, 7vw, 2.25rem)',
                lineHeight: 1.12,
                textWrap: 'balance',
                overflowWrap: 'break-word',
                wordBreak: 'normal',
                whiteSpace: 'normal',
              }}
            >
              {content.title}
            </h2>

            <p
              className="text-[#475569] dark:text-[#FFFFFF]/80 max-w-lg mx-auto lg:mx-0 font-medium break-words text-base"
              style={{
                lineHeight: 1.6,
                overflowWrap: 'break-word',
                wordBreak: 'normal',
                whiteSpace: 'normal',
              }}
            >
              {content.description}
            </p>

            {/* Compact chips with Teal visual checks */}
            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2">
              {content.chips.map((chip) => (
                <div
                  key={chip}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FFFFFF] dark:bg-[#172554] border border-[#172554]/10 dark:border-white/10 text-xs font-bold text-[#172554] dark:text-[#FFFFFF] shadow-xs"
                >
                  <div className="w-4 h-4 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span className="leading-snug break-words">{chip}</span>
                </div>
              ))}
            </div>

            {/* Primary CTA in Deep Navy */}
            <div className="pt-4 flex justify-center lg:justify-start">
              <Button
                href={content.primaryButton.href}
                variant="primary"
                icon={content.primaryButton.icon}
                size="md"
                className="w-full sm:w-auto min-h-[48px] justify-center"
              >
                {content.primaryButton.label}
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
