'use client'

import { useState } from 'react'
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Award,
  TrendingUp,
  Target,
  Activity,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Edit,
  Camera,
  Eye,
  EyeOff,
  Crown,
  Star,
  Flame,
  Zap,
  Home,
  BarChart3,
  Briefcase,
  Globe,
  History,
  Users,
  DollarSign,
  Brain,
  CheckCircle,
  Lock,
  Smartphone,
  CreditCard
} from 'lucide-react'

export default function ProfilePage() {
  const [showBalance, setShowBalance] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'security' | 'notifications'>('overview')

  const userProfile = {
    name: 'Alex Thompson',
    username: '@alextrader2024',
    email: 'alex.thompson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    joinDate: 'January 2024',
    avatar: '👨‍💼',
    level: 'Pro Trader',
    verified: true,
    followers: 2340,
    following: 156,
    totalTrades: 847,
    winRate: 78.5,
    totalPnL: 12450.80,
    monthlyPnL: 2340.50,
    streak: 12,
    badges: [
      { name: 'Early Adopter', icon: '🚀', color: 'text-[#FFD700]' },
      { name: 'Consistent Trader', icon: '🎯', color: 'text-[#00FF88]' },
      { name: 'Risk Manager', icon: '🛡️', color: 'text-[#0066FF]' },
      { name: 'Community Helper', icon: '🤝', color: 'text-[#FF6B6B]' }
    ]
  }

  const recentActivity = [
    { type: 'trade', action: 'Closed BTC/USD position', result: '+$1,250', time: '2h ago', status: 'profit' },
    { type: 'signal', action: 'Shared EUR/USD signal', result: '85% confidence', time: '4h ago', status: 'active' },
    { type: 'community', action: 'Posted market analysis', result: '234 likes', time: '6h ago', status: 'popular' },
    { type: 'achievement', action: 'Earned "Streak Master" badge', result: '10 day streak', time: '1d ago', status: 'achievement' }
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'trade': return <TrendingUp className="w-4 h-4" />
      case 'signal': return <Zap className="w-4 h-4" />
      case 'community': return <Users className="w-4 h-4" />
      case 'achievement': return <Award className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'profit': return 'text-[#00FF88] bg-[#00FF88]/20'
      case 'active': return 'text-[#0066FF] bg-[#0066FF]/20'
      case 'popular': return 'text-[#FFD700] bg-[#FFD700]/20'
      case 'achievement': return 'text-[#FF6B6B] bg-[#FF6B6B]/20'
      default: return 'text-[#B3B3B3] bg-white/10'
    }
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/5 via-transparent to-[#0066FF]/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0066FF]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <main className="flex-1 p-3 sm:p-4 lg:p-6 pb-20 sm:pb-24 relative z-10">
        <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Profile Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#0066FF]/10 via-transparent to-[#9C27B0]/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF]/5 to-[#9C27B0]/5 animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="relative">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-[#00FF88]/20 to-[#0066FF]/20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl">
                      {userProfile.avatar}
                    </div>
                    <button className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-[#00FF88] rounded-xl flex items-center justify-center hover:bg-[#00CC6A] transition-colors">
                      <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                    </button>
                  </div>
                  
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                      <h1 className="text-2xl sm:text-3xl font-bold text-white">{userProfile.name}</h1>
                      {userProfile.verified && (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#0066FF] rounded-full flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                      )}
                      <div className="flex items-center space-x-1 px-2 sm:px-3 py-1 bg-[#FFD700]/20 rounded-xl">
                        <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-[#FFD700]" />
                        <span className="text-[#FFD700] text-xs sm:text-sm font-medium">{userProfile.level}</span>
                      </div>
                    </div>
                    <p className="text-[#B3B3B3] mb-2 text-sm sm:text-base">{userProfile.username}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-[#B3B3B3] text-xs sm:text-sm space-y-1 sm:space-y-0">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{userProfile.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Joined {userProfile.joinDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                  <button className="flex items-center justify-center space-x-2 bg-[#00FF88]/20 rounded-xl px-3 sm:px-4 py-2 border border-[#00FF88]/30 hover:bg-[#00FF88]/30 transition-colors">
                    <Edit className="w-3 h-3 sm:w-4 sm:h-4 text-[#00FF88]" />
                    <span className="text-[#00FF88] text-xs sm:text-sm font-medium">Edit Profile</span>
                  </button>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="flex items-center justify-center space-x-2 bg-white/5 rounded-xl px-3 sm:px-4 py-2 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    {showBalance ? <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-[#B3B3B3]" /> : <EyeOff className="w-3 h-3 sm:w-4 sm:h-4 text-[#B3B3B3]" />}
                    <span className="text-[#B3B3B3] text-xs sm:text-sm">{showBalance ? 'Hide' : 'Show'}</span>
                  </button>
                </div>
              </div>

              {/* Profile Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mt-6 sm:mt-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-white mb-1">{userProfile.followers.toLocaleString()}</div>
                    <div className="text-[#B3B3B3] text-xs sm:text-sm">Followers</div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-white mb-1">{userProfile.following}</div>
                    <div className="text-[#B3B3B3] text-xs sm:text-sm">Following</div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-white mb-1">{userProfile.totalTrades}</div>
                    <div className="text-[#B3B3B3] text-xs sm:text-sm">Total Trades</div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-[#00FF88] mb-1">{userProfile.winRate}%</div>
                    <div className="text-[#B3B3B3] text-xs sm:text-sm">Win Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10">
            <div className="flex items-center space-x-1 p-2 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview', icon: User },
                { id: 'settings', label: 'Settings', icon: Settings },
                { id: 'security', label: 'Security', icon: Shield },
                { id: 'notifications', label: 'Notifications', icon: Bell }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#00FF88]/20 text-[#00FF88]'
                      : 'text-[#B3B3B3] hover:text-white hover:bg-white/10'
                  }`}
                >
                  <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {/* Performance Overview */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
                <h3 className="text-white font-semibold text-lg sm:text-xl mb-4 sm:mb-6 flex items-center">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#00FF88]" />
                  Trading Performance
                </h3>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[#B3B3B3] text-xs sm:text-sm mb-1">Total P&L</div>
                      <div className="text-xl sm:text-2xl font-bold text-[#00FF88]">
                        {showBalance ? `+$${userProfile.totalPnL.toLocaleString()}` : '••••••'}
                      </div>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#00FF88] to-[#00CC6A] rounded-xl flex items-center justify-center">
                      <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[#B3B3B3] text-xs sm:text-sm mb-1">Monthly P&L</div>
                      <div className="text-lg sm:text-xl font-bold text-[#00FF88]">
                        {showBalance ? `+$${userProfile.monthlyPnL.toLocaleString()}` : '••••••'}
                      </div>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#0066FF] to-[#0052CC] rounded-xl flex items-center justify-center">
                      <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[#B3B3B3] text-xs sm:text-sm mb-1">Current Streak</div>
                      <div className="text-lg sm:text-xl font-bold text-[#FFD700]">{userProfile.streak} days</div>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-xl flex items-center justify-center">
                      <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements & Badges */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
                <h3 className="text-white font-semibold text-lg sm:text-xl mb-4 sm:mb-6 flex items-center">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#FFD700]" />
                  Achievements
                </h3>
                
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {userProfile.badges.map((badge, index) => (
                    <div key={index} className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10 text-center">
                      <div className="text-xl sm:text-2xl mb-2">{badge.icon}</div>
                      <div className={`font-semibold text-xs sm:text-sm ${badge.color}`}>{badge.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
                <h3 className="text-white font-semibold text-lg sm:text-xl mb-4 sm:mb-6 flex items-center">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#0066FF]" />
                  Recent Activity
                </h3>
                
                <div className="space-y-3 sm:space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${getActivityColor(activity.status)}`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div>
                          <div className="text-white font-medium text-sm sm:text-base">{activity.action}</div>
                          <div className="text-[#B3B3B3] text-xs sm:text-sm">{activity.time}</div>
                        </div>
                      </div>
                      <div className={`font-semibold text-sm ${getActivityColor(activity.status).split(' ')[0]}`}>
                        {activity.result}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
              <h3 className="text-white font-semibold text-lg sm:text-xl mb-4 sm:mb-6">Account Settings</h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-[#B3B3B3] text-xs sm:text-sm mb-2">Full Name</label>
                    <input
                      type="text"
                      value={userProfile.name}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3 sm:px-4 py-2 text-white focus:outline-none focus:border-[#00FF88]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[#B3B3B3] text-xs sm:text-sm mb-2">Username</label>
                    <input
                      type="text"
                      value={userProfile.username}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3 sm:px-4 py-2 text-white focus:outline-none focus:border-[#00FF88]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[#B3B3B3] text-xs sm:text-sm mb-2">Email</label>
                    <input
                      type="email"
                      value={userProfile.email}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3 sm:px-4 py-2 text-white focus:outline-none focus:border-[#00FF88]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[#B3B3B3] text-xs sm:text-sm mb-2">Phone</label>
                    <input
                      type="tel"
                      value={userProfile.phone}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3 sm:px-4 py-2 text-white focus:outline-none focus:border-[#00FF88]/50"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[#B3B3B3] text-xs sm:text-sm mb-2">Location</label>
                  <input
                    type="text"
                    value={userProfile.location}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 sm:px-4 py-2 text-white focus:outline-none focus:border-[#00FF88]/50"
                  />
                </div>

                <div className="flex justify-end">
                  <button className="bg-[#00FF88]/20 text-[#00FF88] px-4 sm:px-6 py-2 rounded-xl border border-[#00FF88]/30 hover:bg-[#00FF88]/30 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
              <h3 className="text-white font-semibold text-lg sm:text-xl mb-4 sm:mb-6">Security Settings</h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center space-x-3">
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-[#0066FF]" />
                    <div>
                      <div className="text-white font-medium text-sm sm:text-base">Two-Factor Authentication</div>
                      <div className="text-[#B3B3B3] text-xs sm:text-sm">Add an extra layer of security</div>
                    </div>
                  </div>
                  <button className="bg-[#00FF88]/20 text-[#00FF88] px-3 sm:px-4 py-2 rounded-lg border border-[#00FF88]/30 text-xs sm:text-sm">
                    Enable
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD700]" />
                    <div>
                      <div className="text-white font-medium text-sm sm:text-base">SMS Verification</div>
                      <div className="text-[#B3B3B3] text-xs sm:text-sm">Verify trades via SMS</div>
                    </div>
                  </div>
                  <button className="bg-white/10 text-[#B3B3B3] px-3 sm:px-4 py-2 rounded-lg border border-white/20 text-xs sm:text-sm">
                    Configure
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6B6B]" />
                    <div>
                      <div className="text-white font-medium text-sm sm:text-base">API Keys</div>
                      <div className="text-[#B3B3B3] text-xs sm:text-sm">Manage trading API access</div>
                    </div>
                  </div>
                  <button className="bg-white/10 text-[#B3B3B3] px-3 sm:px-4 py-2 rounded-lg border border-white/20 text-xs sm:text-sm">
                    Manage
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
              <h3 className="text-white font-semibold text-lg sm:text-xl mb-4 sm:mb-6">Notification Preferences</h3>
              
              <div className="space-y-3 sm:space-y-4">
                {[
                  { title: 'Trading Signals', desc: 'Get notified about new trading opportunities', enabled: true },
                  { title: 'Price Alerts', desc: 'Receive alerts when prices hit your targets', enabled: true },
                  { title: 'Portfolio Updates', desc: 'Daily portfolio performance summaries', enabled: false },
                  { title: 'Community Activity', desc: 'Notifications from followed traders', enabled: true },
                  { title: 'News & Analysis', desc: 'Market news and expert analysis', enabled: false },
                  { title: 'System Updates', desc: 'Platform updates and maintenance notices', enabled: true }
                ].map((notification, index) => (
                  <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10">
                    <div>
                      <div className="text-white font-medium text-sm sm:text-base">{notification.title}</div>
                      <div className="text-[#B3B3B3] text-xs sm:text-sm">{notification.desc}</div>
                    </div>
                    <button className={`w-10 h-5 sm:w-12 sm:h-6 rounded-full transition-colors ${
                      notification.enabled ? 'bg-[#00FF88]' : 'bg-white/20'
                    }`}>
                      <div className={`w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full transition-transform ${
                        notification.enabled ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0.5'
                      }`}></div>
                    </button>
                  </div>
                ))}
              </div>
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
                item.id === 'profile'
                  ? 'text-[#00FF88] bg-[#00FF88]/10 scale-110' 
                  : 'text-[#B3B3B3] hover:text-white hover:scale-105'
              }`}
            >
              <div className={`p-1 sm:p-2 rounded-lg transition-all duration-300 ${
                item.id === 'profile' ? 'bg-[#00FF88]/20' : 'group-hover:bg-white/10'
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