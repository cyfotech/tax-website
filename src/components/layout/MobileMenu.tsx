import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavItem, ButtonConfig } from '../../types/content';
import { Button } from '../common/Button';
import { X, Sun, Moon } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavItem[];
  cta: ButtonConfig;
  currentPath: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  links,
  cta,
  currentPath,
  theme,
  onToggleTheme,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B1220]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="relative w-full max-h-[85vh] bg-[#FFFFFF] dark:bg-[#0B1220] border-t border-[#172554]/20 rounded-t-3xl shadow-2xl p-6 overflow-y-auto flex flex-col">
        {/* Header inside drawer */}
        <div className="flex items-center justify-between pb-4 border-b border-[#172554]/10 dark:border-white/10 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold tracking-wide text-[#172554] dark:text-[#F8FAFC]">Menu</span>
            {/* Theme Toggle in Mobile Menu Header */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="px-3 py-1.5 rounded-xl bg-[#EFF6FF] dark:bg-[#172554] text-[#2563EB] dark:text-[#22D3EE] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#DBEAFE] transition-colors"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-[#22D3EE]" /> Light Mode
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-[#2563EB]" /> Dark Mode
                </>
              )}
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl text-[#172554] dark:text-[#F8FAFC] hover:bg-[#172554]/10 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col space-y-1.5 mb-6" aria-label="Mobile Navigation">
          {links.map((link) => {
            const isActive =
              link.href === '/'
                ? currentPath === '/'
                : currentPath.startsWith(link.href);

            return (
              <Link
                key={link.id}
                to={link.href}
                onClick={onClose}
                className={`py-3 px-3.5 rounded-xl text-base font-semibold transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-[#2563EB] text-[#FFFFFF]'
                    : 'text-[#475569] dark:text-[#CBD5E1] hover:bg-[#EFF6FF] dark:hover:bg-[#172554]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-[#EDE9FE]" />}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="mt-auto pt-4 border-t border-[#172554]/10 dark:border-white/10">
          <Button href={cta.href} variant="primary" className="w-full justify-center py-3.5 text-base">
            {cta.label}
          </Button>
        </div>
      </div>
    </div>
  );
};
