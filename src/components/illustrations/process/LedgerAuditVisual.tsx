import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, AlertCircle, FileSearch, Sparkles } from 'lucide-react';

interface LedgerAuditVisualProps {
  className?: string;
}

export const LedgerAuditVisual: React.FC<LedgerAuditVisualProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full max-w-[460px] mx-auto p-1.5 sm:p-4 select-none ${className}`}>
      {/* Ambient background blur in Teal */}
      <div
        className="absolute inset-0 rounded-3xl opacity-20 blur-2xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #2563EB 0%, transparent 70%)',
        }}
      />

      <div className="relative bg-white dark:bg-[#172554] border-2 border-[#172554]/15 dark:border-white/10 rounded-2xl p-3.5 sm:p-5 shadow-lg overflow-hidden">
        {/* Document Header */}
        <div className="flex items-center justify-between border-b border-[#172554]/10 dark:border-white/10 pb-3 mb-3.5 sm:mb-4 gap-2">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center shadow-sm shrink-0">
              <FileSearch className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFFFFF]" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#2563EB] dark:text-[#06B6D4] font-bold block truncate">
                General Ledger Review
              </span>
              <span className="text-[11px] sm:text-xs font-extrabold text-[#172554] dark:text-[#FFFFFF] truncate block">
                Historical Accounts Scan
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#FFFFFF] dark:bg-[#0B1220] text-[10px] sm:text-[11px] font-mono font-bold text-[#2563EB] dark:text-[#06B6D4] shrink-0 border border-[#2563EB]/20">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#2563EB] animate-ping" />
            <span>Scanning</span>
          </div>
        </div>

        {/* Ledger Rows */}
        <div className="space-y-2 sm:space-y-2.5 relative">
          <motion.div
            className="absolute -right-1 z-20 pointer-events-none flex items-center gap-1"
            animate={{
              y: [0, 38, 76, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="p-1 sm:p-1.5 rounded-full bg-[#2563EB] text-[#172554] shadow-md">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
          </motion.div>

          {/* Row 1: Operating Cash Balance */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="p-2 sm:p-2.5 rounded-xl bg-[#FFFFFF]/70 dark:bg-[#0B1220]/60 border border-[#172554]/10 dark:border-white/5 flex items-center justify-between text-[11px] sm:text-xs gap-2"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
              <span className="font-mono text-[#172554]/80 dark:text-[#FFFFFF]/80 font-bold truncate">1010 Cash Reserve</span>
            </div>
            <span className="font-mono font-extrabold text-[#172554] dark:text-white shrink-0">$248,319</span>
          </motion.div>

          {/* Row 2: Retained Earnings with adjustment highlight */}
          <motion.div
            initial={{ borderColor: 'rgba(37, 99, 235, 0.2)', backgroundColor: 'rgba(239, 246, 255, 0.5)' }}
            animate={{
              borderColor: ['rgba(37, 99, 235, 0.2)', '#2563EB', 'rgba(37, 99, 235, 0.2)'],
              backgroundColor: ['rgba(239, 246, 255, 0.5)', 'rgba(37, 99, 235, 0.08)', 'rgba(239, 246, 255, 0.5)'],
            }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="p-2 sm:p-2.5 rounded-xl border-2 flex items-center justify-between text-[11px] sm:text-xs transition-colors gap-2"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="shrink-0"
              >
                <AlertCircle className="w-3.5 h-3.5 text-[#2563EB]" />
              </motion.div>
              <span className="font-mono text-[#172554]/90 dark:text-[#FFFFFF]/90 font-bold truncate">3200 Equity</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[9px] sm:text-[10px] font-mono px-1 sm:px-1.5 py-0.5 rounded bg-[#2563EB]/20 text-[#172554] font-bold">
                Adjusted
              </span>
              <span className="font-mono font-extrabold text-[#172554] dark:text-white">$92,410</span>
            </div>
          </motion.div>

          {/* Row 3: AP Suspense Account */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="p-2 sm:p-2.5 rounded-xl bg-[#FFFFFF]/70 dark:bg-[#0B1220]/60 border border-[#172554]/10 dark:border-white/5 flex items-center justify-between text-[11px] sm:text-xs gap-2"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
              <span className="font-mono text-[#172554]/80 dark:text-[#FFFFFF]/80 font-bold truncate">2000 AP Ledger</span>
            </div>
            <span className="font-mono font-extrabold text-[#172554] dark:text-white shrink-0">$14,290</span>
          </motion.div>
        </div>

        {/* Verification Footer Banner */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-3.5 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#172554]/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] sm:text-xs"
        >
          <div className="flex items-center gap-1.5 font-bold text-[#2563EB] dark:text-[#06B6D4]">
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563EB] shrink-0" />
            <span>0 Audit Blockers</span>
          </div>
          <span className="font-mono text-[10px] sm:text-[11px] text-[#475569] dark:text-[#FFFFFF]/60 font-semibold">
            Status: Ready for Bridge ✓
          </span>
        </motion.div>
      </div>
    </div>
  );
};
