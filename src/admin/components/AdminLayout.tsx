/**
 * Professional SaaS Admin Dashboard Layout
 * High productivity dark/light UI with collapsible sidebar, global search,
 * real-time notification drawer, and role indicator.
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  LayoutDashboard,
  Layers,
  Image as ImageIcon,
  FileText,
  Search,
  Users,
  ShieldAlert,
  History,
  Settings,
  Bell,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Compass,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { GlobalSearchModal } from './GlobalSearchModal';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
  roles?: string[];
}

export const AdminLayout: React.FC = () => {
  const { user, logout, hasRole } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [unresolvedSecurityAlertsCount, setUnresolvedSecurityAlertsCount] = useState(0);

  // Keyboard shortcut ⌘K or Ctrl+K for global search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Fetch notifications and live security alert counts
  useEffect(() => {
    fetchNotifications();
    fetchSecurityAlertsCount();
    const interval = setInterval(() => {
      fetchNotifications();
      fetchSecurityAlertsCount();
    }, 20000);
    return () => clearInterval(interval);
  }, [user]);

  const fetchSecurityAlertsCount = async () => {
    try {
      if (!user || (!hasRole('super_admin') && !hasRole('security_admin'))) {
        setUnresolvedSecurityAlertsCount(0);
        return;
      }
      const token = localStorage.getItem('apex_admin_token');
      if (!token) return;
      const res = await fetch('/api/admin/security/incidents', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        const active = (json.incidents || []).filter((i: any) => i.status !== 'resolved').length;
        setUnresolvedSecurityAlertsCount(active);
      }
    } catch {
      // Ignore background poll errors
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('apex_admin_token');
      if (!token) return;
      const res = await fetch('/api/admin/notifications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setNotifications(json.notifications || []);
        setUnreadCount(json.notifications?.filter((n: any) => !n.read).length || 0);
      }
    } catch {
      // Ignore background poll errors
    }
  };

  const markAllRead = async () => {
    const token = localStorage.getItem('apex_admin_token');
    await fetch('/api/admin/notifications/read-all', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const navItems: NavItem[] = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Website Pages', href: '/admin/pages', icon: Layers },
    { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
    { label: 'Blog CMS', href: '/admin/blog', icon: FileText },
    { label: 'SEO Manager', href: '/admin/seo', icon: Compass },
    { label: 'Leads & Inquiries', href: '/admin/leads', icon: Users },
    {
      label: 'Security Alerts',
      href: '/admin/security',
      icon: ShieldAlert,
      badge:
        unresolvedSecurityAlertsCount > 0
          ? `${unresolvedSecurityAlertsCount} ${unresolvedSecurityAlertsCount === 1 ? 'Alert' : 'Alerts'}`
          : undefined,
      badgeColor: 'bg-red-500 text-white animate-pulse',
      roles: ['super_admin', 'security_admin'],
    },
    {
      label: 'Audit Logs',
      href: '/admin/logs',
      icon: History,
      roles: ['super_admin', 'security_admin', 'viewer'],
    },
    {
      label: 'Active Sessions',
      href: '/admin/security/sessions',
      icon: KeyRound,
      roles: ['super_admin', 'security_admin'],
    },
    {
      label: 'Website Settings',
      href: '/admin/settings/website',
      icon: Settings,
      roles: ['super_admin', 'content_admin'],
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'super_admin':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">Super Admin</span>;
      case 'security_admin':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/40 rounded-full">CISO / Security</span>;
      case 'content_admin':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">Content Lead</span>;
      case 'editor':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-full">Editor</span>;
      default:
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-zinc-500/20 text-zinc-300 border border-zinc-500/40 rounded-full">Viewer</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-zinc-100 flex flex-col antialiased">
      {/* GLOBAL ⌘K SEARCH MODAL */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* TOP HEADER */}
      <header className="h-16 bg-[#172554] border-b border-zinc-800/80 sticky top-0 z-40 px-4 sm:px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3 sm:gap-6">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* ApexLedger Admin Monogram */}
          <Link to="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#172554] to-[#0B1220] border border-[#2563EB]/50 flex items-center justify-center font-bold text-white shadow-md">
              AL
            </div>
            <div>
              <div className="text-sm font-extrabold tracking-tight text-white flex items-center gap-1.5">
                <span>ApexLedger</span>
                <span className="text-[10px] font-mono uppercase bg-[#2563EB]/30 text-[#06B6D4] px-1.5 py-0.2 rounded border border-[#2563EB]">CMS</span>
              </div>
              <div className="text-[11px] text-zinc-400 hidden sm:block">Executive Content & Security Console</div>
            </div>
          </Link>
        </div>

        {/* Global Search Button (⌘K) */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full h-9 px-3.5 bg-zinc-900/90 border border-zinc-700/80 hover:border-[#2563EB] rounded-xl flex items-center justify-between text-xs text-zinc-400 hover:text-zinc-200 transition-colors shadow-inner"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-zinc-400" />
              <span>Search pages, media, logs, leads...</span>
            </span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-zinc-800 border border-zinc-700 rounded text-zinc-300">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile search trigger */}
          <button
            onClick={() => setSearchOpen(true)}
            className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
            title="Search (⌘K)"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* View Live Public Site (Opens in clean tab) */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700 rounded-xl transition-colors"
            title="View Live Public Website"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
          </a>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Drawer */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#172554] border border-zinc-700/80 rounded-2xl shadow-2xl z-50 overflow-hidden text-xs">
                <div className="p-3.5 border-b border-zinc-800 flex items-center justify-between bg-[#0B1220]">
                  <span className="font-bold text-white flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#06B6D4]" />
                    <span>System & Security Notifications</span>
                  </span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[11px] text-[#06B6D4] hover:underline font-semibold"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-zinc-800/60">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-zinc-400">No active notifications.</div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-3.5 hover:bg-zinc-800/40 transition-colors ${
                          !n.read ? 'bg-[#2563EB]/15' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span
                            className={`font-bold ${
                              n.severity === 'HIGH' || n.severity === 'CRITICAL'
                                ? 'text-red-400'
                                : 'text-zinc-200'
                            }`}
                          >
                            {n.title}
                          </span>
                          <span className="text-[10px] text-zinc-500 shrink-0">
                            {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">{n.message}</p>
                        {n.link && (
                          <Link
                            to={n.link}
                            onClick={() => setNotificationsOpen(false)}
                            className="inline-block mt-2 text-[11px] font-semibold text-[#2FE4A6] hover:underline"
                          >
                            Review Incident →
                          </Link>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Current User & Logout */}
          <div className="flex items-center gap-3 pl-3 border-l border-zinc-800">
            <div className="hidden sm:block text-right">
              <div className="text-xs font-bold text-white truncate max-w-[130px]">
                {user?.fullName || user?.username}
              </div>
              <div className="mt-0.5">{getRoleBadge(user?.role)}</div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN ADMIN WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR NAVIGATION (Desktop) */}
        <aside className="w-64 bg-[#0B1220] border-r border-zinc-800/80 hidden md:flex flex-col justify-between shrink-0">
          <div className="p-4 space-y-1 overflow-y-auto">
            <div className="text-[10px] font-extrabold tracking-wider uppercase text-zinc-400 px-3 py-2">
              Website Management
            </div>

            {navItems.map((item) => {
              if (item.roles && !hasRole(...(item.roles as any))) return null;
              const isActive = location.pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#172554] text-white border-l-2 border-[#2563EB] shadow-md'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#06B6D4]' : 'text-zinc-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor || 'bg-zinc-800 text-zinc-300'}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Sidebar Footer Security Status */}
          <div className="p-4 border-t border-zinc-800/80 bg-[#0B1220]">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse" />
              <span className="font-bold text-zinc-300">Server Security Active</span>
            </div>
            <p className="text-[10px] text-zinc-400 mt-1">Audit Trail & Rate Limit Engaged</p>
          </div>
        </aside>

        {/* MOBILE DRAWER NAVIGATION */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden bg-black/70 backdrop-blur-sm flex">
            <div className="w-72 bg-[#0B1220] h-full p-4 flex flex-col justify-between border-r border-zinc-800">
              <div className="space-y-1 overflow-y-auto">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-zinc-800">
                  <span className="text-xs font-bold text-white">Navigation</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-zinc-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {navItems.map((item) => {
                  if (item.roles && !hasRole(...(item.roles as any))) return null;
                  const isActive = location.pathname.startsWith(item.href);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${
                        isActive ? 'bg-[#172554] text-white border-l-2 border-[#2563EB]' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor || 'bg-zinc-800 text-zinc-300'}`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-zinc-800">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-500/10 text-red-400 rounded-xl text-xs font-bold border border-red-500/20"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        {/* CONTENT VIEWPORT */}
        <main className="flex-1 overflow-y-auto bg-[#0E1514]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
