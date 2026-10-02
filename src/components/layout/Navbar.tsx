import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navigationLinks, headerCTA } from '../../data/navigation';
import { Button } from '../common/Button';
import { MobileMenu } from './MobileMenu';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 h-[72px] md:h-[80px] flex items-center bg-[#FFFFFF]/95 dark:bg-[#0B1220]/95 backdrop-blur-md border-b border-[#172554]/10 dark:border-white/10 ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          {/* Zone 1: Wordmark in Royal Blue / Deep Navy */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group text-[#172554] dark:text-[#F8FAFC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-xl shrink-0"
            aria-label="ApexLedger Advisory Home"
          >
            <span className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center font-extrabold text-[#FFFFFF] text-base shadow-sm group-hover:bg-[#1D4ED8] transition-colors shrink-0">
              A
            </span>
            <span className="text-xl font-extrabold tracking-tight text-[#172554] dark:text-[#F8FAFC] group-hover:text-[#2563EB] transition-colors whitespace-nowrap">
              ApexLedger
            </span>
          </Link>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
            {navigationLinks.map((item) => {
              const isActive =
                item.href === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.href);

              return (
                <Link
                  key={item.id}
                  to={item.href}
                  className={`text-sm font-semibold transition-colors hover:text-[#2563EB] dark:hover:text-[#60A5FA] whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2563EB] rounded-lg py-1.5 px-2 relative ${
                    isActive
                      ? 'text-[#2563EB] dark:text-[#60A5FA] font-bold'
                      : 'text-[#475569] dark:text-[#CBD5E1]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#2563EB] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Theme Toggle & Primary CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              type="button"
              onClick={onToggleTheme}
              className="min-w-[40px] min-h-[40px] w-10 h-10 rounded-xl bg-[#EFF6FF] dark:bg-[#172554] text-[#2563EB] dark:text-[#22D3EE] hover:bg-[#DBEAFE] dark:hover:bg-[#1E3A8A] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-[#22D3EE]" /> : <Moon className="w-5 h-5 text-[#2563EB]" />}
            </button>

            <div className="hidden sm:block">
              <Button href={headerCTA.href} variant="primary" size="sm">
                {headerCTA.label}
              </Button>
            </div>

            {/* Mobile Hamburger toggle (>= 44x44px touch target) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl text-[#172554] dark:text-[#F8FAFC] hover:bg-[#172554]/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navigationLinks}
        cta={headerCTA}
        currentPath={location.pathname}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />
    </>
  );
};
