import React from 'react';
import { motion } from 'motion/react';

interface AudienceIllustrationProps {
  isHovered: boolean;
  isActiveMobile?: boolean;
}

export const CPAFirmTeamIllustration: React.FC<AudienceIllustrationProps> = ({
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
        aria-label="CPA firm team collaborating on audit review and outsourcing"
      >
        <defs>
          <linearGradient id="cpaCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <linearGradient id="cpaDeskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#172554" />
            <stop offset="100%" stopColor="#0B1220" />
          </linearGradient>
        </defs>

        {/* Studio Collaboration Desk in Deep Navy */}
        <rect x="15" y="98" width="170" height="7" rx="3.5" fill="url(#cpaDeskGrad)" />

        {/* Connecting Workflow Line in Teal */}
        <motion.path
          d="M 68 76 C 88 64, 112 64, 132 76"
          stroke="#2563EB"
          strokeWidth="1.8"
          strokeDasharray="4 3"
          initial={{ pathLength: 0.3 }}
          animate={active ? { pathLength: 1 } : { pathLength: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* Central Workflow Pulse Indicator in Amber */}
        <motion.circle
          cx="100"
          cy="68"
          r="3"
          fill="#2563EB"
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
        />

        {/* Professional 1: Preparer / Staff Lead (Left) in Deep Navy */}
        <motion.g
          animate={active ? { x: 2 } : { x: 0 }}
          transition={{ duration: 0.4 }}
          transform="translate(30, 48)"
        >
          {/* Chair */}
          <rect x="10" y="10" width="22" height="40" rx="4" fill="#172554" opacity="0.9" />
          {/* Torso */}
          <path d="M 6 30 Q 20 22 34 30 L 36 50 L 4 50 Z" fill="#172554" />
          {/* Head & Face */}
          <circle cx="20" cy="18" r="9" fill="#F4EADB" />
          <path d="M 12 16 C 12 8, 28 8, 28 16 C 25 13, 19 11, 14 13 Z" fill="#0B1220" />
          {/* Glasses in Teal */}
          <rect x="16" y="17" width="4.5" height="3.5" rx="1" fill="none" stroke="#2563EB" strokeWidth="0.8" />
          <rect x="22" y="17" width="4.5" height="3.5" rx="1" fill="none" stroke="#2563EB" strokeWidth="0.8" />
          {/* Blinking eyes */}
          <motion.ellipse
            cx="18"
            cy="18.5"
            rx="0.8"
            ry="0.8"
            fill="#0B1220"
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ repeat: Infinity, duration: 4, times: [0, 0.45, 0.5, 0.55, 1] }}
          />
          {/* Laptop on left */}
          <rect x="22" y="38" width="18" height="12" rx="1.5" fill="#0B1220" />
          <rect x="23.5" y="39.5" width="15" height="9" rx="1" fill="#FFFFFF" />
          <line x1="26" y1="44" x2="35" y2="44" stroke="#2563EB" strokeWidth="1" strokeLinecap="round" />
        </motion.g>

        {/* Professional 2: Senior CPA Reviewer (Right) */}
        <motion.g
          animate={active ? { x: -2 } : { x: 0 }}
          transition={{ duration: 0.4 }}
          transform="translate(130, 48)"
        >
          {/* Chair */}
          <rect x="8" y="10" width="22" height="40" rx="4" fill="#172554" opacity="0.9" />
          {/* Torso in Deep Navy */}
          <path d="M 4 30 Q 18 22 32 30 L 34 50 L 2 50 Z" fill="#172554" />
          {/* Head & Face */}
          <circle cx="18" cy="18" r="9" fill="#F4EADB" />
          <path d="M 10 16 C 10 7, 26 7, 26 16 C 24 12, 17 11, 12 13 Z" fill="#0B1220" />
          {/* Blinking eyes */}
          <motion.ellipse
            cx="16"
            cy="18.5"
            rx="0.8"
            ry="0.8"
            fill="#0B1220"
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ repeat: Infinity, duration: 4.6, times: [0, 0.45, 0.5, 0.55, 1] }}
          />
          {/* Review checklist pad on right with Teal accents */}
          <rect x="2" y="38" width="16" height="13" rx="2" fill="#FFFFFF" stroke="#172554" strokeWidth="0.8" />
          <line x1="5" y1="42" x2="13" y2="42" stroke="#2563EB" strokeWidth="1" />
          <line x1="5" y1="46" x2="11" y2="46" stroke="#2563EB" strokeWidth="1" />
        </motion.g>

        {/* Financial Document */}
        <motion.g
          animate={active ? { x: 42, y: -2 } : { x: 0, y: [0, -1.5, 0] }}
          transition={
            active
              ? { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
              : { repeat: Infinity, duration: 3, ease: 'easeInOut' }
          }
          transform="translate(68, 54)"
        >
          {/* Document Sheet */}
          <rect x="0" y="0" width="26" height="34" rx="3" fill="url(#cpaCardGrad)" stroke="#172554" strokeWidth="1.2" />
          <rect x="3" y="4" width="11" height="2" rx="0.8" fill="#2563EB" />
          <line x1="3" y1="9" x2="23" y2="9" stroke="rgba(11,31,51,0.2)" strokeWidth="1" strokeLinecap="round" />
          <line x1="3" y1="13" x2="20" y2="13" stroke="rgba(11,31,51,0.2)" strokeWidth="1" strokeLinecap="round" />
          <line x1="3" y1="17" x2="23" y2="17" stroke="rgba(11,31,51,0.2)" strokeWidth="1" strokeLinecap="round" />

          {/* First Review Checkmark (Preparer Review) in Teal */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            transform="translate(4, 22)"
          >
            <circle cx="3" cy="3" r="3" fill="#2563EB" />
            <path d="M 1.8 3 L 2.6 3.8 L 4.4 2" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>

          {/* Second Review Checkmark (Senior Reviewer Review) in Teal */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.45 }}
            transform="translate(12, 22)"
          >
            <circle cx="3" cy="3" r="3" fill="#2563EB" />
            <path d="M 1.8 3 L 2.6 3.8 L 4.4 2" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>

          {/* Final Approval Stamp in Amber */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.35, delay: 0.65, ease: 'backOut' }}
            transform="translate(18, 2)"
          >
            <circle cx="4" cy="4" r="4" fill="#2563EB" stroke="#172554" strokeWidth="0.8" />
            <text x="2.5" y="5.5" fill="#172554" fontSize="4" fontWeight="bold">
              ✓
            </text>
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
};
