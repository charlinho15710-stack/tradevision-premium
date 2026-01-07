'use client'

import { useState } from 'react'
import { 
  Zap, 
  ArrowUpRight, 
  ArrowDownRight, 
  Brain, 
  Target, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Filter,
  Search,
  Star,
  Award,
  Flame,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Home,
  BarChart3,
  Briefcase,
  Globe,
  History,
  Users,
  User
} from 'lucide-react'

interface Signal {
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
  pnl?: number
}

export default function SignalsPage() {
  const [filter, setFilter] = useState<'all' | 'ativo' | 'executado' | 'expirada'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const signals: Signal[] = [
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
      aiScore: 95,
      pnl: 1250
    },
    { 
      id: '4', 
      asset: 'GBP/USD', 
      type: 'sell', 
      price: 1.2650, 
      time: '12:30', 
      status: 'executado', 
      confidence: 88,
      target: 1.2580,
      stopLoss: 1.2680,
      riskReward: 2.3,
      timeframe: '4h',
      strategy: 'Resistance Rejection',
      aiScore: 89,
      pnl: 875
    },
    { 
      id: '5', 
      asset: 'BTC/USD', 
      type: 'buy', 
      price: 42800, 
      time: '11:15', 
      status: 'expirada', 
      confidence: 75,
      target: 44200,
      stopLoss: 42300,
      riskReward: 2.8,
      timeframe: '1h',
      strategy: 'Dip Buy + Volume Spike',
      aiScore: 82
    },
    { 
      id: '6', 
      asset: 'ETH/USD', 
      type: 'buy', 
      price: 2620, 
      time: '10:45', 
      status: 'executado', 
      confidence: 90,
      target: 2720,
      stopLoss: 2580,
      riskReward: 2.5,
      timeframe: '4h',
      strategy: 'Golden Cross + Momentum',
      aiScore: 94,
      pnl: 1580
    }
  ]

  const filteredSignals = signals.filter(signal => {
    const matchesFilter = filter === 'all' || signal.status === filter
    const matchesSearch = signal.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         signal.strategy.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'text-[#00FF88] bg-[#00FF88]/20'
      case 'executado': return 'text-[#0066FF] bg-[#0066FF]/20'
      case 'expirada': return 'text-[#FF4D4D] bg-[#FF4D4D]/20'
      default: return 'text-[#B3B3B3] bg-white/10'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ativo': return <Clock className="w-4 h-4" />
      case 'executado': return <CheckCircle className="w-4 h-4" />
      case 'expirada': return <XCircle className="w-4 h-4" />
      default: return <AlertTriangle className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/5 via-transparent to-[#0066FF]/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0066FF]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <main className="flex-1 p-3 sm:p-4 lg:p-6 pb-20 sm:pb-24 relative z-10">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#FFD700]/10 via-transparent to-[#FF6B6B]/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/5 to-[#FF6B6B]/5 animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-[#B3B3B3] bg-clip-text text-transparent">
                    AI Trading Signals
                  </h1>
                  <p className="text-[#B3B3B3] mt-1 text-sm sm:text-base">Premium signals powered by machine learning</p>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="flex items-center space-x-2 bg-[#00FF88]/20 rounded-xl px-3 sm:px-4 py-2 border border-[#00FF88]/30">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#00FF88]" />
                    <span className="text-[#00FF88] font-medium text-xs sm:text-sm">{signals.filter(s => s.status === 'ativo').length} Active</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/5 rounded-xl px-2 sm:px-3 py-2">
                    <div className="w-2 h-2 bg-[#00FF88] rounded-full animate-pulse"></div>
                    <span className="text-[#00FF88] text-xs sm:text-sm font-medium">Live</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#00FF88] to-[#00CC6A] rounded-xl flex items-center justify-center">
                      <Target className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                    </div>
                    <div>
                      <p className="text-[#B3B3B3] text-xs sm:text-sm">Win Rate</p>
                      <p className="text-lg sm:text-xl font-bold text-white">78.5%</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#0066FF] to-[#0052CC] rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[#B3B3B3] text-xs sm:text-sm">Avg R:R</p>
                      <p className="text-lg sm:text-xl font-bold text-white">2.8:1</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-xl flex items-center justify-center">
                      <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                    </div>
                    <div>
                      <p className="text-[#B3B3B3] text-xs sm:text-sm">AI Score</p>
                      <p className="text-lg sm:text-xl font-bold text-white">89.2</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#FF6B6B] to-[#FF5252] rounded-xl flex items-center justify-center">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[#B3B3B3] text-xs sm:text-sm">Total Signals</p>
                      <p className="text-lg sm:text-xl font-bold text-white">{signals.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#B3B3B3]" />
                <input
                  type="text"
                  placeholder="Search signals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2 text-white placeholder-[#B3B3B3] focus:outline-none focus:border-[#00FF88]/50 transition-colors"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {['all', 'ativo', 'executado', 'expirada'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status as any)}
                    className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                      filter === status
                        ? 'bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/30'
                        : 'bg-white/5 text-[#B3B3B3] border border-white/10 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {status === 'all' ? 'Todos' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Signals List */}
          <div className="space-y-3 sm:space-y-4">
            {filteredSignals.map((signal) => (
              <div key={signal.id} className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-[#00FF88]/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${
                      signal.type === 'buy' ? 'bg-[#00FF88]/20' : 'bg-[#FF4D4D]/20'
                    }`}>
                      {signal.type === 'buy' ? (
                        <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#00FF88]" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF4D4D]" />
                      )}
                    </div>
                    <div>
                      <div className="text-white font-bold text-base sm:text-lg">{signal.asset}</div>
                      <div className="text-[#B3B3B3] text-xs sm:text-sm">{signal.strategy}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className={`flex items-center space-x-2 px-2 sm:px-3 py-1 rounded-lg ${getStatusColor(signal.status)}`}>
                      {getStatusIcon(signal.status)}
                      <span className="text-xs sm:text-sm font-medium capitalize">{signal.status}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-[#B3B3B3] text-xs sm:text-sm">{signal.time}</div>
                      <div className="text-white text-xs sm:text-sm">{signal.timeframe}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div>
                    <div className="text-[#B3B3B3] text-xs mb-1">Entry Price</div>
                    <div className="text-white font-semibold text-sm">${signal.price}</div>
                  </div>
                  <div>
                    <div className="text-[#B3B3B3] text-xs mb-1">Target</div>
                    <div className="text-[#00FF88] font-semibold text-sm">${signal.target}</div>
                  </div>
                  <div>
                    <div className="text-[#B3B3B3] text-xs mb-1">Stop Loss</div>
                    <div className="text-[#FF4D4D] font-semibold text-sm">${signal.stopLoss}</div>
                  </div>
                  <div>
                    <div className="text-[#B3B3B3] text-xs mb-1">Risk:Reward</div>
                    <div className="text-[#FFD700] font-semibold text-sm">{signal.riskReward}:1</div>
                  </div>
                  <div>
                    <div className="text-[#B3B3B3] text-xs mb-1">AI Score</div>
                    <div className="text-[#0066FF] font-semibold text-sm">{signal.aiScore}</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-[#B3B3B3] text-xs sm:text-sm">Confidence:</span>
                      <span className="text-white font-medium text-xs sm:text-sm">{signal.confidence}%</span>
                    </div>
                    <div className="w-24 sm:w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#00FF88] to-[#00CC6A] transition-all duration-500"
                        style={{ width: `${signal.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {signal.pnl && (
                    <div className="flex items-center space-x-2">
                      <span className="text-[#B3B3B3] text-xs sm:text-sm">P&L:</span>
                      <span className="text-[#00FF88] font-semibold text-sm">+${signal.pnl}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Navigation */}
      <nav className="bg-white/5 backdrop-blur-xl border-t border-white/10 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-around max-w-2xl mx-auto">
          {[
            { id: 'dashboard', icon: Home, label: 'Dashboard', href: '/' },
            { id: 'signals', icon: Zap, label: 'Signals', href: '/signals' },
            { id: 'charts', icon: BarChart3, label: 'Charts', href: '/charts' },
            { id: 'portfolio', icon: Briefcase, label: 'Portfolio', href: '/portfolio' },
            { id: 'news', icon: Globe, label: 'News', href: '/news' },
            { id: 'history', icon: History, label: 'History', href: '/history' },
            { id: 'community', icon: Users, label: 'Community', href: '/community' },
            { id: 'profile', icon: User, label: 'Profile', href: '/profile' }
          ].map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center space-y-1 p-2 sm:p-3 rounded-xl transition-all duration-300 group min-w-0 ${
                item.id === 'signals'
                  ? 'text-[#00FF88] bg-[#00FF88]/10 scale-110' 
                  : 'text-[#B3B3B3] hover:text-white hover:scale-105'
              }`}
            >
              <div className={`p-1 sm:p-2 rounded-lg transition-all duration-300 ${
                item.id === 'signals' ? 'bg-[#00FF88]/20' : 'group-hover:bg-white/10'
              }`}>
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-xs font-medium truncate hidden sm:block">{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  )
}