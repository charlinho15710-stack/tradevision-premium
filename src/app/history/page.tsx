'use client'

import { useState } from 'react'
import { 
  History, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Calendar,
  Filter,
  Search,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  DollarSign,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  Zap,
  Home,
  Briefcase,
  Globe,
  Users,
  User,
  Award,
  Flame
} from 'lucide-react'

interface TradeHistory {
  id: string
  asset: string
  type: 'buy' | 'sell'
  entryPrice: number
  exitPrice?: number
  quantity: number
  entryTime: string
  exitTime?: string
  status: 'open' | 'closed' | 'cancelled'
  pnl?: number
  pnlPercent?: number
  strategy: string
  timeframe: string
  fees: number
  notes?: string
}

export default function HistoryPage() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'open' | 'closed' | 'cancelled'>('all')
  const [selectedTimeframe, setSelectedTimeframe] = useState<'all' | '1d' | '7d' | '30d' | '90d'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const tradeHistory: TradeHistory[] = [
    {
      id: '1',
      asset: 'BTC/USD',
      type: 'buy',
      entryPrice: 41200,
      exitPrice: 43250,
      quantity: 1.25,
      entryTime: '2024-01-15 09:30',
      exitTime: '2024-01-16 14:45',
      status: 'closed',
      pnl: 2562.50,
      pnlPercent: 4.97,
      strategy: 'Breakout + RSI Divergence',
      timeframe: '4h',
      fees: 25.60,
      notes: 'Perfect breakout setup with strong volume confirmation'
    },
    {
      id: '2',
      asset: 'ETH/USD',
      type: 'sell',
      entryPrice: 2720,
      exitPrice: 2580,
      quantity: 15.8,
      entryTime: '2024-01-14 11:15',
      exitTime: '2024-01-15 16:30',
      status: 'closed',
      pnl: 2212.00,
      pnlPercent: 5.15,
      strategy: 'Support Break + Volume',
      timeframe: '1h',
      fees: 42.80,
      notes: 'Clean break below support with high volume'
    },
    {
      id: '3',
      asset: 'EUR/USD',
      type: 'buy',
      entryPrice: 1.0820,
      exitPrice: 1.0890,
      quantity: 50000,
      entryTime: '2024-01-13 08:00',
      exitTime: '2024-01-14 12:20',
      status: 'closed',
      pnl: 3500.00,
      pnlPercent: 6.47,
      strategy: 'Trend Following + MA Cross',
      timeframe: '1d',
      fees: 15.00,
      notes: 'Golden cross signal with strong fundamentals'
    },
    {
      id: '4',
      asset: 'GBP/USD',
      type: 'sell',
      entryPrice: 1.2680,
      exitPrice: 1.2580,
      quantity: 30000,
      entryTime: '2024-01-12 13:45',
      exitTime: '2024-01-13 10:15',
      status: 'closed',
      pnl: 3000.00,
      pnlPercent: 7.89,
      strategy: 'Resistance Rejection',
      timeframe: '4h',
      fees: 18.50,
      notes: 'Strong rejection at key resistance level'
    },
    {
      id: '5',
      asset: 'BTC/USD',
      type: 'buy',
      entryPrice: 42800,
      quantity: 0.5,
      entryTime: '2024-01-16 11:15',
      status: 'open',
      strategy: 'Dip Buy + Volume Spike',
      timeframe: '1h',
      fees: 12.50,
      notes: 'Waiting for bounce from support level'
    },
    {
      id: '6',
      asset: 'XAU/USD',
      type: 'buy',
      entryPrice: 2020.00,
      quantity: 2.5,
      entryTime: '2024-01-11 14:30',
      status: 'cancelled',
      strategy: 'Safe Haven Play',
      timeframe: '1d',
      fees: 0,
      notes: 'Cancelled due to changed market conditions'
    }
  ]

  const filteredHistory = tradeHistory.filter(trade => {
    const matchesFilter = selectedFilter === 'all' || trade.status === selectedFilter
    const matchesSearch = trade.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trade.strategy.toLowerCase().includes(searchTerm.toLowerCase())
    
    let matchesTimeframe = true
    if (selectedTimeframe !== 'all') {
      const tradeDate = new Date(trade.entryTime)
      const now = new Date()
      const daysDiff = Math.floor((now.getTime() - tradeDate.getTime()) / (1000 * 60 * 60 * 24))
      
      switch (selectedTimeframe) {
        case '1d': matchesTimeframe = daysDiff <= 1; break
        case '7d': matchesTimeframe = daysDiff <= 7; break
        case '30d': matchesTimeframe = daysDiff <= 30; break
        case '90d': matchesTimeframe = daysDiff <= 90; break
      }
    }
    
    return matchesFilter && matchesSearch && matchesTimeframe
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-[#FFD700] bg-[#FFD700]/20'
      case 'closed': return 'text-[#00FF88] bg-[#00FF88]/20'
      case 'cancelled': return 'text-[#FF4D4D] bg-[#FF4D4D]/20'
      default: return 'text-[#B3B3B3] bg-white/10'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
      case 'closed': return <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
      case 'cancelled': return <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />
      default: return <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4" />
    }
  }

  const totalPnL = tradeHistory
    .filter(t => t.status === 'closed' && t.pnl)
    .reduce((sum, t) => sum + (t.pnl || 0), 0)

  const totalTrades = tradeHistory.length
  const winningTrades = tradeHistory.filter(t => t.status === 'closed' && (t.pnl || 0) > 0).length
  const winRate = totalTrades > 0 ? (winningTrades / tradeHistory.filter(t => t.status === 'closed').length) * 100 : 0

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/5 via-transparent to-[#0066FF]/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0066FF]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <main className="flex-1 p-3 sm:p-4 lg:p-6 pb-20 sm:pb-24 relative z-10">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#0066FF]/10 via-transparent to-[#9C27B0]/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF]/5 to-[#9C27B0]/5 animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-[#B3B3B3] bg-clip-text text-transparent">
                    Trading History
                  </h1>
                  <p className="text-[#B3B3B3] mt-1 text-sm sm:text-base">Complete record of your trading activity</p>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <button className="flex items-center space-x-2 bg-[#00FF88]/20 rounded-xl px-3 sm:px-4 py-2 border border-[#00FF88]/30 hover:bg-[#00FF88]/30 transition-colors">
                    <Download className="w-3 h-3 sm:w-4 sm:h-4 text-[#00FF88]" />
                    <span className="text-[#00FF88] text-xs sm:text-sm font-medium">Export</span>
                  </button>
                  <div className="flex items-center space-x-2 bg-white/5 rounded-xl px-2 sm:px-3 py-2">
                    <div className="w-2 h-2 bg-[#00FF88] rounded-full animate-pulse"></div>
                    <span className="text-[#00FF88] text-xs sm:text-sm font-medium">Live</span>
                  </div>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/10">
                  <div className="flex items-start space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-[#00FF88] to-[#00CC6A] rounded-xl flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-black" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[#B3B3B3] text-xs sm:text-sm">Total P&L</p>
                      <p className="text-base sm:text-lg lg:text-xl font-bold text-[#00FF88] truncate">+${totalPnL.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-[#00FF88] flex-shrink-0" />
                    <span className="text-[#00FF88] font-medium text-xs sm:text-sm">Profitable</span>
                    <span className="text-[#B3B3B3] text-xs">Overall</span>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/10">
                  <div className="flex items-start space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-[#0066FF] to-[#0052CC] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Target className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[#B3B3B3] text-xs sm:text-sm">Win Rate</p>
                      <p className="text-base sm:text-lg lg:text-xl font-bold text-white truncate">{winRate.toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4 text-[#FFD700] flex-shrink-0" />
                    <span className="text-[#FFD700] font-medium text-xs sm:text-sm">Excellent</span>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/10">
                  <div className="flex items-start space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Activity className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-black" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[#B3B3B3] text-xs sm:text-sm">Total Trades</p>
                      <p className="text-base sm:text-lg lg:text-xl font-bold text-white truncate">{totalTrades}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF6B6B] flex-shrink-0" />
                    <span className="text-[#FF6B6B] font-medium text-xs sm:text-sm">Active</span>
                    <span className="text-[#B3B3B3] text-xs">Trader</span>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/10">
                  <div className="flex items-start space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-[#FF6B6B] to-[#FF5252] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[#B3B3B3] text-xs sm:text-sm">Open Positions</p>
                      <p className="text-base sm:text-lg lg:text-xl font-bold text-white truncate">{tradeHistory.filter(t => t.status === 'open').length}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-[#00FF88] flex-shrink-0" />
                    <span className="text-[#00FF88] font-medium text-xs sm:text-sm">Monitoring</span>
                    <span className="text-[#B3B3B3] text-xs">Live</span>
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
                  placeholder="Search trades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2 text-white placeholder-[#B3B3B3] focus:outline-none focus:border-[#00FF88]/50 transition-colors"
                />
              </div>

              <div className="flex flex-col space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[#B3B3B3] text-xs sm:text-sm flex-shrink-0">Status:</span>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'open', 'closed', 'cancelled'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setSelectedFilter(status as any)}
                        className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                          selectedFilter === status
                            ? 'bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/30'
                            : 'bg-white/5 text-[#B3B3B3] hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[#B3B3B3] text-xs sm:text-sm flex-shrink-0">Period:</span>
                  <div className="flex flex-wrap gap-2">
                    {['all', '1d', '7d', '30d', '90d'].map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedTimeframe(period as any)}
                        className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                          selectedTimeframe === period
                            ? 'bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/30'
                            : 'bg-white/5 text-[#B3B3B3] hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {period === 'all' ? 'All Time' : period.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trade History List */}
          <div className="space-y-3 sm:space-y-4">
            {filteredHistory.map((trade) => (
              <div key={trade.id} className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-[#00FF88]/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 space-y-3 sm:space-y-0">
                  <div className="flex items-start space-x-3 sm:space-x-4 min-w-0 flex-1">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      trade.type === 'buy' ? 'bg-[#00FF88]/20' : 'bg-[#FF4D4D]/20'
                    }`}>
                      {trade.type === 'buy' ? (
                        <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#00FF88]" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF4D4D]" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-white font-bold text-base sm:text-lg">{trade.asset}</span>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium uppercase flex-shrink-0 ${
                          trade.type === 'buy' ? 'bg-[#00FF88]/20 text-[#00FF88]' : 'bg-[#FF4D4D]/20 text-[#FF4D4D]'
                        }`}>
                          {trade.type}
                        </span>
                        <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium flex-shrink-0 ${getStatusColor(trade.status)}`}>
                          {getStatusIcon(trade.status)}
                          <span>{trade.status.toUpperCase()}</span>
                        </div>
                      </div>
                      <div className="text-[#B3B3B3] text-xs sm:text-sm truncate">{trade.strategy}</div>
                    </div>
                  </div>
                  
                  <div className="text-right flex-shrink-0">
                    {trade.pnl !== undefined && (
                      <div className={`text-lg sm:text-xl font-bold ${trade.pnl >= 0 ? 'text-[#00FF88]' : 'text-[#FF4D4D]'}`}>
                        {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toLocaleString()}
                      </div>
                    )}
                    {trade.pnlPercent !== undefined && (
                      <div className={`text-xs sm:text-sm ${trade.pnlPercent >= 0 ? 'text-[#00FF88]' : 'text-[#FF4D4D]'}`}>
                        {trade.pnlPercent >= 0 ? '+' : ''}{trade.pnlPercent}%
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="min-w-0">
                    <div className="text-[#B3B3B3] text-xs mb-1">Entry Price</div>
                    <div className="text-white font-semibold text-sm truncate">${trade.entryPrice.toLocaleString()}</div>
                  </div>
                  {trade.exitPrice && (
                    <div className="min-w-0">
                      <div className="text-[#B3B3B3] text-xs mb-1">Exit Price</div>
                      <div className="text-white font-semibold text-sm truncate">${trade.exitPrice.toLocaleString()}</div>
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="text-[#B3B3B3] text-xs mb-1">Quantity</div>
                    <div className="text-white font-semibold text-sm truncate">{trade.quantity}</div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[#B3B3B3] text-xs mb-1">Timeframe</div>
                    <div className="text-white font-semibold text-sm truncate">{trade.timeframe}</div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[#B3B3B3] text-xs mb-1">Fees</div>
                    <div className="text-white font-semibold text-sm truncate">${trade.fees}</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-[#B3B3B3] text-xs sm:text-sm space-y-1 sm:space-y-0">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="truncate">Entry: {new Date(trade.entryTime).toLocaleDateString()}</span>
                    </div>
                    {trade.exitTime && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">Exit: {new Date(trade.exitTime).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  
                  {trade.notes && (
                    <div className="text-[#B3B3B3] text-xs sm:text-sm italic max-w-full sm:max-w-md truncate">
                      "{trade.notes}"
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredHistory.length === 0 && (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-8 sm:p-12 border border-white/10 text-center">
              <History className="w-12 h-12 sm:w-16 sm:h-16 text-[#B3B3B3] mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg sm:text-xl mb-2">No Trades Found</h3>
              <p className="text-[#B3B3B3] text-sm sm:text-base">Try adjusting your filters to find relevant trading history.</p>
            </div>
          )}
        </div>
      </main>

      {/* Navigation */}
      <nav className="bg-white/5 backdrop-blur-xl border-t border-white/10 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-around max-w-2xl mx-auto">
          {[
            { id: 'dashboard', icon: Home, href: '/', label: 'Home' },
            { id: 'signals', icon: Zap, href: '/signals', label: 'Signals' },
            { id: 'charts', icon: BarChart3, href: '/charts', label: 'Charts' },
            { id: 'portfolio', icon: Briefcase, href: '/portfolio', label: 'Portfolio' },
            { id: 'news', icon: Globe, href: '/news', label: 'News' },
            { id: 'history', icon: History, href: '/history', label: 'History' },
            { id: 'community', icon: Users, href: '/community', label: 'Community' },
            { id: 'profile', icon: User, href: '/profile', label: 'Profile' }
          ].map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center space-y-1 p-2 sm:p-3 rounded-xl transition-all duration-300 group min-w-0 ${
                item.id === 'history'
                  ? 'text-[#00FF88] bg-[#00FF88]/10 scale-110' 
                  : 'text-[#B3B3B3] hover:text-white hover:scale-105'
              }`}
            >
              <div className={`p-1 sm:p-2 rounded-lg transition-all duration-300 ${
                item.id === 'history' ? 'bg-[#00FF88]/20' : 'group-hover:bg-white/10'
              }`}>
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              {/* Texto aparece APENAS no desktop (lg:) */}
              <span className="hidden lg:block text-xs font-medium truncate">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  )
}