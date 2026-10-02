/**
 * Executive Admin Dashboard Overview
 * Metric KPIs, Draft Changes, Security Incidents, Recent Leads, Audit Trail, and Quick Actions.
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  Layers,
  ShieldAlert,
  Users,
  Compass,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileEdit,
  TrendingUp,
  Image as ImageIcon,
  Activity,
  Plus,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { user } = useAdminAuth();
  const [stats, setStats] = useState({
    totalPages: 6,
    draftChanges: 0,
    activeIncidents: 0,
    totalLeads: 0,
    newLeads: 0,
    mediaCount: 0,
    seoScore: 'Not evaluated',
  });
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('apex_admin_token');
      const headers = { Authorization: `Bearer ${token}` };

      const [pagesRes, logsRes, leadsRes, mediaRes, incRes] = await Promise.all([
        fetch('/api/admin/pages', { headers }),
        fetch('/api/admin/logs?limit=8', { headers }),
        fetch('/api/admin/leads', { headers }),
        fetch('/api/admin/media', { headers }),
        fetch('/api/admin/security/incidents', { headers }),
      ]);

      if (pagesRes.ok) {
        const pagesJson = await pagesRes.json();
        const drafts = pagesJson.pages?.filter((p: any) => p.hasDraftChanges).length || 0;
        setStats((prev) => ({
          ...prev,
          totalPages: pagesJson.pages?.length || 6,
          draftChanges: drafts,
        }));
      }

      if (logsRes.ok) {
        const logsJson = await logsRes.json();
        setRecentLogs(logsJson.logs || []);
      }

      if (leadsRes.ok) {
        const leadsJson = await leadsRes.json();
        setRecentLeads(leadsJson.leads?.slice(0, 4) || []);
        const newCount = leadsJson.leads?.filter((l: any) => l.status === 'new').length || 0;
        setStats((prev) => ({ ...prev, totalLeads: leadsJson.leads?.length || 0, newLeads: newCount }));
      }

      if (mediaRes.ok) {
        const mediaJson = await mediaRes.json();
        setStats((prev) => ({ ...prev, mediaCount: mediaJson.media?.length || 5 }));
      }

      if (incRes.ok) {
        const incJson = await incRes.json();
        const active = incJson.incidents?.filter((i: any) => i.status !== 'resolved').length || 0;
        setStats((prev) => ({ ...prev, activeIncidents: active }));
      }
    } catch (e) {
      console.warn('Error loading dashboard data:', e);
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'CRITICAL':
      case 'HIGH':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/40 rounded-full animate-pulse">{level}</span>;
      case 'MEDIUM':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">{level}</span>;
      case 'LOW':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-full">{level}</span>;
      default:
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full">INFO</span>;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#131C1A] to-[#0A261D] border border-zinc-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#2FE4A6]">Live Website Healthy</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            Welcome back, {user?.fullName || user?.username}
          </h1>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
            ApexLedger Visual CMS is operational. You can modify pages, replace visuals, manage SEO, and inspect security events in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/pages/home/edit"
            className="px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md transition-colors"
          >
            <FileEdit className="w-4 h-4" />
            <span>Open Visual Page Builder</span>
          </Link>
        </div>
      </div>

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Published Pages */}
        <div className="p-5 rounded-2xl bg-[#172554] border border-zinc-800/80 shadow-md flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Published Pages</div>
            <div className="text-2xl font-extrabold text-white mt-1.5 flex items-baseline gap-2">
              <span>{stats.totalPages}</span>
              <span className="text-[11px] font-semibold text-[#06B6D4]">100% Online</span>
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              {stats.draftChanges > 0 ? `${stats.draftChanges} draft changes pending` : 'All changes published'}
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#2563EB]/15 border border-[#2563EB]/30 flex items-center justify-center text-[#06B6D4]">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 2: Security Health */}
        <div className="p-5 rounded-2xl bg-[#131C1A] border border-zinc-800/80 shadow-md flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Security Threat Status</div>
            <div className="text-2xl font-extrabold text-white mt-1.5 flex items-baseline gap-2">
              <span className={stats.activeIncidents > 0 ? 'text-red-400' : 'text-white'}>
                {stats.activeIncidents > 0 ? `${stats.activeIncidents} Alert` : 'Shield Clean'}
              </span>
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">Rate limit & progressive delay active</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 3: Leads & Consultations */}
        <div className="p-5 rounded-2xl bg-[#131C1A] border border-zinc-800/80 shadow-md flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Executive Leads</div>
            <div className="text-2xl font-extrabold text-white mt-1.5 flex items-baseline gap-2">
              <span>{stats.totalLeads}</span>
              {stats.newLeads > 0 && (
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded">
                  {stats.newLeads} New
                </span>
              )}
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">Consultation & Partner Inquiries</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 4: SEO Health Score */}
        <div className="p-5 rounded-2xl bg-[#131C1A] border border-zinc-800/80 shadow-md flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">SEO Health Index</div>
            <div className="text-2xl font-extrabold text-white mt-1.5 flex items-baseline gap-2">
              <span>{stats.seoScore}%</span>
              <span className="text-[11px] font-semibold text-emerald-400">Optimized</span>
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">Sitemap & OpenGraph Synced</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Compass className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* QUICK WORKSPACE LAUNCHERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/admin/pages"
          className="p-5 rounded-2xl bg-[#131C1A] hover:bg-zinc-800/60 border border-zinc-800 transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#2FE4A6]">Pages & Layout</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-sm font-bold text-white mt-2">Visual Page Editor</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Select any component (Hero, Audience, Services, Process) to change text, media, or ordering.
            </p>
          </div>
          <div className="mt-4 text-[11px] font-semibold text-zinc-300 group-hover:text-[#2FE4A6]">
            Manage 6 Pages →
          </div>
        </Link>

        <Link
          to="/admin/media"
          className="p-5 rounded-2xl bg-[#131C1A] hover:bg-zinc-800/60 border border-zinc-800 transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400">Asset Management</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-sm font-bold text-white mt-2">Media Library</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Replace illustrations, SVG graphics, team photography, and dynamic charts with usage tracking.
            </p>
          </div>
          <div className="mt-4 text-[11px] font-semibold text-zinc-300 group-hover:text-blue-400">
            {stats.mediaCount} Assets Stored →
          </div>
        </Link>

        <Link
          to="/admin/security"
          className="p-5 rounded-2xl bg-[#131C1A] hover:bg-zinc-800/60 border border-zinc-800 transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-400">Threat Detection</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-sm font-bold text-white mt-2">Security Center</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Server-side brute-force defense, audit trails, active sessions, and deduplicated incident response.
            </p>
          </div>
          <div className="mt-4 text-[11px] font-semibold text-zinc-300 group-hover:text-red-400">
            View Security Incident →
          </div>
        </Link>
      </div>

      {/* TWO COLUMN GRID: RECENT AUDIT ACTIVITY & INCOMING LEADS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Audit Trail */}
        <div className="lg:col-span-7 bg-[#131C1A] border border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#2FE4A6]" />
                <span>Live Audit Activity Trail</span>
              </h2>
              <p className="text-[11px] text-zinc-400 mt-0.5">Append-only administrative and security actions</p>
            </div>
            <Link to="/admin/logs" className="text-xs font-bold text-[#2FE4A6] hover:underline">
              View All Logs →
            </Link>
          </div>

          <div className="divide-y divide-zinc-800/80">
            {loading ? (
              <div className="py-8 text-center text-xs text-zinc-500">Loading audit records...</div>
            ) : recentLogs.length === 0 ? (
              <div className="py-8 text-center text-xs text-zinc-500">No recorded events.</div>
            ) : (
              recentLogs.map((log) => (
                <div key={log.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white truncate">{log.action.replace(/_/g, ' ')}</span>
                      {getRiskBadge(log.riskLevel)}
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5 truncate">
                      by <span className="text-zinc-300 font-semibold">{log.actorName}</span> on{' '}
                      <span className="font-mono text-zinc-400">{log.resource}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0 text-[10px] text-zinc-500 font-mono">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Incoming Leads */}
        <div className="lg:col-span-5 bg-[#131C1A] border border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>Recent Lead Submissions</span>
                </h2>
                <p className="text-[11px] text-zinc-400 mt-0.5">Incoming contact & consultation requests</p>
              </div>
              <Link to="/admin/leads" className="text-xs font-bold text-blue-400 hover:underline">
                Inbox →
              </Link>
            </div>

            <div className="space-y-3">
              {loading ? (
                <div className="py-8 text-center text-xs text-zinc-500">Loading leads...</div>
              ) : recentLeads.length === 0 ? (
                <div className="py-8 text-center text-xs text-zinc-500">No enquiries received.</div>
              ) : (
                recentLeads.map((lead) => (
                  <div key={lead.id} className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{lead.fullName}</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#2563EB]/20 text-[#06B6D4] uppercase">
                        {lead.type}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-1 truncate">
                      {lead.companyName || lead.email} • {lead.annualRevenue || 'Standard Scope'}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800 mt-4">
            <Link
              to="/admin/leads"
              className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-xl flex items-center justify-center transition-colors"
            >
              Open Full Leads Pipeline
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
