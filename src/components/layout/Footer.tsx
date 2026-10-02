import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { footerConfig } from '../../data/footer';
import { siteConfig } from '../../data/siteConfig';
import { Container } from '../common/Container';
import { ArrowRight, CheckCircle2, Linkedin, Twitter, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const getSocialIcon = (name: string) => {
    switch (name) {
      case 'LinkedIn':
        return <Linkedin className="w-4 h-4" />;
      case 'Twitter':
      case 'X / Twitter':
        return <Twitter className="w-4 h-4" />;
      case 'GitHub':
        return <Github className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-[#172554] dark:bg-[#0B1220] text-[#F8FAFC] pt-16 pb-12 border-t border-[#2563EB]/20 transition-colors">
      <Container size="wide">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand & Newsletter (Col span 2) */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-2.5 group inline-flex" aria-label="ApexLedger Home">
              <span className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center font-bold text-white text-base">
                A
              </span>
              <span className="text-xl font-bold tracking-tight text-[#F8FAFC]">ApexLedger</span>
            </Link>
            <p className="text-sm text-[#CBD5E1] max-w-sm leading-relaxed">
              {siteConfig.shortDescription}
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2 max-w-sm">
              <span className="block text-xs font-bold text-[#F8FAFC] uppercase tracking-wider mb-2">
                Executive Tax & Advisory Briefing
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#F8FAFC] bg-[#2563EB] p-3 rounded-xl border border-white/20">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-[#22D3EE]" />
                  <span>Subscribed. Monthly executive briefing incoming.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter work email"
                    className="w-full bg-[#0B1220] border border-white/15 focus:border-[#06B6D4] rounded-xl px-4 py-2.5 text-xs text-[#F8FAFC] placeholder-white/40 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-semibold transition-colors shrink-0 flex items-center justify-center gap-1 shadow-sm min-h-[44px] cursor-pointer group"
                    aria-label="Subscribe to newsletter"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#22D3EE] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </form>
              )}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-2">
              {siteConfig.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl bg-white/5 hover:bg-[#2563EB] text-white/80 hover:text-white flex items-center justify-center transition-colors border border-white/10"
                  aria-label={s.name}
                >
                  {getSocialIcon(s.name)}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {footerConfig.columns.map((col) => (
            <div key={col.title} className="space-y-3.5 min-w-0">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#F8FAFC]">
                {col.title}
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-[#CBD5E1] hover:text-[#22D3EE] transition-colors inline-block py-1 min-h-[32px] flex items-center break-words"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#CBD5E1]">
          <p>{footerConfig.copyright}</p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-[#22D3EE] transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-[#22D3EE] transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-[#22D3EE] transition-colors">Security & SOC2</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
