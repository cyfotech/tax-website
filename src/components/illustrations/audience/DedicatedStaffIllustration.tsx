import React from 'react';
import { motion } from 'motion/react';

interface AudienceIllustrationProps {
  isHovered: boolean;
  isActiveMobile?: boolean;
}

export const DedicatedStaffIllustration: React.FC<AudienceIllustrationProps> = ({
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
        aria-label="Dedicated staff extending accounting capacity with remote teamwork"
      >
        <defs>
          <linearGradient id="staffCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <linearGradient id="staffBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#172554" />
            <stop offset="100%" stopColor="#0B1220" />
          </linearGradient>
        </defs>

        {/* Base Studio Floor in Deep Navy */}
        <rect x="20" y="102" width="160" height="6" rx="3" fill="url(#staffBaseGrad)" />

        {/* Dynamic Connection Lines in Teal */}
        <motion.path
          d="M 100 80 Q 70 55 45 45"
          stroke="#2563EB"
          strokeWidth="1.6"
          strokeDasharray="4 3"
          initial={{ pathLength: 0.25 }}
          animate={active ? { pathLength: 1 } : { pathLength: 0.25 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <motion.path
          d="M 100 80 Q 130 55 155 45"
          stroke="#2563EB"
          strokeWidth="1.6"
          strokeDasharray="4 3"
          initial={{ pathLength: 0.25 }}
          animate={active ? { pathLength: 1 } : { pathLength: 0.25 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* Remote Team Member 1 (Top Left Bubble) */}
        <motion.g
          animate={active ? { scale: 1.08, y: -2 } : { scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          transform="translate(30, 24)"
        >
          {/* Circular Pod Window */}
          <circle cx="16" cy="16" r="16" fill="url(#staffCardGrad)" stroke="#172554" strokeWidth="1.2" />
          <path d="M 7 28 C 7 21, 25 21, 25 28 Z" fill="#172554" />
          <circle cx="16" cy="15" r="5" fill="#F4EADB" />
          <path d="M 12 14 C 12 10, 20 10, 20 14 Z" fill="#0B1220" />

          {/* Pulse Node in Amber */}
          <motion.circle
            cx="28"
            cy="7"
            r="2"
            fill="#2563EB"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />

          {/* Received Task Checkmark in Teal */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.35, delay: 0.5 }}
            transform="translate(20, 18)"
          >
            <circle cx="4" cy="4" r="4" fill="#2563EB" />
            <path d="M 2.2 4 L 3.4 5.2 L 5.8 2.8" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>
        </motion.g>

        {/* Remote Team Member 2 (Top Right Bubble) */}
        <motion.g
          animate={active ? { scale: 1.08, y: -2 } : { scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          transform="translate(138, 24)"
        >
          {/* Circular Pod Window */}
          <circle cx="16" cy="16" r="16" fill="url(#staffCardGrad)" stroke="#172554" strokeWidth="1.2" />
          <path d="M 7 28 C 7 21, 25 21, 25 28 Z" fill="#2563EB" />
          <circle cx="16" cy="15" r="5" fill="#F4EADB" />
          <path d="M 12 14 C 12 9, 20 9, 20 14 Z" fill="#0B1220" />

          {/* Pulse Node in Amber */}
          <motion.circle
            cx="4"
            cy="7"
            r="2"
            fill="#2563EB"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ repeat: Infinity, duration: 2.3 }}
          />

          {/* Received Task Checkmark in Teal */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.35, delay: 0.6 }}
            transform="translate(4, 18)"
          >
            <circle cx="4" cy="4" r="4" fill="#2563EB" />
            <path d="M 2.2 4 L 3.4 5.2 L 5.8 2.8" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>
        </motion.g>

        {/* Main Business Lead (Center Foreground) */}
        <g id="main-lead">
          {/* Desk Chair */}
          <rect x="85" y="60" width="30" height="42" rx="5" fill="#172554" opacity="0.9" />
          {/* Torso in Deep Navy */}
          <path d="M 80 82 Q 100 74 120 82 L 123 103 L 77 103 Z" fill="#172554" stroke="#0B1220" strokeWidth="1.2" />
          <polygon points="95,77 105,77 102,86 98,86" fill="#FFFFFF" />
          {/* Teal tie */}
          <polygon points="98,82 102,82 101,92 100,94 99,92" fill="#2563EB" />

          {/* Neck & Head */}
          <rect x="97" y="70" width="6" height="9" fill="#F4EADB" rx="1.5" />
          <circle cx="100" cy="62" r="11" fill="#F4EADB" />
          {/* Hair */}
          <path d="M 91 60 C 91 49, 109 49, 109 60 C 106 55, 99 53, 93 56 Z" fill="#0B1220" />

          {/* Blinking eyes */}
          <motion.ellipse
            cx="97"
            cy="62"
            rx="1"
            ry="1"
            fill="#0B1220"
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ repeat: Infinity, duration: 4, times: [0, 0.45, 0.5, 0.55, 1] }}
          />
          <motion.ellipse
            cx="103"
            cy="62"
            rx="1"
            ry="1"
            fill="#0B1220"
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ repeat: Infinity, duration: 4, times: [0, 0.45, 0.5, 0.55, 1] }}
          />

          {/* Laptop on desk */}
          <rect x="92" y="88" width="28" height="15" rx="2" fill="#0B1220" stroke="#172554" strokeWidth="1" />
          <rect x="94" y="90" width="24" height="11" rx="1.5" fill="#FFFFFF" />
          <line x1="97" y1="95" x2="111" y2="95" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Task Card in White & Teal */}
        <motion.g
          animate={active ? { x: -32, y: -24, scale: 0.95 } : { x: 0, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          transform="translate(86, 42)"
        >
          <rect x="0" y="0" width="28" height="20" rx="3" fill="#FFFFFF" stroke="#172554" strokeWidth="1.2" />
          <rect x="3" y="3.5" width="10" height="2" rx="0.5" fill="#2563EB" />
          <line x1="3" y1="8" x2="25" y2="8" stroke="rgba(11,31,51,0.2)" strokeWidth="1" />
          <line x1="3" y1="12" x2="20" y2="12" stroke="rgba(11,31,51,0.2)" strokeWidth="1" />
          <line x1="3" y1="16" x2="16" y2="16" stroke="rgba(11,31,51,0.2)" strokeWidth="1" />
        </motion.g>
      </svg>
    </div>
  );
};
