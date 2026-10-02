import React from 'react';
import { Button } from './Button';
import { IconRenderer } from './IconRenderer';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No content available',
  description = 'This section has not been configured yet.',
  actionLabel,
  actionHref,
  icon = 'Inbox',
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-3xl border-2 border-dashed border-[#172554]/20 bg-white dark:bg-[#172554] my-6 shadow-sm">
      <div className="w-14 h-14 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] dark:text-[#06B6D4] flex items-center justify-center mb-4">
        <IconRenderer name={icon} className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-[#172554] dark:text-[#FFFFFF] mb-1">{title}</h3>
      <p className="text-xs sm:text-sm text-[#475569] dark:text-[#FFFFFF]/75 max-w-sm mb-5 font-medium">{description}</p>
      {actionLabel && actionHref && (
        <Button href={actionHref} size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
