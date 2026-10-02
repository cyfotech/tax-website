/**
 * Complete SEO & OpenGraph Management Suite
 * Page-level meta tags, SERP preview, Social Share card, redirects, and sitemap.
 */

import React, { useState, useEffect } from 'react';
import {
  Compass,
  Search,
  Share2,
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';

export const SeoManagerPage: React.FC = () => {
  const [overview, setOverview] = useState<any>(null);
  const [redirects, setRedirects] = useState<any[]>([]);
  const [selectedPage, setSelectedPage] = useState<any>(null);
  const [newRedirectSource, setNewRedirectSource] = useState('');
  const [newRedirectTarget, setNewRedirectTarget] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSeoData();
    fetchRedirects();
  }, []);

  const fetchSeoData = async () => {
    try {
      const token = localStorage.getItem('apex_admin_token');
      const res = await fetch('/api/admin/seo', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setOverview(json.overview);
        if (json.overview?.items?.length > 0 && !selectedPage) {
          setSelectedPage(json.overview.items[0]);
        }
      }
    } catch (e) {
      console.error('Error fetching SEO:', e);
    }
  };

  const fetchRedirects = async () => {
    try {
      const token = localStorage.getItem('apex_admin_token');
      const res = await fetch('/api/admin/seo/redirects', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setRedirects(json.redirects || []);
      }
    } catch (e) {
      console.error('Error fetching redirects:', e);
    }
  };

  const handleSavePageSeo = async () => {
    if (!selectedPage) return;
    setSaving(true);
    try {
      const token = localStorage.getItem('apex_admin_token');
      const res = await fetch(`/api/admin/seo/${selectedPage.pageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          seo: {
            title: selectedPage.seoTitle,
            description: selectedPage.seoDescription,
            canonical: selectedPage.canonical,
            robotsIndex: selectedPage.robotsIndex,
            robotsFollow: selectedPage.robotsFollow,
            ogTitle: selectedPage.ogTitle,
            ogDescription: selectedPage.ogDescription,
            ogImage: selectedPage.ogImage,
          },
        }),
      });

      if (res.ok) {
        setStatusMessage('SEO metadata updated.');
        fetchSeoData();
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (e) {
      console.error('Error saving SEO:', e);
    } finally {
      setSaving(false);
    }
  };

  const handleAddRedirect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRedirectSource || !newRedirectTarget) return;

    try {
      const token = localStorage.getItem('apex_admin_token');
      const res = await fetch('/api/admin/seo/redirects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          source: newRedirectSource,
          target: newRedirectTarget,
          statusCode: 301,
        }),
      });
      if (res.ok) {
        setNewRedirectSource('');
        setNewRedirectTarget('');
        fetchRedirects();
      }
    } catch (e) {
      console.error('Error adding redirect:', e);
    }
  };

  const handleDeleteRedirect = async (id: string) => {
    try {
      const token = localStorage.getItem('apex_admin_token');
      await fetch(`/api/admin/seo/redirects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRedirects();
    } catch (e) {
      console.error('Error deleting redirect:', e);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
            <Compass className="w-6 h-6 text-[#2FE4A6]" />
            <span>SEO & OpenGraph Architecture</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Configure Google SERP metadata, OpenGraph social share previews, automated sitemap, and 301 redirects.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-300 rounded-xl flex items-center gap-1.5 transition-colors border border-zinc-700"
          >
            <span>View /sitemap.xml</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-[#2563EB]/20 border border-[#2563EB] text-[#06B6D4] rounded-xl text-xs font-bold">
          {statusMessage}
        </div>
      )}

      {/* Grid: Page Selector on Left, Editor + Previews on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Pages List */}
        <div className="lg:col-span-4 bg-[#172554] border border-zinc-800 rounded-3xl p-4 divide-y divide-zinc-800/80">
          <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 px-2">
            Managed Routes ({overview?.items?.length || 0})
          </div>

          {overview?.items?.map((item: any) => {
            const isSelected = selectedPage?.pageId === item.pageId;
            return (
              <div
                key={item.pageId}
                onClick={() => setSelectedPage(item)}
                className={`py-3 px-3 rounded-xl cursor-pointer text-xs transition-colors flex items-center justify-between ${
                  isSelected ? 'bg-[#2563EB]/20 border border-[#2563EB] text-white' : 'hover:bg-zinc-800/50 text-zinc-400'
                }`}
              >
                <div className="truncate">
                  <div className="font-bold text-white truncate">{item.title}</div>
                  <div className="text-[10px] font-mono text-[#06B6D4] mt-0.5 truncate">{item.slug}</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#2563EB]/20 text-[#06B6D4] border border-[#2563EB]/30 shrink-0 ml-2">
                  {item.score}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Right Column: SEO Editor & Live SERP / Social Previews */}
        <div className="lg:col-span-8 space-y-6">
          {selectedPage ? (
            <div className="bg-[#172554] border border-zinc-800 rounded-3xl p-6 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div>
                  <h3 className="text-base font-extrabold text-white">SEO Settings: {selectedPage.title}</h3>
                  <div className="text-xs text-zinc-400 font-mono mt-0.5">{selectedPage.slug}</div>
                </div>

                <button
                  onClick={handleSavePageSeo}
                  disabled={saving}
                  className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Save SEO Metadata'}
                </button>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 gap-4 text-xs">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-zinc-300">Google SEO Title</label>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {selectedPage.seoTitle?.length || 0}/60 characters
                    </span>
                  </div>
                  <input
                    type="text"
                    value={selectedPage.seoTitle || ''}
                    onChange={(e) => setSelectedPage({ ...selectedPage, seoTitle: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-[#2FE4A6]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-zinc-300">Meta Description</label>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {selectedPage.seoDescription?.length || 0}/160 characters
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={selectedPage.seoDescription || ''}
                    onChange={(e) => setSelectedPage({ ...selectedPage, seoDescription: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-[#2FE4A6]"
                  />
                </div>

                {/* Robots & Canonical */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-zinc-300 mb-1">Canonical URL</label>
                    <input
                      type="text"
                      value={selectedPage.canonical || ''}
                      onChange={(e) => setSelectedPage({ ...selectedPage, canonical: e.target.value })}
                      placeholder="https://apexledger.com/services"
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white font-mono text-[11px]"
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-6">
                    <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                      <input
                        type="checkbox"
                        checked={selectedPage.robotsIndex}
                        onChange={(e) => setSelectedPage({ ...selectedPage, robotsIndex: e.target.checked })}
                        className="rounded bg-zinc-900 border-zinc-700 text-[#2563EB]"
                      />
                      <span>Allow Indexing (index)</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* LIVE GOOGLE SERP PREVIEW */}
              <div className="mt-6 pt-5 border-t border-zinc-800">
                <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-2 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-[#2FE4A6]" />
                  <span>Google Search Result Snippet Preview</span>
                </div>
                <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-300 dark:border-zinc-800 shadow-sm max-w-xl">
                  <div className="text-[11px] text-[#202124] dark:text-zinc-400 flex items-center gap-1.5">
                    <span>https://apexledger.com{selectedPage.slug}</span>
                  </div>
                  <div className="text-base text-[#1a0dab] dark:text-[#8ab4f8] font-medium hover:underline cursor-pointer truncate mt-0.5">
                    {selectedPage.seoTitle || 'ApexLedger Corporate Accounting & Advisory'}
                  </div>
                  <div className="text-xs text-[#4d5156] dark:text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                    {selectedPage.seoDescription || 'Strategic corporate bookkeeping, multi-entity tax reduction, and senior partner-led outsourced CFO support.'}
                  </div>
                </div>
              </div>

              {/* LIVE SOCIAL SHARE CARD PREVIEW */}
              <div className="mt-6 pt-5 border-t border-zinc-800">
                <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-2 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn & Twitter Social Card Preview</span>
                </div>
                <div className="rounded-2xl border border-zinc-700/80 bg-zinc-900 max-w-md overflow-hidden">
                  <div className="h-36 bg-gradient-to-br from-[#172554] to-[#0B1220] border-b border-[#2563EB]/40 flex items-center justify-center text-white font-extrabold text-xl p-4 text-center">
                    {selectedPage.title}
                  </div>
                  <div className="p-3 text-xs">
                    <div className="text-[10px] text-zinc-500 uppercase font-mono">apexledger.com</div>
                    <div className="font-bold text-white truncate mt-0.5">{selectedPage.seoTitle || selectedPage.title}</div>
                    <div className="text-[11px] text-zinc-400 line-clamp-2 mt-0.5">{selectedPage.seoDescription}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-zinc-500">Select a page on the left</div>
          )}

          {/* REDIRECTS MANAGER */}
          <div className="bg-[#172554] border border-zinc-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-extrabold text-white">301 / 302 URL Redirects Manager</h3>
            <p className="text-xs text-zinc-400">
              Preserve link equity and prevent 404 errors when modifying public URL structures.
            </p>

            <form onSubmit={handleAddRedirect} className="flex gap-2">
              <input
                type="text"
                value={newRedirectSource}
                onChange={(e) => setNewRedirectSource(e.target.value)}
                placeholder="/old-path"
                className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white font-mono"
                required
              />
              <span className="text-zinc-500 self-center">→</span>
              <input
                type="text"
                value={newRedirectTarget}
                onChange={(e) => setNewRedirectTarget(e.target.value)}
                placeholder="/new-destination"
                className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white font-mono"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Redirect</span>
              </button>
            </form>

            <div className="divide-y divide-zinc-800/80 pt-2">
              {redirects.map((r) => (
                <div key={r.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="font-mono text-zinc-300">
                    <span className="text-amber-400">{r.source}</span>
                    <span className="text-zinc-500 mx-2">→ 301 →</span>
                    <span className="text-emerald-400">{r.target}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-zinc-500">{r.hitCount || 0} hits</span>
                    <button onClick={() => handleDeleteRedirect(r.id)} className="text-zinc-500 hover:text-red-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
