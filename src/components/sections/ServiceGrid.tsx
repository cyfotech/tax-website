import React from 'react';
import { Link } from 'react-router-dom';
import { ServiceGridData } from '../../types/content';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { IconRenderer } from '../common/IconRenderer';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ServiceGridProps {
  data: ServiceGridData;
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({ data }) => {
  const { content } = data;

  return (
    <section className="py-20 md:py-28 bg-[#172554] relative transition-colors text-[#FFFFFF]">
      <Container size="wide">
        {content.viewAllHref ? (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading
              eyebrow={content.eyebrow}
              title={content.title}
              description={content.description}
              align="left"
              isDarkSurface={true}
              className="mb-0 md:mb-0"
            />

            <div className="mt-4 md:mt-0">
              <Link
                to={content.viewAllHref}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB] hover:text-[#FDE68A] transition-colors"
              >
                <span>All Capabilities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
            align="center"
            isDarkSurface={true}
          />
        )}

        {/* 10 Core Service Cards Grid on Deep Navy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 justify-center mx-auto">
          {content.services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (index % 5) * 0.05 }}
            >
              <Link
                to={`/services/${service.slug}`}
                className="group flex flex-col justify-between h-full p-6 rounded-2xl bg-[#172554] hover:bg-[#2563EB] border-2 border-[#1F4164] hover:border-[#2563EB] transition-all duration-200 hover:-translate-y-1 shadow-md relative overflow-hidden"
              >
                {/* Active indicator bar in Teal */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Teal Icon Container */}
                  <div className="w-11 h-11 rounded-xl bg-[#2563EB]/20 text-[#06B6D4] flex items-center justify-center mb-4 transition-transform duration-200 group-hover:-translate-y-0.5 border border-[#2563EB]/30">
                    <IconRenderer name={service.icon} className="w-5 h-5 text-[#06B6D4]" />
                  </div>

                  {/* Title in Warm Ivory */}
                  <h3 className="text-base font-bold text-[#FFFFFF] mb-2 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>

                  {/* Short one-line description */}
                  <p className="text-xs text-[#FFFFFF]/70 leading-relaxed font-medium break-words">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Explore → AMBER micro-highlight */}
                <div className="pt-4 flex items-center justify-between text-xs font-bold text-[#2563EB] group-hover:text-[#FDE68A] transition-colors">
                  <span className="text-[11px] tracking-wide">Explore</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 ml-auto" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
