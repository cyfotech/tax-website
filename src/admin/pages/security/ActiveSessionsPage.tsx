/**
 * Active Sessions & Administrative Login History
 */

import React, { useState, useEffect } from 'react';
import { KeyRound, ShieldCheck, Trash2, Smartphone, Monitor } from 'lucide-react';

export const ActiveSessionsPage: React.FC = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem('apex_admin_token');
      const res = await fetch('/api/admin/auth/sessions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setSessions(json.sessions || []);
      }
    } catch (e) {
      console.error('Error fetching sessions:', e);
    }
  };

  const handleRevoke = async (sessionId: string) => {
    if (!confirm('Revoke this session immediately?')) return;
    try {
      const token = localStorage.getItem('apex_admin_token');
      const res = await fetch('/api/admin/auth/revoke-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sessionId }),
      });
      if (res.ok) {
        setStatusMessage('Session revoked.');
        fetchSessions();
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (e) {
      console.error('Error revoking session:', e);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
          <KeyRound className="w-6 h-6 text-[#2FE4A6]" />
          <span>Active Administrative Sessions</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Inspect currently authenticated sessions and revoke suspicious or stale tokens.
        </p>
      </div>

      {statusMessage && (
        <div className="p-3 bg-[#2563EB]/20 border border-[#2563EB] text-[#06B6D4] rounded-xl text-xs font-bold">
          {statusMessage}
        </div>
      )}

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sessions.map((sess) => (
          <div
            key={sess.id}
            className="p-5 rounded-2xl bg-[#172554] border border-zinc-800 flex items-start justify-between text-xs"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4] animate-pulse" />
                <span className="font-bold text-white text-sm">{sess.username}</span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#2563EB]/20 text-[#06B6D4] uppercase">
                  {sess.role}
                </span>
              </div>

              <div className="text-zinc-400 font-mono text-[11px] truncate max-w-xs">
                IP: {sess.ip} • Session ID: {sess.id}
              </div>
              <div className="text-[11px] text-zinc-500">
                Created: {new Date(sess.createdAt).toLocaleString()}
              </div>
            </div>

            <button
              onClick={() => handleRevoke(sess.id)}
              className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Revoke</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
