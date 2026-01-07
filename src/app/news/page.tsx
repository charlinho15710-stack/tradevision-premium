'use client'

import { useState } from 'react'
import { 
  Globe, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  ExternalLink,
  Filter,
  Search,
  Bookmark,
  Share,
  AlertTriangle,
  CheckCircle,
  Info,
  Flame,
  Star,
  Eye,
  MessageCircle,
  ThumbsUp,
  Zap,
  Home,
  BarChart3,
  Briefcase,
  History,
  Users,
  User
} from 'lucide-react'

interface NewsItem {
  id: string
  title: string
  summary: string
  content: string
  impact: 'high' | 'medium' | 'low'
  sentiment: 'positive' | 'negative' | 'neutral'
  time: string
  source: string
  category: 'crypto' | 'forex' | 'stocks' | 'commodities' | 'general'
  views: number
  likes: number
  comments: number
  imageUrl?: string
}

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'crypto' | 'forex' | 'stocks' | 'commodities' | 'general'>('all')
  const [selectedImpact, setSelectedImpact] = useState<'all' | 'high' | 'medium' | 'low'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'Bitcoin ETF Approval Drives Institutional Interest to New Heights',
      summary: 'Major financial institutions are increasing their Bitcoin allocations following recent regulatory clarity from the SEC.',
      content: 'The approval of multiple Bitcoin ETFs has opened the floodgates for institutional investment...',
      impact: 'high',
      sentiment: 'positive',
      time: '2h',
      source: 'CryptoNews',
      category: 'crypto',
      views: 15420,
      likes: 892,
      comments: 156
    },
    {
      id: '2',
      title: 'Federal Reserve Hints at Rate Cuts in Q2 2024',
      summary: 'Fed officials suggest potential monetary policy easing could benefit risk assets and emerging markets.',
      content: 'During the latest FOMC meeting, several Fed officials indicated that rate cuts may be on the table...',
      impact: 'high',
      sentiment: 'positive',
      time: '4h',
      source: 'Financial Times',
      category: 'general',
      views: 23150,
      likes: 1240,
      comments: 287
    },
    {
      id: '3',
      title: 'Ethereum Network Upgrade Shows Promising Scalability Gains',
      summary: 'Latest network improvements demonstrate significant transaction throughput increases and reduced gas fees.',
      content: 'The recent Ethereum upgrade has delivered on its promises of improved scalability...',
      impact: 'medium',
      sentiment: 'positive',
      time: '6h',
      source: 'TechCrunch',
      category: 'crypto',
      views: 8930,
      likes: 445,
      comments: 89
    },
    {
      id: '4',
      title: 'EUR/USD Faces Pressure Amid ECB Policy Uncertainty',
      summary: 'European Central Bank\'s mixed signals on future rate decisions create volatility in major currency pairs.',
      content: 'The European Central Bank\'s recent communications have left markets uncertain about future policy direction...',
      impact: 'medium',
      sentiment: 'negative',
      time: '8h',
      source: 'Reuters',
      category: 'forex',
      views: 12340,
      likes: 234,
      comments: 67
    },
    {
      id: '5',
      title: 'Tech Stocks Rally on AI Innovation Breakthrough',
      summary: 'Major technology companies see significant gains following announcements of new AI capabilities.',
      content: 'The technology sector experienced a broad rally today as several major companies announced breakthrough AI developments...',
      impact: 'high',
      sentiment: 'positive',
      time: '10h',
      source: 'Bloomberg',
      category: 'stocks',
      views: 18750,
      likes: 967,
      comments: 203
    },
    {
      id: '6',
      title: 'Gold Prices Surge Amid Geopolitical Tensions',
      summary: 'Safe-haven demand drives precious metals higher as global uncertainty increases.',
      content: 'Gold prices have surged to multi-month highs as investors seek safe-haven assets amid rising geopolitical tensions...',
      impact: 'medium',
      sentiment: 'neutral',
      time: '12h',
      source: 'MarketWatch',
      category: 'commodities',
      views: 9870,
      likes: 321,
      comments: 78
    }
  ]

  const filteredNews = newsItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesImpact = selectedImpact === 'all' || item.impact === selectedImpact
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.source.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesImpact && matchesSearch
  })

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-[#FF4D4D] bg-[#FF4D4D]/20'
      case 'medium': return 'text-[#FFD700] bg-[#FFD700]/20'
      case 'low': return 'text-[#00FF88] bg-[#00FF88]/20'
      default: return 'text-[#B3B3B3] bg-white/10'
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'high': return <AlertTriangle className="w-4 h-4" />
      case 'medium': return <Info className="w-4 h-4" />
      case 'low': return <CheckCircle className="w-4 h-4" />
      default: return <Info className="w-4 h-4" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-[#00FF88]'
      case 'negative': return 'text-[#FF4D4D]'
      case 'neutral': return 'text-[#B3B3B3]'
      default: return 'text-[#B3B3B3]'
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <TrendingUp className="w-4 h-4" />
      case 'negative': return <TrendingDown className="w-4 h-4" />
      case 'neutral': return <Info className="w-4 h-4" />
      default: return <Info className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'crypto': return 'bg-[#FFD700]/20 text-[#FFD700]'
      case 'forex': return 'bg-[#00FF88]/20 text-[#00FF88]'
      case 'stocks': return 'bg-[#0066FF]/20 text-[#0066FF]'
      case 'commodities': return 'bg-[#FF6B6B]/20 text-[#FF6B6B]'
      case 'general': return 'bg-[#9C27B0]/20 text-[#9C27B0]'
      default: return 'bg-white/10 text-[#B3B3B3]'
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
          <div className="relative overflow-hidden bg-gradient-to-br from-[#9C27B0]/10 via-transparent to-[#FF6B6B]/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-[#9C27B0]/5 to-[#FF6B6B]/5 animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-[#B3B3B3] bg-clip-text text-transparent">
                    Market News & Analysis
                  </h1>
                  <p className="text-[#B3B3B3] mt-1 text-sm sm:text-base">Stay updated with the latest market developments</p>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="flex items-center space-x-2 bg-[#00FF88]/20 rounded-xl px-3 sm:px-4 py-2 border border-[#00FF88]/30">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-[#00FF88]" />
                    <span className="text-[#00FF88] font-medium text-xs sm:text-sm">Live Feed</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/5 rounded-xl px-2 sm:px-3 py-2">
                    <div className="w-2 h-2 bg-[#00FF88] rounded-full animate-pulse"></div>
                    <span className="text-[#00FF88] text-xs sm:text-sm font-medium">Updated</span>
                  </div>
                </div>
              </div>

              {/* News Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#FF4D4D] to-[#FF3333] rounded-xl flex items-center justify-center">
                      <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[#B3B3B3] text-xs sm:text-sm">Breaking News</p>
                      <p className="text-lg sm:text-xl font-bold text-white">{newsItems.filter(n => n.impact === 'high').length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#00FF88] to-[#00CC6A] rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                    </div>
                    <div>
                      <p className="text-[#B3B3B3] text-xs sm:text-sm">Positive News</p>
                      <p className="text-lg sm:text-xl font-bold text-white">{newsItems.filter(n => n.sentiment === 'positive').length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#0066FF] to-[#0052CC] rounded-xl flex items-center justify-center">
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[#B3B3B3] text-xs sm:text-sm">Total Views</p>
                      <p className="text-lg sm:text-xl font-bold text-white">{newsItems.reduce((sum, n) => sum + n.views, 0).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-xl flex items-center justify-center">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                    </div>
                    <div>
                      <p className="text-[#B3B3B3] text-xs sm:text-sm">Top Stories</p>
                      <p className="text-lg sm:text-xl font-bold text-white">{newsItems.length}</p>
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
                  placeholder="Search news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2 text-white placeholder-[#B3B3B3] focus:outline-none focus:border-[#00FF88]/50 transition-colors"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="flex flex-wrap gap-2">
                  <span className="text-[#B3B3B3] text-xs sm:text-sm">Category:</span>
                  {['all', 'crypto', 'forex', 'stocks', 'commodities', 'general'].map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/30'
                          : 'bg-white/5 text-[#B3B3B3] hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="text-[#B3B3B3] text-xs sm:text-sm">Impact:</span>
                  {['all', 'high', 'medium', 'low'].map((impact) => (
                    <button
                      key={impact}
                      onClick={() => setSelectedImpact(impact as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                        selectedImpact === impact
                          ? 'bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/30'
                          : 'bg-white/5 text-[#B3B3B3] hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {impact === 'all' ? 'All' : impact.charAt(0).toUpperCase() + impact.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* News List */}
          <div className="space-y-4 sm:space-y-6">
            {filteredNews.map((item) => (
              <div key={item.id} className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-[#00FF88]/30 transition-all duration-300">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getCategoryColor(item.category)}`}>
                        {item.category.toUpperCase()}
                      </span>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium ${getImpactColor(item.impact)}`}>
                        {getImpactIcon(item.impact)}
                        <span>{item.impact.toUpperCase()} IMPACT</span>
                      </div>
                      <div className={`flex items-center space-x-1 ${getSentimentColor(item.sentiment)}`}>
                        {getSentimentIcon(item.sentiment)}
                        <span className="text-xs font-medium">{item.sentiment.toUpperCase()}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2 hover:text-[#00FF88] transition-colors cursor-pointer">
                      {item.title}
                    </h3>
                    
                    <p className="text-[#B3B3B3] text-sm mb-3 sm:mb-4 leading-relaxed">
                      {item.summary}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-[#B3B3B3] text-xs sm:text-sm space-y-1 sm:space-y-0">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{item.time} ago</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{item.source}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end space-x-4">
                        <div className="flex items-center space-x-3 sm:space-x-4 text-[#B3B3B3] text-xs sm:text-sm">
                          <div className="flex items-center space-x-1">
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{item.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{item.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{item.comments}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                            <Bookmark className="w-3 h-3 sm:w-4 sm:h-4 text-[#B3B3B3] hover:text-[#FFD700]" />
                          </button>
                          <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                            <Share className="w-3 h-3 sm:w-4 sm:h-4 text-[#B3B3B3] hover:text-[#00FF88]" />
                          </button>
                          <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-[#B3B3B3] hover:text-[#0066FF]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-8 sm:p-12 border border-white/10 text-center">
              <Globe className="w-12 h-12 sm:w-16 sm:h-16 text-[#B3B3B3] mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg sm:text-xl mb-2">No News Found</h3>
              <p className="text-[#B3B3B3] text-sm sm:text-base">Try adjusting your filters or search terms to find relevant news.</p>
            </div>
          )}
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
                item.id === 'news'
                  ? 'text-[#00FF88] bg-[#00FF88]/10 scale-110' 
                  : 'text-[#B3B3B3] hover:text-white hover:scale-105'
              }`}
            >
              <div className={`p-1 sm:p-2 rounded-lg transition-all duration-300 ${
                item.id === 'news' ? 'bg-[#00FF88]/20' : 'group-hover:bg-white/10'
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