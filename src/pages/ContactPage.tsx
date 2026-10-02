import React, { useState } from 'react';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { SEOHead } from '../components/common/SEOHead';
import { api } from '../services/api';
import { siteConfig } from '../data/siteConfig';
import { Mail, Phone, MapPin, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    annualRevenue: '$1M – $5M',
    servicesNeeded: [] as string[],
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const availableServices = [
    'Tax Preparation & Filing',
    'Full-Cycle Accounting & Close',
    'Monthly Bookkeeping',
    'Payroll Administration',
    'CPA Firm White-Label Outsourcing',
    'Virtual CFO Advisory',
  ];

  const toggleService = (srv: string) => {
    setFormData((prev) => ({
      ...prev,
      servicesNeeded: prev.servicesNeeded.includes(srv)
        ? prev.servicesNeeded.filter((s) => s !== srv)
        : [...prev.servicesNeeded, srv],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    setSubmitting(true);
    try {
      await api.submitContactInquiry(formData);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-10 sm:py-14 md:py-20 bg-[#FFFFFF] dark:bg-[#0B1220] min-h-screen transition-colors w-full">
      <SEOHead
        title="Contact Senior CPAs & Advisory – ApexLedger"
        description="Connect with our partner group for corporate tax preparation, ongoing accounting, or CPA outsourcing."
      />

      <Container size="wide">
        <SectionHeading
          eyebrow="DIRECT ENGAGEMENT"
          title="Speak Directly With an Advisory Partner"
          description="We review your inquiry and schedule a confidential introductory assessment within one business day."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-8 sm:mt-12 w-full">
          {/* Left Column: Direct Contact Details & Firm Info */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8 p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#172554] border-2 border-[#172554]/15 dark:border-white/10 shadow-sm w-full min-w-0">
            <div>
              <h3 className="text-2xl font-extrabold text-[#172554] dark:text-[#FFFFFF] mb-2">Direct Partner Contact</h3>
              <p className="text-sm text-[#475569] dark:text-[#FFFFFF]/75 leading-relaxed font-medium">
                Connect with our advisory desk for enterprise inquiries and partnership discussions.
              </p>
            </div>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[#475569] dark:text-white/50 text-xs font-semibold block">Partner Desk Email</span>
                  <a href={`mailto:${siteConfig.email}`} className="text-[#172554] dark:text-white hover:text-[#2563EB] font-bold">
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[#475569] dark:text-white/50 text-xs font-semibold block">Direct Advisory Line</span>
                  <a href={`tel:${siteConfig.phone}`} className="text-[#172554] dark:text-white hover:text-[#2563EB] font-bold">
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[#475569] dark:text-white/50 text-xs font-semibold block">Headquarters</span>
                  <span className="text-[#172554] dark:text-white font-medium leading-relaxed">{siteConfig.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[#475569] dark:text-white/50 text-xs font-semibold block">Office Hours</span>
                  <span className="text-[#172554] dark:text-white font-medium">{siteConfig.hours}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#172554]/10 dark:border-white/10 flex items-center gap-2 text-xs text-[#475569] dark:text-[#FFFFFF]/60 font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
              <span>All inquiries protected under bilateral Non-Disclosure Agreement.</span>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#172554] border-2 border-[#172554]/15 dark:border-white/10 shadow-sm w-full min-w-0">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#2563EB] text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#172554] dark:text-[#FFFFFF]">Inquiry Received</h3>
                <p className="text-base text-[#475569] dark:text-[#FFFFFF]/75 max-w-md mx-auto leading-relaxed font-medium">
                  Thank you, {formData.fullName}. A senior advisory partner will review your requirements and reach out via {formData.email} within 24 hours.
                </p>
                <div className="pt-4">
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        companyName: '',
                        annualRevenue: '$1M – $5M',
                        servicesNeeded: [],
                        message: '',
                      });
                    }}
                    variant="secondary"
                  >
                    Send Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#172554] dark:text-white uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-white dark:bg-[#0B1220] border-2 border-[#172554]/20 focus:border-[#2563EB] rounded-xl sm:rounded-2xl px-4 py-3 text-sm text-[#172554] dark:text-white placeholder-[#475569]/60 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#172554] dark:text-white uppercase tracking-wider mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full bg-white dark:bg-[#0B1220] border-2 border-[#172554]/20 focus:border-[#2563EB] rounded-xl sm:rounded-2xl px-4 py-3 text-sm text-[#172554] dark:text-white placeholder-[#475569]/60 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#172554] dark:text-white uppercase tracking-wider mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Acme Holdings Inc."
                      className="w-full bg-white dark:bg-[#0B1220] border-2 border-[#172554]/20 focus:border-[#2563EB] rounded-xl sm:rounded-2xl px-4 py-3 text-sm text-[#172554] dark:text-white placeholder-[#475569]/60 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#172554] dark:text-white uppercase tracking-wider mb-2">
                      Annual Gross Revenue
                    </label>
                    <select
                      value={formData.annualRevenue}
                      onChange={(e) => setFormData({ ...formData, annualRevenue: e.target.value })}
                      className="w-full bg-white dark:bg-[#0B1220] border-2 border-[#172554]/20 focus:border-[#2563EB] rounded-xl sm:rounded-2xl px-4 py-3 text-sm text-[#172554] dark:text-white focus:outline-none transition-colors cursor-pointer font-medium"
                    >
                      <option value="Under $500k">Under $500k</option>
                      <option value="$500k – $1M">$500k – $1M</option>
                      <option value="$1M – $5M">$1M – $5M</option>
                      <option value="$5M – $20M">$5M – $20M</option>
                      <option value="$20M+">$20M+</option>
                      <option value="CPA Accounting Practice">CPA Accounting Practice</option>
                    </select>
                  </div>
                </div>

                {/* Services Needed */}
                <div>
                  <label className="block text-xs font-bold text-[#172554] dark:text-white uppercase tracking-wider mb-3">
                    Services Under Consideration
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {availableServices.map((srv) => {
                      const isSelected = formData.servicesNeeded.includes(srv);
                      return (
                        <button
                          type="button"
                          key={srv}
                          onClick={() => toggleService(srv)}
                          className={`p-3 rounded-xl text-xs font-semibold text-left flex items-center gap-2.5 border-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-sm'
                              : 'bg-[#FFFFFF] dark:bg-[#0B1220] border-[#172554]/15 dark:border-white/10 text-[#172554] dark:text-white hover:border-[#2563EB]'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-white border-white' : 'border-[#172554]/40'
                            }`}
                          >
                            {isSelected && <span className="w-2 h-2 rounded-sm bg-[#2563EB]" />}
                          </span>
                          <span className="truncate">{srv}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172554] dark:text-white uppercase tracking-wider mb-2">
                    How Can We Assist?
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your current accounting or tax requirements..."
                    className="w-full bg-white dark:bg-[#0B1220] border-2 border-[#172554]/20 focus:border-[#2563EB] rounded-xl sm:rounded-2xl px-4 py-3 text-sm text-[#172554] dark:text-white placeholder-[#475569]/60 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  variant="primary"
                  className="w-full justify-center py-3.5 text-base"
                >
                  {submitting ? 'Submitting Inquiry...' : 'Submit Advisory Inquiry'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
