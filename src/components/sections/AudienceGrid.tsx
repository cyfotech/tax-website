import React from 'react';
import { AudienceGridData } from '../../types/content';
import { Container } from '../common/Container';
import { AudienceCard } from './AudienceCard';
import { SectionHeading } from '../common/SectionHeading';

interface AudienceGridProps {
  data: AudienceGridData;
}

export const AudienceGrid: React.FC<AudienceGridProps> = ({ data }) => {
  const { content } = data;

  return (
    <section className="py-20 md:py-28 bg-[#FFFFFF] dark:bg-[#0B1220] transition-colors overflow-hidden">
      <Container size="wide">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          align="center"
        />

        {/* 4 Interactive Character Animation Audience Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch max-w-7xl mx-auto">
          {content.cards.map((card, idx) => (
            <AudienceCard key={card.id} card={card} index={idx} />
          ))}
        </div>
      </Container>
    </section>
  );
};
