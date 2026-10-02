/**
 * Page Revision History & Rollback System
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageVersion } from '../../types';
import { History, ArrowLeft, RefreshCw, CheckCircle2, ChevronRight, RotateCcw } from 'lucide-react';

export const PageHistoryPage: React.FC = () => {
  const { pageId = 'home' } = useParams<{ pageId: string }>();
  const [versions, setVersions] = useState<PageVersion[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<PageVersion | null>(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    fetchHistory();
  }, [pageId]);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('apex_admin_token');
      const res = await fetch(`/api/admin/pages/${pageId}/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setVersions(json.versions || []);
        if (json.versions?.length > 0) {
          setSelectedVersion(json.versions[0]);
        }
      }
    } catch (e) {
      console.error('Error fetching history:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleRollback = async (versionId: string) => {
    if (!confirm('Rollback to this version? A new revision entry will record this restoration.')) return;
    try {
      const token = localStorage.getItem('apex_admin_token');
      const res = await fetch(`/api/admin/pages/${pageId}/rollback/${versionId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setNotification('Page successfully rolled back to selected revision.');
        fetchHistory();
        setTimeout(() => setNotification(''), 4000);
      }
    } catch (e) {
      console.error('Rollback error:', e);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            to={`/admin/pages/${pageId}/edit`}
            className="text-xs font-bold text-zinc-400 hover:text-white flex items-center gap-1 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Visual Editor</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
            <History className="w-6 h-6 text-[#06B6D4]" />
            <span>Version History: {pageId.toUpperCase()}</span>
          </h1>
        </div>

        {notification && (
          <span className="text-xs font-bold text-[#06B6D4] bg-[#2563EB]/20 border border-[#2563EB] px-3 py-1.5 rounded-xl">
            {notification}
          </span>
        )}
      </div>

      {/* Grid: Version List & Version Inspection Diff */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 bg-[#172554] border border-zinc-800 rounded-3xl p-4 divide-y divide-zinc-800/80">
          <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 px-2">
            Revision Timeline ({versions.length})
          </div>

          {versions.map((ver) => {
            const isSelected = selectedVersion?.id === ver.id;
            return (
              <div
                key={ver.id}
                onClick={() => setSelectedVersion(ver)}
                className={`py-3 px-3 rounded-xl cursor-pointer text-xs transition-colors ${
                  isSelected ? 'bg-[#2563EB]/20 border border-[#2563EB] text-white' : 'hover:bg-zinc-800/50 text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-white">
                  <span>Revision #{ver.versionNumber}</span>
                  <span className="text-[10px] text-zinc-400">
                    {new Date(ver.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400 mt-1 truncate">{ver.changeSummary}</div>
                <div className="text-[10px] text-[#06B6D4] mt-0.5">Author: {ver.modifiedBy}</div>
              </div>
            );
          })}
        </div>

        {/* Selected Version Detail */}
        <div className="lg:col-span-8 bg-[#172554] border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between">
          {selectedVersion ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div>
                  <h3 className="text-base font-extrabold text-white">
                    Revision #{selectedVersion.versionNumber} Details
                  </h3>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    Saved by {selectedVersion.modifiedBy} on {new Date(selectedVersion.timestamp).toLocaleString()}
                  </div>
                </div>

                <button
                  onClick={() => handleRollback(selectedVersion.id)}
                  className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-md cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restore This Revision</span>
                </button>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white mb-2">Change Description</h4>
                <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-xs text-zinc-300">
                  {selectedVersion.changeSummary}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white mb-2">Included Modules ({selectedVersion.sections?.length || 0})</h4>
                <div className="space-y-2">
                  {selectedVersion.sections?.map((sec: any) => (
                    <div key={sec.sectionId} className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-xs flex items-center justify-between">
                      <span className="font-bold text-white capitalize">{sec.type}</span>
                      <span className="font-mono text-[10px] text-zinc-500">#{sec.sectionId}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-zinc-500">Select a revision to inspect</div>
          )}
        </div>
      </div>
    </div>
  );
};
