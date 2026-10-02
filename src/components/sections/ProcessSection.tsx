import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ProcessSectionData } from '../../types/content';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { IconRenderer } from '../common/IconRenderer';
import { LedgerAuditVisual } from '../illustrations/process/LedgerAuditVisual';
import { SystemBridgeVisual } from '../illustrations/process/SystemBridgeVisual';
import { CatchUpCleanVisual } from '../illustrations/process/CatchUpCleanVisual';
import { MonthlyRoutineVisual } from '../illustrations/process/MonthlyRoutineVisual';
import { Check, ArrowRight, Calendar, Search, Link2, CheckSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProcessSectionProps {
  data: ProcessSectionData;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ data }) => {
  const { content } = data;
  const steps = content.steps;
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Mobile scroll-active progress tracking
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (userInteracted || isHovered) return;

    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % steps.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [userInteracted, isHovered, steps.length]);

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (!isMobile) return;

    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((el, idx) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setMobileActiveIndex((prev) => Math.max(prev, idx));
          }
        },
        { threshold: 0.35, rootMargin: '-10% 0px -20% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [steps.length]);

  const handleStepSelect = (index: number) => {
    setUserInteracted(true);
    setActiveStepIndex(index);
  };

  const currentStep = steps[activeStepIndex] || steps[0];

  const renderStepVisual = (index: number) => {
    switch (index % 4) {
      case 0:
        return <LedgerAuditVisual />;
      case 1:
        return <SystemBridgeVisual />;
      case 2:
        return <CatchUpCleanVisual />;
      case 3:
        return <MonthlyRoutineVisual />;
      default:
        return <LedgerAuditVisual />;
    }
  };

  const getStepIcon = (iconName: string, index: number) => {
    switch (index % 4) {
      case 0:
        return <Search className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 1:
        return <Link2 className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 2:
        return <CheckSquare className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 3:
        return <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />;
      default:
        return <IconRenderer name={iconName} className="w-5 h-5 sm:w-6 sm:h-6" />;
    }
  };

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="py-14 sm:py-20 md:py-24 lg:py-28 bg-[#FFFFFF] dark:bg-[#0B1220] relative overflow-hidden transition-colors"
      style={{
        paddingBlock: 'clamp(56px, 8vw, 120px)',
      }}
    >
      <Container size="wide" className="px-3.5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={content.eyebrow || 'ENGAGEMENT LIFECYCLE'}
          title={content.title || 'How we onboard and scale your engagement.'}
          description={
            content.description ||
            'A structured transition from your existing books to a reliable monthly accounting rhythm.'
          }
          align="center"
        />

        {/* 1. LARGE & STANDARD DESKTOP LAYOUT (1024px AND UP) */}
        <div className="hidden lg:block max-w-6xl mx-auto">
          {/* Timeline Bar & Step Nodes Grid */}
          <div className="relative overflow-x-auto pt-6 pb-4">
            {/* Inactive Base Track: Muted Navy/Gray */}
            <div className="absolute top-[44px] left-[8%] right-[8%] h-1 bg-[#475569]/25 dark:bg-white/15 rounded-full z-0 pointer-events-none" />

            {/* Dynamic Completed Track in Royal Blue */}
            <motion.div
              className="absolute top-[44px] left-[8%] h-1 bg-[#2563EB] rounded-full z-0 pointer-events-none"
              initial={false}
              animate={{
                width: steps.length > 1 ? `${(activeStepIndex / (steps.length - 1)) * 84}%` : '0%',
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Steps Distributed Evenly in a single horizontal row */}
            <div className="grid grid-flow-col auto-cols-fr gap-4 sm:gap-6 relative z-10 min-w-[700px]">
              {steps.map((step, idx) => {
                const isActive = idx === activeStepIndex;
                const isCompleted = idx < activeStepIndex;

                return (
                  <button
                    type="button"
                    key={step.step || idx}
                    onClick={() => handleStepSelect(idx)}
                    className="flex flex-col items-center group cursor-pointer focus-visible:outline-none select-none text-center min-w-0 min-h-[44px]"
                    aria-label={`Step ${step.number || idx + 1}: ${step.title}`}
                  >
                    {/* Node Icon Container: Active Amber, Completed Teal, Upcoming Muted */}
                    <div className="relative mb-3.5">
                      <motion.div
                        animate={{
                          scale: isActive ? 1.08 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`w-14 h-14 xl:w-16 xl:h-16 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 shadow-sm ${
                          isActive
                            ? 'bg-[#2563EB] border-[#2563EB] text-[#172554] shadow-lg shadow-[#2563EB]/25 ring-4 ring-[#2563EB]/20'
                            : isCompleted
                            ? 'bg-[#2563EB] border-[#2563EB] text-white'
                            : 'bg-white dark:bg-[#172554] border-[#172554]/20 dark:border-white/20 text-[#475569] dark:text-white/45 group-hover:border-[#2563EB] group-hover:text-[#2563EB]'
                        }`}
                      >
                        {getStepIcon(step.icon, idx)}
                      </motion.div>

                      {/* Step Number Tag Over Node */}
                      <span
                        className={`absolute -top-2.5 -right-2 px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold tracking-wider border shadow-xs transition-colors z-20 ${
                          isActive
                            ? 'bg-[#172554] text-[#2563EB] border-[#2563EB]'
                            : isCompleted
                            ? 'bg-white text-[#2563EB] border-[#2563EB]'
                            : 'bg-white dark:bg-[#0B1220] text-[#475569] dark:text-white/60 border-[#172554]/20 dark:border-white/20'
                        }`}
                      >
                        {step.number || `0${idx + 1}`}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3
                      className={`text-sm sm:text-base font-extrabold tracking-tight transition-colors line-clamp-2 leading-tight ${
                        isActive
                          ? 'text-[#172554] dark:text-[#2563EB]'
                          : isCompleted
                          ? 'text-[#2563EB] dark:text-[#06B6D4]'
                          : 'text-[#172554]/70 dark:text-[#FFFFFF]/70 group-hover:text-[#2563EB]'
                      }`}
                    >
                      {step.title}
                    </h3>

                    {/* Step Short Label */}
                    <p className="text-xs text-[#475569] dark:text-[#FFFFFF]/65 font-medium mt-1 max-w-[190px] leading-relaxed line-clamp-2">
                      {step.shortDescription}
                    </p>

                    {/* Active Step Indicator Triangle in Amber */}
                    <div className="h-3 flex items-center justify-center mt-1.5">
                      {isActive && (
                        <motion.div
                          layoutId="activeStepTriangleDesktop"
                          className="w-2.5 h-2.5 bg-[#2563EB] rotate-45 rounded-xs"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DETAIL PANEL: Pure White surface */}
          <div className="mt-6 p-8 sm:p-10 xl:p-12 rounded-3xl bg-white dark:bg-[#172554] border-2 border-[#172554]/15 dark:border-white/10 shadow-xl overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStepIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="grid grid-cols-2 gap-8 lg:gap-12 items-center"
              >
                {/* Left Content (50%) */}
                <div className="space-y-5 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-[#2563EB]/15 text-xs font-mono font-extrabold text-[#2563EB] dark:text-[#06B6D4] uppercase tracking-wider">
                      STEP {currentStep.number} OF {steps.length > 9 ? steps.length : `0${steps.length}`}
                    </span>
                    <span className="text-xs font-bold text-[#2563EB] font-mono">
                      ✦ Active Milestone
                    </span>
                  </div>

                  <div>
                    <h4 className="text-2xl sm:text-3xl font-extrabold text-[#172554] dark:text-[#FFFFFF] tracking-tight">
                      {currentStep.title}
                    </h4>
                    <p className="mt-2 text-base text-[#475569] dark:text-[#FFFFFF]/80 font-medium leading-relaxed">
                      {currentStep.tagline || currentStep.shortDescription}
                    </p>
                  </div>

                  {/* Key Supporting Points with Teal Checkmarks */}
                  <div className="pt-1 space-y-2.5">
                    {(
                      currentStep.keyPoints || [
                        'Complete scope analysis and ledger diagnosis',
                        'Direct integration with existing financial tools',
                        'Scheduled sign-off with dedicated CPA lead',
                      ]
                    ).map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-3 text-sm font-semibold text-[#172554] dark:text-[#FFFFFF]">
                        <div className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Link in Deep Navy */}
                  <div className="pt-3 flex items-center gap-4 flex-wrap">
                    <Link
                      to="/book-consultation"
                      className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-[#172554] text-[#FFFFFF] font-extrabold text-sm shadow-md hover:bg-[#172554] transition-all duration-200 hover:-translate-y-0.5 select-none"
                    >
                      <span>Begin With Step 01</span>
                      <ArrowRight className="w-4 h-4 text-[#2563EB]" />
                    </Link>
                    <span className="text-xs font-mono text-[#475569] dark:text-[#FFFFFF]/60 font-medium">
                      Zero disruption guarantee
                    </span>
                  </div>
                </div>

                {/* Right Animated Visual (50%) */}
                <div className="flex items-center justify-center min-w-0">
                  {renderStepVisual(activeStepIndex)}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 2. TABLET COMPACT LAYOUT */}
        <div className="hidden md:block lg:hidden max-w-2xl mx-auto">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {steps.slice(0, 4).map((step, idx) => {
              const isActive = idx === activeStepIndex;
              const isCompleted = idx < activeStepIndex;

              return (
                <button
                  type="button"
                  key={step.step || idx}
                  onClick={() => handleStepSelect(idx)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer min-h-[44px] relative flex flex-col justify-between ${
                    isActive
                      ? 'bg-white dark:bg-[#172554] border-[#2563EB] shadow-md ring-2 ring-[#2563EB]/20'
                      : isCompleted
                      ? 'bg-white/90 dark:bg-[#172554]/90 border-[#2563EB]/40 hover:border-[#2563EB]'
                      : 'bg-white/70 dark:bg-[#172554]/70 border-[#172554]/15 hover:border-[#2563EB]/30'
                  }`}
                  aria-label={`Select Step ${step.number}: ${step.title}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                        isActive
                          ? 'bg-[#2563EB] text-[#172554] border-[#2563EB]'
                          : isCompleted
                          ? 'bg-[#2563EB] text-white border-[#2563EB]'
                          : 'bg-[#FFFFFF] dark:bg-[#0B1220] text-[#475569] dark:text-[#FFFFFF] border-[#172554]/15'
                      }`}
                    >
                      {getStepIcon(step.icon, idx)}
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        isActive
                          ? 'bg-[#172554] text-[#2563EB]'
                          : isCompleted
                          ? 'bg-[#2563EB] text-white'
                          : 'bg-[#172554]/10 text-[#172554] dark:text-[#FFFFFF]'
                      }`}
                    >
                      {step.number || `0${idx + 1}`}
                    </span>
                  </div>

                  <div>
                    <h4
                      className={`text-sm font-extrabold ${
                        isActive
                          ? 'text-[#172554] dark:text-white'
                          : 'text-[#172554] dark:text-[#FFFFFF]'
                      }`}
                    >
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-[#475569] dark:text-[#FFFFFF]/65 line-clamp-1 mt-0.5">
                      {step.shortDescription}
                    </p>
                  </div>

                  {isActive && (
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#2563EB] rotate-45 rounded-xs" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#172554] border-2 border-[#172554]/15 dark:border-white/10 shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStepIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#2563EB]/15 text-xs font-mono font-extrabold text-[#2563EB] dark:text-[#06B6D4] uppercase">
                    STEP {currentStep.number} OF 04
                  </span>
                  <span className="text-xs font-mono font-bold text-[#2563EB]">
                    ✦ Active Milestone
                  </span>
                </div>

                <div>
                  <h4 className="text-xl font-extrabold text-[#172554] dark:text-white">
                    {currentStep.title}
                  </h4>
                  <p className="mt-1 text-sm text-[#475569] dark:text-[#FFFFFF]/80">
                    {currentStep.tagline || currentStep.shortDescription}
                  </p>
                </div>

                <div className="py-1">
                  {renderStepVisual(activeStepIndex)}
                </div>

                <div className="space-y-2 pt-1 border-t border-[#172554]/10 dark:border-white/10">
                  {(currentStep.keyPoints || []).map((point, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs font-semibold text-[#172554] dark:text-[#FFFFFF]">
                      <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 3. MOBILE VERTICAL TIMELINE */}
        <div className="md:hidden relative pl-5 sm:pl-7 ml-2 sm:ml-4 space-y-6 sm:space-y-8">
          <div className="absolute top-4 bottom-8 left-[9px] sm:left-[11px] w-0.5 bg-[#475569]/25 dark:bg-white/15 rounded-full pointer-events-none" />

          <motion.div
            className="absolute top-4 left-[9px] sm:left-[11px] w-0.5 bg-[#2563EB] rounded-full pointer-events-none"
            initial={false}
            animate={{
              height: `${(mobileActiveIndex / (steps.length - 1)) * 90}%`,
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />

          {steps.map((step, idx) => {
            const isPassed = idx <= mobileActiveIndex;

            return (
              <motion.div
                key={step.step || idx}
                ref={(el) => {
                  stepRefs.current[idx] = el;
                }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="relative"
              >
                {/* Node in Teal */}
                <div
                  className={`absolute -left-[27px] sm:-left-[31px] top-3 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-mono font-bold shadow-md ring-4 ring-[#FFFFFF] dark:ring-[#0B1220] transition-colors duration-300 ${
                    isPassed
                      ? 'bg-[#2563EB] text-white shadow-[#2563EB]/30'
                      : 'bg-white dark:bg-[#172554] text-[#475569] dark:text-white/60 border border-[#172554]/20'
                  }`}
                >
                  {step.number || `0${idx + 1}`}
                </div>

                {/* Step Card in White surface */}
                <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#172554] border-2 border-[#172554]/15 dark:border-white/10 shadow-sm space-y-3.5 sm:space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#2563EB] dark:text-[#06B6D4] font-bold block">
                        Phase {step.number || `0${idx + 1}`}
                      </span>
                      <h3 className="text-base sm:text-lg font-extrabold text-[#172554] dark:text-[#FFFFFF] break-words">
                        {step.title}
                      </h3>
                    </div>
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#2563EB]/15 dark:bg-white/10 text-[#2563EB] dark:text-[#FFFFFF] flex items-center justify-center shrink-0">
                      {getStepIcon(step.icon, idx)}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#475569] dark:text-[#FFFFFF]/80 font-medium leading-relaxed">
                    {step.tagline || step.shortDescription}
                  </p>

                  {step.keyPoints && (
                    <div className="space-y-1.5 pt-1">
                      {step.keyPoints.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-xs font-semibold text-[#172554] dark:text-[#FFFFFF]">
                          <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                          <span className="leading-snug">{point}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-2 w-full max-w-full overflow-hidden">
                    {renderStepVisual(idx)}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
