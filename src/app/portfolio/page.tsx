'use client'

import { useState } from 'react'
import { 
  Briefcase, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  PieChart, 
  BarChart3,
  Target,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Minus,
  RefreshCw,
  Settings,
  Eye,
  EyeOff,
  Zap,
  Home,
  Globe,
  History,
  Users,
  User,
  Award,
  Flame
} from 'lucide-react'

interface Position {
  asset: string
  quantity: number
  avgPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
  allocation: number
  type: 'crypto' | 'forex' | 'stocks' | 'commodities'
}

export default function PortfolioPage() {
  const [showBalances, setShowBalances] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'crypto' | 'forex' | 'stocks' | 'commodities'>('all')

  const portfolio = {
    totalValue: 125430.50,
    totalPnL: 8750.25,
    totalPnLPercent: 7.5,
    dayChange: 2340.80,
    dayChangePercent: 1.9
  }

  const positions: Position[] = [
    { 
      asset: 'BTC', 
      quantity: 1.25, 
      avgPrice: 41200, 
      currentPrice: 43250, 
      pnl: 2562.50, 
      pnlPercent: 4.97, 
      allocation: 45.2,
      type: 'crypto'
    },
    { 
      asset: 'ETH', 
      quantity: 15.8, 
      avgPrice: 2580, 
      currentPrice: 2680, 
      pnl: 1580.00, 
      pnlPercent: 3.88, 
      allocation: 35.1,
      type: 'crypto'
    },
    { 
      asset: 'EUR/USD', 
      quantity: 50000, 
      avgPrice: 1.0820, 
      currentPrice: 1.0845, 
      pnl: 1250.00, 
      pnlPercent: 2.31, 
      allocation: 19.7,
      type: 'forex'
    },
    { 
      asset: 'AAPL', 
      quantity: 25, 
      avgPrice: 185.50, 
      currentPrice: 192.30, 
      pnl: 170.00, 
      pnlPercent: 3.67, 
      allocation: 8.5,
      type: 'stocks'
    },
    { 
      asset: 'XAU/USD', 
      quantity: 2.5, 
      avgPrice: 2020.00, 
      currentPrice: 2045.30, 
      pnl: 63.25, 
      pnlPercent: 1.25, 
      allocation: 12.8,
      type: 'commodities'
    },
    { 
      asset: 'GBP/USD', 
      quantity: 30000, 
      avgPrice: 1.2680, 
      currentPrice: 1.2634, 
      pnl: -138.00, 
      pnlPercent: -0.36, 
      allocation: 6.2,
      type: 'forex'
    }
  ]

  const filteredPositions = positions.filter(position => 
    selectedFilter === 'all' || position.type === selectedFilter
  )

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'crypto': return 'bg-[#FFD700]/20 text-[#FFD700]'
      case 'forex': return 'bg-[#00FF88]/20 text-[#00FF88]'
      case 'stocks': return 'bg-[#0066FF]/20 text-[#0066FF]'
      case 'commodities': return 'bg-[#FF6B6B]/20 text-[#FF6B6B]'
      default: return 'bg-white/10 text-[#B3B3B3]'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'crypto': return '₿'
      case 'forex': return '💱'
      case 'stocks': return '📈'
      case 'commodities': return '🥇'
      default: return '💼'
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
          <div className="relative overflow-hidden bg-gradient-to-br from-[#00FF88]/10 via-transparent to-[#0066FF]/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00FF88]/5 to-[#0066FF]/5 animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-[#B3B3B3] bg-clip-text text-transparent">
                    Portfolio Overview
                  </h1>
                  <p className="text-[#B3B3B3] mt-1 text-sm sm:text-base">Track your investments and performance</p>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <button
                    onClick={() => setShowBalances(!showBalances)}
                    className="flex items-center space-x-2 bg-white/5 rounded-xl px-3 sm:px-4 py-2 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    {showBalances ? <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-[#B3B3B3]" /> : <EyeOff className="w-3 h-3 sm:w-4 sm:h-4 text-[#B3B3B3]" />}
                    <span className="text-[#B3B3B3] text-xs sm:text-sm">{showBalances ? 'Hide' : 'Show'}</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-[#00FF88]/20 rounded-xl px-3 sm:px-4 py-2 border border-[#00FF88]/30">
                    <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 text-[#00FF88]" />
                    <span className="text-[#00FF88] text-xs sm:text-sm font-medium">Sync</span>
                  </button>
                </div>
              </div>

              {/* Portfolio Stats - CORRIGIDO PARA MOBILE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#00FF88] to-[#00CC6A] rounded-xl flex items-center justify-center">
                      <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#B3B3B3] text-xs sm:text-sm">Total Value</p>
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white truncate">
                        {showBalances ? `$${portfolio.totalValue.toLocaleString()}` : '••••••'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-[#00FF88]" />
                    <span className="text-[#00FF88] font-medium text-xs sm:text-sm">+{portfolio.totalPnLPercent}%</span>
                    <span className="text-[#B3B3B3] text-xs">All time</span>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#0066FF] to-[#0052CC] rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#B3B3B3] text-xs sm:text-sm">Total P&L</p>
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#00FF88] truncate">
                        {showBalances ? `+$${portfolio.totalPnL.toLocaleString()}` : '••••••'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#00FF88]" />
                    <span className="text-[#00FF88] font-medium text-xs sm:text-sm">Profitable</span>
                    <span className="text-[#B3B3B3] text-xs">6/6 positions</span>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-xl flex items-center justify-center">
                      <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#B3B3B3] text-xs sm:text-sm">24h Change</p>
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#00FF88] truncate">
                        {showBalances ? `+$${portfolio.dayChange.toLocaleString()}` : '••••••'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-[#00FF88]" />
                    <span className="text-[#00FF88] font-medium text-xs sm:text-sm">+{portfolio.dayChangePercent}%</span>
                    <span className="text-[#B3B3B3] text-xs">Today</span>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#FF6B6B] to-[#FF5252] rounded-xl flex items-center justify-center">
                      <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#B3B3B3] text-xs sm:text-sm">Positions</p>
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{positions.length}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4 text-[#FFD700]" />
                    <span className="text-[#FFD700] font-medium text-xs sm:text-sm">Diversified</span>
                    <span className="text-[#B3B3B3] text-xs">4 markets</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 space-y-3 sm:space-y-0">
              <h3 className="text-white font-semibold flex items-center text-sm sm:text-base">
                <PieChart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#9C27B0]" />
                Asset Allocation
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                {['all', 'crypto', 'forex', 'stocks', 'commodities'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                      selectedFilter === filter
                        ? 'bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/30'
                        : 'bg-white/5 text-[#B3B3B3] hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Allocation Chart Placeholder */}
            <div className="h-24 sm:h-32 bg-gradient-to-r from-white/5 to-transparent rounded-xl flex items-center justify-center mb-4">
              <div className="text-center">
                <PieChart className="w-8 h-8 sm:w-12 sm:h-12 text-[#9C27B0] mx-auto mb-2" />
                <p className="text-[#B3B3B3] text-xs sm:text-sm">Portfolio allocation visualization</p>
              </div>
            </div>
          </div>

          {/* Positions List */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <h3 className="text-white font-semibold text-lg sm:text-xl">Your Positions</h3>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 bg-[#00FF88]/20 rounded-xl px-3 sm:px-4 py-2 border border-[#00FF88]/30 hover:bg-[#00FF88]/30 transition-colors">
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-[#00FF88]" />
                  <span className="text-[#00FF88] text-xs sm:text-sm font-medium">Add Position</span>
                </button>
              </div>
            </div>

            {filteredPositions.map((position, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-[#00FF88]/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#00FF88]/20 to-[#0066FF]/20 rounded-xl flex items-center justify-center text-lg sm:text-xl">
                      {getTypeIcon(position.type)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <span className="text-white font-bold text-base sm:text-lg">{position.asset}</span>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getTypeColor(position.type)}`}>
                          {position.type.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-[#B3B3B3] text-xs sm:text-sm">
                        {position.quantity} units @ ${position.avgPrice.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-white font-bold text-base sm:text-lg">
                      {showBalances ? `$${(position.quantity * position.currentPrice).toLocaleString()}` : '••••••'}
                    </div>
                    <div className="text-[#B3B3B3] text-xs sm:text-sm">
                      ${position.currentPrice.toLocaleString()} current
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div>
                    <div className="text-[#B3B3B3] text-xs mb-1">P&L</div>
                    <div className={`font-semibold text-sm ${position.pnl >= 0 ? 'text-[#00FF88]' : 'text-[#FF4D4D]'}`}>
                      {showBalances ? `${position.pnl >= 0 ? '+' : ''}$${position.pnl.toLocaleString()}` : '••••••'}
                    </div>
                  </div>
                  <div>
                    <div className="text-[#B3B3B3] text-xs mb-1">P&L %</div>
                    <div className={`font-semibold flex items-center space-x-1 text-sm ${position.pnlPercent >= 0 ? 'text-[#00FF88]' : 'text-[#FF4D4D]'}`}>
                      {position.pnlPercent >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      <span>{position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent}%</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[#B3B3B3] text-xs mb-1">Allocation</div>
                    <div className="text-white font-semibold text-sm">{position.allocation}%</div>
                  </div>
                  <div>
                    <div className="text-[#B3B3B3] text-xs mb-1">Market Value</div>
                    <div className="text-white font-semibold text-sm">
                      {showBalances ? `$${(position.quantity * position.currentPrice).toLocaleString()}` : '••••••'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="w-full bg-white/10 rounded-full h-2 mr-4">
                    <div 
                      className="h-full bg-gradient-to-r from-[#00FF88] to-[#00CC6A] rounded-full transition-all duration-500"
                      style={{ width: `${position.allocation}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                      <Settings className="w-3 h-3 sm:w-4 sm:h-4 text-[#B3B3B3]" />
                    </button>
                    <button className="p-2 bg-[#FF4D4D]/20 rounded-lg hover:bg-[#FF4D4D]/30 transition-colors">
                      <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF4D4D]" />
                    </button>
                  </div>
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
                item.id === 'portfolio'
                  ? 'text-[#00FF88] bg-[#00FF88]/10 scale-110' 
                  : 'text-[#B3B3B3] hover:text-white hover:scale-105'
              }`}
            >
              <div className={`p-1 sm:p-2 rounded-lg transition-all duration-300 ${
                item.id === 'portfolio' ? 'bg-[#00FF88]/20' : 'group-hover:bg-white/10'
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