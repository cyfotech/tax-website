import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AudienceCard as AudienceCardData } from '../../types/content';
import { IndividualTaxIllustration } from '../illustrations/audience/IndividualTaxIllustration';
import { BusinessOwnerIllustration } from '../illustrations/audience/BusinessOwnerIllustration';
import { CPAFirmTeamIllustration } from '../illustrations/audience/CPAFirmTeamIllustration';
import { DedicatedStaffIllustration } from '../illustrations/audience/DedicatedStaffIllustration';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface AudienceCardProps {
  card: AudienceCardData;
  index: number;
}

export const AudienceCard: React.FC<AudienceCardProps> = ({ card, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasPlayedMobile, setHasPlayedMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayedMobile) {
          setHasPlayedMobile(true);
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [hasPlayedMobile]);

  const renderIllustration = () => {
    switch (card.illustrationKey || card.id) {
      case 'char-individual':
      case 'aud-individuals':
        return <IndividualTaxIllustration isHovered={isHovered} isActiveMobile={hasPlayedMobile} />;
      case 'char-business':
      case 'aud-businesses':
        return <BusinessOwnerIllustration isHovered={isHovered} isActiveMobile={hasPlayedMobile} />;
      case 'char-cpa':
      case 'aud-cpas':
        return <CPAFirmTeamIllustration isHovered={isHovered} isActiveMobile={hasPlayedMobile} />;
      case 'char-staff':
      case 'aud-staff':
        return <DedicatedStaffIllustration isHovered={isHovered} isActiveMobile={hasPlayedMobile} />;
      default:
        return <IndividualTaxIllustration isHovered={isHovered} isActiveMobile={hasPlayedMobile} />;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="h-full"
    >
      <Link
        to={card.href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group flex flex-col h-full p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#172554] border-2 border-[#172554]/10 dark:border-white/10 hover:border-[#2563EB] transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl relative overflow-hidden select-none"
      >
        {/* Subtle tonal shift on hover */}
        <div className="absolute inset-0 bg-[#2563EB]/[0.02] dark:bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* 1. Top Section: Dedicated Character Animated Illustration */}
        <div className="mb-5 w-full shrink-0">
          {renderIllustration()}
        </div>

        {/* 2. Middle Section: Audience Title & Description */}
        <div className="flex-1 flex flex-col justify-start">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#172554] dark:text-[#FFFFFF] mb-2 group-hover:text-[#2563EB] dark:group-hover:text-[#06B6D4] transition-colors sm:min-h-[3.25rem] flex items-start">
            {card.title}
          </h3>
          <p className="text-sm text-[#475569] dark:text-[#FFFFFF]/75 leading-relaxed font-medium">
            {card.description}
          </p>
        </div>

        {/* 3. Bottom Section: EXPLORE → CTA */}
        <div className="pt-4 mt-6 border-t border-[#172554]/10 dark:border-white/10 flex items-center justify-between text-xs font-bold text-[#172554] dark:text-[#FFFFFF] group-hover:text-[#2563EB] dark:group-hover:text-[#06B6D4] tracking-wider uppercase transition-colors">
          <span>EXPLORE</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 text-[#2563EB] group-hover:text-[#2563EB]" />
        </div>
      </Link>
    </motion.div>
  );
};
