import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'default',
}) => {
  const sizeClasses = {
    narrow: 'max-w-4xl',
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
    full: 'max-w-full',
  }[size];

  return (
    <div className={`w-full max-w-full min-w-0 mx-auto px-4 min-[480px]:px-5 sm:px-6 lg:px-8 box-border ${sizeClasses} ${className}`}>
      {children}
    </div>
  );
};
