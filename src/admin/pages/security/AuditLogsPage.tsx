/**
 * Append-Only Security & Administrative Audit Log Viewer
 * Filters by Risk Level, Actor, Action, Date, with Red High/Critical Highlighting.
 */

import React, { useState, useEffect } from 'react';
import { AuditEvent } from '../../types';
import { History, Search, Filter, ShieldAlert, ArrowUpDown, X, CheckCircle2 } from 'lucide-react';

export const AuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditEvent[]>([]);
  const [total, setTotal] = useState(0);
  const [riskFilter, setRiskFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedLog, setSelectedLog] = useState<AuditEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, [riskFilter, search]);

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem('apex_admin_token');
      const params = new URLSearchParams();
      if (riskFilter !== 'all') params.append('riskLevel', riskFilter);
      if (search) params.append('search', search);

      const res = await fetch(`/api/admin/logs?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setLogs(json.logs || []);
        setTotal(json.total || 0);
      }
    } catch (e) {
      console.error('Error fetching logs:', e);
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'CRITICAL':
      case 'HIGH':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse">
            🔴 {risk}
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            {risk}
          </span>
        );
      case 'LOW':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
            {risk}
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            INFO
          </span>
        );
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
          <History className="w-6 h-6 text-[#2FE4A6]" />
          <span>Security & System Audit Logs</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Append-only immutable record of all administrative edits, publishing, authentications, and threat signals.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search logs by action, actor, resource, IP address, or event ID..."
            className="w-full h-10 pl-10 pr-4 bg-[#131C1A] border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#2FE4A6]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['all', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFO'].map((r) => (
            <button
              key={r}
              onClick={() => setRiskFilter(r)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors border cursor-pointer ${
                riskFilter === r
                  ? 'bg-[#2563EB] border-[#2563EB] text-white'
                  : 'bg-[#172554] border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-[#172554] border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111917] border-b border-zinc-800 text-zinc-400 text-[11px] font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Timestamp & Event ID</th>
                <th className="py-3.5 px-6">Actor / User</th>
                <th className="py-3.5 px-6">Action / Event</th>
                <th className="py-3.5 px-6">Resource Target</th>
                <th className="py-3.5 px-6">Risk Level</th>
                <th className="py-3.5 px-6">Source IP</th>
                <th className="py-3.5 px-6 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {logs.map((log) => {
                const isHighRisk = log.riskLevel === 'HIGH' || log.riskLevel === 'CRITICAL';
                return (
                  <tr
                    key={log.id}
                    onClick={() => setSelectedLog(log)}
                    className={`cursor-pointer transition-colors ${
                      isHighRisk
                        ? 'bg-red-500/5 hover:bg-red-500/10'
                        : 'hover:bg-zinc-800/40'
                    }`}
                  >
                    <td className="py-3.5 px-6 font-mono text-[11px]">
                      <div className="text-zinc-300">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </div>
                      <div className="text-zinc-500 text-[10px]">{log.id}</div>
                    </td>
                    <td className="py-3.5 px-6">
                      <div className="font-bold text-white">{log.actorName}</div>
                      <div className="text-[10px] text-zinc-500 capitalize">{log.role}</div>
                    </td>
                    <td className="py-3.5 px-6 font-bold text-white">
                      {log.action.replace(/_/g, ' ')}
                    </td>
                    <td className="py-3.5 px-6 font-mono text-zinc-400 text-[11px] truncate max-w-xs">
                      {log.resource}
                    </td>
                    <td className="py-3.5 px-6">{getRiskBadge(log.riskLevel)}</td>
                    <td className="py-3.5 px-6 font-mono text-zinc-400">{log.ip}</td>
                    <td className="py-3.5 px-6 text-right">
                      <span className="text-xs text-[#2FE4A6] font-bold hover:underline">
                        View →
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* AUDIT EVENT DETAIL MODAL */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#131C1A] border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div>
                <span className="text-xs font-bold text-white uppercase tracking-wider">Audit Event Forensic Record</span>
                <div className="font-mono text-xs text-[#2FE4A6] mt-0.5">{selectedLog.id}</div>
              </div>
              <button onClick={() => setSelectedLog(null)} className="p-1 text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                <div className="text-[10px] text-zinc-500 font-bold uppercase">Timestamp</div>
                <div className="font-mono text-zinc-200 mt-0.5">{selectedLog.timestamp}</div>
              </div>
              <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                <div className="text-[10px] text-zinc-500 font-bold uppercase">Risk Classification</div>
                <div className="mt-0.5">{getRiskBadge(selectedLog.riskLevel)}</div>
              </div>
              <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                <div className="text-[10px] text-zinc-500 font-bold uppercase">Actor</div>
                <div className="font-bold text-white mt-0.5">{selectedLog.actorName} ({selectedLog.role})</div>
              </div>
              <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                <div className="text-[10px] text-zinc-500 font-bold uppercase">Source IP Address</div>
                <div className="font-mono text-zinc-200 mt-0.5">{selectedLog.ip}</div>
              </div>
            </div>

            {selectedLog.detectionSignal && (
              <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-xs">
                <div className="text-[10px] text-zinc-500 font-bold uppercase">Detection Reason / Signal</div>
                <div className="font-mono text-[#2FE4A6] mt-0.5">{selectedLog.detectionSignal}</div>
              </div>
            )}

            {/* Field Diff if Content Edit */}
            {selectedLog.previousValue && (
              <div className="space-y-2 text-xs">
                <div className="text-[10px] font-bold text-zinc-400 uppercase">Field Comparison (Diff)</div>
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 font-mono text-[11px]">
                  - PREVIOUS: {selectedLog.previousValue}
                </div>
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 font-mono text-[11px]">
                  + NEW: {selectedLog.newValue}
                </div>
              </div>
            )}

            {selectedLog.details && (
              <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-xs">
                <div className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Payload Details</div>
                <pre className="font-mono text-[11px] text-zinc-300 overflow-x-auto">
                  {JSON.stringify(selectedLog.details, null, 2)}
                </pre>
              </div>
            )}

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-200 rounded-xl"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
