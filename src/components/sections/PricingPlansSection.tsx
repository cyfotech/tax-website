import React, { useState } from 'react';
import { PricingPlansSectionData } from '../../types/content';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { Check, Zap } from 'lucide-react';

interface PricingPlansSectionProps {
  data: PricingPlansSectionData;
}

export const PricingPlansSection: React.FC<PricingPlansSectionProps> = ({ data }) => {
  const { content } = data;
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      id: 'standard',
      name: 'Essential Ledger',
      description: 'Ideal for bootstrapped companies and small professional practices.',
      monthlyPrice: 750,
      annualPrice: 650,
      features: [
        'Monthly reconciliation up to 150 transactions',
        'Federal & single-state annual tax preparation',
        'Quarterly financial statements (P&L, Balance)',
        'Email & client portal support (48-hr SLA)',
        'Xero or QuickBooks Online sync',
      ],
      idealFor: 'Under $1M Revenue',
    },
    {
      id: 'growth',
      name: 'Growth & Strategy',
      description: 'Full-cycle monthly close and proactive quarterly tax planning.',
      monthlyPrice: 1650,
      annualPrice: 1450,
      featured: true,
      features: [
        'Weekly transaction categorization up to 500 txns',
        'Multi-state corporate filing & pass-through returns',
        'Quarterly proactive tax planning blueprint',
        'Dedicated Senior CPA Pod Lead',
        'Bi-weekly payroll management up to 25 employees',
        'Accounts Payable workflow management',
      ],
      idealFor: '$1M – $5M Revenue',
    },
    {
      id: 'enterprise',
      name: 'Fractional CFO & Firm Outsourcing',
      description: 'Dedicated back-office pod and executive financial modeling.',
      monthlyPrice: 3400,
      annualPrice: 2950,
      features: [
        'High-volume daily reconciliations',
        'Board-ready reporting & rolling cash flow models',
        'IRS representation and audit defense coverage',
        'Full CPA firm white-label outsourcing pod',
        'Unlimited payroll, AP/AR, and tax consulting',
        'Dedicated partner communication channel',
      ],
      idealFor: '$5M+ or CPA Practices',
    },
  ];

  return (
    <section className="py-14 sm:py-20 md:py-28 bg-[#FFFFFF] dark:bg-[#0B1220] transition-colors w-full">
      <Container size="wide">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          align="center"
        />

        {/* Billing Selector */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div className="p-1 sm:p-1.5 rounded-2xl bg-white dark:bg-[#172554] border-2 border-[#172554]/15 flex flex-wrap sm:flex-nowrap items-center justify-center gap-1 shadow-sm">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[44px] flex items-center justify-center ${
                billingCycle === 'monthly'
                  ? 'bg-[#172554] text-[#FFFFFF] shadow-md'
                  : 'text-[#475569] dark:text-white/70 hover:text-[#172554]'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px] ${
                billingCycle === 'annual'
                  ? 'bg-[#172554] text-[#FFFFFF] shadow-md'
                  : 'text-[#475569] dark:text-white/70 hover:text-[#172554]'
              }`}
            >
              <span>Annual Retainer</span>
              <span className="text-[10px] text-[#172554] bg-[#2563EB] px-2 py-0.5 rounded-full font-bold shrink-0">
                Save 15%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch w-full">
          {plans.map((plan) => {
            const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
            const isFeatured = plan.featured;

            return (
              <div
                key={plan.id}
                className={`flex flex-col justify-between p-5 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-300 relative w-full min-w-0 ${
                  isFeatured
                    ? 'bg-white dark:bg-[#172554] border-3 border-[#2563EB] shadow-2xl lg:-translate-y-2'
                    : 'bg-white dark:bg-[#172554] border-2 border-[#172554]/15 dark:border-white/10 hover:border-[#2563EB] shadow-sm'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#2563EB] text-[#172554] text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-3.5 sm:px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="flex flex-col min-[420px]:flex-row min-[420px]:items-center justify-between gap-1 mb-2">
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#172554] dark:text-[#FFFFFF] break-words">
                      {plan.name}
                    </h3>
                    <span className="text-xs font-bold text-[#2563EB] dark:text-[#06B6D4] shrink-0">
                      {plan.idealFor}
                    </span>
                  </div>

                  <p className="text-xs text-[#475569] dark:text-[#FFFFFF]/70 mb-5 leading-relaxed font-medium break-words">
                    {plan.description}
                  </p>

                  <div className="mb-5 pb-5 border-b border-[#172554]/10 dark:border-white/10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#172554] dark:text-[#FFFFFF] font-mono tabular-nums">
                        ${price.toLocaleString()}
                      </span>
                      <span className="text-xs text-[#475569] dark:text-[#FFFFFF]/60 font-semibold">/month</span>
                    </div>
                    <span className="text-[11px] text-[#475569] dark:text-[#FFFFFF]/50 block mt-1 font-medium">
                      {billingCycle === 'annual' ? 'Billed annually' : 'Month-to-month flexibility'}
                    </span>
                  </div>

                  {/* Features List with Teal checks */}
                  <ul className="space-y-3 text-xs sm:text-sm text-[#172554] dark:text-[#FFFFFF]/80 mb-6 sm:mb-8 font-medium">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="leading-snug break-words">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  href="/book-consultation"
                  variant={isFeatured ? 'primary' : 'secondary'}
                  className="w-full justify-center min-h-[48px]"
                >
                  Select {plan.name}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Custom Firm Outsourcing Callout */}
        <div className="mt-12 sm:mt-16 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#172554] border-2 border-[#172554]/15 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 sm:gap-6 shadow-sm w-full min-w-0">
          <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#172554] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563EB]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-base sm:text-lg font-bold text-[#172554] dark:text-[#FFFFFF] break-words">
                Need a Dedicated CPA Outsourcing Pod?
              </h4>
              <p className="text-xs sm:text-sm text-[#475569] dark:text-[#FFFFFF]/70 font-medium break-words mt-0.5">
                Custom hourly or per-return pricing structures for accounting practices scaling during peak season.
              </p>
            </div>
          </div>
          <Button href="/contact" variant="primary" className="shrink-0 min-h-[48px] w-full md:w-auto justify-center">
            Request Firm Proposal
          </Button>
        </div>
      </Container>
    </section>
  );
};
