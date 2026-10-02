import React from 'react';
import { Link } from 'react-router-dom';
import { IconRenderer } from './IconRenderer';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'teal' | 'amber' | 'ivory';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  icon?: string;
  iconPosition?: 'left' | 'right';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  isExternal?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  icon,
  iconPosition = 'right',
  className = '',
  disabled = false,
  type = 'button',
  isExternal = false,
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-200 cursor-pointer select-none text-center min-h-[44px] disabled:opacity-50 disabled:pointer-events-none rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]';

  const sizeClasses = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-5 sm:px-6 py-2.5 sm:py-3 gap-2',
    lg: 'text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 gap-2.5',
  }[size];

  const variantClasses = {
    // Primary: Deep Navy background (#172554), Warm Ivory text (#FFFFFF)
    primary:
      'bg-[#172554] hover:bg-[#172554] active:bg-[#0B1220] text-[#FFFFFF] shadow-md shadow-[#172554]/20 hover:-translate-y-0.5 active:translate-y-0',
    // Secondary: Transparent/Ivory background, Navy border and text
    secondary:
      'bg-transparent hover:bg-[#172554]/5 text-[#172554] dark:text-[#FFFFFF] border-2 border-[#172554] dark:border-[#FFFFFF]/30 hover:border-[#2563EB] hover:-translate-y-0.5 active:translate-y-0 shadow-sm',
    // Outline: Transparent background, Navy border/text
    outline:
      'bg-transparent hover:bg-[#172554]/10 text-[#172554] dark:text-[#FFFFFF] border-2 border-[#172554] dark:border-[#FFFFFF]/40 hover:border-[#2563EB] dark:hover:border-[#FFFFFF] hover:-translate-y-0.5 active:translate-y-0',
    // Ghost: Transparent with hover tint
    ghost:
      'bg-transparent hover:bg-[#172554]/10 text-[#172554] dark:text-[#FFFFFF]',
    // Teal: Secondary action / interactive
    teal:
      'bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#0D4E48] text-white shadow-md shadow-[#2563EB]/20 hover:-translate-y-0.5 active:translate-y-0',
    // Amber: Primary CTA highlight
    amber:
      'bg-[#2563EB] hover:bg-[#E5A830] active:bg-[#D49820] text-[#172554] font-bold shadow-md shadow-[#2563EB]/25 hover:-translate-y-0.5 active:translate-y-0',
    // Ivory: Used on dark sections (e.g. CTA section)
    ivory:
      'bg-[#FFFFFF] hover:bg-[#FFFFFF] active:bg-[#EFF6FF] text-[#172554] font-bold shadow-lg shadow-[#172554]/30 hover:-translate-y-0.5 active:translate-y-0',
  }[variant];

  const content = (
    <>
      {icon && iconPosition === 'left' && <IconRenderer name={icon} className="w-4 h-4 shrink-0" />}
      <span className="leading-snug break-words">{children}</span>
      {icon && iconPosition === 'right' && (
        <IconRenderer name={icon} className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
      )}
    </>
  );

  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`;

  if (href) {
    if (isExternal || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClasses}>
          {content}
        </a>
      );
    }
    return (
      <Link to={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={combinedClasses}>
      {content}
    </button>
  );
};
