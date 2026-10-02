import React from 'react';
import { MonthlyPerformanceItem } from '../../types/financial';
import { motion } from 'motion/react';

interface CentralMonitorBarChartProps {
  performance: MonthlyPerformanceItem[];
  className?: string;
  isMobileCard?: boolean;
}

export const CentralMonitorBarChart: React.FC<CentralMonitorBarChartProps> = ({
  performance,
  className = '',
  isMobileCard = false,
}) => {
  const maxValue = Math.max(...performance.map((p) => p.value), 100);

  return (
    <div className={`w-full h-full flex flex-col justify-between select-none ${className}`}>
      {/* Monitor Header Mini Ticker */}
      <div className="flex items-center justify-between border-b border-[#172554]/15 dark:border-white/15 pb-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse" />
          <span className="text-xs font-extrabold tracking-wider text-[#172554] dark:text-[#FFFFFF] uppercase">
            Ledger Velocity
          </span>
        </div>
        <span className="text-[10px] font-mono font-bold text-[#2563EB] dark:text-[#06B6D4] bg-[#2563EB]/10 dark:bg-white/10 px-2 py-0.5 rounded-full border border-[#2563EB]/30 dark:border-white/20">
          LIVE
        </span>
      </div>

      {/* Dynamic Animated Teal & Amber Bars */}
      <div className={`flex items-end justify-around gap-2 pt-2 ${isMobileCard ? 'h-24' : 'h-16'}`}>
        {performance.map((item, idx) => {
          const heightPercent = Math.min(100, Math.max(18, (item.value / maxValue) * 100));
          const isLatest = idx === performance.length - 1;

          return (
            <div key={item.month} className="flex flex-col items-center gap-1 flex-1 min-w-0">
              <span
                className={`text-[10px] sm:text-[9px] font-mono font-bold tabular-nums ${
                  isLatest ? 'text-[#2563EB] dark:text-[#2563EB]' : 'text-[#2563EB] dark:text-[#06B6D4]'
                }`}
              >
                {item.value}%
              </span>
              <div
                className={`w-full bg-[#FFFFFF] dark:bg-[#0B1220] rounded-t-md overflow-hidden flex items-end justify-center border-t border-x border-[#172554]/15 dark:border-white/10 ${
                  isMobileCard ? 'h-16' : 'h-10 sm:h-11'
                }`}
              >
                <motion.div
                  className={`w-full rounded-t-md transition-colors ${
                    isLatest
                      ? 'bg-[#2563EB]'
                      : 'bg-[#2563EB] hover:bg-[#1D4ED8]'
                  }`}
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercent}%` }}
                  transition={{ duration: 0.9, delay: idx * 0.1, ease: 'easeOut' }}
                />
              </div>
              <span className="text-[10px] sm:text-[9px] font-bold text-[#172554]/75 dark:text-[#FFFFFF]/80 uppercase truncate">
                {item.month}
              </span>
            </div>
          );
        })}
      </div>

      {isMobileCard && (
        <div className="pt-3 mt-2 border-t border-[#172554]/15 dark:border-white/10 flex items-center justify-between text-xs font-semibold text-[#2563EB] dark:text-[#FFFFFF]">
          <span className="flex items-center gap-1">
            <span className="text-sm">▲</span>
            <span>Monthly Processing Velocity</span>
          </span>
          <span className="font-mono font-bold text-[#2563EB]">Active</span>
        </div>
      )}
    </div>
  );
};
