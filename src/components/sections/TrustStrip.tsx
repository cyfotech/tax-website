import React from 'react';
import { TrustStripData } from '../../types/content';
import { Container } from '../common/Container';
import { IconRenderer } from '../common/IconRenderer';

interface TrustStripProps {
  data: TrustStripData;
}

export const TrustStrip: React.FC<TrustStripProps> = ({ data }) => {
  const { content } = data;

  return (
    <section className="py-6 border-y border-[#172554]/10 dark:border-white/10 bg-white dark:bg-[#0B1220] transition-colors">
      <Container size="wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 items-center max-w-5xl mx-auto">
          {content.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-[#172554] dark:text-[#FFFFFF] group py-1 min-w-0"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <IconRenderer name={item.icon} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="leading-tight text-left break-words min-w-0">{item.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
