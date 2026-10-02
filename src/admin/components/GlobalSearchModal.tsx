/**
 * Global Search Modal (⌘K)
 * Unified index across website pages, media files, blog articles, leads, and security incidents.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Layers, Image as ImageIcon, FileText, Users, ShieldAlert, X } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const mockIndex = [
      { id: 'p-1', title: 'Home Page', category: 'Pages', subtitle: 'Hero, Trust, Who We Help, Services, CTA', href: '/admin/pages/home/edit', icon: Layers },
      { id: 'p-2', title: 'About Us Page', category: 'Pages', subtitle: 'Company Overview, Leadership, Partner CPAs', href: '/admin/pages/about/edit', icon: Layers },
      { id: 'p-3', title: 'Services Index Page', category: 'Pages', subtitle: 'Corporate Tax, Fractional CFO, Bookkeeping', href: '/admin/pages/services/edit', icon: Layers },
      { id: 'p-4', title: 'Tax Resources Page', category: 'Pages', subtitle: '2026 Deadlines & Tax Reduction Guides', href: '/admin/pages/tax-resources/edit', icon: Layers },
      { id: 'p-5', title: 'Pricing Page', category: 'Pages', subtitle: 'Monthly Tier Plans & Scope Builder', href: '/admin/pages/pricing/edit', icon: Layers },
      { id: 'p-6', title: 'Contact Page', category: 'Pages', subtitle: 'Direct senior partner booking form', href: '/admin/pages/contact/edit', icon: Layers },
      { id: 'm-1', title: 'accountant-live-dashboard.svg', category: 'Media', subtitle: 'Hero Section Interactive Accountant Graphic', href: '/admin/media', icon: ImageIcon },
      { id: 'm-2', title: 'outsourcing-team.svg', category: 'Media', subtitle: 'Outsourcing Section Team Collaboration Visual', href: '/admin/media', icon: ImageIcon },
      { id: 'm-3', title: 'tax-specialist.svg', category: 'Media', subtitle: 'About Page Tax Specialist Visual', href: '/admin/media', icon: ImageIcon },
      { id: 'b-1', title: '2026 Corporate Tax Filing Deadlines', category: 'Blog', subtitle: 'Advisory Guide / Tax Category', href: '/admin/blog', icon: FileText },
      { id: 'b-2', title: 'When to Hire a Fractional CFO vs Full-Time', category: 'Blog', subtitle: 'CFO Strategy Guide', href: '/admin/blog', icon: FileText },
      { id: 'l-1', title: 'David Sterling (Vanguard Technologies)', category: 'Leads', subtitle: 'Consultation Request for Fractional CFO', href: '/admin/leads', icon: Users },
      { id: 'l-2', title: 'Elena Rostova (Meridian Global Freight)', category: 'Leads', subtitle: 'Multi-State Tax Remediation Inquiry', href: '/admin/leads', icon: Users },
      { id: 's-1', title: 'SEC-2026-0041', category: 'Security Incident', subtitle: 'Repeated Failed Admin Authentication Attempts (High Risk)', href: '/admin/security', icon: ShieldAlert },
    ];

    const matched = mockIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
    setResults(matched);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div className="w-full max-w-2xl bg-[#131C1A] border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input */}
        <div className="p-4 border-b border-zinc-800 flex items-center gap-3 bg-[#111917]">
          <Search className="w-5 h-5 text-[#2FE4A6]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, components, media, articles, leads, security incidents..."
            className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
            autoFocus
          />
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto divide-y divide-zinc-800/60 p-2">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-xs text-zinc-500">
              Type keywords to search across the entire CMS database.
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-xs text-zinc-400">
              No matching records found for "{query}".
            </div>
          ) : (
            results.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onClose();
                    navigate(item.href);
                  }}
                  className="w-full p-3 hover:bg-zinc-800/60 rounded-xl flex items-center justify-between text-left transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-300 shrink-0">
                      <Icon className="w-4 h-4 text-[#2FE4A6]" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-white truncate">{item.title}</div>
                      <div className="text-[11px] text-zinc-400 truncate">{item.subtitle}</div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700 shrink-0 ml-3">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-2.5 bg-[#0E1514] border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500 px-4">
          <span>Navigate with mouse or keyboard</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
