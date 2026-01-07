'use client'

import { useState, useEffect } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Maximize, 
  Settings,
  Play,
  Pause,
  RotateCcw,
  Layers,
  Eye,
  Target,
  Zap,
  Home,
  Briefcase,
  Globe,
  History,
  Users,
  User,
  LineChart,
  PieChart,
  BarChart,
  Candlestick
} from 'lucide-react'

export default function ChartsPage() {
  const [selectedAsset, setSelectedAsset] = useState('BTC/USD')
  const [timeframe, setTimeframe] = useState('1H')
  const [chartType, setChartType] = useState('candlestick')
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString())
    }
    
    updateTime()
    const interval = setInterval(updateTime, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const assets = ['BTC/USD', 'ETH/USD', 'EUR/USD', 'GBP/USD', 'XAU/USD', 'SPX500']
  const timeframes = ['1M', '5M', '15M', '1H', '4H', '1D', '1W']
  const chartTypes = [
    { id: 'candlestick', name: 'Candlestick', icon: BarChart },
    { id: 'line', name: 'Line', icon: LineChart },
    { id: 'area', name: 'Area', icon: Activity },
    { id: 'bar', name: 'Bar', icon: BarChart3 }
  ]

  const indicators = [
    { name: 'RSI', active: true, color: '#FFD700' },
    { name: 'MACD', active: true, color: '#00FF88' },
    { name: 'MA(20)', active: true, color: '#0066FF' },
    { name: 'MA(50)', active: false, color: '#FF6B6B' },
    { name: 'Bollinger Bands', active: true, color: '#9C27B0' },
    { name: 'Volume', active: true, color: '#B3B3B3' }
  ]

  const marketData = {
    'BTC/USD': { price: 43250.80, change: 2.45, trend: 'up' },
    'ETH/USD': { price: 2680.50, change: -1.23, trend: 'down' },
    'EUR/USD': { price: 1.0845, change: 0.67, trend: 'up' },
    'GBP/USD': { price: 1.2634, change: -0.34, trend: 'down' },
    'XAU/USD': { price: 2045.30, change: 1.85, trend: 'up' },
    'SPX500': { price: 4756.20, change: 0.92, trend: 'up' }
  }

  const currentData = marketData[selectedAsset as keyof typeof marketData]

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/5 via-transparent to-[#0066FF]/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0066FF]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <main className="flex-1 p-3 sm:p-4 lg:p-6 pb-20 sm:pb-24 relative z-10">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#0066FF]/10 via-transparent to-[#9C27B0]/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF]/5 to-[#9C27B0]/5 animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 space-y-3 sm:space-y-0">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-[#B3B3B3] bg-clip-text text-transparent">
                    Advanced Charts
                  </h1>
                  <p className="text-[#B3B3B3] mt-1 text-sm sm:text-base">Professional trading analysis tools</p>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl border transition-all duration-300 ${
                      isPlaying 
                        ? 'bg-[#00FF88]/20 text-[#00FF88] border-[#00FF88]/30' 
                        : 'bg-white/5 text-[#B3B3B3] border-white/10 hover:text-white'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-3 h-3 sm:w-4 sm:h-4" /> : <Play className="w-3 h-3 sm:w-4 sm:h-4" />}
                    <span className="text-xs sm:text-sm font-medium">{isPlaying ? 'Live' : 'Paused'}</span>
                  </button>
                  <div className="flex items-center space-x-2 bg-white/5 rounded-xl px-2 sm:px-3 py-2">
                    <div className="w-2 h-2 bg-[#00FF88] rounded-full animate-pulse"></div>
                    <span className="text-[#00FF88] text-xs sm:text-sm font-medium">Real-time</span>
                  </div>
                </div>
              </div>

              {/* Asset Info */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${currentData.trend === 'up' ? 'bg-[#00FF88]' : 'bg-[#FF4D4D]'}`}></div>
                  <span className="text-white font-bold text-lg sm:text-xl">{selectedAsset}</span>
                </div>
                <div className="text-white font-bold text-xl sm:text-2xl">
                  ${currentData.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                </div>
                <div className={`flex items-center space-x-1 ${currentData.trend === 'up' ? 'text-[#00FF88]' : 'text-[#FF4D4D]'}`}>
                  {currentData.trend === 'up' ? <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" /> : <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />}
                  <span className="font-medium text-sm sm:text-base">{currentData.trend === 'up' ? '+' : ''}{currentData.change}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {/* Asset Selection */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
              <h3 className="text-white font-semibold mb-3 flex items-center text-sm sm:text-base">
                <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[#00FF88]" />
                Assets
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {assets.map((asset) => (
                  <button
                    key={asset}
                    onClick={() => setSelectedAsset(asset)}
                    className={`p-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                      selectedAsset === asset
                        ? 'bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/30'
                        : 'bg-white/5 text-[#B3B3B3] hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {asset}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeframe Selection */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
              <h3 className="text-white font-semibold mb-3 flex items-center text-sm sm:text-base">
                <Activity className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[#0066FF]" />
                Timeframe
              </h3>
              <div className="grid grid-cols-4 gap-1 sm:gap-2">
                {timeframes.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`p-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                      timeframe === tf
                        ? 'bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/30'
                        : 'bg-white/5 text-[#B3B3B3] hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart Type */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10 sm:col-span-2 lg:col-span-1">
              <h3 className="text-white font-semibold mb-3 flex items-center text-sm sm:text-base">
                <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[#FFD700]" />
                Chart Type
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {chartTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setChartType(type.id)}
                    className={`flex items-center space-x-2 p-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                      chartType === type.id
                        ? 'bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30'
                        : 'bg-white/5 text-[#B3B3B3] hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <type.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{type.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Chart Area */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-3 sm:p-4 border-b border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <h3 className="text-white font-semibold text-sm sm:text-base">{selectedAsset} - {timeframe}</h3>
                  <div className="flex items-center space-x-2">
                    <button className="p-1.5 sm:p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                      <Maximize className="w-3 h-3 sm:w-4 sm:h-4 text-[#B3B3B3]" />
                    </button>
                    <button className="p-1.5 sm:p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                      <Settings className="w-3 h-3 sm:w-4 sm:h-4 text-[#B3B3B3]" />
                    </button>
                    <button className="p-1.5 sm:p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                      <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 text-[#B3B3B3]" />
                    </button>
                  </div>
                </div>
                <div className="text-[#B3B3B3] text-xs sm:text-sm">
                  Last updated: {currentTime || '--:--:--'}
                </div>
              </div>
            </div>
            
            {/* Chart Placeholder */}
            <div className="h-64 sm:h-80 lg:h-96 p-4 sm:p-6 flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-[#00FF88] to-[#0066FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Interactive Chart</h3>
                <p className="text-[#B3B3B3] text-xs sm:text-sm">
                  Advanced {chartType} chart for {selectedAsset} on {timeframe} timeframe
                </p>
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#00FF88] rounded-full"></div>
                    <span className="text-[#B3B3B3] text-xs sm:text-sm">Bullish</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#FF4D4D] rounded-full"></div>
                    <span className="text-[#B3B3B3] text-xs sm:text-sm">Bearish</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#FFD700] rounded-full"></div>
                    <span className="text-[#B3B3B3] text-xs sm:text-sm">Support/Resistance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Indicators */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-white font-semibold flex items-center text-sm sm:text-base">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#9C27B0]" />
                Technical Indicators
              </h3>
              <button className="text-[#B3B3B3] hover:text-white transition-colors">
                <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
              {indicators.map((indicator) => (
                <div
                  key={indicator.name}
                  className={`p-2 sm:p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                    indicator.active
                      ? 'bg-white/10 border-white/20'
                      : 'bg-white/5 border-white/10 opacity-50'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1 sm:mb-2">
                    <div 
                      className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                      style={{ backgroundColor: indicator.color }}
                    ></div>
                    <span className="text-white text-xs sm:text-sm font-medium">{indicator.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className={`w-2 h-2 sm:w-3 sm:h-3 ${indicator.active ? 'text-[#00FF88]' : 'text-[#B3B3B3]'}`} />
                    <span className={`text-xs ${indicator.active ? 'text-[#00FF88]' : 'text-[#B3B3B3]'}`}>
                      {indicator.active ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
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
                item.id === 'charts'
                  ? 'text-[#00FF88] bg-[#00FF88]/10 scale-110' 
                  : 'text-[#B3B3B3] hover:text-white hover:scale-105'
              }`}
            >
              <div className={`p-1 sm:p-2 rounded-lg transition-all duration-300 ${
                item.id === 'charts' ? 'bg-[#00FF88]/20' : 'group-hover:bg-white/10'
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