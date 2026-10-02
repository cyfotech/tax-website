/**
 * Security Monitoring & Alert Center (Security → Alerts)
 * Server-side driven incidents with RED HIGH/CRITICAL visual treatment and investigation notes.
 */

import React, { useState, useEffect } from 'react';
import { SecurityIncident } from '../../types';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Eye,
  FileText,
  Lock,
  X,
} from 'lucide-react';

export const SecurityAlertsPage: React.FC = () => {
  const [incidents, setIncidents] = useState<SecurityIncident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<SecurityIncident | null>(null);
  const [investigationNote, setInvestigationNote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const token = localStorage.getItem('apex_admin_token');
      const res = await fetch('/api/admin/security/incidents', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setIncidents(json.incidents || []);
        if (json.incidents?.length > 0 && !selectedIncident) {
          setSelectedIncident(json.incidents[0]);
        }
      }
    } catch (e) {
      console.error('Error fetching incidents:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: string, note?: string) => {
    try {
      const token = localStorage.getItem('apex_admin_token');
      const res = await fetch(`/api/admin/security/incidents/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, note }),
      });

      if (res.ok) {
        setInvestigationNote('');
        fetchIncidents();
      }
    } catch (e) {
      console.error('Error updating incident:', e);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
          <ShieldAlert className="w-6 h-6 text-red-500" />
          <span>Security Alert & Incident Center</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Server-side threat monitoring, rate-limit defense signals, automated deduplication, and investigation response.
        </p>
      </div>

      {/* Incidents List & Incident Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Incidents List */}
        <div className="lg:col-span-5 bg-[#131C1A] border border-zinc-800 rounded-3xl p-4 divide-y divide-zinc-800/80">
          <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 px-2">
            Active Threat Incidents ({incidents.length})
          </div>

          {incidents.map((inc) => {
            const isSelected = selectedIncident?.id === inc.id;
            const isHigh = inc.severity === 'HIGH' || inc.severity === 'CRITICAL';

            return (
              <div
                key={inc.id}
                onClick={() => setSelectedIncident(inc)}
                className={`p-3.5 rounded-2xl cursor-pointer text-xs transition-all my-1.5 ${
                  isSelected
                    ? isHigh
                      ? 'bg-red-500/15 border-2 border-red-500 text-white shadow-lg'
                      : 'bg-[#2563EB]/20 border-2 border-[#2563EB] text-white'
                    : isHigh
                    ? 'bg-red-500/5 border border-red-500/30 text-zinc-200 hover:border-red-500/60'
                    : 'bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-white flex items-center gap-1.5">
                    {isHigh && <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />}
                    <span>{inc.id}</span>
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isHigh
                        ? 'bg-red-500 text-white'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {inc.severity}
                  </span>
                </div>

                <div className="font-bold text-white mt-1.5 line-clamp-1">{inc.title}</div>
                <div className="text-[11px] text-zinc-400 mt-1 line-clamp-2">{inc.summary}</div>

                <div className="flex items-center justify-between text-[10px] text-zinc-500 mt-2.5 pt-2 border-t border-zinc-800">
                  <span>Source: {inc.sourceIp}</span>
                  <span className="font-bold text-[#2FE4A6] uppercase">{inc.status.replace(/_/g, ' ')}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Incident Investigation Detail */}
        <div className="lg:col-span-7 bg-[#131C1A] border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between">
          {selectedIncident ? (
            <div className="space-y-5">
              <div className="flex items-start justify-between pb-4 border-b border-zinc-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-extrabold text-white font-mono">{selectedIncident.id}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        selectedIncident.severity === 'HIGH' || selectedIncident.severity === 'CRITICAL'
                          ? 'bg-red-500 text-white animate-pulse'
                          : 'bg-amber-500 text-black'
                      }`}
                    >
                      {selectedIncident.severity}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mt-1">{selectedIncident.title}</h3>
                </div>

                {/* Status Switcher */}
                <select
                  value={selectedIncident.status}
                  onChange={(e) => handleUpdateStatus(selectedIncident.id, e.target.value)}
                  className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white"
                >
                  <option value="new">Status: New</option>
                  <option value="acknowledged">Acknowledged</option>
                  <option value="investigating">Investigating</option>
                  <option value="resolved">Resolved</option>
                  <option value="false_positive">False Positive</option>
                </select>
              </div>

              {/* Summary */}
              <div>
                <div className="text-[11px] uppercase font-bold text-zinc-400 mb-1">Threat Signal Summary</div>
                <div className="p-3.5 bg-zinc-900 rounded-xl border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
                  {selectedIncident.summary}
                </div>
              </div>

              {/* Source & Timeline */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                  <div className="text-[10px] text-zinc-500 font-bold uppercase">Detected At</div>
                  <div className="font-mono text-zinc-300 mt-0.5">
                    {new Date(selectedIncident.detectedAt).toLocaleString()}
                  </div>
                </div>

                <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                  <div className="text-[10px] text-zinc-500 font-bold uppercase">Source IP Address</div>
                  <div className="font-mono text-red-400 font-bold mt-0.5">{selectedIncident.sourceIp}</div>
                </div>
              </div>

              {/* Investigation Notes */}
              <div>
                <div className="text-[11px] uppercase font-bold text-zinc-400 mb-1">
                  Investigation Journal & Forensic Notes
                </div>
                <div className="space-y-1.5 mb-2">
                  {selectedIncident.investigationNotes?.map((note, idx) => (
                    <div key={idx} className="p-2.5 bg-zinc-900/90 rounded-lg text-xs text-zinc-300 font-mono border border-zinc-800">
                      {note}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={investigationNote}
                    onChange={(e) => setInvestigationNote(e.target.value)}
                    placeholder="Add security analyst note..."
                    className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white"
                  />
                  <button
                    onClick={() =>
                      handleUpdateStatus(selectedIncident.id, selectedIncident.status, investigationNote)
                    }
                    className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white rounded-xl"
                  >
                    Add Note
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-zinc-500">Select an incident to view details</div>
          )}
        </div>
      </div>
    </div>
  );
};
