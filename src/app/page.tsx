'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  TrendingUp, 
  TrendingDown, 
  Bell, 
  BarChart3, 
  History, 
  Users, 
  User, 
  Home,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Target,
  Activity,
  MessageCircle,
  Settings,
  ChevronRight,
  Zap,
  Eye,
  DollarSign,
  Brain,
  Shield,
  Sparkles,
  Layers,
  Globe,
  Wifi,
  Star,
  Award,
  Flame,
  Bolt,
  Radar,
  Cpu,
  Database,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart,
  PieChart,
  LineChart,
  Briefcase,
  Wallet,
  CreditCard,
  Smartphone,
  Monitor,
  Headphones,
  Search,
  Filter,
  Calendar,
  Download,
  Share,
  Bookmark,
  Heart,
  ThumbsUp,
  Send,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  RefreshCw,
  Loader,
  AlertCircle,
  Info,
  HelpCircle,
  ExternalLink,
  Copy,
  Edit,
  Trash2,
  Plus,
  Minus,
  X,
  Check,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Move,
  Resize,
  MoreHorizontal,
  MoreVertical,
  Menu,
  Grid,
  List,
  Map,
  Image,
  Video,
  Music,
  File,
  Folder,
  FolderOpen,
  Archive,
  Inbox,
  Mail,
  Phone,
  MessageSquare,
  Mic,
  Camera,
  Paperclip,
  Link as LinkIcon,
  Hash,
  AtSign,
  Percent,
  Slash,
  Backslash,
  Pipe,
  Ampersand,
  Asterisk,
  Equal,
  NotEqual,
  LessThan,
  GreaterThan,
  LessEqual,
  GreaterEqual,
  PlusCircle,
  MinusCircle,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  Scan,
  QrCode,
  Barcode,
  BankNote,
  Coins,
  Receipt,
  Calculator,
  Scale,
  Ruler,
  Compass,
  MapPin,
  Navigation,
  Locate,
  Route,
  Car,
  Truck,
  Bus,
  Train,
  Plane,
  Ship,
  Bike,
  Walk,
  Run,
  Battery,
  BatteryLow,
  Plug,
  Power,
  PowerOff,
  WifiOff,
  Bluetooth,
  Radio,
  Signal,
  Antenna,
  Satellite,
  Router,
  Server,
  HardDrive,
  SdCard,
  Usb,
  Cable,
  Ethernet,
  Rss,
  Podcast,
  Tv,
  Gamepad2,
  Joystick,
  Dices,
  Puzzle,
  Trophy,
  Medal,
  Crown,
  Gift,
  PartyPopper,
  Cake,
  Coffee
} from 'lucide-react'
import { useCountUp, useRealTimeData, useInView } from '@/hooks'

// Tipos avançados
interface MarketData {
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
}

interface CryptoSignal {
  id: string
  pair: string
  direction: 'CALL' | 'PUT'
  entry: number
  currentPrice: number
  timeframe: string
  winRate: number
  timestamp: Date
  status: 'active' | 'expired' | 'won' | 'lost'
  expiresIn: number
  result?: 'won' | 'lost'
  profit?: number
}

interface AdvancedSignal {
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
  timeframe: '1m' | '5m' | '15m' | '1h' | '4h' | '1d'
  strategy: string
  aiScore: number
}

interface TechnicalIndicator {
  name: string
  value: number | string
  signal: 'bullish' | 'bearish' | 'neutral'
  strength: number
}

interface NewsItem {
  id: string
  title: string
  summary: string
  impact: 'high' | 'medium' | 'low'
  sentiment: 'positive' | 'negative' | 'neutral'
  time: string
  source: string
}

interface Portfolio {
  totalValue: number
  totalPnL: number
  totalPnLPercent: number
  positions: Position[]
}

interface Position {
  asset: string
  quantity: number
  avgPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
  allocation: number
}

interface CryptoAsset {
  symbol: string
  name: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
  high24h: number
  low24h: number
  priceHistory: number[]
}

// Criptomoedas disponíveis para sinais com preços base reais
const CRYPTO_PAIRS = [
  { symbol: 'BTC/USDT', name: 'Bitcoin', basePrice: 43250.80 },
  { symbol: 'ETH/USDT', name: 'Ethereum', basePrice: 2680.50 },
  { symbol: 'BNB/USDT', name: 'Binance Coin', basePrice: 312.45 },
  { symbol: 'SOL/USDT', name: 'Solana', basePrice: 98.32 },
  { symbol: 'XRP/USDT', name: 'Ripple', basePrice: 0.5234 },
  { symbol: 'ADA/USDT', name: 'Cardano', basePrice: 0.4521 },
  { symbol: 'AVAX/USDT', name: 'Avalanche', basePrice: 36.78 },
  { symbol: 'DOT/USDT', name: 'Polkadot', basePrice: 7.23 },
  { symbol: 'MATIC/USDT', name: 'Polygon', basePrice: 0.8234 },
  { symbol: 'LINK/USDT', name: 'Chainlink', basePrice: 14.56 }
]

// Estado global para preços em tempo real
let realTimePrices: { [key: string]: number } = {}

// Inicializar preços
CRYPTO_PAIRS.forEach(crypto => {
  realTimePrices[crypto.symbol] = crypto.basePrice
})

// Atualizar preços em tempo real
setInterval(() => {
  CRYPTO_PAIRS.forEach(crypto => {
    const variation = (Math.random() - 0.5) * 0.003 // ±0.3% de variação
    realTimePrices[crypto.symbol] = realTimePrices[crypto.symbol] * (1 + variation)
  })
}, 2000) // Atualiza a cada 2 segundos

// Função para gerar sinal aleatório de criptomoeda com win rate 91%+
function generateCryptoSignal(): CryptoSignal {
  const crypto = CRYPTO_PAIRS[Math.floor(Math.random() * CRYPTO_PAIRS.length)]
  const direction = Math.random() > 0.5 ? 'CALL' : 'PUT'
  const currentPrice = realTimePrices[crypto.symbol]
  const priceVariation = (Math.random() - 0.5) * 0.01 // ±0.5% de variação
  const entryPrice = currentPrice * (1 + priceVariation)
  const winRate = 91 + Math.floor(Math.random() * 8) // 91-98%
  
  return {
    id: `signal-${Date.now()}-${Math.random()}`,
    pair: crypto.symbol,
    direction,
    entry: entryPrice,
    currentPrice: currentPrice,
    timeframe: '1:30 minutos',
    winRate,
    timestamp: new Date(),
    status: 'active',
    expiresIn: 90 // 90 segundos (1:30 minutos)
  }
}

export default function TradeVision() {
  const [mounted, setMounted] = useState(false)
  const [cryptoSignals, setCryptoSignals] = useState<CryptoSignal[]>([])
  const [activeTab, setActiveTab] = useState<'dashboard' | 'signals' | 'charts'>('dashboard')
  const [cryptoAssets, setCryptoAssets] = useState<CryptoAsset[]>([])

  useEffect(() => {
    setMounted(true)
    
    // Inicializar assets com dados reais
    const initialAssets: CryptoAsset[] = CRYPTO_PAIRS.map(crypto => ({
      symbol: crypto.symbol,
      name: crypto.name,
      price: crypto.basePrice,
      change24h: (Math.random() - 0.5) * 10, // -5% a +5%
      volume24h: Math.random() * 5000000000, // Volume aleatório
      marketCap: crypto.basePrice * (Math.random() * 1000000000),
      high24h: crypto.basePrice * 1.05,
      low24h: crypto.basePrice * 0.95,
      priceHistory: Array.from({ length: 20 }, (_, i) => 
        crypto.basePrice * (1 + (Math.random() - 0.5) * 0.05)
      )
    }))
    setCryptoAssets(initialAssets)
    
    // Atualizar preços dos assets em tempo real
    const assetUpdateInterval = setInterval(() => {
      setCryptoAssets(prev => prev.map(asset => {
        const newPrice = realTimePrices[asset.symbol]
        const priceChange = ((newPrice - asset.price) / asset.price) * 100
        
        return {
          ...asset,
          price: newPrice,
          change24h: asset.change24h + priceChange * 0.1,
          priceHistory: [...asset.priceHistory.slice(1), newPrice]
        }
      }))
    }, 2000)
    
    // Gerar primeiro sinal imediatamente
    setCryptoSignals([generateCryptoSignal()])
    
    // Gerar novo sinal a cada 90 segundos (1:30 minutos)
    const signalInterval = setInterval(() => {
      const newSignal = generateCryptoSignal()
      setCryptoSignals(prev => [newSignal, ...prev])
    }, 90000) // 90 segundos
    
    // Atualizar countdown dos sinais e preços atuais a cada segundo
    const countdownInterval = setInterval(() => {
      setCryptoSignals(prev => prev.map(signal => {
        // Atualizar preço atual do ativo
        const updatedSignal = {
          ...signal,
          currentPrice: realTimePrices[signal.pair]
        }
        
        if (signal.status === 'active') {
          const newExpiresIn = signal.expiresIn - 1
          if (newExpiresIn <= 0) {
            // Calcular resultado real baseado na direção e movimento do preço
            const priceMovement = updatedSignal.currentPrice - signal.entry
            const isCallCorrect = signal.direction === 'CALL' && priceMovement > 0
            const isPutCorrect = signal.direction === 'PUT' && priceMovement < 0
            
            // Simular win rate de 91%+ mas com lógica realista
            const randomFactor = Math.random()
            const won = randomFactor < (signal.winRate / 100) && (isCallCorrect || isPutCorrect)
            
            // Calcular lucro/prejuízo (simulado - 80% de retorno em win)
            const profit = won ? signal.entry * 0.80 : -signal.entry
            
            return { 
              ...updatedSignal, 
              status: won ? 'won' : 'lost', 
              expiresIn: 0,
              result: won ? 'won' : 'lost',
              profit: profit
            }
          }
          return { ...updatedSignal, expiresIn: newExpiresIn }
        }
        return updatedSignal
      }))
    }, 1000)
    
    return () => {
      clearInterval(signalInterval)
      clearInterval(countdownInterval)
      clearInterval(assetUpdateInterval)
    }
  }, [])

  // Dados mock avançados com simulação em tempo real
  const { data: marketData } = useRealTimeData<MarketData[]>(
    [
      { 
        asset: 'BTC/USD', 
        price: 43250.80, 
        change: 2.45, 
        trend: 'up',
        volume: 28500000000,
        high24h: 44100,
        low24h: 42800,
        marketCap: 847000000000,
        sentiment: 'bullish',
        volatility: 'high'
      },
      { 
        asset: 'ETH/USD', 
        price: 2680.50, 
        change: -1.23, 
        trend: 'down',
        volume: 15200000000,
        high24h: 2720,
        low24h: 2650,
        marketCap: 322000000000,
        sentiment: 'bearish',
        volatility: 'medium'
      },
      { 
        asset: 'EUR/USD', 
        price: 1.0845, 
        change: 0.67, 
        trend: 'up',
        volume: 1200000000,
        high24h: 1.0867,
        low24h: 1.0823,
        marketCap: 0,
        sentiment: 'neutral',
        volatility: 'low'
      },
      { 
        asset: 'GBP/USD', 
        price: 1.2634, 
        change: -0.34, 
        trend: 'down',
        volume: 890000000,
        high24h: 1.2678,
        low24h: 1.2612,
        marketCap: 0,
        sentiment: 'bearish',
        volatility: 'medium'
      }
    ],
    3000,
    (data) => 
      data.map(item => ({
        ...item,
        price: item.price * (1 + (Math.random() - 0.5) * 0.002),
        change: item.change + (Math.random() - 0.5) * 0.1,
        trend: Math.random() > 0.5 ? 'up' : 'down'
      }))
  )

  const advancedSignals: AdvancedSignal[] = [
    { 
      id: '1', 
      asset: 'BTC/USD', 
      type: 'buy', 
      price: 43100, 
      time: '14:30', 
      status: 'ativo', 
      confidence: 85,
      target: 44500,
      stopLoss: 42600,
      riskReward: 2.8,
      timeframe: '4h',
      strategy: 'Breakout + RSI Divergence',
      aiScore: 92
    },
    { 
      id: '2', 
      asset: 'ETH/USD', 
      type: 'sell', 
      price: 2690, 
      time: '14:15', 
      status: 'ativo', 
      confidence: 78,
      target: 2580,
      stopLoss: 2720,
      riskReward: 3.7,
      timeframe: '1h',
      strategy: 'Support Break + Volume',
      aiScore: 87
    },
    { 
      id: '3', 
      asset: 'EUR/USD', 
      type: 'buy', 
      price: 1.0840, 
      time: '13:45', 
      status: 'executado', 
      confidence: 92,
      target: 1.0890,
      stopLoss: 1.0820,
      riskReward: 2.5,
      timeframe: '1d',
      strategy: 'Trend Following + MA Cross',
      aiScore: 95
    }
  ]

  const technicalIndicators: TechnicalIndicator[] = [
    { name: 'RSI (14)', value: 68.5, signal: 'neutral', strength: 65 },
    { name: 'MACD', value: '+125.8', signal: 'bullish', strength: 78 },
    { name: 'MA (20)', value: 42890, signal: 'bullish', strength: 82 },
    { name: 'Bollinger Bands', value: 'Upper', signal: 'bearish', strength: 45 },
    { name: 'Stochastic', value: 72.3, signal: 'neutral', strength: 58 },
    { name: 'Williams %R', value: -28.7, signal: 'bullish', strength: 71 }
  ]

  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'Bitcoin ETF Approval Drives Institutional Interest',
      summary: 'Major financial institutions are increasing their Bitcoin allocations following recent regulatory clarity.',
      impact: 'high',
      sentiment: 'positive',
      time: '2h',
      source: 'CryptoNews'
    },
    {
      id: '2',
      title: 'Federal Reserve Hints at Rate Cuts',
      summary: 'Fed officials suggest potential monetary policy easing could benefit risk assets.',
      impact: 'high',
      sentiment: 'positive',
      time: '4h',
      source: 'Financial Times'
    },
    {
      id: '3',
      title: 'Ethereum Network Upgrade Shows Promise',
      summary: 'Latest network improvements demonstrate significant scalability gains.',
      impact: 'medium',
      sentiment: 'positive',
      time: '6h',
      source: 'TechCrunch'
    }
  ]

  const portfolio: Portfolio = {
    totalValue: 125430.50,
    totalPnL: 8750.25,
    totalPnLPercent: 7.5,
    positions: [
      { asset: 'BTC', quantity: 1.25, avgPrice: 41200, currentPrice: 43250, pnl: 2562.50, pnlPercent: 4.97, allocation: 45.2 },
      { asset: 'ETH', quantity: 15.8, avgPrice: 2580, currentPrice: 2680, pnl: 1580.00, pnlPercent: 3.88, allocation: 35.1 },
      { asset: 'EUR/USD', quantity: 50000, avgPrice: 1.0820, currentPrice: 1.0845, pnl: 1250.00, pnlPercent: 2.31, allocation: 19.7 }
    ]
  }

  // Formatar tempo restante
  const formatTimeRemaining = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Formatar data/hora
  const formatDateTime = (date: Date): string => {
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Calcular estatísticas dos sinais
  const signalStats = {
    total: cryptoSignals.length,
    won: cryptoSignals.filter(s => s.result === 'won').length,
    lost: cryptoSignals.filter(s => s.result === 'lost').length,
    active: cryptoSignals.filter(s => s.status === 'active').length,
    winRate: cryptoSignals.filter(s => s.result).length > 0 
      ? (cryptoSignals.filter(s => s.result === 'won').length / cryptoSignals.filter(s => s.result).length * 100).toFixed(1)
      : '0.0',
    totalProfit: cryptoSignals.filter(s => s.profit).reduce((acc, s) => acc + (s.profit || 0), 0)
  }

  // Componente de Dashboard Premium
  const DashboardScreen = () => {
    const [setRef, inView] = useInView()
    const totalValue = useCountUp(portfolio.totalValue, 2000)
    const totalPnL = useCountUp(portfolio.totalPnL, 2000)

    return (
      <div className="space-y-4 sm:space-y-6 lg:space-y-8" ref={setRef}>
        {/* CTA Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-purple-500/30 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-800/20 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-purple-300 mr-3" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Comece a Lucrar Hoje!
              </h2>
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-purple-300 ml-3" />
            </div>
            
            <p className="text-purple-100 text-lg sm:text-xl lg:text-2xl font-semibold mb-2">
              Junte-se aos mais de 300 traders que já estão lucrando com a gente.
            </p>
            <p className="text-purple-200 text-base sm:text-lg mb-6">
              Não perca mais oportunidades no mercado.
            </p>
            
            <a 
              href="https://www.homebroker.com/ref/b7uuQGxU/" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-white text-purple-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <Zap className="w-6 h-6" />
              <span>Começar a Operar Agora</span>
              <ArrowRight className="w-6 h-6" />
            </a>
            
            <div className="mt-6 flex items-center justify-center space-x-6 text-purple-200 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-purple-300" />
                <span>Sinais em Tempo Real</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-purple-300" />
                <span>Suporte 24/7</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-purple-300" />
                <span>IA Avançada</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sinais de Criptomoedas - A cada 90 segundos */}
        <div className="bg-gradient-to-br from-purple-600/20 via-purple-700/10 to-purple-800/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-purple-500/30 shadow-xl">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl flex items-center justify-center animate-pulse">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center">
                  Sinais de Criptomoedas
                  <span className="ml-3 text-sm sm:text-base bg-purple-600/30 px-3 py-1 rounded-lg border border-purple-500/50">
                    {signalStats.winRate}% Win Rate
                  </span>
                </h2>
                <p className="text-purple-300 text-xs sm:text-sm">Novo sinal a cada 90 segundos</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-purple-600/20 rounded-xl px-3 py-2 border border-purple-500/30">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 animate-spin" />
              <span className="text-purple-300 text-xs sm:text-sm font-medium">Auto</span>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {cryptoSignals.length === 0 ? (
              <div className="text-center py-8 text-purple-300">
                <Loader className="w-8 h-8 animate-spin mx-auto mb-3" />
                <p>Gerando primeiro sinal...</p>
              </div>
            ) : (
              cryptoSignals.slice(0, 3).map((signal) => (
                <div 
                  key={signal.id} 
                  className={`relative overflow-hidden bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-all duration-300 ${
                    signal.status === 'active' 
                      ? 'border-purple-500/50 shadow-lg shadow-purple-500/20' 
                      : signal.status === 'won'
                      ? 'border-green-500/50 shadow-lg shadow-green-500/20'
                      : 'border-red-500/50 shadow-lg shadow-red-500/20'
                  }`}
                >
                  {signal.status === 'active' && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 animate-pulse"></div>
                  )}
                  {signal.status === 'won' && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 via-green-500 to-green-600"></div>
                  )}
                  {signal.status === 'lost' && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600"></div>
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center ${
                        signal.direction === 'CALL' 
                          ? 'bg-gradient-to-br from-purple-600 to-purple-800' 
                          : 'bg-gradient-to-br from-red-600 to-red-800'
                      }`}>
                        {signal.direction === 'CALL' ? (
                          <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        ) : (
                          <TrendingDown className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        )}
                      </div>
                      <div>
                        <div className="text-white font-bold text-lg sm:text-xl">{signal.pair}</div>
                        <div className="text-purple-300 text-sm sm:text-base">{signal.direction}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {signal.status === 'active' ? (
                        <>
                          <div className="text-white font-bold text-xl sm:text-2xl mb-1">
                            {formatTimeRemaining(signal.expiresIn)}
                          </div>
                          <div className="text-purple-300 text-xs sm:text-sm">Tempo restante</div>
                        </>
                      ) : signal.status === 'won' ? (
                        <div className="flex flex-col items-end space-y-1">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-6 h-6 text-green-500" />
                            <span className="text-green-500 font-bold text-lg">WIN</span>
                          </div>
                          {signal.profit && (
                            <div className="text-green-400 text-sm">
                              +${Math.abs(signal.profit).toFixed(2)}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-end space-y-1">
                          <div className="flex items-center space-x-2">
                            <XCircle className="w-6 h-6 text-red-500" />
                            <span className="text-red-500 font-bold text-lg">LOSS</span>
                          </div>
                          {signal.profit && (
                            <div className="text-red-400 text-sm">
                              -${Math.abs(signal.profit).toFixed(2)}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-purple-300 text-xs mb-1">Entrada</div>
                      <div className="text-white font-bold text-sm sm:text-base">
                        ${signal.entry.toFixed(signal.entry < 1 ? 4 : 2)}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-purple-300 text-xs mb-1">Atual</div>
                      <div className="text-white font-bold text-sm sm:text-base">
                        ${signal.currentPrice.toFixed(signal.currentPrice < 1 ? 4 : 2)}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-purple-300 text-xs mb-1">Win Rate</div>
                      <div className="text-purple-400 font-bold text-sm sm:text-base">{signal.winRate}%</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-purple-600/10 rounded-lg p-3 border border-purple-500/20">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-purple-400" />
                      <span className="text-purple-300 text-sm">Timeframe: {signal.timeframe}</span>
                    </div>
                    {signal.status === 'active' && (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                        <span className="text-purple-400 text-xs font-medium">ATIVO</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 sm:mt-6 bg-purple-600/10 rounded-xl p-4 border border-purple-500/20">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
              <div className="text-purple-200 text-xs sm:text-sm">
                <p className="font-semibold mb-1">Como funciona:</p>
                <p>• Novos sinais são gerados automaticamente a cada 90 segundos</p>
                <p>• Cada sinal tem {signalStats.winRate}% de taxa de acerto</p>
                <p>• Execute a operação no par indicado com o timeframe de 1:30 minutos</p>
                <p>• Valores dos ativos são atualizados em tempo real</p>
              </div>
            </div>
          </div>
        </div>

        {/* Header com efeito glassmorphism */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-600/10 via-transparent to-purple-800/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-purple-800/5 animate-pulse"></div>
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-[#B3B3B3] bg-clip-text text-transparent">
                  TradeVision AI
                </h1>
                <p className="text-[#B3B3B3] mt-1 text-sm sm:text-base">Powered by Advanced Machine Learning</p>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="flex items-center space-x-2 bg-purple-600/20 rounded-xl px-3 sm:px-4 py-2 border border-purple-600/30">
                  <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  <span className="text-purple-400 font-medium text-sm">AI Active</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 rounded-xl px-2 sm:px-3 py-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-purple-400 text-xs sm:text-sm font-medium">Live</span>
                </div>
              </div>
            </div>

            {/* Portfolio Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl flex items-center justify-center">
                      <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-[#B3B3B3] text-xs sm:text-sm">Portfolio Total</p>
                      <p className="text-lg sm:text-2xl font-bold text-white">
                        {mounted && inView ? `$${totalValue.toLocaleString()}` : '$0'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                  <span className="text-purple-400 font-medium text-sm">+{portfolio.totalPnLPercent}%</span>
                  <span className="text-[#B3B3B3] text-xs sm:text-sm">24h</span>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-[#B3B3B3] text-xs sm:text-sm">Total P&L</p>
                      <p className="text-lg sm:text-2xl font-bold text-purple-400">
                        {mounted && inView ? `+$${totalPnL.toLocaleString()}` : '+$0'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                  <span className="text-purple-400 font-medium text-sm">Profitable</span>
                  <span className="text-[#B3B3B3] text-xs sm:text-sm">All time</span>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#FF6B6B] to-[#FF5252] rounded-xl flex items-center justify-center">
                      <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-[#B3B3B3] text-xs sm:text-sm">Win Rate</p>
                      <p className="text-lg sm:text-2xl font-bold text-white">{signalStats.winRate}%</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4 text-[#FFD700]" />
                  <span className="text-[#FFD700] font-medium text-sm">Excellent</span>
                  <span className="text-[#B3B3B3] text-xs sm:text-sm">Performance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Overview com gráficos avançados */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-400" />
                Market Pulse
              </h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-purple-400 text-xs sm:text-sm">Real-time</span>
              </div>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {Array.isArray(marketData) && marketData.map((item, index) => (
                <div key={index} className="group bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${
                        item.trend === 'up' ? 'bg-purple-600/20' : 'bg-[#FF4D4D]/20'
                      }`}>
                        {item.trend === 'up' ? (
                          <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                        ) : (
                          <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF4D4D]" />
                        )}
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm sm:text-base">{item.asset}</div>
                        <div className="text-[#B3B3B3] text-xs sm:text-sm">Vol: ${(item.volume / 1000000000).toFixed(1)}B</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold text-sm sm:text-lg">
                        {mounted ? `$${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}` : '$0'}
                      </div>
                      <div className={`text-xs sm:text-sm font-medium ${
                        item.trend === 'up' ? 'text-purple-400' : 'text-[#FF4D4D]'
                      }`}>
                        {item.trend === 'up' ? '+' : ''}{item.change.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                  
                  {/* Mini chart simulation */}
                  <div className="mt-3 sm:mt-4 h-8 sm:h-12 flex items-end space-x-1">
                    {Array.from({length: 20}).map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-1 rounded-sm transition-all duration-300 ${
                          item.trend === 'up' ? 'bg-purple-500' : 'bg-[#FF4D4D]'
                        }`}
                        style={{
                          height: `${((i * 7 + index * 3) % 30) + 10}px`,
                          opacity: 0.3 + (i / 20) * 0.7
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights Panel */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center">
                <Brain className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-500" />
                AI Insights
              </h2>
              <div className="flex items-center space-x-2 bg-purple-600/20 rounded-lg px-2 sm:px-3 py-1">
                <Cpu className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                <span className="text-purple-400 text-xs sm:text-sm font-medium">GPT-4</span>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="bg-gradient-to-r from-purple-600/10 to-transparent rounded-xl p-3 sm:p-4 border border-purple-500/20">
                <div className="flex items-center space-x-3 mb-2 sm:mb-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm sm:text-base">Market Sentiment</div>
                    <div className="text-purple-400 text-xs sm:text-sm">Bullish Momentum</div>
                  </div>
                </div>
                <p className="text-[#B3B3B3] text-xs sm:text-sm">
                  AI detects strong buying pressure across major assets. Institutional flow suggests continued upward movement.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-500/10 to-transparent rounded-xl p-3 sm:p-4 border border-purple-400/20">
                <div className="flex items-center space-x-3 mb-2 sm:mb-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Radar className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm sm:text-base">Risk Assessment</div>
                    <div className="text-purple-400 text-xs sm:text-sm">Moderate Risk</div>
                  </div>
                </div>
                <p className="text-[#B3B3B3] text-xs sm:text-sm">
                  Volatility levels are within acceptable ranges. Recommended position sizing: 2-3% per trade.
                </p>
              </div>

              <div className="bg-gradient-to-r from-[#FFD700]/10 to-transparent rounded-xl p-3 sm:p-4 border border-[#FFD700]/20">
                <div className="flex items-center space-x-3 mb-2 sm:mb-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#FFD700]/20 rounded-lg flex items-center justify-center">
                    <Bolt className="w-3 h-3 sm:w-4 sm:h-4 text-[#FFD700]" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm sm:text-base">Opportunity Alert</div>
                    <div className="text-[#FFD700] text-xs sm:text-sm">High Probability</div>
                  </div>
                </div>
                <p className="text-[#B3B3B3] text-xs sm:text-sm">
                  BTC showing breakout pattern with 85% historical success rate. Consider long position.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Signals */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#FFD700]" />
              Premium Signals
            </h2>
            <div className="flex items-center space-x-2">
              <div className="text-purple-400 text-xs sm:text-sm font-medium">{advancedSignals.filter(s => s.status === 'ativo').length} Active</div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            {advancedSignals.slice(0, 2).map((signal) => (
              <div key={signal.id} className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${
                      signal.type === 'buy' ? 'bg-purple-600/20' : 'bg-[#FF4D4D]/20'
                    }`}>
                      {signal.type === 'buy' ? (
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4D4D]" />
                      )}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm sm:text-base">{signal.asset}</div>
                      <div className="text-[#B3B3B3] text-xs sm:text-sm">{signal.strategy}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
                      <span className="text-purple-400 text-xs sm:text-sm font-medium">{signal.aiScore}</span>
                    </div>
                    <div className="text-[#B3B3B3] text-xs">{signal.timeframe}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <div>
                    <div className="text-[#B3B3B3] text-xs">Entry</div>
                    <div className="text-white font-medium text-sm">${signal.price}</div>
                  </div>
                  <div>
                    <div className="text-[#B3B3B3] text-xs">Target</div>
                    <div className="text-purple-400 font-medium text-sm">${signal.target}</div>
                  </div>
                  <div>
                    <div className="text-[#B3B3B3] text-xs">R:R</div>
                    <div className="text-[#FFD700] font-medium text-sm">{signal.riskReward}:1</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-[#B3B3B3] text-xs sm:text-sm">Confidence:</span>
                    <span className="text-white font-medium text-xs sm:text-sm">{signal.confidence}%</span>
                  </div>
                  <div className="w-16 sm:w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-600 to-purple-800 transition-all duration-500"
                      style={{ width: `${signal.confidence}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Tela de Histórico de Sinais
  const SignalsHistoryScreen = () => {
    return (
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-600/10 via-transparent to-purple-800/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-purple-800/5 animate-pulse"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-[#B3B3B3] bg-clip-text text-transparent">
                  Histórico de Sinais
                </h1>
                <p className="text-[#B3B3B3] mt-1 text-sm sm:text-base">Todos os sinais gerados pela IA</p>
              </div>
              <div className="flex items-center space-x-2 bg-purple-600/20 rounded-xl px-3 sm:px-4 py-2 border border-purple-600/30">
                <History className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                <span className="text-purple-400 font-medium text-sm">{cryptoSignals.length} Sinais</span>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-4 h-4 text-purple-400" />
                  <span className="text-[#B3B3B3] text-xs">Total</span>
                </div>
                <div className="text-white font-bold text-xl">{signalStats.total}</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-[#B3B3B3] text-xs">Ganhos</span>
                </div>
                <div className="text-green-500 font-bold text-xl">{signalStats.won}</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span className="text-[#B3B3B3] text-xs">Perdas</span>
                </div>
                <div className="text-red-500 font-bold text-xl">{signalStats.lost}</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span className="text-[#B3B3B3] text-xs">Win Rate</span>
                </div>
                <div className="text-purple-400 font-bold text-xl">{signalStats.winRate}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Sinais */}
        <div className="bg-gradient-to-br from-purple-600/20 via-purple-700/10 to-purple-800/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-purple-500/30 shadow-xl">
          <div className="space-y-3 sm:space-y-4">
            {cryptoSignals.length === 0 ? (
              <div className="text-center py-12 text-purple-300">
                <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Nenhum sinal gerado ainda</p>
              </div>
            ) : (
              cryptoSignals.map((signal) => (
                <div 
                  key={signal.id} 
                  className={`relative overflow-hidden bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-all duration-300 ${
                    signal.status === 'active' 
                      ? 'border-purple-500/50 shadow-lg shadow-purple-500/20' 
                      : signal.status === 'won'
                      ? 'border-green-500/50 shadow-lg shadow-green-500/20'
                      : 'border-red-500/50 shadow-lg shadow-red-500/20'
                  }`}
                >
                  {signal.status === 'active' && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 animate-pulse"></div>
                  )}
                  {signal.status === 'won' && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 via-green-500 to-green-600"></div>
                  )}
                  {signal.status === 'lost' && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600"></div>
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center ${
                        signal.direction === 'CALL' 
                          ? 'bg-gradient-to-br from-purple-600 to-purple-800' 
                          : 'bg-gradient-to-br from-red-600 to-red-800'
                      }`}>
                        {signal.direction === 'CALL' ? (
                          <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        ) : (
                          <TrendingDown className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        )}
                      </div>
                      <div>
                        <div className="text-white font-bold text-lg sm:text-xl">{signal.pair}</div>
                        <div className="text-purple-300 text-sm sm:text-base">{signal.direction}</div>
                        <div className="text-[#B3B3B3] text-xs mt-1">
                          {formatDateTime(signal.timestamp)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {signal.status === 'active' ? (
                        <>
                          <div className="text-white font-bold text-xl sm:text-2xl mb-1">
                            {formatTimeRemaining(signal.expiresIn)}
                          </div>
                          <div className="text-purple-300 text-xs sm:text-sm">Tempo restante</div>
                        </>
                      ) : signal.status === 'won' ? (
                        <div className="flex flex-col items-end space-y-2">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-6 h-6 text-green-500" />
                            <span className="text-green-500 font-bold text-lg">WIN</span>
                          </div>
                          {signal.profit && (
                            <div className="text-green-400 text-sm">
                              +${Math.abs(signal.profit).toFixed(2)}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-end space-y-2">
                          <div className="flex items-center space-x-2">
                            <XCircle className="w-6 h-6 text-red-500" />
                            <span className="text-red-500 font-bold text-lg">LOSS</span>
                          </div>
                          {signal.profit && (
                            <div className="text-red-400 text-sm">
                              -${Math.abs(signal.profit).toFixed(2)}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-purple-300 text-xs mb-1">Entrada</div>
                      <div className="text-white font-bold text-sm sm:text-base">
                        ${signal.entry.toFixed(signal.entry < 1 ? 4 : 2)}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-purple-300 text-xs mb-1">Atual</div>
                      <div className="text-white font-bold text-sm sm:text-base">
                        ${signal.currentPrice.toFixed(signal.currentPrice < 1 ? 4 : 2)}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-purple-300 text-xs mb-1">Win Rate</div>
                      <div className="text-purple-400 font-bold text-sm sm:text-base">{signal.winRate}%</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-purple-600/10 rounded-lg p-3 border border-purple-500/20">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-purple-400" />
                      <span className="text-purple-300 text-sm">Timeframe: {signal.timeframe}</span>
                    </div>
                    {signal.status === 'active' && (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                        <span className="text-purple-400 text-xs font-medium">ATIVO</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  }

  // Tela de Charts com valores reais
  const ChartsScreen = () => {
    return (
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-600/10 via-transparent to-purple-800/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-purple-800/5 animate-pulse"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-[#B3B3B3] bg-clip-text text-transparent">
                  Valores em Tempo Real
                </h1>
                <p className="text-[#B3B3B3] mt-1 text-sm sm:text-base">Preços atualizados a cada 2 segundos</p>
              </div>
              <div className="flex items-center space-x-2 bg-purple-600/20 rounded-xl px-3 sm:px-4 py-2 border border-purple-600/30">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 animate-pulse" />
                <span className="text-purple-400 font-medium text-sm">Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de Ativos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {cryptoAssets.map((asset) => (
            <div 
              key={asset.symbol}
              className="bg-gradient-to-br from-purple-600/20 via-purple-700/10 to-purple-800/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-500/30 shadow-xl hover:scale-105 transition-all duration-300"
            >
              {/* Header do Card */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-bold text-lg sm:text-xl">{asset.symbol}</h3>
                  <p className="text-purple-300 text-xs sm:text-sm">{asset.name}</p>
                </div>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${
                  asset.change24h >= 0 ? 'bg-green-600/20' : 'bg-red-600/20'
                }`}>
                  {asset.change24h >= 0 ? (
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                  )}
                </div>
              </div>

              {/* Preço Atual */}
              <div className="mb-4">
                <div className="text-[#B3B3B3] text-xs mb-1">Preço Atual</div>
                <div className="text-white font-bold text-2xl sm:text-3xl">
                  ${mounted ? asset.price.toFixed(asset.price < 1 ? 4 : 2) : '0.00'}
                </div>
                <div className={`text-sm sm:text-base font-medium mt-1 ${
                  asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}% (24h)
                </div>
              </div>

              {/* Mini Gráfico */}
              <div className="mb-4">
                <div className="h-16 sm:h-20 flex items-end space-x-1">
                  {asset.priceHistory.map((price, i) => {
                    const maxPrice = Math.max(...asset.priceHistory)
                    const minPrice = Math.min(...asset.priceHistory)
                    const range = maxPrice - minPrice
                    const height = range > 0 ? ((price - minPrice) / range) * 100 : 50
                    
                    return (
                      <div 
                        key={i} 
                        className={`flex-1 rounded-sm transition-all duration-300 ${
                          asset.change24h >= 0 ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{
                          height: `${height}%`,
                          opacity: 0.3 + (i / asset.priceHistory.length) * 0.7
                        }}
                      ></div>
                    )
                  })}
                </div>
              </div>

              {/* Estatísticas */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-purple-300 text-xs mb-1">High 24h</div>
                  <div className="text-white font-bold text-sm">
                    ${asset.high24h.toFixed(asset.high24h < 1 ? 4 : 2)}
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-purple-300 text-xs mb-1">Low 24h</div>
                  <div className="text-white font-bold text-sm">
                    ${asset.low24h.toFixed(asset.low24h < 1 ? 4 : 2)}
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 col-span-2">
                  <div className="text-purple-300 text-xs mb-1">Volume 24h</div>
                  <div className="text-white font-bold text-sm">
                    ${(asset.volume24h / 1000000000).toFixed(2)}B
                  </div>
                </div>
              </div>

              {/* Indicador de Atualização */}
              <div className="mt-4 flex items-center justify-center space-x-2 text-purple-400 text-xs">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>Atualizando em tempo real</span>
              </div>
            </div>
          ))}
        </div>

        {/* Informações Adicionais */}
        <div className="bg-purple-600/10 rounded-xl p-4 border border-purple-500/20">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div className="text-purple-200 text-xs sm:text-sm">
              <p className="font-semibold mb-1">Sobre os valores:</p>
              <p>• Preços atualizados automaticamente a cada 2 segundos</p>
              <p>• Dados refletem os mesmos ativos usados nos sinais de trading</p>
              <p>• Gráficos mostram histórico dos últimos 20 pontos de dados</p>
              <p>• Variação percentual calculada nas últimas 24 horas</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Navegação Premium
  const Navigation = () => (
    <nav className="bg-white/5 backdrop-blur-xl border-t border-white/10 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-around max-w-2xl mx-auto">
        {[
          { id: 'dashboard', icon: Home, label: 'Dashboard' },
          { id: 'signals', icon: History, label: 'Signals' },
          { id: 'charts', icon: BarChart3, label: 'Charts' },
          { id: 'portfolio', icon: Briefcase, label: 'Portfolio' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as 'dashboard' | 'signals' | 'charts')}
            className={`flex flex-col items-center space-y-1 p-2 sm:p-3 rounded-xl transition-all duration-300 group min-w-0 ${
              activeTab === item.id 
                ? 'text-purple-400 bg-purple-600/20' 
                : 'text-[#B3B3B3] hover:text-white hover:scale-105'
            }`}
          >
            <div className={`p-1 sm:p-2 rounded-lg transition-all duration-300 ${
              activeTab === item.id ? 'bg-purple-600/30' : 'group-hover:bg-white/10'
            }`}>
              <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-xs font-medium truncate hidden sm:block">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-purple-800/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-800/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <main className="flex-1 p-3 sm:p-4 lg:p-6 pb-20 sm:pb-24 relative z-10">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' ? <DashboardScreen /> : activeTab === 'signals' ? <SignalsHistoryScreen /> : <ChartsScreen />}
        </div>
      </main>
      <Navigation />
    </div>
  )
}
