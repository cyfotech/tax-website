import { useState, useEffect, useCallback } from 'react';
import { FinancialMetricsData } from '../types/financial';
import { financialService } from '../services/financialService';

export function useFinancialMetrics(enableLiveUpdates = true) {
  const [data, setData] = useState<FinancialMetricsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInitial = useCallback(async () => {
    try {
      setLoading(true);
      const initial = await financialService.getFinancialMetrics();
      setData(initial);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to connect to financial metrics stream.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitial();

    if (!enableLiveUpdates) return;

    const unsubscribe = financialService.subscribeToFinancialMetrics((updated) => {
      setData(updated);
    }, 6500);

    return () => {
      unsubscribe();
    };
  }, [fetchInitial, enableLiveUpdates]);

  return {
    data,
    loading,
    error,
    refresh: fetchInitial,
  };
}
