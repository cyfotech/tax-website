/**
 * Media Library & Asset Manager
 * Grid/List preview, upload modal, metadata editing, and deletion usage tracking.
 */

import React, { useState, useEffect } from 'react';
import { MediaAsset } from '../../types';
import {
  Image as ImageIcon,
  Upload,
  Search,
  Filter,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Copy,
  Layers,
  X,
} from 'lucide-react';

export const MediaLibraryPage: React.FC = () => {
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadFilename, setUploadFilename] = useState('');
  const [uploadMime, setUploadMime] = useState('image/svg+xml');
  const [uploadBase64, setUploadBase64] = useState('');
  const [uploadAlt, setUploadAlt] = useState('');
  const [uploadType, setUploadType] = useState<'image' | 'svg' | 'video' | 'animation'>('image');
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    fetchMedia();
  }, [typeFilter, search]);

  const fetchMedia = async () => {
    try {
      const token = localStorage.getItem('apex_admin_token');
      const params = new URLSearchParams();
      if (typeFilter !== 'all') params.append('type', typeFilter);
      if (search) params.append('search', search);

      const res = await fetch(`/api/admin/media?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setMedia(json.media || []);
      }
    } catch (e) {
      console.error('Error fetching media:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFilename) return;

    try {
      const token = localStorage.getItem('apex_admin_token');
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          filename: uploadFilename,
          mimeType: uploadMime,
          base64Data: uploadBase64 || '/media/' + uploadFilename,
          altText: uploadAlt,
          type: uploadType,
        }),
      });

      if (res.ok) {
        setUploadModalOpen(false);
        setUploadFilename('');
        setUploadAlt('');
        setStatusMessage('Media asset uploaded successfully.');
        fetchMedia();
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleDelete = async (asset: MediaAsset) => {
    if (asset.usageLocations && asset.usageLocations.length > 0) {
      const confirmForce = confirm(
        `WARNING: This visual is currently used in ${asset.usageLocations.length} locations:\n` +
          asset.usageLocations.map((u) => `• ${u.label}`).join('\n') +
          '\n\nDeleting will cause broken visuals on the live site. Delete anyway?'
      );
      if (!confirmForce) return;
    } else {
      if (!confirm(`Permanently delete "${asset.filename}"?`)) return;
    }

    try {
      const token = localStorage.getItem('apex_admin_token');
      const res = await fetch(`/api/admin/media/${asset.id}?force=true`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setSelectedAsset(null);
        setStatusMessage(`Asset "${asset.filename}" deleted.`);
        fetchMedia();
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (e) {
      console.error('Delete error:', e);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
            <ImageIcon className="w-6 h-6 text-[#2FE4A6]" />
            <span>Media Library & Visual Assets</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Central repository for SVG illustrations, animated graphics, photos, and corporate brand assets.
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md transition-colors cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Media Asset</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3 bg-[#2563EB]/20 border border-[#2563EB] text-[#06B6D4] rounded-xl text-xs font-bold">
          {statusMessage}
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assets by filename, alt text, or label..."
            className="w-full h-10 pl-10 pr-4 bg-[#172554] border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#06B6D4]"
          />
        </div>

        <div className="flex items-center gap-2">
          {['all', 'animation', 'svg', 'image', 'video'].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-2 rounded-xl text-xs font-bold capitalize transition-colors border cursor-pointer ${
                typeFilter === t
                  ? 'bg-[#2563EB] border-[#2563EB] text-white'
                  : 'bg-[#172554] border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((asset) => {
          const hasUsage = asset.usageLocations && asset.usageLocations.length > 0;
          return (
            <div
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              className="bg-[#172554] border border-zinc-800 hover:border-[#2563EB] rounded-2xl overflow-hidden cursor-pointer group transition-all flex flex-col justify-between"
            >
              {/* Asset Preview Frame */}
              <div className="h-36 bg-zinc-900 flex items-center justify-center p-4 relative overflow-hidden">
                <div className="w-16 h-16 rounded-xl bg-[#2563EB]/20 border border-[#2563EB]/40 flex items-center justify-center text-[#06B6D4] font-bold text-lg">
                  {asset.type.toUpperCase().slice(0, 3)}
                </div>
                {hasUsage && (
                  <span className="absolute top-2 right-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    {asset.usageLocations!.length} In Use
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-3 text-xs">
                <div className="font-bold text-white truncate">{asset.originalName || asset.filename}</div>
                <div className="text-[10px] text-zinc-400 mt-0.5 truncate">{asset.altText}</div>
                <div className="flex items-center justify-between text-[10px] text-zinc-500 mt-2 pt-2 border-t border-zinc-800/80">
                  <span>{(asset.size / 1024).toFixed(1)} KB</span>
                  <span className="uppercase font-mono">{asset.mimeType.split('/')[1]}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ASSET DETAIL DRAWER */}
      {selectedAsset && (
        <div className="fixed inset-y-0 right-0 w-80 sm:w-96 bg-[#131C1A] border-l border-zinc-800 shadow-2xl z-50 p-6 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Asset Properties</span>
              <button onClick={() => setSelectedAsset(null)} className="p-1 text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <div className="text-sm font-bold text-white">{selectedAsset.originalName}</div>
              <div className="text-[11px] font-mono text-[#2FE4A6] mt-0.5">{selectedAsset.filename}</div>
            </div>

            {/* Usage Tracking Card */}
            <div className="p-3.5 bg-zinc-900 rounded-xl border border-zinc-800">
              <div className="text-xs font-bold text-white flex items-center justify-between mb-2">
                <span>Usage Locations</span>
                <span className="text-[10px] text-zinc-400">
                  {selectedAsset.usageLocations?.length || 0} active
                </span>
              </div>
              {selectedAsset.usageLocations && selectedAsset.usageLocations.length > 0 ? (
                <div className="space-y-1.5">
                  {selectedAsset.usageLocations.map((loc, idx) => (
                    <div key={idx} className="p-2 bg-zinc-800/60 rounded-lg text-[11px] text-zinc-300 flex items-center justify-between">
                      <span>{loc.label}</span>
                      <span className="text-[9px] font-mono text-zinc-400">{loc.pageId}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-[11px] text-zinc-500">Not actively embedded in any published page.</div>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-300 mb-1">Alt Text</label>
              <div className="p-2.5 bg-zinc-900 rounded-xl text-xs text-zinc-300 border border-zinc-800">
                {selectedAsset.altText || 'None provided'}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800">
            <button
              onClick={() => handleDelete(selectedAsset)}
              className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Media Asset</span>
            </button>
          </div>
        </div>
      )}

      {/* UPLOAD MODAL */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleFileUpload} className="w-full max-w-md bg-[#131C1A] border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <h3 className="text-sm font-bold text-white">Upload New Media Asset</h3>
              <button type="button" onClick={() => setUploadModalOpen(false)} className="text-zinc-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Asset Filename</label>
              <input
                type="text"
                value={uploadFilename}
                onChange={(e) => setUploadFilename(e.target.value)}
                placeholder="executive-dashboard-illustration.svg"
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Visual Asset Type</label>
              <select
                value={uploadType}
                onChange={(e: any) => setUploadType(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white"
              >
                <option value="svg">Vector Graphic (SVG)</option>
                <option value="animation">Supported Interactive Animation</option>
                <option value="image">Standard Image (PNG / WebP / JPEG)</option>
                <option value="video">MP4 Video Stream</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Accessibility Description (Alt Text)</label>
              <input
                type="text"
                value={uploadAlt}
                onChange={(e) => setUploadAlt(e.target.value)}
                placeholder="Senior accounting partners reviewing multi-currency ledger"
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setUploadModalOpen(false)}
                className="px-4 py-2 bg-zinc-800 text-xs font-bold text-zinc-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-bold text-white rounded-xl shadow-md cursor-pointer"
              >
                Upload & Register
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
