import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesIndexPage } from './pages/ServicesIndexPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { TaxResourcesPage } from './pages/TaxResourcesPage';
import { BlogIndexPage } from './pages/BlogIndexPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ContactPage } from './pages/ContactPage';
import { PricingPage } from './pages/PricingPage';
import { BookConsultationPage } from './pages/BookConsultationPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminRoutes } from './admin/AdminRoutes';
import { useTheme } from './hooks/useTheme';

function AppLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const { theme, toggleTheme } = useTheme();

  if (isAdmin) {
    return <AdminRoutes />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFFFF] text-[#475569] dark:bg-[#0B1220] dark:text-[#F8FAFC] selection:bg-[#2563EB] selection:text-white transition-colors">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main id="main-content" className="flex-grow w-full max-w-full min-w-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesIndexPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/tax-resources" element={<TaxResourcesPage />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/book-consultation" element={<BookConsultationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
