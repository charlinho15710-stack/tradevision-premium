'use client'

import { useState } from 'react'
import { 
  Users, 
  MessageCircle, 
  ThumbsUp, 
  Share, 
  TrendingUp,
  TrendingDown,
  Star,
  Award,
  Crown,
  Flame,
  Eye,
  Send,
  Search,
  Filter,
  Plus,
  Heart,
  Bookmark,
  MoreHorizontal,
  Zap,
  Home,
  BarChart3,
  Briefcase,
  Globe,
  History,
  User,
  Target,
  Brain
} from 'lucide-react'

interface CommunityPost {
  id: string
  author: {
    name: string
    avatar: string
    level: 'Beginner' | 'Intermediate' | 'Expert' | 'Pro'
    verified: boolean
    followers: number
  }
  content: string
  asset?: string
  prediction?: {
    direction: 'bullish' | 'bearish'
    target: number
    timeframe: string
    confidence: number
  }
  timestamp: string
  likes: number
  comments: number
  shares: number
  views: number
  tags: string[]
  isLiked: boolean
  isBookmarked: boolean
}

export default function CommunityPage() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'trending' | 'predictions' | 'discussions' | 'following'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const communityPosts: CommunityPost[] = [
    {
      id: '1',
      author: {
        name: 'CryptoKing_2024',
        avatar: '👑',
        level: 'Pro',
        verified: true,
        followers: 15420
      },
      content: 'BTC is showing strong bullish momentum above $43k. The breakout from the ascending triangle pattern is confirmed with high volume. Expecting a move towards $45k in the next 48 hours. Risk management is key - stop loss at $42.5k.',
      asset: 'BTC/USD',
      prediction: {
        direction: 'bullish',
        target: 45000,
        timeframe: '48h',
        confidence: 85
      },
      timestamp: '2h',
      likes: 234,
      comments: 67,
      shares: 23,
      views: 1420,
      tags: ['BTC', 'Bullish', 'Technical Analysis', 'Breakout'],
      isLiked: false,
      isBookmarked: true
    },
    {
      id: '2',
      author: {
        name: 'ForexMaster',
        avatar: '💱',
        level: 'Expert',
        verified: true,
        followers: 8930
      },
      content: 'EUR/USD is approaching a critical support level at 1.0820. ECB policy uncertainty is creating volatility, but the technical setup suggests a potential bounce. Watch for volume confirmation.',
      asset: 'EUR/USD',
      prediction: {
        direction: 'bullish',
        target: 1.0890,
        timeframe: '1 week',
        confidence: 72
      },
      timestamp: '4h',
      likes: 156,
      comments: 34,
      shares: 12,
      views: 890,
      tags: ['EUR/USD', 'Forex', 'Support', 'ECB'],
      isLiked: true,
      isBookmarked: false
    },
    {
      id: '3',
      author: {
        name: 'TechAnalyst_Pro',
        avatar: '📊',
        level: 'Expert',
        verified: false,
        followers: 5670
      },
      content: 'Just published my weekly market analysis! This week we\'re seeing interesting patterns across multiple timeframes. The correlation between traditional markets and crypto is strengthening. What are your thoughts on this trend?',
      timestamp: '6h',
      likes: 89,
      comments: 45,
      shares: 18,
      views: 567,
      tags: ['Market Analysis', 'Correlation', 'Weekly Report'],
      isLiked: false,
      isBookmarked: false
    },
    {
      id: '4',
      author: {
        name: 'AITrader_Bot',
        avatar: '🤖',
        level: 'Pro',
        verified: true,
        followers: 12340
      },
      content: 'My AI model is detecting unusual options flow in AAPL. Large call volume at $195 strike expiring next Friday. This could indicate institutional positioning for earnings. Probability of upward move: 78%',
      asset: 'AAPL',
      prediction: {
        direction: 'bullish',
        target: 195,
        timeframe: '1 week',
        confidence: 78
      },
      timestamp: '8h',
      likes: 312,
      comments: 89,
      shares: 45,
      views: 2340,
      tags: ['AAPL', 'Options Flow', 'AI Analysis', 'Earnings'],
      isLiked: true,
      isBookmarked: true
    },
    {
      id: '5',
      author: {
        name: 'GoldBug_Veteran',
        avatar: '🥇',
        level: 'Intermediate',
        verified: false,
        followers: 3450
      },
      content: 'Gold is testing key resistance at $2050. Geopolitical tensions are providing support, but Fed policy remains the key driver. A break above $2055 could trigger a rally to $2100.',
      asset: 'XAU/USD',
      prediction: {
        direction: 'bullish',
        target: 2100,
        timeframe: '2 weeks',
        confidence: 68
      },
      timestamp: '12h',
      likes: 67,
      comments: 23,
      shares: 8,
      views: 445,
      tags: ['Gold', 'Resistance', 'Geopolitical', 'Fed'],
      isLiked: false,
      isBookmarked: false
    },
    {
      id: '6',
      author: {
        name: 'NewTrader_2024',
        avatar: '🌱',
        level: 'Beginner',
        verified: false,
        followers: 234
      },
      content: 'Just started trading last month and already up 15%! Thanks to this amazing community for all the educational content. Special shoutout to @CryptoKing_2024 for the mentorship. Learning so much every day! 🚀',
      timestamp: '1d',
      likes: 145,
      comments: 67,
      shares: 12,
      views: 890,
      tags: ['Beginner', 'Success Story', 'Community', 'Learning'],
      isLiked: true,
      isBookmarked: false
    }
  ]

  const filteredPosts = communityPosts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    let matchesFilter = true
    switch (selectedFilter) {
      case 'trending':
        matchesFilter = post.likes > 100 || post.views > 1000
        break
      case 'predictions':
        matchesFilter = !!post.prediction
        break
      case 'discussions':
        matchesFilter = post.comments > 20
        break
      case 'following':
        matchesFilter = post.author.verified // Simulating following verified users
        break
    }
    
    return matchesSearch && matchesFilter
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Pro': return 'bg-[#FFD700]/20 text-[#FFD700]'
      case 'Expert': return 'bg-[#FF6B6B]/20 text-[#FF6B6B]'
      case 'Intermediate': return 'bg-[#0066FF]/20 text-[#0066FF]'
      case 'Beginner': return 'bg-[#00FF88]/20 text-[#00FF88]'
      default: return 'bg-white/10 text-[#B3B3B3]'
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Pro': return <Crown className="w-3 h-3" />
      case 'Expert': return <Award className="w-3 h-3" />
      case 'Intermediate': return <Star className="w-3 h-3" />
      case 'Beginner': return <Target className="w-3 h-3" />
      default: return <Users className="w-3 h-3" />
    }
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/5 via-transparent to-[#0066FF]/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0066FF]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <main className="flex-1 p-3 sm:p-4 lg:p-6 pb-20 sm:pb-24 relative z-10">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#9C27B0]/10 via-transparent to-[#FF6B6B]/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-[#9C27B0]/5 to-[#FF6B6B]/5 animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-[#B3B3B3] bg-clip-text text-transparent">
                    Trading Community
                  </h1>
                  <p className="text-[#B3B3B3] mt-1 text-sm sm:text-base">Connect, learn, and share with fellow traders</p>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <button className="flex items-center space-x-2 bg-[#00FF88]/20 rounded-xl px-3 sm:px-4 py-2 border border-[#00FF88]/30 hover:bg-[#00FF88]/30 transition-colors">
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-[#00FF88]" />
                    <span className="text-[#00FF88] text-xs sm:text-sm font-medium">New Post</span>
                  </button>
                  <div className="flex items-center space-x-2 bg-white/5 rounded-xl px-2 sm:px-3 py-2">
                    <div className="w-2 h-2 bg-[#00FF88] rounded-full animate-pulse"></div>
                    <span className="text-[#00FF88] text-xs sm:text-sm font-medium">Live</span>
                  </div>
                </div>
              </div>

              {/* Community Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#00FF88] to-[#00CC6A] rounded-xl flex items-center justify-center">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                    </div>
                    <div>
                      <p className="text-[#B3B3B3] text-xs sm:text-sm">Active Members</p>
                      <p className="text-lg sm:text-xl font-bold text-white">12.5K</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#0066FF] to-[#0052CC] rounded-xl flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[#B3B3B3] text-xs sm:text-sm">Daily Posts</p>
                      <p className="text-lg sm:text-xl font-bold text-white">847</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-xl flex items-center justify-center">
                      <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                    </div>
                    <div>
                      <p className="text-[#B3B3B3] text-xs sm:text-sm">Expert Traders</p>
                      <p className="text-lg sm:text-xl font-bold text-white">156</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#FF6B6B] to-[#FF5252] rounded-xl flex items-center justify-center">
                      <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[#B3B3B3] text-xs sm:text-sm">Hot Topics</p>
                      <p className="text-lg sm:text-xl font-bold text-white">23</p>
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
                  placeholder="Search posts, users, tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2 text-white placeholder-[#B3B3B3] focus:outline-none focus:border-[#00FF88]/50 transition-colors"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {['all', 'trending', 'predictions', 'discussions', 'following'].map((filter) => (
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
          </div>

          {/* Posts Feed */}
          <div className="space-y-4 sm:space-y-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-[#00FF88]/30 transition-all duration-300">
                {/* Post Header */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#00FF88]/20 to-[#0066FF]/20 rounded-xl flex items-center justify-center text-lg sm:text-xl">
                      {post.author.avatar}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-semibold text-sm sm:text-base">{post.author.name}</span>
                        {post.author.verified && (
                          <div className="w-4 h-4 bg-[#0066FF] rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                        <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium ${getLevelColor(post.author.level)}`}>
                          {getLevelIcon(post.author.level)}
                          <span>{post.author.level}</span>
                        </div>
                      </div>
                      <div className="text-[#B3B3B3] text-xs sm:text-sm">
                        {post.author.followers.toLocaleString()} followers • {post.timestamp} ago
                      </div>
                    </div>
                  </div>
                  
                  <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-[#B3B3B3]" />
                  </button>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <p className="text-white leading-relaxed mb-3 text-sm sm:text-base">{post.content}</p>
                  
                  {/* Prediction Card */}
                  {post.prediction && (
                    <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10 mb-3">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Target className="w-3 h-3 sm:w-4 sm:h-4 text-[#FFD700]" />
                          <span className="text-[#FFD700] font-medium text-xs sm:text-sm">Market Prediction</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-[#0066FF]" />
                          <span className="text-[#0066FF] text-xs sm:text-sm">{post.prediction.confidence}% confidence</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 sm:gap-4">
                        <div>
                          <div className="text-[#B3B3B3] text-xs mb-1">Asset</div>
                          <div className="text-white font-semibold text-sm">{post.asset}</div>
                        </div>
                        <div>
                          <div className="text-[#B3B3B3] text-xs mb-1">Direction</div>
                          <div className={`flex items-center space-x-1 font-semibold text-sm ${
                            post.prediction.direction === 'bullish' ? 'text-[#00FF88]' : 'text-[#FF4D4D]'
                          }`}>
                            {post.prediction.direction === 'bullish' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            <span>{post.prediction.direction.toUpperCase()}</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-[#B3B3B3] text-xs mb-1">Target</div>
                          <div className="text-white font-semibold text-sm">${post.prediction.target.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-white/10 rounded-lg text-[#B3B3B3] text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-4 sm:space-x-6">
                    <button className={`flex items-center space-x-2 transition-colors ${
                      post.isLiked ? 'text-[#FF6B6B]' : 'text-[#B3B3B3] hover:text-[#FF6B6B]'
                    }`}>
                      <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span className="text-xs sm:text-sm">{post.likes}</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 text-[#B3B3B3] hover:text-[#0066FF] transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-xs sm:text-sm">{post.comments}</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 text-[#B3B3B3] hover:text-[#00FF88] transition-colors">
                      <Share className="w-4 h-4" />
                      <span className="text-xs sm:text-sm">{post.shares}</span>
                    </button>
                    
                    <div className="flex items-center space-x-2 text-[#B3B3B3]">
                      <Eye className="w-4 h-4" />
                      <span className="text-xs sm:text-sm">{post.views}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className={`p-2 rounded-lg transition-colors ${
                      post.isBookmarked ? 'bg-[#FFD700]/20 text-[#FFD700]' : 'bg-white/5 text-[#B3B3B3] hover:text-[#FFD700]'
                    }`}>
                      <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                    
                    <button className="p-2 bg-white/5 rounded-lg text-[#B3B3B3] hover:text-[#00FF88] transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-8 sm:p-12 border border-white/10 text-center">
              <Users className="w-12 h-12 sm:w-16 sm:h-16 text-[#B3B3B3] mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg sm:text-xl mb-2">No Posts Found</h3>
              <p className="text-[#B3B3B3] text-sm sm:text-base">Try adjusting your filters or search terms to find relevant posts.</p>
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
                item.id === 'community'
                  ? 'text-[#00FF88] bg-[#00FF88]/10 scale-110' 
                  : 'text-[#B3B3B3] hover:text-white hover:scale-105'
              }`}
            >
              <div className={`p-1 sm:p-2 rounded-lg transition-all duration-300 ${
                item.id === 'community' ? 'bg-[#00FF88]/20' : 'group-hover:bg-white/10'
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