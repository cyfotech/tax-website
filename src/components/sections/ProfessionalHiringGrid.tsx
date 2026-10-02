import React from 'react';
import { ProfessionalHiringGridData } from '../../types/content';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { TalentCardIllustration } from '../illustrations/TalentCardIllustration';
import { Button } from '../common/Button';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfessionalHiringGridProps {
  data: ProfessionalHiringGridData;
}

export const ProfessionalHiringGrid: React.FC<ProfessionalHiringGridProps> = ({ data }) => {
  const { content } = data;

  return (
    <section className="py-20 md:py-28 bg-[#172554] relative transition-colors text-[#FFFFFF]">
      <Container size="wide">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          align="center"
          isDarkSurface={true}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {content.roles.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group flex flex-col justify-between p-6 rounded-3xl bg-[#172554] hover:bg-[#2563EB] border-2 border-[#1F4164] hover:border-[#2563EB] transition-all duration-300 hover:-translate-y-1.5 shadow-md hover:shadow-xl"
            >
              <div>
                {/* Character Illustration Avatar */}
                <div className="flex justify-center mb-5">
                  <TalentCardIllustration roleKey={item.illustrationKey} size={76} />
                </div>

                {/* Role Title in Warm Ivory */}
                <h3 className="text-base font-extrabold text-[#FFFFFF] text-center mb-1">
                  {item.role}
                </h3>

                {/* Experience Label in Amber */}
                <p className="text-xs font-bold text-[#2563EB] text-center mb-3">
                  {item.experienceLevel}
                </p>

                {/* Deliverables description */}
                <p className="text-xs text-[#FFFFFF]/75 text-center leading-relaxed font-medium">
                  {item.deliverables}
                </p>
              </div>

              {/* Availability footer in Teal */}
              <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-center gap-1.5 text-[11px] font-bold text-[#06B6D4]">
                <Check className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>{item.availability}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {content.ctaButton && (
          <div className="mt-12 text-center">
            <Button
              href={content.ctaButton.href}
              variant="ivory"
              icon={content.ctaButton.icon}
            >
              {content.ctaButton.label}
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
};
