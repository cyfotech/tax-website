import { FinancialMetricsData } from '../types/financial';

const INITIAL_FINANCIAL_METRICS: FinancialMetricsData = {
  financialClarity: {
    amount: 84250,
    currency: 'USD',
    status: 'On-Track Reconciled',
    trend: [42, 48, 46, 53, 59, 61, 64],
    changePercent: 18.4,
  },
  compliance: {
    accuracy: 100,
    reviewStatus: 'Multi-Tier CPA Review Complete',
    auditedEntitiesCount: 142,
  },
  monthlyClose: {
    days: 3.2,
    status: 'Seamless software sync',
    targetDays: 4.0,
  },
  monthlyPerformance: [
    { month: 'Apr', value: 42 },
    { month: 'May', value: 57 },
    { month: 'Jun', value: 68 },
    { month: 'Jul', value: 84 },
  ],
  lastUpdated: new Date().toISOString(),
};

export const financialService = {
  /**
   * Retrieves the current financial metrics.
   * Can be hooked up directly to `GET /api/financial-metrics` in production.
   */
  async getFinancialMetrics(): Promise<FinancialMetricsData> {
    // Simulated micro latency for realistic asynchronous fetch
    await new Promise((resolve) => setTimeout(resolve, 80));
    return { ...INITIAL_FINANCIAL_METRICS, lastUpdated: new Date().toISOString() };
  },

  /**
   * Subscribes to real-time financial updates.
   * In development/demo, simulates subtle periodic ledger syncs.
   * In production, easily swapped for WebSocket or Server-Sent Events (SSE).
   */
  subscribeToFinancialMetrics(
    callback: (data: FinancialMetricsData) => void,
    intervalMs = 7000
  ): () => void {
    let currentMetrics: FinancialMetricsData = { ...INITIAL_FINANCIAL_METRICS };

    const intervalId = setInterval(() => {
      // Simulate slight, realistic financial updates (e.g. reconciliations completing, close days tightening)
      const amountDeltas = [250, 480, -120, 640, 310, -80, 520];
      const randomDelta = amountDeltas[Math.floor(Math.random() * amountDeltas.length)];
      const nextAmount = Math.max(78000, currentMetrics.financialClarity.amount + randomDelta);

      // Trend shift
      const prevTrend = [...currentMetrics.financialClarity.trend];
      const newTrendPoint = Math.min(80, Math.max(40, prevTrend[prevTrend.length - 1] + (Math.random() > 0.5 ? 2 : -1)));
      const nextTrend = [...prevTrend.slice(1), newTrendPoint];

      // Subtle close day progression (e.g. 3.4 -> 3.2 -> 3.1)
      const possibleDays = [3.2, 3.1, 3.2, 3.3, 3.2];
      const nextDays = possibleDays[Math.floor(Math.random() * possibleDays.length)];

      currentMetrics = {
        ...currentMetrics,
        financialClarity: {
          ...currentMetrics.financialClarity,
          amount: nextAmount,
          trend: nextTrend,
        },
        monthlyClose: {
          ...currentMetrics.monthlyClose,
          days: nextDays,
        },
        lastUpdated: new Date().toISOString(),
      };

      callback(currentMetrics);
    }, intervalMs);

    return () => clearInterval(intervalId);
  },
};
