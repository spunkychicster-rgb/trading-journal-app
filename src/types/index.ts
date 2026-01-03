export interface UserProfile {
  experience: 'beginner' | 'intermediate' | 'advanced';
  brokers: string[];
  markets: string[];
  purpose: string;
  onboardingComplete: boolean;
}

export interface Trade {
  id: string;
  symbol: string;
  entryPrice: number;
  exitPrice: number | null;
  quantity: number;
  entryDate: string;
  exitDate: string | null;
  direction: 'long' | 'short';
  status: 'open' | 'closed';
  notes: string;
  profitLoss: number | null;
  returnPercentage: number | null;
  broker: string;
  market: string;
}

export interface DashboardStats {
  totalTrades: number;
  winRate: number;
  totalProfitLoss: number;
  averageWin: number;
  averageLoss: number;
  profitFactor: number;
  consecutiveWins: number;
  consecutiveLosses: number;
}
