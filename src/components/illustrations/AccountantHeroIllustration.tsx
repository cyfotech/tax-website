import React from 'react';
import { motion } from 'motion/react';

/**
 * AccountantHeroIllustration
 * Friendly, modern financial 2D character illustration.
 * Multi-color brand system: Deep Navy (#172554), Teal (#2563EB), Warm Ivory (#FFFFFF), Amber (#2563EB).
 */
export const AccountantHeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full aspect-video md:aspect-[16/10] max-w-[620px] mx-auto select-none overflow-visible">
      {/* Background ambient circular glow in Teal */}
      <div
        className="absolute inset-0 rounded-3xl opacity-20 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 60% 40%, rgba(15, 118, 110, 0.4) 0%, rgba(247, 244, 237, 0) 70%)',
        }}
      />

      <svg
        viewBox="0 0 600 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
        role="img"
        aria-label="Professional accountant reviewing friendly financial reports and ledgers"
      >
        <defs>
          <linearGradient id="navyDeskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#172554" />
            <stop offset="100%" stopColor="#0B1220" />
          </linearGradient>
          <linearGradient id="cardBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0B1220" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Soft background architectural lines */}
        <g stroke="rgba(15, 118, 110, 0.15)" strokeWidth="1">
          <circle cx="300" cy="200" r="170" strokeDasharray="6 6" />
          <line x1="40" y1="285" x2="560" y2="285" />
        </g>

        {/* Modern Studio Desk Surface in Deep Navy */}
        <g id="desk-base">
          <rect x="70" y="275" width="460" height="16" rx="8" fill="url(#navyDeskGrad)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <rect x="90" y="291" width="420" height="6" rx="3" fill="#0B1220" opacity="0.3" />
          <line x1="120" y1="291" x2="110" y2="385" stroke="#172554" strokeWidth="6" strokeLinecap="round" />
          <line x1="480" y1="291" x2="490" y2="385" stroke="#172554" strokeWidth="6" strokeLinecap="round" />
        </g>

        {/* Ergonomic Office Chair */}
        <g id="chair">
          <path
            d="M 230 165 C 230 148, 290 148, 290 165 L 290 275 C 290 285, 230 285, 230 275 Z"
            fill="#172554"
            stroke="rgba(15, 118, 110, 0.3)"
            strokeWidth="1.5"
          />
          <line x1="260" y1="285" x2="260" y2="360" stroke="#172554" strokeWidth="8" strokeLinecap="round" />
          <line x1="225" y1="360" x2="295" y2="360" stroke="#172554" strokeWidth="5" strokeLinecap="round" />
        </g>

        {/* Friendly Character */}
        <g id="accountant-character">
          {/* Blazer in Deep Navy */}
          <path
            d="M 225 240 Q 260 220 295 240 L 305 310 L 215 310 Z"
            fill="#172554"
            stroke="#0B1220"
            strokeWidth="2"
          />
          {/* Warm Ivory Collar & Teal Tie */}
          <polygon points="252,228 268,228 263,248 257,248" fill="#FFFFFF" />
          <polygon points="258,245 262,245 264,285 260,292 256,285" fill="#2563EB" />

          {/* Neck */}
          <rect x="254" y="212" width="12" height="18" fill="#F4EADB" rx="2" />

          {/* Head & Hair */}
          <g id="head">
            <circle cx="260" cy="202" r="18" fill="#F4EADB" />
            <path
              d="M 242 198 C 242 182, 278 180, 278 196 C 275 192, 265 190, 255 192 Z"
              fill="#0B1220"
            />
            {/* Glasses in Teal */}
            <rect x="249" y="198" width="10" height="7" rx="2.5" fill="none" stroke="#2563EB" strokeWidth="1.5" />
            <rect x="261" y="198" width="10" height="7" rx="2.5" fill="none" stroke="#2563EB" strokeWidth="1.5" />
            <line x1="259" y1="201" x2="261" y2="201" stroke="#2563EB" strokeWidth="1.5" />

            {/* Subtle Eye Blink Animation */}
            <motion.ellipse
              cx="254"
              cy="201"
              rx="1.4"
              ry="1.4"
              fill="#0B1220"
              animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
              transition={{ repeat: Infinity, duration: 4.5, times: [0, 0.45, 0.5, 0.55, 1] }}
            />
            <motion.ellipse
              cx="266"
              cy="201"
              rx="1.4"
              ry="1.4"
              fill="#0B1220"
              animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
              transition={{ repeat: Infinity, duration: 4.5, times: [0, 0.45, 0.5, 0.55, 1] }}
            />

            {/* Warm Smile */}
            <path d="M 256 211 Q 260 215 264 211" stroke="#0B1220" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          </g>

          {/* Right Arm */}
          <motion.g
            animate={{ rotate: [0, -1.8, 0] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
            style={{ transformOrigin: '230px 245px' }}
          >
            <path d="M 230 245 Q 210 270 235 285" fill="none" stroke="#172554" strokeWidth="12" strokeLinecap="round" />
            <circle cx="236" cy="285" r="5" fill="#F4EADB" />
            {/* Amber watch */}
            <rect x="233" y="280" width="5" height="3" rx="1" fill="#2563EB" />
          </motion.g>

          {/* Left Arm on desk */}
          <path d="M 290 245 Q 315 270 295 285" fill="none" stroke="#172554" strokeWidth="12" strokeLinecap="round" />
          <circle cx="293" cy="285" r="5" fill="#F4EADB" />
        </g>

        {/* Laptop/Monitor on Desk */}
        <g id="laptop">
          <rect x="255" y="258" width="10" height="20" fill="#172554" />
          <rect x="245" y="274" width="30" height="3" rx="1.5" fill="#0B1220" />
          <rect x="180" y="160" width="160" height="100" rx="8" fill="#0B1220" stroke="rgba(247,244,237,0.2)" strokeWidth="1.5" />
          <rect x="184" y="164" width="152" height="92" rx="6" fill="#FFFFFF" />
          <rect x="194" y="174" width="45" height="7" rx="3" fill="#172554" />
          <rect x="194" y="186" width="60" height="4" rx="2" fill="rgba(15,118,110,0.3)" />
          <rect x="194" y="193" width="45" height="4" rx="2" fill="rgba(15,118,110,0.2)" />
          {/* Mini Bar charts in Teal and Amber */}
          <rect x="270" y="210" width="9" height="35" rx="3" fill="rgba(15,118,110,0.3)" />
          <rect x="283" y="195" width="9" height="50" rx="3" fill="rgba(15,118,110,0.6)" />
          <rect x="296" y="180" width="9" height="65" rx="3" fill="#2563EB" />
          <rect x="309" y="170" width="9" height="75" rx="3" fill="#2563EB" />
        </g>

        {/* Floating Card 1 (Left): Financial Growth */}
        <motion.g
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
          filter="url(#subtleShadow)"
        >
          <rect x="45" y="80" width="160" height="110" rx="14" fill="url(#cardBgGrad)" stroke="#2563EB" strokeWidth="1.5" />
          <circle cx="64" cy="98" r="5" fill="#2563EB" />
          <text x="76" y="102" fill="#172554" fontSize="10" fontWeight="700" fontFamily="Plus Jakarta Sans">
            FINANCIAL CLARITY
          </text>
          <text x="60" y="128" fill="#172554" fontSize="20" fontWeight="700" fontFamily="JetBrains Mono">
            +$84,250
          </text>
          <text x="60" y="143" fill="#2563EB" fontSize="9" fontWeight="600" fontFamily="Plus Jakarta Sans">
            ▲ On-Track Reconciled
          </text>
          {/* Animated line drawing in Teal */}
          <path d="M 60 170 L 85 158 L 110 162 L 140 148 L 180 142" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="180" cy="142" r="4" fill="#2563EB" stroke="#172554" strokeWidth="1.5" />
        </motion.g>

        {/* Floating Card 2 (Right Top): Compliance Shield */}
        <motion.g
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.5 }}
          filter="url(#subtleShadow)"
        >
          <rect x="385" y="70" width="165" height="115" rx="14" fill="url(#cardBgGrad)" stroke="#2563EB" strokeWidth="1.5" />
          <path d="M 408 88 L 416 84 L 424 88 L 424 96 C 424 102 416 106 416 106 C 416 106 408 102 408 96 Z" fill="#2563EB" />
          <text x="432" y="98" fill="#172554" fontSize="10" fontWeight="700" fontFamily="Plus Jakarta Sans">
            COMPLIANCE SECURE
          </text>
          <text x="408" y="124" fill="#172554" fontSize="16" fontWeight="700" fontFamily="JetBrains Mono">
            100% ACCURACY
          </text>
          <rect x="408" y="136" width="120" height="6" rx="3" fill="rgba(15,118,110,0.15)" />
          <motion.rect
            x="408"
            y="136"
            height="6"
            rx="3"
            fill="#2563EB"
            animate={{ width: [40, 120, 120] }}
            transition={{ repeat: Infinity, duration: 4, times: [0, 0.7, 1] }}
          />
          <text x="408" y="160" fill="#475569" fontSize="9" fontFamily="Plus Jakarta Sans">
            Multi-Tier CPA Review Complete
          </text>
        </motion.g>

        {/* Floating Card 3 (Right Bottom): Turnaround Time */}
        <motion.g
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 1 }}
          filter="url(#subtleShadow)"
        >
          <rect x="390" y="215" width="155" height="75" rx="12" fill="url(#cardBgGrad)" stroke="#2563EB" strokeWidth="1.5" />
          <text x="405" y="238" fill="#475569" fontSize="9" fontWeight="600" fontFamily="Plus Jakarta Sans">
            FAST MONTHLY CLOSE
          </text>
          <text x="405" y="262" fill="#172554" fontSize="20" fontWeight="700" fontFamily="JetBrains Mono">
            3.2 Days
          </text>
          <text x="485" y="262" fill="#2563EB" fontSize="11" fontWeight="700">
            ✓ Done
          </text>
          <text x="405" y="278" fill="#475569" fontSize="8" fontFamily="Plus Jakarta Sans">
            Seamless software sync
          </text>
        </motion.g>

        {/* Minimal ceramic coffee mug on desk with Teal accent */}
        <rect x="110" y="262" width="12" height="15" rx="3" fill="#FFFFFF" stroke="#172554" strokeWidth="1.5" />
        <path d="M 122 265 C 126 265, 126 272, 122 272" fill="none" stroke="#172554" strokeWidth="1.5" />
        <rect x="110" y="262" width="12" height="3" fill="#2563EB" />
      </svg>
    </div>
  );
};
