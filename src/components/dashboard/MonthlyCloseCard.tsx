import React from 'react';
import { MonthlyCloseData } from '../../types/financial';
import { AnimatedCounter } from './AnimatedCounter';
import { Check, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface MonthlyCloseCardProps {
  data: MonthlyCloseData;
  className?: string;
}

export const MonthlyCloseCard: React.FC<MonthlyCloseCardProps> = ({ data, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: [0, -3, 0] }}
      transition={{
        opacity: { duration: 0.6, ease: 'easeOut', delay: 0.2 },
        y: { duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1 },
      }}
      className={`p-2 sm:p-3 rounded-2xl bg-white dark:bg-[#172554] border-2 border-[#2563EB] shadow-xl text-[#172554] dark:text-[#FFFFFF] select-none ${className}`}
    >
      <div className="flex items-center justify-between mb-0.5 sm:mb-1">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
          <span className="text-[9px] sm:text-[10px] font-extrabold tracking-wider text-[#2563EB] dark:text-[#06B6D4] uppercase">
            Fast Monthly Close
          </span>
        </div>
        <span className="flex items-center gap-1 text-[8px] sm:text-[9px] font-bold text-[#2563EB] bg-[#2563EB]/10 px-1.5 py-0.5 rounded-md">
          <Check className="w-2.5 h-2.5" />
          <span>Done</span>
        </span>
      </div>

      <div className="text-base sm:text-lg font-extrabold text-[#172554] dark:text-white tracking-tight my-0.5 tabular-nums">
        <AnimatedCounter value={data.days} decimals={1} suffix=" Days" duration={800} />
      </div>

      <div className="text-[9px] sm:text-[11px] text-[#475569] dark:text-[#FFFFFF]/70 font-semibold truncate">
        {data.status}
      </div>
    </motion.div>
  );
};
