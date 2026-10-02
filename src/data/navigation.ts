import { NavItem, ButtonConfig } from '../types/content';

export const navigationLinks: NavItem[] = [
  { id: 'nav-home', label: 'Home', href: '/' },
  { id: 'nav-about', label: 'About Us', href: '/about' },
  { id: 'nav-services', label: 'Services', href: '/services' },
  { id: 'nav-tax', label: 'Tax Resources', href: '/tax-resources' },
  { id: 'nav-blog', label: 'Blog', href: '/blog' },
  { id: 'nav-contact', label: 'Contact Us', href: '/contact' },
];

export const headerCTA: ButtonConfig = {
  id: 'nav-cta',
  label: 'Get Pricing',
  href: '/pricing',
  variant: 'primary',
};
