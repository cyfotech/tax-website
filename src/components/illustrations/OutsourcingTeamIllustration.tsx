import React from 'react';
import { motion } from 'motion/react';

/**
 * OutsourcingTeamIllustration
 * Collaborative accounting pod in Deep Navy, Teal, Warm Ivory, and Amber.
 */
export const OutsourcingTeamIllustration: React.FC = () => {
  return (
    <div className="relative w-full aspect-video md:aspect-[16/10] max-w-[600px] mx-auto select-none">
      <div
        className="absolute inset-0 rounded-3xl opacity-20 blur-2xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(15, 118, 110, 0.35) 0%, rgba(247, 244, 237, 0) 70%)',
        }}
      />

      <svg
        viewBox="0 0 580 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
        role="img"
        aria-label="CPA outsourcing pod connecting seamlessly with client operations"
      >
        <defs>
          <linearGradient id="podCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <filter id="subtleGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0B1220" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* Central Secure Hub in Deep Navy */}
        <g id="central-hub">
          <motion.circle
            cx="290"
            cy="190"
            r="60"
            stroke="#2563EB"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
            style={{ transformOrigin: '290px 190px' }}
          />

          <rect x="235" y="145" width="110" height="90" rx="16" fill="#172554" stroke="#172554" strokeWidth="1.5" filter="url(#subtleGlow)" />
          <circle cx="290" cy="180" r="18" fill="rgba(15, 118, 110, 0.25)" stroke="#2563EB" strokeWidth="1.5" />
          {/* Sync arrows in Amber */}
          <path d="M 284 176 L 290 170 L 296 176" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 290 170 L 290 188" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
          <text x="290" y="218" fill="#FFFFFF" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="Plus Jakarta Sans">
            SOC-2 BRIDGE
          </text>
        </g>

        {/* Animated Connecting Workflow Lines in Teal */}
        <path d="M 235 190 C 180 190, 160 130, 120 130" stroke="rgba(15, 118, 110, 0.4)" strokeWidth="2" strokeDasharray="6 4" />
        <motion.circle
          cx="120"
          cy="130"
          r="4.5"
          fill="#2563EB"
          animate={{
            cx: [120, 235, 120],
            cy: [130, 190, 130],
          }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        />

        <path d="M 345 190 C 400 190, 420 130, 460 130" stroke="rgba(15, 118, 110, 0.4)" strokeWidth="2" strokeDasharray="6 4" />
        <motion.circle
          cx="460"
          cy="130"
          r="4.5"
          fill="#2563EB"
          animate={{
            cx: [460, 345, 460],
            cy: [130, 190, 130],
          }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
        />

        <path d="M 290 235 L 290 275" stroke="rgba(15, 118, 110, 0.4)" strokeWidth="2" strokeDasharray="6 4" />
        <motion.circle
          cx="290"
          cy="235"
          r="4.5"
          fill="#2563EB"
          animate={{ cy: [235, 275, 235] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        />

        {/* Pod 1: Senior Reviewer (Top Left) */}
        <g id="pod-reviewer" filter="url(#subtleGlow)">
          <rect x="50" y="70" width="130" height="115" rx="16" fill="url(#podCardGrad)" stroke="#172554" strokeWidth="1.5" />
          <circle cx="115" cy="105" r="18" fill="#F4EADB" stroke="#172554" strokeWidth="1.5" />
          <circle cx="115" cy="103" r="8" fill="#F4EADB" />
          <path d="M 107 101 C 107 94, 123 94, 123 101 Z" fill="#0B1220" />
          <path d="M 103 121 C 103 114, 127 114, 127 121 Z" fill="#172554" />
          <text x="115" y="142" fill="#172554" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Plus Jakarta Sans">
            Senior Reviewer
          </text>
          <text x="115" y="156" fill="#2563EB" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="JetBrains Mono">
            Tier-2 QA Pass
          </text>
          {/* Checkmark Badge in Teal */}
          <circle cx="155" cy="85" r="7" fill="#2563EB" />
          <path d="M 152 85 L 154 87 L 158 83" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Pod 2: Tax Specialist (Top Right) */}
        <g id="pod-preparer" filter="url(#subtleGlow)">
          <rect x="400" y="70" width="130" height="115" rx="16" fill="url(#podCardGrad)" stroke="#172554" strokeWidth="1.5" />
          <circle cx="465" cy="105" r="18" fill="#F4EADB" stroke="#172554" strokeWidth="1.5" />
          <circle cx="465" cy="103" r="8" fill="#F4EADB" />
          <path d="M 457 101 C 457 93, 473 93, 473 101 Z" fill="#0B1220" />
          <path d="M 453 121 C 453 114, 477 114, 477 121 Z" fill="#172554" />
          <text x="465" y="142" fill="#172554" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Plus Jakarta Sans">
            Tax Specialist
          </text>
          <text x="465" y="156" fill="#2563EB" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="JetBrains Mono">
            Drake & UltraTax
          </text>
          <circle cx="505" cy="85" r="4" fill="#2563EB" />
        </g>

        {/* Pod 3: Dedicated Bookkeeper (Bottom Center) */}
        <g id="pod-bookkeeper" filter="url(#subtleGlow)">
          <rect x="225" y="275" width="130" height="85" rx="16" fill="url(#podCardGrad)" stroke="#172554" strokeWidth="1.5" />
          <circle cx="290" cy="305" r="14" fill="#F4EADB" stroke="#172554" strokeWidth="1.5" />
          <circle cx="290" cy="303" r="6" fill="#F4EADB" />
          <text x="290" y="333" fill="#172554" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Plus Jakarta Sans">
            CAS Specialist
          </text>
          <text x="290" y="347" fill="#2563EB" fontSize="9" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontWeight="600">
            QBO & Xero Live
          </text>
        </g>

        {/* Stream indicators */}
        <motion.g
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        >
          <text x="180" y="115" fill="#2563EB" fontSize="8" fontFamily="JetBrains Mono" fontWeight="700">
            99.4% QA
          </text>
          <text x="365" y="115" fill="#2563EB" fontSize="8" fontFamily="JetBrains Mono" fontWeight="700">
            Syncing...
          </text>
        </motion.g>
      </svg>
    </div>
  );
};
