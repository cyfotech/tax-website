import React, { useMemo } from 'react';
import { FinancialClarityData } from '../../types/financial';
import { AnimatedCounter } from './AnimatedCounter';
import { motion } from 'motion/react';

interface FinancialClarityCardProps {
  data: FinancialClarityData;
  className?: string;
}

export const FinancialClarityCard: React.FC<FinancialClarityCardProps> = ({ data, className = '' }) => {
  // Generate SVG path for dynamic trend line
  const { pathD, lastPoint } = useMemo(() => {
    const points = data.trend || [40, 48, 46, 53, 59, 61, 64];
    const width = 120;
    const height = 30;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;

    const coords = points.map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - ((p - min) / range) * (height - 6) - 3;
      return { x, y };
    });

    const d = coords.reduce((acc, pt, i) => {
      return i === 0 ? `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}` : `${acc} L ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
    }, '');

    return { pathD: d, lastPoint: coords[coords.length - 1] };
  }, [data.trend]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -16, y: -8 }}
      animate={{ opacity: 1, x: 0, y: [0, -3, 0] }}
      transition={{
        opacity: { duration: 0.6, ease: 'easeOut' },
        y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
      }}
      className={`p-2.5 sm:p-3.5 rounded-2xl bg-white dark:bg-[#172554] border-2 border-[#2563EB] shadow-xl text-[#172554] dark:text-[#FFFFFF] select-none ${className}`}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
        <span className="text-[9px] sm:text-[10px] font-extrabold tracking-wider text-[#2563EB] dark:text-[#06B6D4] uppercase">
          Financial Clarity
        </span>
      </div>

      <div className="text-base sm:text-xl font-extrabold text-[#172554] dark:text-[#FFFFFF] tracking-tight my-0.5 tabular-nums">
        <AnimatedCounter value={data.amount} prefix="$" duration={1000} />
      </div>

      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-semibold text-[#2563EB] dark:text-[#06B6D4] mt-0.5 mb-1.5">
        <span className="flex items-center gap-1">
          <span className="text-xs">▲</span>
          <span>{data.status}</span>
        </span>
        <span className="text-[9px] font-mono text-[#475569] dark:text-[#FFFFFF]/60 font-normal">Real-Time</span>
      </div>

      {/* Dynamic Animated Teal Line Chart */}
      <div className="pt-1.5 border-t border-[#172554]/10 dark:border-white/10">
        <svg viewBox="0 0 120 32" className="w-full h-5 sm:h-7 overflow-visible" fill="none">
          <motion.path
            d={pathD}
            stroke="#2563EB"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
          {lastPoint && (
            <motion.circle
              cx={lastPoint.x}
              cy={lastPoint.y}
              r="3.5"
              fill="#2563EB"
              stroke="#172554"
              strokeWidth="1.5"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </svg>
      </div>
    </motion.div>
  );
};
