import React from 'react';
import { motion } from 'motion/react';

/**
 * TaxSpecialistIllustration
 * Modern 2D professional character with corporate tax returns in Deep Navy, Teal, Ivory, and Amber.
 */
export const TaxSpecialistIllustration: React.FC = () => {
  return (
    <div className="relative w-full aspect-video md:aspect-[16/10] max-w-[580px] mx-auto select-none">
      <div
        className="absolute inset-0 rounded-3xl opacity-20 blur-2xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 60% 40%, rgba(15, 118, 110, 0.35) 0%, rgba(247, 244, 237, 0) 70%)',
        }}
      />

      <svg
        viewBox="0 0 560 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
        role="img"
        aria-label="Tax specialist preparing and auditing corporate filings"
      >
        <defs>
          <linearGradient id="taxCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <filter id="taxShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#0B1220" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Ambient guidelines */}
        <g stroke="rgba(15, 118, 110, 0.15)" strokeWidth="1">
          <circle cx="280" cy="190" r="160" strokeDasharray="6 6" />
          <line x1="40" y1="290" x2="520" y2="290" />
        </g>

        {/* Central Desk Surface in Deep Navy */}
        <rect x="80" y="275" width="400" height="15" rx="7" fill="#172554" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <rect x="90" y="290" width="380" height="6" rx="3" fill="#0B1220" opacity="0.3" />

        {/* Friendly Tax Advisor Character */}
        <g id="tax-character">
          {/* Blazer in Deep Navy */}
          <path d="M 230 240 Q 280 220 330 240 L 340 310 L 220 310 Z" fill="#172554" stroke="#0B1220" strokeWidth="2" />
          {/* Warm Ivory collar & Teal tie */}
          <polygon points="274,228 286,228 282,246 278,246" fill="#FFFFFF" />
          <polygon points="278,245 282,245 284,285 280,292 276,285" fill="#2563EB" />
          {/* Neck */}
          <rect x="274" y="214" width="12" height="16" fill="#F4EADB" rx="2" />
          {/* Head */}
          <circle cx="280" cy="204" r="17" fill="#F4EADB" />
          {/* Hair */}
          <path d="M 264 200 C 264 185, 296 185, 296 200 C 292 195, 282 192, 272 195 Z" fill="#0B1220" />
          {/* Glasses in Teal */}
          <rect x="270" y="200" width="9" height="7" rx="2" fill="none" stroke="#2563EB" strokeWidth="1.5" />
          <rect x="281" y="200" width="9" height="7" rx="2" fill="none" stroke="#2563EB" strokeWidth="1.5" />
          <line x1="279" y1="203" x2="281" y2="203" stroke="#2563EB" strokeWidth="1.5" />
          {/* Blinking eyes */}
          <motion.ellipse
            cx="274.5"
            cy="203.5"
            rx="1.3"
            ry="1.3"
            fill="#0B1220"
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ repeat: Infinity, duration: 4.8, times: [0, 0.45, 0.5, 0.55, 1] }}
          />
          <motion.ellipse
            cx="285.5"
            cy="203.5"
            rx="1.3"
            ry="1.3"
            fill="#0B1220"
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ repeat: Infinity, duration: 4.8, times: [0, 0.45, 0.5, 0.55, 1] }}
          />
          {/* Arms */}
          <motion.g
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            <path d="M 235 245 Q 215 265 240 280" fill="none" stroke="#172554" strokeWidth="11" strokeLinecap="round" />
            <circle cx="242" cy="280" r="5" fill="#F4EADB" />
          </motion.g>
          <path d="M 325 245 Q 345 265 320 280" fill="none" stroke="#172554" strokeWidth="11" strokeLinecap="round" />
          <circle cx="318" cy="280" r="5" fill="#F4EADB" />
        </g>

        {/* Dynamic Tax Returns Document Stack (Left) */}
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 3.6, ease: 'easeInOut' }}
          filter="url(#taxShadow)"
        >
          <rect x="95" y="145" width="115" height="140" rx="8" fill="#EFF6FF" stroke="rgba(11,31,51,0.15)" strokeWidth="1" transform="rotate(-6 150 215)" />
          <rect x="100" y="140" width="115" height="140" rx="8" fill="#FFFFFF" stroke="rgba(11,31,51,0.2)" strokeWidth="1" transform="rotate(-3 155 210)" />
          <rect x="105" y="135" width="115" height="140" rx="8" fill="url(#taxCardGrad)" stroke="#172554" strokeWidth="1.5" />
          <rect x="115" y="147" width="45" height="6" rx="2" fill="#2563EB" />
          <text x="115" y="168" fill="#172554" fontSize="12" fontWeight="700" fontFamily="JetBrains Mono">
            FORM 1120-S
          </text>
          <text x="115" y="180" fill="#475569" fontSize="8" fontFamily="Plus Jakarta Sans">
            Corporate Tax Return
          </text>
          {/* Form Rows */}
          <line x1="115" y1="192" x2="205" y2="192" stroke="rgba(11,31,51,0.12)" strokeWidth="1.5" />
          <line x1="115" y1="204" x2="205" y2="204" stroke="rgba(11,31,51,0.12)" strokeWidth="1.5" />
          <line x1="115" y1="216" x2="205" y2="216" stroke="rgba(11,31,51,0.12)" strokeWidth="1.5" />
          <line x1="115" y1="228" x2="180" y2="228" stroke="rgba(11,31,51,0.12)" strokeWidth="1.5" />
          {/* Checkmark Stamp on document in Teal */}
          <g transform="translate(170, 235)">
            <circle cx="15" cy="15" r="14" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.5" />
            <motion.path
              d="M 9 15 L 13 19 L 21 11"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
            />
          </g>
        </motion.g>

        {/* Floating Approval Badge (Right Top) in Amber & Teal */}
        <motion.g
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 4.4, ease: 'easeInOut' }}
          filter="url(#taxShadow)"
        >
          <rect x="355" y="90" width="165" height="95" rx="14" fill="url(#taxCardGrad)" stroke="#2563EB" strokeWidth="1.5" />
          <circle cx="380" cy="118" r="12" fill="#2563EB" />
          <path d="M 374 118 L 378 122 L 386 114" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="400" y="115" fill="#172554" fontSize="12" fontWeight="700" fontFamily="Plus Jakarta Sans">
            IRS ACCEPTED
          </text>
          <text x="400" y="128" fill="#2563EB" fontSize="9" fontWeight="700" fontFamily="JetBrains Mono">
            Verified Filing Receipt
          </text>
          <line x1="370" y1="145" x2="495" y2="145" stroke="rgba(11,31,51,0.1)" strokeWidth="1" />
          <text x="370" y="162" fill="#475569" fontSize="9" fontFamily="Plus Jakarta Sans">
            Zero-Penalty Guarantee
          </text>
        </motion.g>
      </svg>
    </div>
  );
};
