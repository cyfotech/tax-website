import React from 'react';
import { FinancialMetricsData } from '../../types/financial';
import { useFinancialMetrics } from '../../hooks/useFinancialMetrics';
import { FinancialClarityCard } from './FinancialClarityCard';
import { ComplianceAccuracyCard } from './ComplianceAccuracyCard';
import { MonthlyCloseCard } from './MonthlyCloseCard';
import { CentralMonitorBarChart } from './CentralMonitorBarChart';
import { motion } from 'motion/react';
import { RefreshCw, WifiOff } from 'lucide-react';

interface LiveFinancialVisualProps {
  data?: FinancialMetricsData | null;
  className?: string;
  enableLiveUpdates?: boolean;
}

export const LiveFinancialVisual: React.FC<LiveFinancialVisualProps> = ({
  data: propData,
  className = '',
  enableLiveUpdates = true,
}) => {
  const { data: hookData, loading, error, refresh } = useFinancialMetrics(enableLiveUpdates && !propData);
  const metrics = propData || hookData;

  // 1. Loading State
  if (loading && !metrics) {
    return (
      <div className={`relative w-full max-w-[620px] aspect-video md:aspect-[16/10] mx-auto rounded-3xl bg-white/70 dark:bg-[#172554]/40 border-2 border-[#2563EB]/20 animate-pulse flex items-center justify-center p-8 ${className}`}>
        <div className="flex flex-col items-center gap-3 text-center">
          <RefreshCw className="w-6 h-6 text-[#2563EB] animate-spin" />
          <span className="text-xs font-bold text-[#172554] dark:text-[#FFFFFF] uppercase tracking-wider">
            Connecting Real-Time Financial Ledger...
          </span>
        </div>
      </div>
    );
  }

  // 2. Error / Offline State
  if (error && !metrics) {
    return (
      <div className={`relative w-full max-w-[620px] p-8 rounded-3xl bg-white dark:bg-[#172554] border-2 border-[#2563EB]/25 text-center ${className}`}>
        <WifiOff className="w-8 h-8 text-[#2563EB] mx-auto mb-2" />
        <h4 className="text-base font-bold text-[#172554] dark:text-[#FFFFFF]">Data Temporarily Unavailable</h4>
        <p className="text-xs text-[#475569] dark:text-[#FFFFFF]/60 mt-1 mb-4">
          Financial streams are currently reconnecting.
        </p>
        <button
          onClick={refresh}
          className="px-4 py-2 bg-[#172554] text-[#FFFFFF] text-xs font-bold rounded-xl shadow-sm hover:bg-[#172554] transition-colors"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  if (!metrics) return null;

  return (
    <div className={`relative w-full max-w-[640px] mx-auto select-none ${className}`}>
      {/* Background radial ambient glow in Teal & Navy */}
      <div
        className="absolute inset-0 rounded-3xl opacity-20 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 60% 40%, #2563EB 0%, rgba(247, 244, 237, 0) 70%)',
        }}
      />

      {/* DESKTOP & TABLET COMPOSITION */}
      <div className="hidden sm:block relative w-full aspect-[16/11]">
        {/* Base Studio Desk & Character SVG Illustration Layer */}
        <svg
          viewBox="0 0 600 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full drop-shadow-md z-0"
          role="img"
          aria-label="Professional accountant reviewing interactive live financial dashboard"
        >
          <defs>
            <linearGradient id="liveDeskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#172554" />
              <stop offset="100%" stopColor="#0B1220" />
            </linearGradient>
          </defs>

          {/* Background ambient geometry */}
          <g stroke="rgba(15, 118, 110, 0.15)" strokeWidth="1">
            <circle cx="300" cy="210" r="170" strokeDasharray="6 6" />
            <line x1="30" y1="284" x2="570" y2="284" />
          </g>

          {/* Desk Surface in Deep Navy */}
          <rect x="40" y="276" width="520" height="16" rx="8" fill="url(#liveDeskGrad)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <rect x="60" y="292" width="480" height="6" rx="3" fill="#0B1220" opacity="0.3" />
          {/* Desk legs */}
          <line x1="80" y1="292" x2="70" y2="405" stroke="#172554" strokeWidth="6" strokeLinecap="round" />
          <line x1="520" y1="292" x2="530" y2="405" stroke="#172554" strokeWidth="6" strokeLinecap="round" />

          {/* Sleek Monitor Stand on Desk */}
          <rect x="414" y="254" width="12" height="24" fill="#0B1220" rx="2" />
          <rect x="394" y="274" width="52" height="4" rx="2" fill="#172554" />

          {/* Ergonomic Office Chair behind Character */}
          <path
            d="M 190 165 C 190 145, 250 145, 250 165 L 250 276 C 250 286, 190 286, 190 276 Z"
            fill="#0B1220"
            stroke="rgba(15, 118, 110, 0.3)"
            strokeWidth="1.5"
          />
          <line x1="220" y1="286" x2="220" y2="370" stroke="#172554" strokeWidth="8" strokeLinecap="round" />
          <line x1="185" y1="370" x2="255" y2="370" stroke="#172554" strokeWidth="5" strokeLinecap="round" />

          {/* 2D Minimalist Character */}
          <g id="accountant-body">
            {/* Blazer in Deep Navy */}
            <path d="M 185 242 Q 220 222 255 242 L 265 315 L 175 315 Z" fill="#172554" stroke="#0B1220" strokeWidth="2" />
            {/* Warm Ivory collar & Teal Tie */}
            <polygon points="212,231 228,231 223,251 217,251" fill="#FFFFFF" />
            <polygon points="218,248 222,248 224,288 220,295 216,288" fill="#2563EB" />
            {/* Neck */}
            <rect x="214" y="215" width="12" height="18" fill="#F4EADB" rx="2" />
            {/* Head */}
            <circle cx="220" cy="205" r="18" fill="#F4EADB" />
            {/* Hair */}
            <path d="M 202 201 C 202 185, 238 183, 238 199 C 235 195, 225 193, 215 195 Z" fill="#0B1220" />
            {/* Glasses */}
            <rect x="209" y="201" width="10" height="7" rx="2.5" fill="none" stroke="#2563EB" strokeWidth="1.5" />
            <rect x="221" y="201" width="10" height="7" rx="2.5" fill="none" stroke="#2563EB" strokeWidth="1.5" />
            <line x1="219" y1="204" x2="221" y2="204" stroke="#2563EB" strokeWidth="1.5" />

            {/* Subtle Eye Blink Animation */}
            <motion.ellipse
              cx="214"
              cy="204"
              rx="1.4"
              ry="1.4"
              fill="#0B1220"
              animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
              transition={{ repeat: Infinity, duration: 4.5, times: [0, 0.45, 0.5, 0.55, 1] }}
            />
            <motion.ellipse
              cx="226"
              cy="204"
              rx="1.4"
              ry="1.4"
              fill="#0B1220"
              animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
              transition={{ repeat: Infinity, duration: 4.5, times: [0, 0.45, 0.5, 0.55, 1] }}
            />

            {/* Friendly Smile */}
            <path d="M 216 214 Q 220 218 224 214" stroke="#0B1220" strokeWidth="1.3" fill="none" strokeLinecap="round" />

            {/* Right Arm */}
            <motion.g
              animate={{ rotate: [0, -1.8, 0] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
              style={{ transformOrigin: '190px 248px' }}
            >
              <path d="M 190 248 Q 170 273 195 288" fill="none" stroke="#172554" strokeWidth="12" strokeLinecap="round" />
              <circle cx="196" cy="288" r="5" fill="#F4EADB" />
              {/* Amber Watch Accent */}
              <rect x="193" y="282" width="6" height="3" rx="1" fill="#2563EB" />
            </motion.g>

            {/* Left Arm on desk working towards monitor */}
            <path d="M 250 248 Q 280 273 260 288" fill="none" stroke="#172554" strokeWidth="12" strokeLinecap="round" />
            <circle cx="258" cy="288" r="5" fill="#F4EADB" />
          </g>

          {/* Minimalist desk keyboard */}
          <rect x="238" y="278" width="38" height="4" rx="2" fill="#172554" stroke="rgba(15, 118, 110, 0.4)" strokeWidth="1" />

          {/* Desk ceramic coffee mug with Teal rim */}
          <rect x="290" y="264" width="13" height="15" rx="3" fill="#FFFFFF" stroke="#172554" strokeWidth="1.5" />
          <path d="M 303 267 C 307 267, 307 274, 303 274" fill="none" stroke="#172554" strokeWidth="1.5" />
          <rect x="290" y="264" width="13" height="3" fill="#2563EB" />
        </svg>

        {/* Dynamic Central Monitor Bar Chart */}
        <div className="absolute top-[30%] left-[70%] -translate-x-1/2 w-[36%] max-w-[215px] min-w-[170px] h-[33%] max-h-[142px] min-h-[118px] rounded-2xl bg-white dark:bg-[#172554] border-2 border-[#2563EB] shadow-xl z-10 overflow-hidden p-2 sm:p-2.5">
          <CentralMonitorBarChart performance={metrics.monthlyPerformance} />
        </div>

        {/* Live Card 1 (Top Left): Financial Clarity */}
        <div className="absolute top-[3%] left-[2%] w-[31%] max-w-[190px] min-w-[155px] z-20">
          <FinancialClarityCard data={metrics.financialClarity} />
        </div>

        {/* Live Card 2 (Bottom Left): Compliance Secure */}
        <div className="absolute bottom-[4%] left-[2%] w-[31%] max-w-[190px] min-w-[155px] z-20">
          <ComplianceAccuracyCard data={metrics.compliance} />
        </div>

        {/* Live Card 3 (Top Right): Monthly Close */}
        <div className="absolute top-[3%] right-[2%] w-[30%] max-w-[180px] min-w-[145px] z-20">
          <MonthlyCloseCard data={metrics.monthlyClose} />
        </div>
      </div>

      {/* MOBILE VERTICAL COMPOSITION */}
      <div className="sm:hidden flex flex-col gap-4">
        {/* Central Monitor preview card */}
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#172554] border-2 border-[#2563EB] shadow-xl text-[#172554] dark:text-[#FFFFFF] select-none">
          <CentralMonitorBarChart performance={metrics.monthlyPerformance} isMobileCard />
        </div>

        {/* Financial Clarity Card */}
        <FinancialClarityCard data={metrics.financialClarity} />

        {/* Compliance Accuracy Card */}
        <ComplianceAccuracyCard data={metrics.compliance} />

        {/* Monthly Close Card */}
        <MonthlyCloseCard data={metrics.monthlyClose} />
      </div>

      {/* Micro Live Indicator Footer */}
      <div className="mt-3 flex items-center justify-center sm:justify-end gap-2 text-[11px] font-mono font-semibold text-[#2563EB] dark:text-[#06B6D4]">
        <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-ping" />
        <span>Connected to Live Ledger Sync</span>
      </div>
    </div>
  );
};
