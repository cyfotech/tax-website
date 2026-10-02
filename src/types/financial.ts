export interface FinancialClarityData {
  amount: number;
  currency: string;
  status: string;
  trend: number[];
  changePercent?: number;
}

export interface ComplianceData {
  accuracy: number;
  reviewStatus: string;
  auditedEntitiesCount?: number;
}

export interface MonthlyCloseData {
  days: number;
  status: string;
  targetDays?: number;
}

export interface MonthlyPerformanceItem {
  month: string;
  value: number;
}

export interface FinancialMetricsData {
  financialClarity: FinancialClarityData;
  compliance: ComplianceData;
  monthlyClose: MonthlyCloseData;
  monthlyPerformance: MonthlyPerformanceItem[];
  lastUpdated: string;
}

export interface FinancialVisualConfig {
  showFinancialClarity?: boolean;
  showCompliance?: boolean;
  showMonthlyClose?: boolean;
  showMonitorBars?: boolean;
}
