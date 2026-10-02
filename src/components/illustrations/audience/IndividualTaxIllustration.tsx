import React from 'react';
import { motion } from 'motion/react';

interface AudienceIllustrationProps {
  isHovered: boolean;
  isActiveMobile?: boolean;
}

export const IndividualTaxIllustration: React.FC<AudienceIllustrationProps> = ({
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
        aria-label="Individual managing personal taxes"
      >
        <defs>
          <linearGradient id="indDeskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#172554" />
            <stop offset="100%" stopColor="#0B1220" />
          </linearGradient>
          <linearGradient id="indDocGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>

        {/* Studio Desk in Deep Navy */}
        <rect x="20" y="98" width="160" height="7" rx="3.5" fill="url(#indDeskGrad)" />
        <rect x="28" y="105" width="144" height="2" fill="#0B1220" opacity="0.3" />

        {/* Character Group */}
        <motion.g
          animate={active ? { y: -3, scale: 1.02 } : { y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          style={{ transformOrigin: '90px 95px' }}
        >
          {/* Chair back */}
          <rect x="76" y="52" width="28" height="46" rx="6" fill="#172554" opacity="0.9" />

          {/* Torso & Navy Blazer */}
          <path d="M 72 75 Q 90 68 108 75 L 112 100 L 68 100 Z" fill="#172554" stroke="#0B1220" strokeWidth="1.2" />
          {/* Teal Tie / Collar */}
          <polygon points="86,70 94,70 91,78 89,78" fill="#FFFFFF" />
          <polygon points="89,76 91,76 92,86 90,89 88,86" fill="#2563EB" />

          {/* Neck & Head */}
          <rect x="87" y="62" width="6" height="9" fill="#F4EADB" rx="1.5" />
          <circle cx="90" cy="54" r="11" fill="#F4EADB" />

          {/* Hair */}
          <path d="M 80 52 C 80 42, 100 41, 100 51 C 97 48, 91 46, 85 48 Z" fill="#0B1220" />

          {/* Glasses in Teal */}
          <rect x="84" y="52" width="5.5" height="4.5" rx="1.5" fill="none" stroke="#2563EB" strokeWidth="1" />
          <rect x="91" y="52" width="5.5" height="4.5" rx="1.5" fill="none" stroke="#2563EB" strokeWidth="1" />
          <line x1="89.5" y1="54" x2="91" y2="54" stroke="#2563EB" strokeWidth="1" />

          {/* Eye Blinking */}
          <motion.ellipse
            cx="87"
            cy="54"
            rx="1"
            ry="1"
            fill="#0B1220"
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ repeat: Infinity, duration: 3.8, times: [0, 0.45, 0.5, 0.55, 1] }}
          />
          <motion.ellipse
            cx="94"
            cy="54"
            rx="1"
            ry="1"
            fill="#0B1220"
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ repeat: Infinity, duration: 3.8, times: [0, 0.45, 0.5, 0.55, 1] }}
          />

          {/* Smile */}
          <path d="M 88 59 Q 90 61 92 59" stroke="#0B1220" strokeWidth="1" fill="none" strokeLinecap="round" />

          {/* Arms */}
          <motion.path
            d="M 76 77 Q 66 88 80 97"
            fill="none"
            stroke="#172554"
            strokeWidth="6"
            strokeLinecap="round"
            animate={active ? { rotate: [-1, 2, -1] } : { rotate: 0 }}
            transition={{ repeat: active ? Infinity : 0, duration: 1.2, ease: 'easeInOut' }}
            style={{ transformOrigin: '76px 77px' }}
          />
          <circle cx="80" cy="97" r="3" fill="#F4EADB" />

          <path d="M 104 77 Q 112 88 100 97" fill="none" stroke="#172554" strokeWidth="6" strokeLinecap="round" />
          <circle cx="100" cy="97" r="3" fill="#F4EADB" />
        </motion.g>

        {/* Laptop in Deep Navy */}
        <g id="ind-laptop">
          <rect x="85" y="82" width="28" height="17" rx="2" fill="#0B1220" stroke="#2563EB" strokeWidth="0.8" />
          <rect x="87" y="84" width="24" height="13" rx="1.5" fill="#FFFFFF" />
          {/* Mini active chart lines on screen */}
          <motion.rect
            x="89"
            y="87"
            width="8"
            height="2"
            rx="1"
            fill="#2563EB"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
          />
          <motion.line
            x1="89"
            y1="93"
            x2="108"
            y2="93"
            stroke="rgba(15,118,110,0.4)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <rect x="82" y="97" width="34" height="2" rx="1" fill="#172554" />
        </g>

        {/* Small Calculator on Desk with Amber Accent Button */}
        <g id="ind-calculator" transform="translate(122, 80)">
          <rect x="0" y="0" width="18" height="20" rx="3" fill="#FFFFFF" stroke="#172554" strokeWidth="1" />
          {/* LCD Screen with numbers */}
          <rect x="2.5" y="2.5" width="13" height="4.5" rx="1" fill="#FFFFFF" />
          <motion.text
            x="4"
            y="6"
            fill="#2563EB"
            fontSize="3.8"
            fontFamily="monospace"
            fontWeight="bold"
            animate={active ? { opacity: [1, 0.4, 1] } : { opacity: 1 }}
            transition={{ repeat: active ? Infinity : 0, duration: 0.6 }}
          >
            {active ? '1040✓' : '1040'}
          </motion.text>
          {/* Keypad dots - Amber execute button */}
          <circle cx="5" cy="10" r="1" fill="#172554" opacity="0.6" />
          <circle cx="9" cy="10" r="1" fill="#172554" opacity="0.6" />
          <circle cx="13" cy="10" r="1" fill="#2563EB" />
          <circle cx="5" cy="14" r="1" fill="#172554" opacity="0.6" />
          <circle cx="9" cy="14" r="1" fill="#172554" opacity="0.6" />
          <circle cx="13" cy="14" r="1" fill="#2563EB" />
        </g>

        {/* Small Tax Document */}
        <motion.g
          animate={active ? { y: -10 } : { y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Document Sheet */}
          <rect x="34" y="60" width="34" height="40" rx="4" fill="url(#indDocGrad)" stroke="#172554" strokeWidth="1.2" />
          {/* Form Title & Rows */}
          <rect x="38" y="65" width="14" height="2.5" rx="1" fill="#2563EB" />
          <line x1="38" y1="72" x2="62" y2="72" stroke="rgba(11,31,51,0.2)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="38" y1="77" x2="58" y2="77" stroke="rgba(11,31,51,0.2)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="38" y1="82" x2="62" y2="82" stroke="rgba(11,31,51,0.2)" strokeWidth="1.2" strokeLinecap="round" />

          {/* Financial Line Graph in Teal */}
          <motion.path
            d="M 38 92 L 44 89 L 50 91 L 56 86 L 62 84"
            fill="none"
            stroke="#2563EB"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0.3 }}
            animate={active ? { pathLength: 1 } : { pathLength: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          {/* Checkmark Stamp in Teal */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.25, ease: 'backOut' }}
            transform="translate(54, 62)"
          >
            <circle cx="5" cy="5" r="5" fill="#2563EB" />
            <path d="M 2.8 5 L 4.3 6.5 L 7.2 3.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
};
