export type GameMode =
  | '30s'
  | '1m'
  | '3m'
  | '5m'
  | 'k3_1m'
  | 'k3_3m'
  | 'k3_5m'
  | 'k3_10m'
  | 'd5_1m'
  | 'd5_3m'
  | 'd5_5m'
  | 'd5_10m'
  | 'trx_1m';

export type GameType = 'wingo' | 'k3' | '5d' | 'trx';

export type MarketType = 'big-small' | 'red-green' | 'even-odd';

export interface GameConfig {
  apiBase: string;
  apiPath: string;
  timerMod: number;
  label: string;
  badge: string;
  market: MarketType;
  gameType: GameType;
}

export interface DrawIssue {
  period: string;
  number: number;
}

export interface PredictionResult {
  type: 'Big' | 'Small' | 'Red' | 'Green' | 'Even' | 'Odd';
  calcNumber: number;
  logicName: string;
  confidence: number;
}

export interface HistoryRecord {
  period: string;
  prediction: string;
  actual: string;
  result: number;
  status: 'WIN' | 'LOSS';
  predictedNumber?: number;
}

export interface EngineState {
  id: number;
  name: string;
  wins: number;
  losses: number;
  currentPrediction: PredictionResult | null;
  history: HistoryRecord[];
  consecutiveWins: number;
  maxConsecutiveWins: number;
  winRate?: number;
  last10Rate?: number;
  last10Wins?: number;
  last10Total?: number;
  originalIndex?: number;
}

export interface ModeState {
  engines: EngineState[];
  history: DrawIssue[];
  lastProcessedPeriod: string | null;
  accumulatedHistory: DrawIssue[];
}

export interface AppSettings {
  password?: string;
  proTraderPassword?: string;
  devTelegramLink: string;
  joinTelegramLink: string;
}

export type ViewState =
  | 'home'
  | 'marketChoice'
  | 'grid'
  | 'prediction'
  | 'locked'
  | 'proLocked'
  | 'proModes';
