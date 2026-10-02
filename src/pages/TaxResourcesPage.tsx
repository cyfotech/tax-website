import React, { useState } from 'react';
import { taxResourcesPageData } from '../data/pages/taxResources';
import { PageRenderer } from '../components/PageRenderer';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { CheckSquare } from 'lucide-react';

export const TaxResourcesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deadlines' | 'deductions' | 'checklist'>('deadlines');

  const deadlines = [
    { date: 'January 15', title: 'Q4 Estimated Tax Due', desc: 'Prior year 4th quarter estimated payment deadline.', form: '1040-ES' },
    { date: 'March 15', title: 'S-Corp & Partnership Filing', desc: 'Calendar-year S-Corporations and multi-member LLCs.', form: '1120-S / 1065' },
    { date: 'April 15', title: 'C-Corp & Individual Return', desc: 'Form 1040 and Form 1120 corporate federal filing or extension.', form: '1040 / 1120' },
    { date: 'June 15', title: 'Q2 Estimated Tax Due', desc: 'Current year 2nd quarter estimated voucher payment.', form: '1040-ES' },
    { date: 'September 15', title: 'Extended Pass-Through Deadline', desc: 'Final extended filing for partnerships and S-Corps.', form: '1065 / 1120-S Ext' },
    { date: 'October 15', title: 'Extended Individual & C-Corp', desc: 'Final extended deadline for corporate and personal returns.', form: '1040 / 1120 Ext' },
  ];

  const deductions = [
    { name: 'Section 179 Expensing', limit: '$1,220,000 Cap', desc: 'Full write-off of business equipment and qualifying software placed in service.' },
    { name: 'Qualified Business Income (QBI)', limit: 'Up to 20%', desc: 'Section 199A deduction for sole proprietors, partnerships, and S-Corps.' },
    { name: 'R&D Payroll Tax Credit', limit: '$500,000 / Year', desc: 'Offset employer portion of FICA payroll taxes for qualifying software development.' },
    { name: 'Accountable Expense Reimbursement', limit: '100% Tax-Free', desc: 'Structured home office, equipment, and travel reimbursement without taxable income.' },
  ];

  const checklistItems = [
    'Reconcile all 12 bank, merchant, and credit card accounts to $0 discrepancy',
    'Issue Form 1099-NEC to contractors with payments >= $600 by January 31',
    'Review officer reasonable compensation vs distributions audit ratio',
    'Lock annual inventory counts and calculate cost of goods sold (COGS)',
    'Separate personal and business expenses with attached receipt documentation',
  ];

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#0B1220] transition-colors">
      <PageRenderer pageData={taxResourcesPageData} />

      {/* Interactive Tax Knowledge Hub */}
      <section className="py-20 md:py-28 bg-[#EFF6FF]/50 dark:bg-[#172554] border-t border-[#172554]/10 dark:border-white/10 transition-colors">
        <Container size="wide">
          <SectionHeading
            eyebrow="TAX INTELLIGENCE"
            title="Interactive Tax Compliance Hub"
            description="Verified filing calendars, high-yield deduction rules, and annual preparation checklist."
            align="center"
          />

          {/* Interactive Tab Controls */}
          <div className="flex justify-center mb-8 sm:mb-10 w-full">
            <div className="p-1 sm:p-1.5 rounded-2xl bg-white dark:bg-[#172554] border-2 border-[#172554]/15 dark:border-white/10 flex flex-wrap sm:flex-nowrap items-center justify-center gap-1 shadow-sm w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab('deadlines')}
                className={`px-3.5 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[44px] flex-1 sm:flex-none text-center ${
                  activeTab === 'deadlines'
                    ? 'bg-[#172554] text-[#FFFFFF] shadow-md'
                    : 'text-[#172554]/70 dark:text-white/70 hover:text-[#2563EB]'
                }`}
              >
                Federal Deadlines
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('deductions')}
                className={`px-3.5 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[44px] flex-1 sm:flex-none text-center ${
                  activeTab === 'deductions'
                    ? 'bg-[#172554] text-[#FFFFFF] shadow-md'
                    : 'text-[#172554]/70 dark:text-white/70 hover:text-[#2563EB]'
                }`}
              >
                Key Deductions
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('checklist')}
                className={`px-3.5 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[44px] flex-1 sm:flex-none text-center ${
                  activeTab === 'checklist'
                    ? 'bg-[#172554] text-[#FFFFFF] shadow-md'
                    : 'text-[#172554]/70 dark:text-white/70 hover:text-[#2563EB]'
                }`}
              >
                Pre-Filing Checklist
              </button>
            </div>
          </div>

          {/* Tab 1: Deadlines */}
          {activeTab === 'deadlines' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full">
              {deadlines.map((d) => (
                <div
                  key={d.title}
                  className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#172554] border-2 border-[#172554]/10 dark:border-white/10 hover:border-[#2563EB] transition-all duration-300 hover:-translate-y-1 shadow-sm flex flex-col justify-between w-full min-w-0"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-xs font-mono font-bold text-white bg-[#2563EB] px-3 py-1 rounded-lg shrink-0">
                        {d.date}
                      </span>
                      <span className="text-[11px] font-mono text-[#475569] dark:text-white/60 font-semibold">{d.form}</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-extrabold text-[#172554] dark:text-[#FFFFFF] mb-2 break-words">{d.title}</h4>
                    <p className="text-xs sm:text-sm text-[#475569] dark:text-[#FFFFFF]/70 leading-relaxed font-medium break-words">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Deductions */}
          {activeTab === 'deductions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full">
              {deductions.map((ded) => (
                <div
                  key={ded.name}
                  className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#172554] border-2 border-[#172554]/10 dark:border-white/10 hover:border-[#2563EB] transition-all duration-300 hover:-translate-y-1 shadow-sm flex flex-col justify-between w-full min-w-0"
                >
                  <div className="flex flex-col min-[380px]:flex-row min-[380px]:items-center justify-between gap-2 mb-4">
                    <h4 className="text-base sm:text-lg font-extrabold text-[#172554] dark:text-[#FFFFFF] break-words">{ded.name}</h4>
                    <span className="text-xs font-mono font-bold text-[#2563EB] bg-[#FFFFFF] dark:bg-[#0B1220] px-3 py-1 rounded-xl border border-[#2563EB]/20 shrink-0 self-start min-[380px]:self-auto">
                      {ded.limit}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#475569] dark:text-[#FFFFFF]/75 leading-relaxed font-medium break-words">{ded.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Checklist */}
          {activeTab === 'checklist' && (
            <div className="max-w-2xl mx-auto p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#172554] border-2 border-[#172554]/15 dark:border-white/10 shadow-md w-full min-w-0">
              <h4 className="text-lg sm:text-xl font-extrabold text-[#172554] dark:text-[#FFFFFF] mb-4 sm:mb-6 flex items-center gap-2.5 break-words">
                <CheckSquare className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563EB] shrink-0" />
                <span>Annual Tax Readiness Protocol</span>
              </h4>
              <ul className="space-y-3 sm:space-y-4">
                {checklistItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 sm:gap-3.5 text-xs sm:text-sm text-[#172554]/85 dark:text-[#FFFFFF]/85 font-medium">
                    <span className="w-6 h-6 rounded-lg bg-[#2563EB] text-white flex items-center justify-center shrink-0 font-mono text-xs font-bold shadow-sm mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
};
