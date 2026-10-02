/**
 * Design Tokens for ApexLedger Advisory
 * Multi-color financial brand system:
 * - Primary: Royal Blue (#2563EB)
 * - Secondary: Fresh Cyan (#06B6D4)
 * - Creative Accent: Soft Lavender (#EDE9FE)
 * - Main Background: Premium White (#FFFFFF)
 * - Alternate Background: Ice Blue (#EFF6FF)
 * - Heading Color: Deep Navy (#172554)
 * - Body Text: Slate (#475569)
 */

export const TOKENS = {
  colors: {
    primary: '#2563EB',
    secondary: '#06B6D4',
    accent: '#EDE9FE',
    background: '#FFFFFF',
    altBackground: '#EFF6FF',
    heading: '#172554',
    text: '#475569',
    dark: {
      background: '#0B1220',
      surface: '#172554',
      primary: '#60A5FA',
      secondary: '#22D3EE',
      text: '#F8FAFC',
      muted: '#CBD5E1',
    },
    // Compatibility aliases
    navy: {
      base: '#172554',
      deep: '#0B1220',
      surface: '#172554',
      light: '#2563EB',
      border: 'rgba(23, 37, 84, 0.12)',
      subtle: 'rgba(23, 37, 84, 0.05)',
    },
    teal: {
      base: '#06B6D4',
      hover: '#0891B2',
      light: '#22D3EE',
      surface: 'rgba(6, 182, 212, 0.1)',
      border: 'rgba(6, 182, 212, 0.25)',
      glow: 'rgba(6, 182, 212, 0.2)',
    },
    amber: {
      base: '#2563EB',
      hover: '#1D4ED8',
      light: '#93C5FD',
      surface: 'rgba(37, 99, 235, 0.15)',
      border: 'rgba(37, 99, 235, 0.35)',
    },
    surface: {
      ivory: '#EFF6FF',
      ivoryWarm: '#DBEAFE',
      white: '#FFFFFF',
      dark: '#0B1220',
      darkCard: '#172554',
      darkCardHover: '#1E3A8A',
    },
  },
  typography: {
    fontSans: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    fontMono: "'JetBrains Mono', monospace",
  },
  radius: {
    sm: '0.5rem',
    md: '0.875rem',
    lg: '1.25rem',
    xl: '1.75rem',
    full: '9999px',
  },
  transition: {
    fast: '0.2s cubic-bezier(0.16, 1, 0.3, 1)',
    normal: '0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  },
};
