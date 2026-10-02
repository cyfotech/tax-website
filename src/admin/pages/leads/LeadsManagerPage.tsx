/**
 * Leads & Inquiries Pipeline Manager
 * Contact submissions, consultation requests, status tracking, and internal partner notes.
 */

import React, { useState, useEffect } from 'react';
import { LeadRecord } from '../../types';
import { Users, Search, Phone, Mail, Calendar, Building, MessageSquare, X, CheckCircle2 } from 'lucide-react';

export const LeadsManagerPage: React.FC = () => {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [internalNotes, setInternalNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, [typeFilter, statusFilter, search]);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem('apex_admin_token');
      const params = new URLSearchParams();
      if (typeFilter !== 'all') params.append('type', typeFilter);
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (search) params.append('search', search);

      const res = await fetch(`/api/admin/leads?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setLeads(json.leads || []);
      }
    } catch (e) {
      console.error('Error fetching leads:', e);
    }
  };

  const handleUpdateStatus = async (leadId: string, status: string, notes?: string) => {
    setUpdating(true);
    try {
      const token = localStorage.getItem('apex_admin_token');
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, internalNotes: notes }),
      });

      if (res.ok) {
        const json = await res.json();
        setSelectedLead(json.lead);
        fetchLeads();
      }
    } catch (e) {
      console.error('Error updating lead:', e);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 animate-pulse">NEW</span>;
      case 'in_progress':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">IN PROGRESS</span>;
      case 'contacted':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">CONTACTED</span>;
      case 'closed':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-500/20 text-zinc-400 border border-zinc-500/40">CLOSED</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-700 text-zinc-300">{status.toUpperCase()}</span>;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
          <Users className="w-6 h-6 text-[#2FE4A6]" />
          <span>Leads & Consultation Inquiries</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Review incoming client inquiries, executive consultation requests, and assign senior partner follow-up.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by client name, email, or company..."
            className="w-full h-10 pl-10 pr-4 bg-[#131C1A] border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#2FE4A6]"
          />
        </div>

        <div className="flex items-center gap-2">
          {['all', 'consultation', 'contact'].map((t) => (
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

      {/* Leads Table */}
      <div className="bg-[#172554] border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B1220] border-b border-zinc-800 text-zinc-400 text-[11px] font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Client / Company</th>
                <th className="py-3.5 px-6">Inquiry Type</th>
                <th className="py-3.5 px-6">Scope / Revenue</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Received</th>
                <th className="py-3.5 px-6 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => {
                    setSelectedLead(lead);
                    setInternalNotes(lead.internalNotes || '');
                  }}
                  className="hover:bg-zinc-800/40 cursor-pointer transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="font-bold text-white text-sm">{lead.fullName}</div>
                    <div className="text-[11px] text-zinc-400 truncate mt-0.5">{lead.email}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#2563EB]/20 text-[#06B6D4] uppercase">
                      {lead.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-zinc-300">
                    <div>{lead.companyName || 'Private Enterprise'}</div>
                    <div className="text-[10px] text-zinc-400">{lead.annualRevenue || 'Standard Engagement'}</div>
                  </td>
                  <td className="py-4 px-6">{getStatusBadge(lead.status)}</td>
                  <td className="py-4 px-6 text-zinc-400">
                    {new Date(lead.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="text-xs text-[#2FE4A6] font-bold hover:underline">
                      Inspect →
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* LEAD DETAIL MODAL */}
      {selectedLead && (
        <div className="fixed inset-y-0 right-0 w-80 sm:w-96 bg-[#131C1A] border-l border-zinc-800 shadow-2xl z-50 p-6 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Lead Record</span>
              <button onClick={() => setSelectedLead(null)} className="p-1 text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <div className="text-base font-extrabold text-white">{selectedLead.fullName}</div>
              <div className="text-xs text-[#2FE4A6] font-mono mt-0.5">{selectedLead.email}</div>
              {selectedLead.phone && (
                <div className="text-xs text-zinc-400 mt-0.5">{selectedLead.phone}</div>
              )}
            </div>

            {selectedLead.companyName && (
              <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                <div className="text-[10px] text-zinc-400 font-bold uppercase">Company & Scale</div>
                <div className="text-xs font-bold text-white mt-0.5">{selectedLead.companyName}</div>
                <div className="text-[11px] text-zinc-400">{selectedLead.annualRevenue}</div>
              </div>
            )}

            {selectedLead.preferredDate && (
              <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                <div className="text-[10px] text-zinc-400 font-bold uppercase">Requested Schedule</div>
                <div className="text-xs font-bold text-white mt-0.5">
                  {selectedLead.preferredDate} at {selectedLead.preferredTime}
                </div>
              </div>
            )}

            {selectedLead.message && (
              <div>
                <label className="block text-[11px] font-bold text-zinc-300 mb-1">Client Message / Notes</label>
                <div className="p-3 bg-zinc-900 rounded-xl text-xs text-zinc-300 border border-zinc-800 leading-relaxed">
                  {selectedLead.message}
                </div>
              </div>
            )}

            {/* Status Selector */}
            <div>
              <label className="block text-[11px] font-bold text-zinc-300 mb-1">Pipeline Status</label>
              <select
                value={selectedLead.status}
                onChange={(e) => handleUpdateStatus(selectedLead.id, e.target.value, internalNotes)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white"
              >
                <option value="new">New Inquiry</option>
                <option value="in_progress">In Progress / Reviewing</option>
                <option value="contacted">Contacted / Discovery Booked</option>
                <option value="closed">Closed / Retained Client</option>
                <option value="spam">Spam / Disqualified</option>
              </select>
            </div>

            {/* Internal Notes */}
            <div>
              <label className="block text-[11px] font-bold text-zinc-300 mb-1">Internal Partner Notes</label>
              <textarea
                rows={3}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Partner notes, discovery call outcomes..."
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white"
              />
              <button
                onClick={() => handleUpdateStatus(selectedLead.id, selectedLead.status, internalNotes)}
                disabled={updating}
                className="mt-2 w-full py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-200 rounded-lg"
              >
                Save Internal Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
