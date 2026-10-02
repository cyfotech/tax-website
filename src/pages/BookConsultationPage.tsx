import React, { useState } from 'react';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { SEOHead } from '../components/common/SEOHead';
import { api } from '../services/api';
import { Calendar as CalendarIcon, Clock, CheckCircle2 } from 'lucide-react';

export const BookConsultationPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [service, setService] = useState('tax-preparation');
  const [companySize, setCompanySize] = useState('5–25 Employees');
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState('11:00 AM EST');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmationId, setConfirmationId] = useState<string | null>(null);

  const services = [
    { id: 'tax-preparation', name: 'Tax Preparation & Strategy' },
    { id: 'accounting', name: 'Full-Cycle Accounting & Close' },
    { id: 'cpa-outsourcing', name: 'CPA Firm White-Label Pod' },
    { id: 'virtual-cfo', name: 'Fractional CFO Leadership' },
  ];

  const dates = ['Tomorrow', 'Thursday', 'Friday', 'Next Monday'];
  const times = ['09:30 AM EST', '11:00 AM EST', '02:00 PM EST', '04:30 PM EST'];

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setLoading(true);
    try {
      const res = await api.bookConsultation({
        serviceSlug: service,
        companySize,
        preferredDate: selectedDate,
        preferredTime: selectedTime,
        fullName,
        email,
        notes,
      });
      setConfirmationId(res.confirmationId);
      setStep(4);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 sm:py-12 md:py-16 bg-[#FFFFFF] dark:bg-[#0B1220] min-h-screen transition-colors w-full">
      <SEOHead
        title="Book Free Consultation – ApexLedger Advisory"
        description="Schedule a 30-minute discovery call with a senior licensed CPA. Review filing history, accounting structure, and tax optimization."
      />

      <Container size="narrow">
        <SectionHeading
          eyebrow="INTRODUCTORY MEETING"
          title="Schedule Your Free 30-Minute Advisory Call"
          description="Speak directly with a senior CPA to review your books, tax exposure, or outsourcing needs."
          align="center"
        />

        {/* Multi-Step Card */}
        <div className="p-4 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#172554] border-2 border-[#172554]/15 dark:border-white/10 shadow-lg relative w-full max-w-full min-w-0">
          {/* Step Progress Tracker */}
          <div className="flex items-center justify-between mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-[#172554]/15 dark:border-white/10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <span
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                    step === s
                      ? 'bg-[#2563EB] text-[#172554] shadow-sm font-extrabold'
                      : step > s
                      ? 'bg-[#2563EB] text-white shadow-sm'
                      : 'bg-[#FFFFFF] dark:bg-[#0B1220] text-[#475569] dark:text-white/50 border border-[#172554]/20'
                  }`}
                >
                  {s}
                </span>
                <span className="text-xs font-bold text-[#172554] dark:text-[#FFFFFF] hidden min-[480px]:inline">
                  {s === 1 ? 'Focus Area' : s === 2 ? 'Date & Time' : 'Contact Details'}
                </span>
              </div>
            ))}
          </div>

          {/* STEP 1: Focus Area & Size */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#172554] dark:text-[#FFFFFF] mb-3">1. Select Primary Advisory Need</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {services.map((s) => (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => setService(s.id)}
                      className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl text-left border-2 transition-all cursor-pointer min-h-[48px] flex items-center ${
                        service === s.id
                          ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-sm'
                          : 'bg-[#FFFFFF] dark:bg-[#0B1220] border-[#172554]/15 dark:border-white/10 text-[#172554] dark:text-white hover:border-[#2563EB]'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-bold block break-words">{s.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#172554] dark:text-[#FFFFFF] mb-3">2. Company / Firm Size</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                  {['1–4 Team', '5–25 Team', '25–100 Team', 'CPA Firm'].map((sz) => (
                    <button
                      type="button"
                      key={sz}
                      onClick={() => setCompanySize(sz)}
                      className={`p-3 rounded-xl text-xs font-bold text-center border-2 transition-all cursor-pointer min-h-[44px] flex items-center justify-center ${
                        companySize === sz
                          ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-sm'
                          : 'bg-[#FFFFFF] dark:bg-[#0B1220] border-[#172554]/15 dark:border-white/10 text-[#172554] dark:text-white hover:border-[#2563EB]'
                      }`}
                    >
                      <span>{sz}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button onClick={() => setStep(2)} variant="primary" icon="ArrowRight" className="w-full sm:w-auto min-h-[48px]">
                  Select Date & Time
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Date & Time */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#172554] dark:text-[#FFFFFF] mb-3 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB]" />
                  <span>Select Date</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                  {dates.map((d) => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl text-xs font-bold text-center border-2 transition-all cursor-pointer min-h-[44px] flex items-center justify-center ${
                        selectedDate === d
                          ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-sm'
                          : 'bg-[#FFFFFF] dark:bg-[#0B1220] border-[#172554]/15 dark:border-white/10 text-[#172554] dark:text-white hover:border-[#2563EB]'
                      }`}
                    >
                      <span>{d}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#172554] dark:text-[#FFFFFF] mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB]" />
                  <span>Available Window</span>
                </h3>
                <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                  {times.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl text-xs font-bold text-center border-2 transition-all cursor-pointer min-h-[44px] flex items-center justify-center ${
                        selectedTime === t
                          ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-sm'
                          : 'bg-[#FFFFFF] dark:bg-[#0B1220] border-[#172554]/15 dark:border-white/10 text-[#172554] dark:text-white hover:border-[#2563EB]'
                      }`}
                    >
                      <span>{t}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <Button onClick={() => setStep(1)} variant="secondary" icon="ArrowLeft" iconPosition="left" className="w-full sm:w-auto min-h-[48px]">
                  Back
                </Button>
                <Button onClick={() => setStep(3)} variant="primary" icon="ArrowRight" className="w-full sm:w-auto min-h-[48px]">
                  Your Details
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Details & Confirmation Submit */}
          {step === 3 && (
            <form onSubmit={handleBooking} className="space-y-5">
              <h3 className="text-base sm:text-lg font-extrabold text-[#172554] dark:text-[#FFFFFF] mb-2">Final Step: Confirm Contact Details</h3>

              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FFFFFF] dark:bg-[#0B1220] border border-[#172554]/15 text-xs text-[#172554]/80 dark:text-white/80 space-y-1 font-medium">
                <div>Focus: <span className="font-bold text-[#2563EB] dark:text-[#06B6D4]">{service}</span></div>
                <div>Scheduled: <span className="font-bold text-[#172554] dark:text-white">{selectedDate} at {selectedTime}</span></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#172554] dark:text-white uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full min-h-[48px] bg-white dark:bg-[#0B1220] border-2 border-[#172554]/20 focus:border-[#2563EB] rounded-xl sm:rounded-2xl px-4 py-3 text-sm text-[#172554] dark:text-white placeholder-[#475569]/60 focus:outline-none transition-colors box-border"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#172554] dark:text-white uppercase tracking-wider mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full min-h-[48px] bg-white dark:bg-[#0B1220] border-2 border-[#172554]/20 focus:border-[#2563EB] rounded-xl sm:rounded-2xl px-4 py-3 text-sm text-[#172554] dark:text-white placeholder-[#475569]/60 focus:outline-none transition-colors box-border"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172554] dark:text-white uppercase tracking-wider mb-2">
                  Notes / Specific Topics
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. S-Corp tax election, back-office bookkeeping transition..."
                  className="w-full bg-white dark:bg-[#0B1220] border-2 border-[#172554]/20 focus:border-[#2563EB] rounded-xl sm:rounded-2xl p-4 text-sm text-[#172554] dark:text-white placeholder-[#475569]/60 focus:outline-none resize-none box-border"
                />
              </div>

              <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <Button onClick={() => setStep(2)} variant="secondary" icon="ArrowLeft" iconPosition="left" className="w-full sm:w-auto min-h-[48px]">
                  Back
                </Button>
                <Button type="submit" disabled={loading} variant="primary" className="w-full sm:w-auto min-h-[48px]">
                  {loading ? 'Confirming...' : 'Lock In Advisory Time'}
                </Button>
              </div>
            </form>
          )}

          {/* STEP 4: Success View */}
          {step === 4 && (
            <div className="py-8 sm:py-10 text-center space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#2563EB] text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172554] dark:text-[#FFFFFF]">Consultation Confirmed</h3>
              <p className="text-sm sm:text-base text-[#475569] dark:text-[#FFFFFF]/75 max-w-md mx-auto leading-relaxed font-medium">
                Your calendar reservation with an ApexLedger Partner has been secured for {selectedDate} at {selectedTime}. A calendar invite with a private video link has been dispatched to {email}.
              </p>
              <div className="inline-block py-2 px-4 rounded-xl bg-[#FFFFFF] dark:bg-[#0B1220] border border-[#2563EB]/30 text-xs font-mono font-bold text-[#2563EB] dark:text-[#06B6D4]">
                Confirmation Ref: {confirmationId}
              </div>
              <div className="pt-4 sm:pt-6">
                <Button href="/" variant="primary" className="min-h-[48px]">
                  Return to Home
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
