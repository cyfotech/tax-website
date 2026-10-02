import React from 'react';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { SEOHead } from '../components/common/SEOHead';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 md:py-24 bg-[#FFFFFF] dark:bg-[#0B1220] min-h-[calc(100vh-80px)] flex items-center justify-center transition-colors w-full">
      <SEOHead title="404 – Page Not Found" description="The requested page does not exist." />
      <Container size="narrow" className="text-center space-y-6">
        <span
          className="font-mono font-bold text-[#2563EB] dark:text-[#06B6D4] uppercase tracking-widest block text-xs"
        >
          ERROR 404
        </span>
        <h1
          className="font-extrabold text-[#172554] dark:text-[#FFFFFF] tracking-tight break-words text-3xl sm:text-4xl"
          style={{
            lineHeight: 1.08,
            overflowWrap: 'break-word',
          }}
        >
          Page Not Located
        </h1>
        <p
          className="text-[#475569] dark:text-[#FFFFFF]/75 max-w-md mx-auto font-medium break-words text-base"
          style={{
            lineHeight: 1.6,
            overflowWrap: 'break-word',
          }}
        >
          The requested ledger route does not exist or may have been reorganized.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          <Button href="/" variant="primary" className="w-full sm:w-auto min-h-[48px] justify-center">
            Return to Homepage
          </Button>
          <Button href="/services" variant="secondary" className="w-full sm:w-auto min-h-[48px] justify-center">
            Browse Services
          </Button>
        </div>
      </Container>
    </div>
  );
};
