import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, Database, Layers } from 'lucide-react';

interface SystemBridgeVisualProps {
  className?: string;
}

export const SystemBridgeVisual: React.FC<SystemBridgeVisualProps> = ({ className = '' }) => {
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
        <div className="flex items-center justify-between border-b border-[#172554]/10 dark:border-white/10 pb-3 mb-3.5 sm:mb-5 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center shadow-sm shrink-0">
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFFFFF]" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#2563EB] dark:text-[#06B6D4] font-bold block truncate">
                Two-Way Data Bridge
              </span>
              <span className="text-[11px] sm:text-xs font-extrabold text-[#172554] dark:text-white truncate block">
                Live Feed Sync
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#2563EB] text-white text-[10px] sm:text-[11px] font-mono font-bold shrink-0">
            <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>CONNECTED</span>
          </div>
        </div>

        {/* Bridge Systems Visual */}
        <div className="relative py-2 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
          {/* System 1: Client Financial Stack */}
          <div className="w-5/12 p-2 sm:p-3.5 rounded-xl bg-[#FFFFFF] dark:bg-[#0B1220] border border-[#172554]/15 text-center flex flex-col items-center min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-[#172554] border border-[#2563EB]/30 flex items-center justify-center text-[#2563EB] mb-1 sm:mb-2 shadow-sm shrink-0">
              <Database className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[11px] sm:text-xs font-extrabold text-[#172554] dark:text-[#FFFFFF] block truncate w-full">
              Client Stack
            </span>
            <span className="text-[9px] sm:text-[10px] text-[#475569] dark:text-[#FFFFFF]/65 font-medium mt-0.5 truncate w-full">
              QBO · Bank Feeds
            </span>
          </div>

          {/* Central Connecting Data Conduit */}
          <div className="flex-1 relative flex flex-col items-center justify-center h-14 sm:h-16 min-w-0 px-1">
            <div className="w-full h-1 bg-[#2563EB]/20 dark:bg-white/10 rounded-full relative overflow-hidden">
              <motion.div
                className="absolute top-0 bottom-0 w-6 sm:w-8 bg-[#2563EB] rounded-full"
                animate={{
                  left: ['-20%', '100%'],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>

            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              className="mt-1.5 sm:mt-2 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white dark:bg-[#172554] border border-[#2563EB]/40 shadow-xs text-[8px] sm:text-[9px] font-mono font-bold text-[#172554] dark:text-[#FFFFFF]"
            >
              <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#2563EB]" />
              <span>TLS 1.3</span>
            </motion.div>
          </div>

          {/* System 2: ApexLedger Platform in Deep Navy */}
          <div className="w-5/12 p-2 sm:p-3.5 rounded-xl bg-[#172554] text-white border border-[#172554] text-center flex flex-col items-center shadow-md min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#FFFFFF] mb-1 sm:mb-2 shadow-sm shrink-0">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#06B6D4]" />
            </div>
            <span className="text-[11px] sm:text-xs font-extrabold text-white block truncate w-full">
              ApexLedger
            </span>
            <span className="text-[9px] sm:text-[10px] text-white/80 font-medium mt-0.5 truncate w-full">
              Audit & Close Hub
            </span>
          </div>
        </div>

        {/* Sync Status Progress */}
        <div className="mt-2.5 sm:mt-3 p-2.5 sm:p-3 rounded-xl bg-[#FFFFFF]/70 dark:bg-[#0B1220]/60 border border-[#172554]/10 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-ping" />
            <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#172554]/80 dark:text-[#FFFFFF]/80">
              Sync rate: 100% clean
            </span>
          </div>
          <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#2563EB] dark:text-[#06B6D4]">
            0 Sync Errors ✓
          </span>
        </div>
      </div>
    </div>
  );
};
