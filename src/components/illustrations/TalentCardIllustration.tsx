import React from 'react';

interface TalentCardIllustrationProps {
  roleKey: string;
  size?: number;
}

export const TalentCardIllustration: React.FC<TalentCardIllustrationProps> = ({ roleKey, size = 64 }) => {
  return (
    <div
      className="relative flex items-center justify-center rounded-2xl bg-[#FFFFFF] dark:bg-[#172554] border border-[#172554]/20 group-hover:border-[#2563EB] transition-colors shadow-sm"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full p-2"
        role="img"
        aria-label={roleKey}
      >
        <defs>
          <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>

        {/* Outer circular background */}
        <circle cx="32" cy="32" r="28" fill="url(#avatarGrad)" stroke="#172554" strokeWidth="1" strokeOpacity="0.2" />

        {/* Character Base Anatomy */}
        {roleKey === 'talent-accountant' && (
          <g>
            <path d="M 18 56 C 18 45, 46 45, 46 56 Z" fill="#172554" stroke="#0B1220" strokeWidth="1" />
            <polygon points="29,44 35,44 33,52 31,52" fill="#FFFFFF" />
            <polygon points="31,48 33,48 34,56 30,56" fill="#2563EB" />
            <circle cx="32" cy="31" r="10" fill="#F4EADB" />
            <path d="M 23 29 C 23 20, 41 20, 41 29 Z" fill="#0B1220" />
            <rect x="26" y="29" width="5" height="4" rx="1.5" fill="none" stroke="#2563EB" strokeWidth="1" />
            <rect x="33" y="29" width="5" height="4" rx="1.5" fill="none" stroke="#2563EB" strokeWidth="1" />
            <line x1="31" y1="31" x2="33" y2="31" stroke="#2563EB" strokeWidth="1" />
          </g>
        )}

        {roleKey === 'talent-bookkeeper' && (
          <g>
            <path d="M 18 56 C 18 45, 46 45, 46 56 Z" fill="#172554" stroke="#0B1220" strokeWidth="1" />
            <path d="M 28 44 Q 32 50 36 44" fill="#FFFFFF" />
            <circle cx="32" cy="31" r="10" fill="#F4EADB" />
            <path d="M 22 30 C 22 19, 42 19, 42 30 C 40 24, 28 24, 22 30 Z" fill="#0B1220" />
            <circle cx="44" cy="22" r="5" fill="#2563EB" />
            <path d="M 42 22 L 43.5 23.5 L 46 20.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          </g>
        )}

        {roleKey === 'talent-preparer' && (
          <g>
            <path d="M 18 56 C 18 45, 46 45, 46 56 Z" fill="#172554" stroke="#0B1220" strokeWidth="1" />
            <polygon points="29,44 35,44 33,52 31,52" fill="#FFFFFF" />
            <polygon points="31,48 33,48 34,56 30,56" fill="#2563EB" />
            <circle cx="32" cy="30" r="10" fill="#F4EADB" />
            <path d="M 23 28 C 23 20, 41 20, 41 28 Z" fill="#0B1220" />
            <rect x="40" y="18" width="10" height="12" rx="2" fill="#2563EB" stroke="#172554" strokeWidth="1" />
            <line x1="42" y1="22" x2="48" y2="22" stroke="#2563EB" strokeWidth="0.8" />
            <line x1="42" y1="25" x2="47" y2="25" stroke="#FFFFFF" strokeWidth="0.8" />
          </g>
        )}

        {roleKey === 'talent-reviewer' && (
          <g>
            <path d="M 18 56 C 18 45, 46 45, 46 56 Z" fill="#172554" stroke="#0B1220" strokeWidth="1.2" />
            <polygon points="28,44 36,44 32,53" fill="#FFFFFF" />
            <polygon points="31,48 33,48 33,56 31,56" fill="#2563EB" />
            <circle cx="32" cy="30" r="10.5" fill="#F4EADB" />
            <path d="M 21 28 C 21 17, 43 17, 43 28 Z" fill="#0B1220" />
            <circle cx="45" cy="20" r="6" fill="#172554" />
            <path d="M 45 16 L 46 19 L 49 19 L 46.5 21 L 47.5 24 L 45 22 L 42.5 24 L 43.5 21 L 41 19 L 44 19 Z" fill="#2563EB" />
          </g>
        )}

        {roleKey === 'talent-staff' && (
          <g>
            <path d="M 18 56 C 18 45, 46 45, 46 56 Z" fill="#172554" stroke="#0B1220" strokeWidth="1" />
            <circle cx="32" cy="31" r="10" fill="#F4EADB" />
            <path d="M 23 29 C 23 21, 41 21, 41 29 Z" fill="#0B1220" />
            <circle cx="44" cy="22" r="5" fill="#2563EB" />
            <path d="M 42 22 L 44 20 L 46 22" stroke="#2563EB" strokeWidth="1" />
          </g>
        )}

        {/* Fallback avatar */}
        {!['talent-accountant', 'talent-bookkeeper', 'talent-preparer', 'talent-reviewer', 'talent-staff'].includes(roleKey) && (
          <g>
            <path d="M 18 56 C 18 45, 46 45, 46 56 Z" fill="#172554" stroke="#0B1220" strokeWidth="1" />
            <circle cx="32" cy="31" r="10" fill="#F4EADB" />
            <path d="M 23 29 C 23 21, 41 21, 41 29 Z" fill="#0B1220" />
          </g>
        )}
      </svg>
    </div>
  );
};
