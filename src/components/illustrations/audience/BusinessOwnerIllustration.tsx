import React from 'react';
import { motion } from 'motion/react';

interface AudienceIllustrationProps {
  isHovered: boolean;
  isActiveMobile?: boolean;
}

export const BusinessOwnerIllustration: React.FC<AudienceIllustrationProps> = ({
  isHovered,
  isActiveMobile = false,
}) => {
  const active = isHovered || isActiveMobile;

  return (
    <div className="relative w-full h-36 flex items-center justify-center select-none overflow-hidden rounded-2xl bg-[#FFFFFF] dark:bg-[#0B1220] border border-[#172554]/10 transition-colors">
      <svg
        viewBox="0 0 200 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[210px]"
        role="img"
        aria-label="Business owner overseeing company accounting and growth"
      >
        <defs>
          <linearGradient id="bizCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <linearGradient id="bizBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#172554" />
            <stop offset="100%" stopColor="#0B1220" />
          </linearGradient>
        </defs>

        {/* Base Studio Floor in Deep Navy */}
        <rect x="20" y="100" width="160" height="6" rx="3" fill="url(#bizBaseGrad)" />

        {/* 1. Office Building Element with Teal & Amber details */}
        <motion.g
          animate={active ? { y: -6 } : { y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          transform="translate(26, 42)"
        >
          {/* Main HQ Building frame */}
          <rect x="0" y="18" width="34" height="42" rx="4" fill="#FFFFFF" stroke="#172554" strokeWidth="1.2" />
          {/* Windows grid in Teal */}
          <rect x="5" y="24" width="6" height="6" rx="1.5" fill="#2563EB" opacity="0.85" />
          <rect x="14" y="24" width="6" height="6" rx="1.5" fill="#2563EB" opacity="0.85" />
          <rect x="23" y="24" width="6" height="6" rx="1.5" fill="#2563EB" opacity="0.85" />
          <rect x="5" y="34" width="6" height="6" rx="1.5" fill="#2563EB" opacity="0.85" />
          <rect x="14" y="34" width="6" height="6" rx="1.5" fill="#2563EB" opacity="0.85" />
          <rect x="23" y="34" width="6" height="6" rx="1.5" fill="#2563EB" opacity="0.85" />
          {/* Entrance door */}
          <rect x="13" y="47" width="8" height="13" rx="1.5" fill="#172554" />

          {/* Roof Spire with Amber pulsing data indicator */}
          <line x1="17" y1="18" x2="17" y2="10" stroke="#172554" strokeWidth="1.2" />
          <motion.circle
            cx="17"
            cy="9"
            r="2.5"
            fill="#2563EB"
            animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </motion.g>

        {/* 2. Business Owner Character */}
        <motion.g
          animate={active ? { y: -2, scale: 1.02 } : { y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ transformOrigin: '95px 95px' }}
        >
          {/* Desk Chair */}
          <rect x="80" y="56" width="30" height="44" rx="5" fill="#172554" opacity="0.9" />

          {/* Torso & Deep Navy Blazer */}
          <path d="M 75 78 Q 95 70 115 78 L 118 101 L 72 101 Z" fill="#172554" stroke="#0B1220" strokeWidth="1.2" />
          <polygon points="90,73 100,73 97,82 93,82" fill="#FFFFFF" />
          {/* Teal Tie */}
          <polygon points="93,80 97,80 96,90 95,92 94,90" fill="#2563EB" />

          {/* Neck & Head */}
          <rect x="92" y="66" width="6" height="9" fill="#F4EADB" rx="1.5" />
          <circle cx="95" cy="58" r="11.5" fill="#F4EADB" />

          {/* Hair */}
          <path d="M 85 55 C 85 44, 105 44, 105 55 C 102 50, 94 48, 88 51 Z" fill="#0B1220" />

          {/* Glasses in Teal */}
          <rect x="89" y="56" width="5.5" height="4.5" rx="1.5" fill="none" stroke="#2563EB" strokeWidth="1" />
          <rect x="96" y="56" width="5.5" height="4.5" rx="1.5" fill="none" stroke="#2563EB" strokeWidth="1" />
          <line x1="94.5" y1="58" x2="96" y2="58" stroke="#2563EB" strokeWidth="1" />

          {/* Blinking Eyes */}
          <motion.ellipse
            cx="92"
            cy="58"
            rx="1"
            ry="1"
            fill="#0B1220"
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ repeat: Infinity, duration: 4.2, times: [0, 0.45, 0.5, 0.55, 1] }}
          />
          <motion.ellipse
            cx="99"
            cy="58"
            rx="1"
            ry="1"
            fill="#0B1220"
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ repeat: Infinity, duration: 4.2, times: [0, 0.45, 0.5, 0.55, 1] }}
          />

          {/* Smile */}
          <path d="M 93 63 Q 95.5 65.5 98 63" stroke="#0B1220" strokeWidth="1.1" fill="none" strokeLinecap="round" />

          {/* Laptop on desk */}
          <rect x="87" y="85" width="28" height="15" rx="2" fill="#0B1220" stroke="#172554" strokeWidth="1" />
          <rect x="89" y="87" width="24" height="11" rx="1.5" fill="#FFFFFF" />
          {/* Mini data line on laptop in Teal */}
          <line x1="92" y1="92" x2="106" y2="92" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
        </motion.g>

        {/* 3. Mini Financial Dashboard */}
        <g id="biz-dashboard" transform="translate(128, 38)">
          <rect x="0" y="0" width="56" height="58" rx="6" fill="url(#bizCardGrad)" stroke="#172554" strokeWidth="1.2" />

          {/* Dashboard Header */}
          <circle cx="8" cy="10" r="2.5" fill="#2563EB" />
          <text x="14" y="12" fill="#172554" fontSize="5" fontWeight="bold" fontFamily="sans-serif">
            GROWTH
          </text>

          {/* Dynamic Counter Display in Amber */}
          <text x="8" y="24" fill="#2563EB" fontSize="9" fontWeight="bold" fontFamily="monospace">
            {active ? '+$240K' : '+$185K'}
          </text>
          <text x="8" y="31" fill="#475569" fontSize="4.5">
            Net Margin ↑ 28%
          </text>

          {/* Revenue Graph in Teal */}
          <motion.path
            d="M 8 48 L 18 44 L 28 46 L 38 39 L 48 35"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0.4 }}
            animate={active ? { pathLength: 1 } : { pathLength: 0.4 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
          <circle cx="48" cy="35" r="2.5" fill="#2563EB" stroke="#172554" strokeWidth="1.5" />

          {/* Verified Checkmark Stamp in Teal */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            transform="translate(42, 5)"
          >
            <circle cx="4" cy="4" r="4" fill="#2563EB" />
            <path d="M 2.2 4 L 3.4 5.2 L 5.8 2.8" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>
        </g>
      </svg>
    </div>
  );
};
