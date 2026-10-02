import React from 'react';
import { DynamicMediaConfig } from '../../types/content';
import { LiveFinancialVisual } from '../dashboard/LiveFinancialVisual';
import { OutsourcingTeamIllustration } from '../illustrations/OutsourcingTeamIllustration';
import { TaxSpecialistIllustration } from '../illustrations/TaxSpecialistIllustration';
import { ModernAccountingWorkflowVisual } from '../illustrations/ModernAccountingWorkflowVisual';

interface DynamicMediaProps {
  media: DynamicMediaConfig;
  className?: string;
}

export const DynamicMedia: React.FC<DynamicMediaProps> = ({ media, className = '' }) => {
  if (!media) {
    return null;
  }

  // Illustration / Animated Illustration
  if (media.type === 'illustration' || media.type === 'animated_illustration') {
    switch (media.component) {
      case 'accountant-hero':
        return <LiveFinancialVisual className={className} />;
      case 'outsourcing-team':
        return <OutsourcingTeamIllustration />;
      case 'tax-specialist':
        return <TaxSpecialistIllustration />;
      case 'accounting-workflow':
        return <ModernAccountingWorkflowVisual className={className} />;
      default:
        return <LiveFinancialVisual className={className} />;
    }
  }

  // Video
  if (media.type === 'video' && media.src) {
    return (
      <div className={`relative rounded-2xl overflow-hidden border border-white/10 ${className}`}>
        <video
          src={media.src}
          poster={media.poster}
          autoPlay={media.autoplay ?? true}
          muted={media.muted ?? true}
          loop={media.loop ?? true}
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Image with safe fallback
  if (media.type === 'image' && media.src) {
    return (
      <div className={`relative rounded-2xl overflow-hidden border border-white/10 bg-[#0A2131] ${className}`}>
        <img
          src={media.src}
          alt={media.alt || 'ApexLedger Financial'}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Safe fallback container
            const target = e.currentTarget;
            target.style.display = 'none';
          }}
        />
      </div>
    );
  }

  // Fallback to live financial visualization
  return <LiveFinancialVisual className={className} />;
};
