'use client'

import { memo, useMemo } from 'react'
import { TrendingUp, TrendingDown, CheckCircle, XCircle, Target, Clock } from 'lucide-react'

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

interface CryptoSignalsProps {
  signals: CryptoSignal[]
  formatTimeRemaining: (seconds: number) => string
}

const CryptoSignalItem = memo(({ signal, formatTimeRemaining }: { signal: CryptoSignal, formatTimeRemaining: (seconds: number) => string }) => {
  const signalClasses = useMemo(() => ({
    container: `relative overflow-hidden bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-all duration-300 ${
      signal.status === 'active'
        ? 'border-purple-500/50 shadow-lg shadow-purple-500/20'
        : signal.status === 'won'
        ? 'border-green-500/50 shadow-lg shadow-green-500/20'
        : 'border-red-500/50 shadow-lg shadow-red-500/20'
    }`,
    directionBg: signal.direction === 'CALL'
      ? 'bg-gradient-to-br from-purple-600 to-purple-800'
      : 'bg-gradient-to-br from-red-600 to-red-800'
  }), [signal.status, signal.direction])

  const formattedEntry = useMemo(() => signal.entry.toFixed(signal.entry < 1 ? 4 : 2), [signal.entry])
  const formattedCurrent = useMemo(() => signal.currentPrice.toFixed(signal.currentPrice < 1 ? 4 : 2), [signal.currentPrice])

  return (
    <div className={signalClasses.container}>
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
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center ${signalClasses.directionBg}`}>
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
            ${formattedEntry}
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-purple-300 text-xs mb-1">Atual</div>
          <div className="text-white font-bold text-sm sm:text-base">
            ${formattedCurrent}
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
  )
})

CryptoSignalItem.displayName = 'CryptoSignalItem'

const CryptoSignals = memo(({ signals, formatTimeRemaining }: CryptoSignalsProps) => {
  const displayedSignals = useMemo(() => signals.slice(0, 3), [signals])

  return (
    <div className="space-y-3 sm:space-y-4">
      {displayedSignals.length === 0 ? (
        <div className="text-center py-8 text-purple-300">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-2"></div>
          <p>Gerando primeiro sinal...</p>
        </div>
      ) : (
        displayedSignals.map((signal) => (
          <CryptoSignalItem
            key={signal.id}
            signal={signal}
            formatTimeRemaining={formatTimeRemaining}
          />
        ))
      )}
    </div>
  )
})

CryptoSignals.displayName = 'CryptoSignals'

export default CryptoSignals