import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, CalendarCheck, Sparkles } from 'lucide-react';

interface ModernAccountingWorkflowVisualProps {
  className?: string;
}

export const ModernAccountingWorkflowVisual: React.FC<ModernAccountingWorkflowVisualProps> = ({
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full max-w-[540px] mx-auto select-none py-4 px-2 sm:px-4 cursor-pointer group ${className}`}
    >
      {/* Ambient background glow in Teal */}
      <div
        className="absolute inset-0 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #2563EB 0%, transparent 70%)',
        }}
      />

      {/* SVG Financial Backdrop & Character */}
      <div className="relative w-full aspect-[16/12] flex items-center justify-center">
        <svg
          viewBox="0 0 500 380"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
          role="img"
          aria-label="Financial advisor managing organized books, tax compliance, and monthly close"
        >
          <defs>
            <linearGradient id="ctaChartGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#2563EB" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="ctaDeskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#172554" />
              <stop offset="100%" stopColor="#0B1220" />
            </linearGradient>
          </defs>

          {/* Background Financial Chart Line in Teal/Amber */}
          <motion.path
            d="M 20 280 C 120 280, 160 210, 240 230 C 320 250, 360 150, 480 120"
            stroke="url(#ctaChartGrad)"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.6, ease: 'easeInOut' }}
          />

          {/* Subtle Grid Rings */}
          <g stroke="rgba(247, 244, 237, 0.12)" strokeWidth="1">
            <circle cx="250" cy="220" r="140" strokeDasharray="4 6" />
            <circle cx="250" cy="220" r="90" strokeDasharray="4 6" />
          </g>

          {/* 1. Main Desk & Character Group in Deep Navy */}
          <motion.g
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Modern Desk Surface in Warm Ivory with Navy base */}
            <rect x="80" y="270" width="340" height="12" rx="6" fill="#FFFFFF" stroke="#0B1220" strokeWidth="1.5" />
            <rect x="100" y="282" width="300" height="4" rx="2" fill="#0B1220" opacity="0.4" />
            {/* Desk legs */}
            <line x1="120" y1="282" x2="110" y2="360" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
            <line x1="380" y1="282" x2="390" y2="360" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.9" />

            {/* Ergonomic Office Chair */}
            <rect x="220" y="150" width="60" height="90" rx="14" fill="#0B1220" stroke="rgba(15, 118, 110, 0.4)" strokeWidth="1.5" />
            <line x1="250" y1="240" x2="250" y2="330" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
            <line x1="225" y1="330" x2="275" y2="330" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.8" />

            {/* Character: Professional Financial Advisor */}
            <g id="advisor-body">
              {/* Torso & Suit Blazer in Warm Ivory / Light Surface */}
              <path d="M 215 220 Q 250 200 285 220 L 295 285 L 205 285 Z" fill="#FFFFFF" stroke="#0B1220" strokeWidth="1.5" />
              {/* Deep Navy Inner Shirt & Teal Tie */}
              <polygon points="242,208 258,208 253,226 247,226" fill="#172554" />
              <polygon points="248,224 252,224 254,260 250,266 246,260" fill="#2563EB" />

              {/* Neck & Head */}
              <rect x="244" y="192" width="12" height="18" fill="#F4EADB" rx="2" />
              <circle cx="250" cy="180" r="19" fill="#F4EADB" />

              {/* Neat haircut */}
              <path d="M 231 176 C 231 158, 269 156, 269 174 C 265 170, 255 167, 244 169 Z" fill="#0B1220" />

              {/* Minimalist Glasses in Teal */}
              <rect x="238" y="175" width="10" height="7.5" rx="2.5" fill="none" stroke="#2563EB" strokeWidth="1.4" />
              <rect x="252" y="175" width="10" height="7.5" rx="2.5" fill="none" stroke="#2563EB" strokeWidth="1.4" />
              <line x1="248" y1="178" x2="252" y2="178" stroke="#2563EB" strokeWidth="1.4" />

              {/* Blinking eyes */}
              <motion.ellipse
                cx="243"
                cy="178"
                rx="1.3"
                ry="1.3"
                fill="#0B1220"
                animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                transition={{ repeat: Infinity, duration: 4.2, times: [0, 0.45, 0.5, 0.55, 1] }}
              />
              <motion.ellipse
                cx="257"
                cy="178"
                rx="1.3"
                ry="1.3"
                fill="#0B1220"
                animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                transition={{ repeat: Infinity, duration: 4.2, times: [0, 0.45, 0.5, 0.55, 1] }}
              />

              {/* Smile */}
              <path d="M 246 189 Q 250 193 254 189" stroke="#0B1220" strokeWidth="1.3" fill="none" strokeLinecap="round" />

              {/* Arms */}
              <path d="M 215 225 Q 198 250 226 270" fill="none" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" />
              <circle cx="226" cy="270" r="5" fill="#F4EADB" />

              <path d="M 285 225 Q 302 250 274 270" fill="none" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" />
              <circle cx="274" cy="270" r="5" fill="#F4EADB" />
            </g>

            {/* 2. Laptop on Desk in Deep Navy */}
            <motion.g
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            >
              <rect x="215" y="215" width="70" height="48" rx="5" fill="#0B1220" stroke="#FFFFFF" strokeWidth="1.8" />
              <rect x="219" y="219" width="62" height="40" rx="3" fill="#172554" />

              {/* Mini bar chart in Teal & Amber */}
              <motion.rect
                x="225"
                y="245"
                width="6"
                height="10"
                rx="1"
                fill="#2563EB"
                animate={isHovered ? { height: [10, 14, 10] } : { height: 10 }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              <motion.rect
                x="234"
                y="239"
                width="6"
                height="16"
                rx="1"
                fill="#2563EB"
                animate={isHovered ? { height: [16, 12, 16] } : { height: 16 }}
                transition={{ repeat: Infinity, duration: 1.8 }}
              />
              <motion.rect
                x="243"
                y="233"
                width="6"
                height="22"
                rx="1"
                fill="#2563EB"
                animate={isHovered ? { height: [22, 18, 22] } : { height: 22 }}
                transition={{ repeat: Infinity, duration: 1.6 }}
              />
              <motion.rect
                x="252"
                y="227"
                width="6"
                height="28"
                rx="1"
                fill="#2563EB"
                animate={isHovered ? { height: [28, 25, 28] } : { height: 28 }}
                transition={{ repeat: Infinity, duration: 2 }}
              />

              {/* Pulsing Ledger Active Status Light */}
              <motion.circle
                cx="269"
                cy="226"
                r="2.5"
                fill="#2563EB"
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 2.2 }}
              />

              {/* Keyboard base */}
              <polygon points="200,270 300,270 292,274 208,274" fill="#FFFFFF" stroke="#0B1220" strokeWidth="1" />
              <rect x="238" y="271" width="24" height="2" rx="0.5" fill="#0B1220" opacity="0.3" />
            </motion.g>

            {/* Coffee Cup with Teal band */}
            <rect x="135" y="254" width="12" height="16" rx="2" fill="#FFFFFF" stroke="#0B1220" strokeWidth="1" />
            <path d="M 147 258 C 151 258, 151 264, 147 264" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            <rect x="135" y="254" width="12" height="3" fill="#2563EB" />
          </motion.g>

          {/* Interactive Connecting Workflow Line in Teal */}
          <motion.path
            d="M 150 115 C 190 145, 120 185, 140 230 C 160 260, 310 210, 370 240"
            stroke="#2563EB"
            strokeWidth="1.8"
            strokeDasharray="4 4"
            fill="none"
            initial={{ pathLength: 0.15, opacity: 0.2 }}
            animate={
              isHovered
                ? { pathLength: 1, opacity: 0.8 }
                : { pathLength: 0.3, opacity: 0.3 }
            }
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
        </svg>

        {/* 3 & 4. FLOATING STATUS CARD 1: Books Reconciled (Teal Completed) */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.85 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.45, ease: 'easeOut' }}
          animate={{
            y: [0, -3, 0],
            scale: isHovered ? 1.04 : 1,
          }}
          style={{ transition: 'scale 0.3s ease' }}
          className="absolute top-[3%] sm:top-[6%] left-[1%] sm:left-[5%] z-20"
        >
          <div className="flex items-center gap-1.5 sm:gap-3 px-2 sm:px-4 py-1.5 sm:py-3 rounded-xl sm:rounded-2xl bg-white text-[#172554] shadow-xl border-2 border-[#2563EB] transition-colors">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-sm">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.65, ease: 'backOut' }}
              >
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
              </motion.div>
            </div>
            <div>
              <div className="text-[8px] sm:text-[10px] font-extrabold tracking-wider uppercase text-[#2563EB]">
                Books Reconciled
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm font-extrabold text-[#172554] flex items-center gap-1">
                <span>✓ Complete</span>
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 5 & 6. FLOATING STATUS CARD 2: Tax Ready (Teal Completed) */}
        <motion.div
          initial={{ opacity: 0, x: -16, scale: 0.85 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.65, ease: 'easeOut' }}
          animate={{
            y: [0, 4, 0],
            scale: isHovered ? 1.04 : 1,
          }}
          style={{ transition: 'scale 0.3s ease 0.1s' }}
          className="absolute bottom-[6%] sm:bottom-[10%] left-[1%] sm:left-[4%] z-20"
        >
          <div className="flex items-center gap-1.5 sm:gap-3 px-2 sm:px-4 py-1.5 sm:py-3 rounded-xl sm:rounded-2xl bg-white text-[#172554] shadow-xl border-2 border-[#2563EB] transition-colors">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-sm">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.85, ease: 'backOut' }}
              >
                <ShieldCheck className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
              </motion.div>
            </div>
            <div>
              <div className="text-[8px] sm:text-[10px] font-extrabold tracking-wider uppercase text-[#2563EB]">
                Tax Ready
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm font-extrabold text-[#172554] flex items-center gap-1">
                <span>✓ Verified</span>
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#2563EB]" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 7 & 8. FLOATING STATUS CARD 3: Monthly Close (Amber Active Highlight) */}
        <motion.div
          initial={{ opacity: 0, x: 16, scale: 0.85 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.85, ease: 'easeOut' }}
          animate={{
            y: [0, -3.5, 0],
            scale: isHovered ? 1.04 : 1,
          }}
          style={{ transition: 'scale 0.3s ease 0.2s' }}
          className="absolute bottom-[8%] sm:bottom-[14%] right-[1%] sm:right-[4%] z-20"
        >
          <div className="flex items-center gap-1.5 sm:gap-3 px-2 sm:px-4 py-1.5 sm:py-3 rounded-xl sm:rounded-2xl bg-white text-[#172554] shadow-xl border-2 border-[#2563EB] transition-colors">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#2563EB] text-[#172554] flex items-center justify-center shrink-0 shadow-sm">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 1.05, ease: 'backOut' }}
              >
                <CalendarCheck className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#172554]" />
              </motion.div>
            </div>
            <div>
              <div className="text-[8px] sm:text-[10px] font-extrabold tracking-wider uppercase text-[#D49820]">
                Monthly Close
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm font-extrabold text-[#172554] flex items-center gap-1">
                <span>⚡ In Progress</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Micro Control Badge */}
      <div className="text-center sm:text-right mt-1 text-[11px] font-mono font-bold text-[#FFFFFF]/80">
        ✦ Organized · Reviewed · Under Control
      </div>
    </div>
  );
};
