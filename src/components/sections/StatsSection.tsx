import React, { useEffect, useState, useRef } from 'react';
import { StatsSectionData } from '../../types/content';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';

interface StatsSectionProps {
  data: StatsSectionData;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ data }) => {
  const { content } = data;
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const count = content.stats.length;
  const gridColsClass =
    count === 4
      ? 'grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto'
      : count === 3
      ? 'grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto'
      : count <= 2
      ? 'grid-cols-1 min-[420px]:grid-cols-2 max-w-2xl mx-auto'
      : 'grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 max-w-6xl mx-auto';

  return (
    <section ref={sectionRef} className="py-14 sm:py-20 md:py-28 bg-[#172554] border-y border-[#172554] relative transition-colors text-[#FFFFFF]">
      <Container size="wide">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          align="center"
          isDarkSurface={true}
        />

        <div className={`grid ${gridColsClass} gap-4 sm:gap-5 items-stretch justify-center`}>
          {content.stats.map((stat, idx) => {
            // Alternate emphasis: Selected metrics in Amber (#2563EB), others in Warm Ivory (#FFFFFF)
            const isAmber = idx === 1 || stat.value === 99 || stat.suffix === '%';

            return (
              <div
                key={stat.id}
                className="h-full p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#172554] hover:bg-[#2563EB] border-2 border-[#1F4164] hover:border-[#2563EB] flex flex-col items-center justify-between shadow-md min-w-0 transition-all duration-200 text-center"
              >
                <div
                  className={`text-2xl min-[380px]:text-3xl sm:text-4xl font-extrabold font-mono tracking-tight tabular-nums mb-1.5 break-words ${
                    isAmber ? 'text-[#2563EB]' : 'text-[#FFFFFF]'
                  }`}
                >
                  <Counter target={stat.value} trigger={hasAnimated} />
                  <span>{stat.suffix}</span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#FFFFFF] break-words uppercase tracking-wider">
                  {stat.label}
                </span>
                {stat.description && (
                  <span className="text-[11px] text-[#2563EB] dark:text-[#06B6D4] mt-1 font-semibold break-words">
                    {stat.description}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

const Counter: React.FC<{ target: number; trigger: boolean }> = ({ target, trigger }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    const duration = 1400;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(easeProgress * target);
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [trigger, target]);

  return <span>{count.toLocaleString()}</span>;
};
