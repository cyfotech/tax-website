import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, RefreshCw, FileText, Check, AlertTriangle } from 'lucide-react';

interface CatchUpCleanVisualProps {
  className?: string;
}

export const CatchUpCleanVisual: React.FC<CatchUpCleanVisualProps> = ({ className = '' }) => {
  const [isResolved, setIsResolved] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsResolved((prev) => !prev);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

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
              <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFFFFF]" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#2563EB] dark:text-[#06B6D4] font-bold block truncate">
                Cleanup & Discrepancy
              </span>
              <span className="text-[11px] sm:text-xs font-extrabold text-[#172554] dark:text-white truncate block">
                Historical Remediation
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#FFFFFF] dark:bg-[#0B1220] text-[10px] sm:text-[11px] font-mono font-bold text-[#2563EB] dark:text-[#06B6D4] shrink-0 border border-[#2563EB]/20">
            <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#2563EB]" />
            <span>{isResolved ? 'Clean' : 'Remediating'}</span>
          </div>
        </div>

        {/* Stack of Remediation Items */}
        <div className="space-y-2 sm:space-y-2.5">
          {/* Item 1: Uncategorized Transaction */}
          <motion.div
            layout
            className="p-2 sm:p-2.5 rounded-xl bg-[#FFFFFF]/70 dark:bg-[#0B1220]/60 border border-[#172554]/15 flex items-center justify-between text-[11px] sm:text-xs gap-2"
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-[#2563EB]/10 dark:bg-white/10 flex items-center justify-center text-[#2563EB] dark:text-[#FFFFFF] shrink-0">
                <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-mono text-[#172554] dark:text-[#FFFFFF] font-bold block text-[10px] sm:text-[11px] truncate">
                  Unmatched Wire
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#475569] dark:text-[#FFFFFF]/60 font-medium truncate block">
                  {isResolved ? 'Categorized: AWS Cloud' : 'Pending Classification'}
                </span>
              </div>
            </div>
            <AnimatePresence mode="wait">
              {isResolved ? (
                <motion.span
                  key="resolved-1"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="px-1.5 sm:px-2 py-0.5 rounded-md bg-[#2563EB] text-white text-[9px] sm:text-[10px] font-mono font-bold flex items-center gap-1 shrink-0"
                >
                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span>RESOLVED</span>
                </motion.span>
              ) : (
                <motion.span
                  key="pending-1"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="px-1.5 sm:px-2 py-0.5 rounded-md bg-[#2563EB]/20 text-[#172554] text-[9px] sm:text-[10px] font-mono font-bold flex items-center gap-1 shrink-0"
                >
                  <AlertTriangle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#2563EB]" />
                  <span>REVIEW</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Item 2: Duplicate Invoices */}
          <motion.div
            layout
            className="p-2 sm:p-2.5 rounded-xl bg-[#FFFFFF]/70 dark:bg-[#0B1220]/60 border border-[#172554]/15 flex items-center justify-between text-[11px] sm:text-xs gap-2"
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-[#2563EB]/10 dark:bg-white/10 flex items-center justify-center text-[#2563EB] dark:text-[#FFFFFF] shrink-0">
                <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-mono text-[#172554] dark:text-[#FFFFFF] font-bold block text-[10px] sm:text-[11px] truncate">
                  Duplicate AR Entry
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#475569] dark:text-[#FFFFFF]/60 font-medium truncate block">
                  {isResolved ? 'Reconciled' : 'Discrepancy Detected'}
                </span>
              </div>
            </div>
            <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-[#2563EB] text-white text-[9px] sm:text-[10px] font-mono font-bold flex items-center gap-1 shrink-0">
              <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>MATCHED</span>
            </span>
          </motion.div>

          {/* Item 3: Suspense Account Zeroing */}
          <motion.div
            layout
            className="p-2 sm:p-2.5 rounded-xl bg-[#FFFFFF]/70 dark:bg-[#0B1220]/60 border border-[#172554]/15 flex items-center justify-between text-[11px] sm:text-xs gap-2"
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-[#2563EB]/10 dark:bg-white/10 flex items-center justify-center text-[#2563EB] dark:text-[#FFFFFF] shrink-0">
                <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-mono text-[#172554] dark:text-[#FFFFFF] font-bold block text-[10px] sm:text-[11px] truncate">
                  Suspense Account
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#475569] dark:text-[#FFFFFF]/60 font-medium truncate block">
                  Adjusted to $0.00
                </span>
              </div>
            </div>
            <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-[#2563EB] text-white text-[9px] sm:text-[10px] font-mono font-bold flex items-center gap-1 shrink-0">
              <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>ZEROED</span>
            </span>
          </motion.div>
        </div>

        {/* Footer Summary */}
        <div className="mt-3.5 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#172554]/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] sm:text-xs">
          <span className="font-mono font-bold text-[#2563EB] dark:text-[#06B6D4]">
            ✦ Clean Books Delivered
          </span>
          <span className="font-mono text-[10px] sm:text-[11px] text-[#475569] dark:text-[#FFFFFF]/60 font-semibold">
            Audit-Ready Binder ✓
          </span>
        </div>
      </div>
    </div>
  );
};
