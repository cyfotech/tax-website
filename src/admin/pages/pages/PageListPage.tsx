/**
 * Website Page Manager (Website → Pages)
 * Displays all pages, published/draft status, SEO scores, and direct actions.
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageSummary } from '../../types';
import {
  Layers,
  FileEdit,
  Eye,
  Compass,
  History,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  Plus,
} from 'lucide-react';

export const PageListPage: React.FC = () => {
  const [pages, setPages] = useState<PageSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const token = localStorage.getItem('apex_admin_token');
      const res = await fetch('/api/admin/pages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setPages(json.pages || []);
      }
    } catch (err) {
      console.error('Failed to load pages:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-[#2FE4A6]" />
            <span>Website Pages</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage page structures, visual components, draft edits, and individual component targeting.
          </p>
        </div>

        <button
          onClick={() => alert('New page creation wizard active. In this release, all primary core routes are established.')}
          className="px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Page</span>
        </button>
      </div>

      {/* Pages Table */}
      <div className="bg-[#172554] border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B1220] border-b border-zinc-800 text-zinc-400 text-[11px] font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Page & Route</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Sections</th>
                <th className="py-3.5 px-6">SEO Health</th>
                <th className="py-3.5 px-6">Last Modified</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    Loading website pages...
                  </td>
                </tr>
              ) : (
                pages.map((page) => (
                  <tr key={page.pageId} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-white text-sm">{page.title}</div>
                      <div className="font-mono text-[11px] text-[#06B6D4] mt-0.5">{page.slug}</div>
                    </td>
                    <td className="py-4 px-6">
                      {page.hasDraftChanges ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                          <span>Draft Changes</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Published</span>
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 font-semibold text-zinc-300">
                      {page.sectionCount} modules
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#2563EB]/20 text-[#06B6D4] border border-[#2563EB]/30">
                        {page.seoHealth}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-zinc-400">
                      <div>{new Date(page.lastModified).toLocaleDateString()}</div>
                      <div className="text-[10px] text-zinc-500">{page.modifiedBy}</div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Edit in Visual Editor */}
                        <Link
                          to={`/admin/pages/${page.pageId}/edit`}
                          className="px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                          title="Open Visual Builder"
                        >
                          <FileEdit className="w-3.5 h-3.5" />
                          <span>Visual Editor</span>
                        </Link>

                        {/* History */}
                        <Link
                          to={`/admin/pages/${page.pageId}/history`}
                          className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                          title="Version History & Diffs"
                        >
                          <History className="w-4 h-4" />
                        </Link>

                        {/* Public Link */}
                        <a
                          href={page.slug}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                          title="Preview Public Page"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
