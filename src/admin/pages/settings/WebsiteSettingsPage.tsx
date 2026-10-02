/**
 * Global Website Settings, Navigation Menu, Theme Tokens & Footer Manager
 */

import React, { useState, useEffect } from 'react';
import { Settings, Save, Palette, Compass, Layers, Download, CheckCircle2, RotateCcw } from 'lucide-react';

export const WebsiteSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'theme' | 'navigation' | 'footer' | 'backup'>('general');
  const [siteSettings, setSiteSettings] = useState<any>({});
  const [navigation, setNavigation] = useState<any>({ links: [] });
  const [footer, setFooter] = useState<any>({ columns: [] });
  const [theme, setTheme] = useState({
    primaryColor: '#2563EB',
    secondaryColor: '#06B6D4',
    accentColor: '#EDE9FE',
    lightBackground: '#FFFFFF',
    darkBackground: '#0B1220',
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('apex_admin_token');
      const headers = { Authorization: `Bearer ${token}` };

      const [siteRes, navRes, footerRes] = await Promise.all([
        fetch('/api/admin/settings/website', { headers }),
        fetch('/api/admin/settings/navigation', { headers }),
        fetch('/api/admin/settings/footer', { headers }),
      ]);

      if (siteRes.ok) {
        const j = await siteRes.json();
        const settings = j.settings || {};
        setSiteSettings(settings);
        if (settings.theme) {
          setTheme({
            primaryColor: settings.theme.primaryColor || '#2563EB',
            secondaryColor: settings.theme.secondaryColor || '#06B6D4',
            accentColor: settings.theme.accentColor || '#EDE9FE',
            lightBackground: settings.theme.lightBackground || '#FFFFFF',
            darkBackground: settings.theme.darkBackground || '#0B1220',
          });
        }
      }
      if (navRes.ok) {
        const j = await navRes.json();
        setNavigation(j.navigation || { links: [] });
      }
      if (footerRes.ok) {
        const j = await footerRes.json();
        setFooter(j.footer || { columns: [] });
      }
    } catch (e) {
      console.error('Error fetching settings:', e);
    }
  };

  const applyThemeTokensToDOM = (newTheme: typeof theme) => {
    const root = document.documentElement;
    root.style.setProperty('--color-navy', newTheme.primaryColor);
    root.style.setProperty('--brand-primary', newTheme.primaryColor);
    root.style.setProperty('--color-teal', newTheme.secondaryColor);
    root.style.setProperty('--brand-secondary', newTheme.secondaryColor);
    root.style.setProperty('--color-amber', newTheme.accentColor);
    root.style.setProperty('--brand-accent', newTheme.accentColor);
    root.style.setProperty('--color-ivory', newTheme.lightBackground);
    root.style.setProperty('--brand-bg', newTheme.lightBackground);
    root.style.setProperty('--color-navy-deep', newTheme.darkBackground);

    try {
      localStorage.setItem('apex_brand_theme', JSON.stringify(newTheme));
    } catch (e) {
      // Ignore
    }
  };

  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('apex_admin_token');
      await fetch('/api/admin/settings/website', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ settings: { ...siteSettings, theme } }),
      });
      setStatusMessage('Website settings updated successfully.');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveTheme = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('apex_admin_token');
      applyThemeTokensToDOM(theme);

      await fetch('/api/admin/settings/website', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ settings: { ...siteSettings, theme } }),
      });

      setStatusMessage('Design tokens updated and propagated across all linked components.');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleResetTheme = () => {
    const defaultTheme = {
      primaryColor: '#2563EB',
      secondaryColor: '#06B6D4',
      accentColor: '#EDE9FE',
      lightBackground: '#FFFFFF',
      darkBackground: '#0B1220',
    };
    setTheme(defaultTheme);
    applyThemeTokensToDOM(defaultTheme);
  };

  const handleSaveNav = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('apex_admin_token');
      await fetch('/api/admin/settings/navigation', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ navigation }),
      });
      setStatusMessage('Navigation menu updated.');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadBackup = async () => {
    try {
      const token = localStorage.getItem('apex_admin_token');
      const res = await fetch('/api/admin/settings/backup', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        const blob = new Blob([JSON.stringify(data.snapshot, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `apexledger-cms-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-[#2563EB]" />
          <span>Global Website & Brand Settings</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Manage corporate identity, centralized theme tokens, navigation structure, and backup snapshots.
        </p>
      </div>

      {statusMessage && (
        <div className="p-3 bg-[#2563EB]/20 border border-[#2563EB] text-[#06B6D4] rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#06B6D4] shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-zinc-800 bg-[#172554]/60 rounded-2xl p-1 gap-1 text-xs overflow-x-auto">
        {[
          { key: 'general', label: 'Company Identity' },
          { key: 'theme', label: 'Theme Tokens' },
          { key: 'navigation', label: 'Navigation Menu' },
          { key: 'footer', label: 'Footer Configuration' },
          { key: 'backup', label: 'System Backup' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 py-2.5 px-3 rounded-xl font-bold transition-colors whitespace-nowrap ${
              activeTab === tab.key ? 'bg-[#172554] text-[#FFFFFF] border border-[#2563EB]' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: GENERAL */}
      {activeTab === 'general' && (
        <form onSubmit={handleSaveGeneral} className="bg-[#172554]/80 border border-zinc-800 rounded-3xl p-6 space-y-4 max-w-2xl text-xs">
          <div>
            <label className="block font-bold text-zinc-300 mb-1">Company Name</label>
            <input
              type="text"
              value={siteSettings.companyName || 'ApexLedger Advisory'}
              onChange={(e) => setSiteSettings({ ...siteSettings, companyName: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white"
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-300 mb-1">Corporate Tagline</label>
            <input
              type="text"
              value={siteSettings.tagline || 'Strategic Accounting & Corporate Tax Advisory'}
              onChange={(e) => setSiteSettings({ ...siteSettings, tagline: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-zinc-300 mb-1">Direct Phone</label>
              <input
                type="text"
                value={siteSettings.phone || '+1 (800) 555-APEX'}
                onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="block font-bold text-zinc-300 mb-1">Executive Inquiries Email</label>
              <input
                type="email"
                value={siteSettings.email || 'partner@apexledger.com'}
                onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-xl shadow-md cursor-pointer"
          >
            {saving ? 'Saving...' : 'Save General Settings'}
          </button>
        </form>
      )}

      {/* TAB 2: THEME TOKENS */}
      {activeTab === 'theme' && (
        <form onSubmit={handleSaveTheme} className="bg-[#172554]/80 border border-zinc-800 rounded-3xl p-6 space-y-6 max-w-3xl text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#2563EB]" />
                <span>Centralized Brand Color Tokens</span>
              </h3>
              <p className="text-zinc-400 text-xs mt-0.5">
                Controls the global design system tokens. Modifications propagate across all linked components.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetTheme}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>

          {/* Color Tokens Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Primary Color */}
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-zinc-200">Primary Color (Deep Navy)</label>
                <div
                  className="w-6 h-6 rounded-lg border border-white/20 shadow-xs"
                  style={{ backgroundColor: theme.primaryColor }}
                />
              </div>
              <p className="text-[11px] text-zinc-400">Header, footer, headings, primary CTA text, dark cards.</p>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={theme.primaryColor}
                  onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                  className="w-9 h-9 rounded-lg bg-transparent cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  value={theme.primaryColor}
                  onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                  className="flex-1 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white font-mono text-xs uppercase"
                />
              </div>
            </div>

            {/* Secondary Color */}
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-zinc-200">Secondary Color (Professional Teal)</label>
                <div
                  className="w-6 h-6 rounded-lg border border-white/20 shadow-xs"
                  style={{ backgroundColor: theme.secondaryColor }}
                />
              </div>
              <p className="text-[11px] text-zinc-400">Financial charts, active indicators, completed steps, icons.</p>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={theme.secondaryColor}
                  onChange={(e) => setTheme({ ...theme, secondaryColor: e.target.value })}
                  className="w-9 h-9 rounded-lg bg-transparent cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  value={theme.secondaryColor}
                  onChange={(e) => setTheme({ ...theme, secondaryColor: e.target.value })}
                  className="flex-1 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white font-mono text-xs uppercase"
                />
              </div>
            </div>

            {/* Accent Color */}
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-zinc-200">Accent Color (Warm Amber)</label>
                <div
                  className="w-6 h-6 rounded-lg border border-white/20 shadow-xs"
                  style={{ backgroundColor: theme.accentColor }}
                />
              </div>
              <p className="text-[11px] text-zinc-400">5–10% of UI: active milestones, micro-highlights, arrows.</p>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={theme.accentColor}
                  onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })}
                  className="w-9 h-9 rounded-lg bg-transparent cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  value={theme.accentColor}
                  onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })}
                  className="flex-1 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white font-mono text-xs uppercase"
                />
              </div>
            </div>

            {/* Light Background */}
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-zinc-200">Light Background (Warm Ivory)</label>
                <div
                  className="w-6 h-6 rounded-lg border border-white/20 shadow-xs"
                  style={{ backgroundColor: theme.lightBackground }}
                />
              </div>
              <p className="text-[11px] text-zinc-400">~40% of website: Hero background, lifecycle timeline, cards backdrop.</p>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={theme.lightBackground}
                  onChange={(e) => setTheme({ ...theme, lightBackground: e.target.value })}
                  className="w-9 h-9 rounded-lg bg-transparent cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  value={theme.lightBackground}
                  onChange={(e) => setTheme({ ...theme, lightBackground: e.target.value })}
                  className="flex-1 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white font-mono text-xs uppercase"
                />
              </div>
            </div>

            {/* Dark Background */}
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 sm:col-span-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-zinc-200">Dark Background (Very Deep Navy)</label>
                <div
                  className="w-6 h-6 rounded-lg border border-white/20 shadow-xs"
                  style={{ backgroundColor: theme.darkBackground }}
                />
              </div>
              <p className="text-[11px] text-zinc-400">Footer base background and dark mode canvas.</p>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={theme.darkBackground}
                  onChange={(e) => setTheme({ ...theme, darkBackground: e.target.value })}
                  className="w-9 h-9 rounded-lg bg-transparent cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  value={theme.darkBackground}
                  onChange={(e) => setTheme({ ...theme, darkBackground: e.target.value })}
                  className="flex-1 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white font-mono text-xs uppercase max-w-xs"
                />
              </div>
            </div>
          </div>

          {/* Controlled Component Variants Preview */}
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
            <h4 className="font-bold text-zinc-200">Controlled Component Variants Preview</h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              <div
                className="p-3 rounded-xl font-bold border"
                style={{ backgroundColor: theme.lightBackground, color: theme.primaryColor, borderColor: 'rgba(11,31,51,0.2)' }}
              >
                Light
              </div>
              <div
                className="p-3 rounded-xl font-bold border bg-white"
                style={{ color: theme.primaryColor, borderColor: 'rgba(11,31,51,0.1)' }}
              >
                White
              </div>
              <div
                className="p-3 rounded-xl font-bold text-white"
                style={{ backgroundColor: theme.darkBackground }}
              >
                Dark
              </div>
              <div
                className="p-3 rounded-xl font-bold text-white shadow-sm"
                style={{ backgroundColor: theme.primaryColor }}
              >
                Primary
              </div>
              <div
                className="p-3 rounded-xl font-bold text-zinc-950 shadow-sm"
                style={{ backgroundColor: theme.accentColor }}
              >
                Accent
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-xl shadow-md cursor-pointer"
          >
            {saving ? 'Updating Tokens...' : 'Save & Propagate Theme Tokens'}
          </button>
        </form>
      )}

      {/* TAB 3: NAVIGATION */}
      {activeTab === 'navigation' && (
        <div className="bg-[#172554]/80 border border-zinc-800 rounded-3xl p-6 space-y-4 max-w-3xl text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <h3 className="font-bold text-white text-sm">Header Navigation Links</h3>
            <button
              onClick={handleSaveNav}
              className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-xl shadow-md cursor-pointer"
            >
              Save Navigation
            </button>
          </div>

          <div className="space-y-2">
            {navigation.links?.map((link: any, idx: number) => (
              <div key={idx} className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-between gap-3">
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) => {
                    const updated = [...navigation.links];
                    updated[idx].label = e.target.value;
                    setNavigation({ ...navigation, links: updated });
                  }}
                  className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white font-bold text-xs"
                />
                <input
                  type="text"
                  value={link.href}
                  onChange={(e) => {
                    const updated = [...navigation.links];
                    updated[idx].href = e.target.value;
                    setNavigation({ ...navigation, links: updated });
                  }}
                  className="flex-1 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white font-mono text-xs"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: FOOTER */}
      {activeTab === 'footer' && (
        <div className="bg-[#172554]/80 border border-zinc-800 rounded-3xl p-6 space-y-4 max-w-3xl text-xs">
          <h3 className="font-bold text-white text-sm">Footer Disclaimer & Copyright</h3>
          <div>
            <label className="block font-bold text-zinc-300 mb-1">Legal Disclaimer</label>
            <textarea
              rows={3}
              value={footer.disclaimer || ''}
              onChange={(e) => setFooter({ ...footer, disclaimer: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white"
            />
          </div>
          <div>
            <label className="block font-bold text-zinc-300 mb-1">Copyright Statement</label>
            <input
              type="text"
              value={footer.copyright || '© 2026 ApexLedger Advisory LLP. All rights reserved.'}
              onChange={(e) => setFooter({ ...footer, copyright: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white"
            />
          </div>
        </div>
      )}

      {/* TAB 5: BACKUP */}
      {activeTab === 'backup' && (
        <div className="bg-[#172554]/80 border border-zinc-800 rounded-3xl p-6 space-y-4 max-w-2xl text-xs">
          <h3 className="font-bold text-white text-sm">Disaster Recovery & Database Snapshot</h3>
          <p className="text-zinc-400 leading-relaxed">
            Generate and export an immutable JSON backup of all pages, draft revisions, media metadata, SEO settings, audit logs, and security configuration.
          </p>
          <button
            onClick={handleDownloadBackup}
            className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-xl flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Database Snapshot</span>
          </button>
        </div>
      )}
    </div>
  );
};
