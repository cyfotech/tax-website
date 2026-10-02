import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  isDarkSurface?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
  isDarkSurface = false,
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-8 sm:mb-12 md:mb-16 w-full max-w-full min-w-0 ${isCenter ? 'text-center mx-auto' : 'text-left'} ${className}`}>
      {eyebrow && (
        <span
          className={`inline-block font-bold tracking-widest uppercase mb-2.5 sm:mb-3 ${
            isDarkSurface ? 'text-[#2563EB]' : 'text-[#2563EB]'
          }`}
          style={{
            fontSize: '0.75rem',
            lineHeight: 1.4,
          }}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-extrabold tracking-tight max-w-3xl leading-[1.14] break-words ${
          isCenter ? 'mx-auto' : ''
        } ${
          isDarkSurface ? 'text-[#FFFFFF]' : 'text-[#172554] dark:text-[#FFFFFF]'
        }`}
        style={{
          fontSize: 'clamp(1.75rem, 7vw, 2.25rem)',
          lineHeight: 1.14,
          textWrap: 'balance',
          overflowWrap: 'break-word',
          wordBreak: 'normal',
          whiteSpace: 'normal',
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3.5 sm:mt-4 max-w-xl ${isCenter ? 'mx-auto' : ''} font-medium leading-[1.6] break-words ${
            isDarkSurface ? 'text-[#FFFFFF]/80' : 'text-[#475569] dark:text-[#FFFFFF]/80'
          }`}
          style={{
            fontSize: 'clamp(0.95rem, 4vw, 1.05rem)',
            lineHeight: 1.6,
            overflowWrap: 'break-word',
            wordBreak: 'normal',
            whiteSpace: 'normal',
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
};
