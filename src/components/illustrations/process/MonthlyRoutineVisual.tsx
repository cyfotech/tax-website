import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Calendar, Award, BarChart3 } from 'lucide-react';

interface MonthlyRoutineVisualProps {
  className?: string;
}

export const MonthlyRoutineVisual: React.FC<MonthlyRoutineVisualProps> = ({ className = '' }) => {
  const [activeWeek, setActiveWeek] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWeek((prev) => (prev + 1) % 4);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const weeks = [
    { week: 'W1', title: 'Ingest', desc: 'Categorization & Feeds' },
    { week: 'W2', title: 'Reconcile', desc: 'Bank & Card Audits' },
    { week: 'W3', title: 'QA', desc: 'Senior CPA Review' },
    { week: 'W4', title: 'Close', desc: 'Executive P&L Delivered' },
  ];

  return (
    <div className={`relative w-full max-w-[460px] mx-auto p-1.5 sm:p-4 select-none ${className}`}>
      {/* Background glow in Teal */}
      <div
        className="absolute inset-0 rounded-3xl opacity-20 blur-2xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #2563EB 0%, transparent 70%)',
        }}
      />

      <div className="relative bg-white dark:bg-[#172554] border-2 border-[#172554]/15 dark:border-white/10 rounded-2xl p-3.5 sm:p-5 shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#172554]/10 dark:border-white/10 pb-3 mb-3.5 sm:mb-4 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center shadow-sm shrink-0">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFFFFF]" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#2563EB] dark:text-[#06B6D4] font-bold block truncate">
                Predictable Cadence
              </span>
              <span className="text-[11px] sm:text-xs font-extrabold text-[#172554] dark:text-white truncate block">
                Monthly Accounting Rhythm
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#2563EB] text-white text-[10px] sm:text-[11px] font-mono font-bold shadow-xs shrink-0">
            <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>DAY 10 CLOSE</span>
          </div>
        </div>

        {/* 4-Week Step Cadence Grid */}
        <div className="grid grid-cols-4 gap-1 sm:gap-2 mb-3 sm:mb-4">
          {weeks.map((item, idx) => {
            const isCurrent = idx === activeWeek;
            const isPassed = idx < activeWeek;

            return (
              <motion.div
                key={item.week}
                animate={{
                  scale: isCurrent ? 1.03 : 1,
                  borderColor: isCurrent ? '#2563EB' : isPassed ? '#2563EB' : 'rgba(11, 31, 51, 0.15)',
                }}
                className={`p-1.5 sm:p-2 rounded-xl text-center border-2 transition-all min-w-0 ${
                  isCurrent
                    ? 'bg-[#2563EB] text-[#172554] shadow-md'
                    : isPassed
                    ? 'bg-[#2563EB]/15 text-[#2563EB] dark:text-[#06B6D4]'
                    : 'bg-[#FFFFFF]/70 dark:bg-[#0B1220]/60 text-[#172554]/60 dark:text-[#FFFFFF]/60'
                }`}
              >
                <div
                  className={`text-[9px] sm:text-[10px] font-mono font-bold mb-0.5 sm:mb-1 ${
                    isCurrent ? 'text-[#172554]' : isPassed ? 'text-[#2563EB] dark:text-[#06B6D4]' : 'text-[#475569]'
                  }`}
                >
                  {item.week}
                </div>
                <div className="text-[10px] sm:text-[11px] font-extrabold leading-tight truncate">
                  {item.title}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Active Stage Callout */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-[#FFFFFF]/70 dark:bg-[#0B1220]/60 border border-[#172554]/15 flex items-center justify-between text-[11px] sm:text-xs gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563EB] shrink-0" />
            <span className="font-mono text-[10px] sm:text-[11px] text-[#172554]/80 dark:text-[#FFFFFF]/80 font-bold truncate">
              {weeks[activeWeek].desc}
            </span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[9px] sm:text-[10px] font-bold text-[#2563EB] dark:text-[#FFFFFF] shrink-0">
            <Award className="w-3 h-3 text-[#2563EB]" />
            <span>GAAP</span>
          </div>
        </div>

        {/* Final Stamp */}
        <div className="mt-3.5 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#172554]/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] sm:text-xs">
          <span className="font-mono font-bold text-[#2563EB] dark:text-[#06B6D4] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563EB]" />
            <span>MONTH CLOSED ✓</span>
          </span>
          <span className="font-mono text-[10px] sm:text-[11px] text-[#475569] dark:text-[#FFFFFF]/60 font-semibold">
            Every 30 Days
          </span>
        </div>
      </div>
    </div>
  );
};
