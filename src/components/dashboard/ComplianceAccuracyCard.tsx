import React from 'react';
import { ComplianceData } from '../../types/financial';
import { AnimatedCounter } from './AnimatedCounter';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface ComplianceAccuracyCardProps {
  data: ComplianceData;
  className?: string;
}

export const ComplianceAccuracyCard: React.FC<ComplianceAccuracyCardProps> = ({ data, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16, y: -8 }}
      animate={{ opacity: 1, x: 0, y: [0, 4, 0] }}
      transition={{
        opacity: { duration: 0.6, ease: 'easeOut', delay: 0.1 },
        y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
      }}
      className={`p-2.5 sm:p-3.5 rounded-2xl bg-white dark:bg-[#172554] border-2 border-[#2563EB] shadow-xl text-[#172554] dark:text-[#FFFFFF] select-none ${className}`}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
        <span className="text-[9px] sm:text-[10px] font-extrabold tracking-wider text-[#2563EB] dark:text-[#06B6D4] uppercase">
          Compliance Secure
        </span>
      </div>

      <div className="text-base sm:text-lg font-extrabold text-[#172554] dark:text-white tracking-tight my-0.5 tabular-nums">
        <AnimatedCounter value={data.accuracy} suffix="% ACCURACY" duration={900} />
      </div>

      {/* Dynamic Animated Progress Bar */}
      <div className="w-full bg-[#FFFFFF] dark:bg-[#0B1220] h-1.5 sm:h-2 rounded-full overflow-hidden my-1.5 border border-[#2563EB]/20">
        <motion.div
          className="h-full bg-[#2563EB] rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${Math.min(100, Math.max(0, data.accuracy))}%` }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
      </div>

      <div className="text-[10px] sm:text-[11px] text-[#475569] dark:text-[#FFFFFF]/80 font-semibold truncate mt-0.5">
        {data.reviewStatus}
      </div>
    </motion.div>
  );
};
