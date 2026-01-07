// Tipos e interfaces avançadas para o TradeVision Premium
export interface User {
  name: string
  email: string
  level: 'iniciante' | 'intermediário' | 'avançado' | 'profissional'
  isOnboarded: boolean
  membershipType: 'free' | 'premium' | 'pro'
  joinDate: string
  verified: boolean
}

export interface MarketData {
  asset: string
  price: number
  change: number
  trend: 'up' | 'down'
  volume: number
  high24h: number
  low24h: number
  marketCap: number
  sentiment: 'bullish' | 'bearish' | 'neutral'
  volatility: 'low' | 'medium' | 'high'
  dominance?: number
  activeAddresses?: number
}

export interface AdvancedSignal {
  id: string
  asset: string
  type: 'buy' | 'sell'
  price: number
  time: string
  status: 'ativo' | 'expirada' | 'executado'
  confidence: number
  target: number
  stopLoss: number
  riskReward: number
  timeframe: '1m' | '5m' | '15m' | '1h' | '4h' | '1d' | '1w'
  strategy: string
  aiScore: number
  description?: string
  tags?: string[]
}

export interface Signal {
  id: string
  asset: string
  type: 'buy' | 'sell'
  price: number
  time: string
  status: 'ativo' | 'expirada'
  confidence: number
  target?: number
  stopLoss?: number
  description?: string
}

export interface Trade {
  id: string
  asset: string
  type: 'buy' | 'sell'
  entryPrice: number
  exitPrice?: number
  result: 'sucesso' | 'neutro' | 'perda'
  date: string
  profit?: number
  quantity?: number
  fees?: number
  duration?: string
  strategy?: string
}

export interface Post {
  id: string
  author: string
  content: string
  time: string
  likes: number
  comments: number
  avatar?: string
  tags?: string[]
  verified?: boolean
  membershipType?: 'free' | 'premium' | 'pro'
}

export interface TechnicalIndicator {
  name: string
  value: number | string
  signal: 'bullish' | 'bearish' | 'neutral'
  strength: number
  description?: string
  timeframe?: string
}

export interface ChartData {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface CandlestickData {
  time: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  isGreen: boolean
}

export interface UserStats {
  winRate: number
  totalTrades: number
  totalProfit: number
  activeDays: number
  bestTrade: number
  worstTrade: number
  averageProfit: number
  maxDrawdown: number
  sharpeRatio: number
  profitFactor: number
}

export interface Portfolio {
  totalValue: number
  totalPnL: number
  totalPnLPercent: number
  positions: Position[]
  riskLevel: 'low' | 'medium' | 'high'
  diversificationScore: number
}

export interface Position {
  asset: string
  quantity: number
  avgPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
  allocation: number
  riskScore: number
  entryDate: string
}

export interface NewsItem {
  id: string
  title: string
  summary: string
  impact: 'high' | 'medium' | 'low'
  sentiment: 'positive' | 'negative' | 'neutral'
  time: string
  source: string
  category: 'crypto' | 'forex' | 'stocks' | 'commodities' | 'general'
  tags?: string[]
}

export interface NotificationSettings {
  pushNotifications: boolean
  emailAlerts: boolean
  smsAlerts: boolean
  tradingSignals: boolean
  marketNews: boolean
  priceAlerts: boolean
  communityUpdates: boolean
  aiInsights: boolean
}

export interface TradingPreferences {
  riskLevel: number // 0-100
  maxPositionSize: number // percentage
  autoTrading: boolean
  stopLossEnabled: boolean
  takeProfitEnabled: boolean
  preferredTimeframes: string[]
  favoriteAssets: string[]
  tradingStyle: 'scalping' | 'day' | 'swing' | 'position'
}

export interface AIInsight {
  id: string
  type: 'sentiment' | 'risk' | 'opportunity' | 'warning'
  title: string
  description: string
  confidence: number
  impact: 'high' | 'medium' | 'low'
  timeframe: string
  relatedAssets: string[]
  actionable: boolean
}

export interface MarketSentiment {
  overall: 'bullish' | 'bearish' | 'neutral'
  fearGreedIndex: number
  socialVolume: 'high' | 'medium' | 'low'
  institutionalFlow: 'inflow' | 'outflow' | 'neutral'
  technicalScore: number
  fundamentalScore: number
}

export interface RiskMetrics {
  portfolioRisk: number
  valueAtRisk: number
  maxDrawdown: number
  volatility: number
  beta: number
  sharpeRatio: number
  sortinoRatio: number
}

// Constantes do app premium
export const COLORS = {
  background: '#0D0D0D',
  success: '#00FF88',
  danger: '#FF4D4D',
  warning: '#FFD700',
  info: '#0066FF',
  text: '#FFFFFF',
  textSecondary: '#B3B3B3',
  accent: '#00CC6A',
  purple: '#8B5CF6',
  orange: '#FF6B35',
  pink: '#FF6B9D'
} as const

export const GRADIENTS = {
  primary: 'from-[#00FF88] to-[#00CC6A]',
  secondary: 'from-[#0066FF] to-[#0052CC]',
  warning: 'from-[#FFD700] to-[#FFA500]',
  danger: 'from-[#FF4D4D] to-[#FF3333]',
  purple: 'from-[#8B5CF6] to-[#7C3AED]',
  sunset: 'from-[#FF6B35] to-[#FF8E53]'
} as const

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 800
} as const

export const TIMEFRAMES = [
  { value: '1m', label: '1 Minute' },
  { value: '5m', label: '5 Minutes' },
  { value: '15m', label: '15 Minutes' },
  { value: '1h', label: '1 Hour' },
  { value: '4h', label: '4 Hours' },
  { value: '1d', label: '1 Day' },
  { value: '1w', label: '1 Week' }
] as const

export const ASSET_CATEGORIES = [
  { value: 'crypto', label: 'Cryptocurrency' },
  { value: 'forex', label: 'Foreign Exchange' },
  { value: 'stocks', label: 'Stocks' },
  { value: 'commodities', label: 'Commodities' },
  { value: 'indices', label: 'Indices' }
] as const

export const RISK_LEVELS = [
  { value: 'low', label: 'Conservative', color: '#00FF88' },
  { value: 'medium', label: 'Moderate', color: '#FFD700' },
  { value: 'high', label: 'Aggressive', color: '#FF4D4D' }
] as const

export const TRADING_STYLES = [
  { value: 'scalping', label: 'Scalping', description: 'Quick trades, seconds to minutes' },
  { value: 'day', label: 'Day Trading', description: 'Intraday positions' },
  { value: 'swing', label: 'Swing Trading', description: 'Days to weeks' },
  { value: 'position', label: 'Position Trading', description: 'Weeks to months' }
] as const

// Utility types
export type ScreenType = 'dashboard' | 'signals' | 'charts' | 'history' | 'community' | 'profile' | 'portfolio' | 'news' | 'ai-insights'

export type ThemeMode = 'dark' | 'light'

export type SortOrder = 'asc' | 'desc'

export type FilterType = 'all' | 'active' | 'completed' | 'profitable' | 'loss'

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}

// WebSocket message types
export interface WebSocketMessage {
  type: 'price_update' | 'signal_update' | 'news_update' | 'notification'
  data: any
  timestamp: number
}

export interface PriceUpdate {
  asset: string
  price: number
  change: number
  volume: number
  timestamp: number
}

// Form types
export interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

export interface SignupForm {
  name: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export interface ProfileForm {
  name: string
  email: string
  bio?: string
  avatar?: string
  preferences: TradingPreferences
  notifications: NotificationSettings
}

// Error types
export interface AppError {
  code: string
  message: string
  details?: any
}

export interface ValidationError {
  field: string
  message: string
}

// State management types
export interface AppState {
  user: User | null
  currentScreen: ScreenType
  theme: ThemeMode
  isLoading: boolean
  error: AppError | null
}

export interface MarketState {
  data: MarketData[]
  isLoading: boolean
  lastUpdate: number
  error: string | null
}

export interface SignalState {
  signals: AdvancedSignal[]
  isLoading: boolean
  filters: {
    status: string
    asset: string
    timeframe: string
  }
}

export interface PortfolioState {
  portfolio: Portfolio
  isLoading: boolean
  lastUpdate: number
}

// Hook return types
export interface UseMarketDataReturn {
  data: MarketData[]
  isLoading: boolean
  error: string | null
  refresh: () => void
}

export interface UseSignalsReturn {
  signals: AdvancedSignal[]
  isLoading: boolean
  error: string | null
  addSignal: (signal: Omit<AdvancedSignal, 'id'>) => void
  updateSignal: (id: string, updates: Partial<AdvancedSignal>) => void
  deleteSignal: (id: string) => void
}

export interface UsePortfolioReturn {
  portfolio: Portfolio
  isLoading: boolean
  error: string | null
  addPosition: (position: Omit<Position, 'pnl' | 'pnlPercent'>) => void
  updatePosition: (asset: string, updates: Partial<Position>) => void
  removePosition: (asset: string) => void
}