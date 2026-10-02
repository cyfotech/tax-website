/**
 * Dedicated Admin Route Tree & Authentication Guard
 * Isolated from public website navigation.
 */

import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { AdminLayout } from './components/AdminLayout';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { PageListPage } from './pages/pages/PageListPage';
import { VisualPageEditor } from './pages/pages/VisualPageEditor';
import { PageHistoryPage } from './pages/pages/PageHistoryPage';
import { MediaLibraryPage } from './pages/media/MediaLibraryPage';
import { SeoManagerPage } from './pages/seo/SeoManagerPage';
import { BlogManagerPage } from './pages/blog/BlogManagerPage';
import { LeadsManagerPage } from './pages/leads/LeadsManagerPage';
import { SecurityAlertsPage } from './pages/security/SecurityAlertsPage';
import { AuditLogsPage } from './pages/security/AuditLogsPage';
import { ActiveSessionsPage } from './pages/security/ActiveSessionsPage';
import { WebsiteSettingsPage } from './pages/settings/WebsiteSettingsPage';

function ProtectedAdminArea() {
  const { user, isLoading } = useAdminAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0E1514] flex items-center justify-center text-xs text-zinc-400 font-mono">
        Validating Admin Credentials & Security Policies...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <AdminLayout />;
}

export const AdminRoutes: React.FC = () => {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<AdminLoginPage />} />

        {/* Authenticated Admin Management Area */}
        <Route element={<ProtectedAdminArea />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="pages" element={<PageListPage />} />
          <Route path="pages/:pageId/edit" element={<VisualPageEditor />} />
          <Route path="pages/:pageId/history" element={<PageHistoryPage />} />
          <Route path="media" element={<MediaLibraryPage />} />
          <Route path="seo" element={<SeoManagerPage />} />
          <Route path="blog" element={<BlogManagerPage />} />
          <Route path="leads" element={<LeadsManagerPage />} />
          <Route path="security" element={<SecurityAlertsPage />} />
          <Route path="security/alerts" element={<SecurityAlertsPage />} />
          <Route path="security/sessions" element={<ActiveSessionsPage />} />
          <Route path="logs" element={<AuditLogsPage />} />
          <Route path="settings/website" element={<WebsiteSettingsPage />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
};
