'use client'

import { memo, useMemo } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

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

interface CryptoAssetsProps {
  assets: CryptoAsset[]
  mounted: boolean
}

const CryptoAssetCard = memo(({ asset, mounted }: { asset: CryptoAsset, mounted: boolean }) => {
  const formattedPrice = useMemo(() => asset.price.toFixed(asset.price < 1 ? 4 : 2), [asset.price])
  const formattedHigh = useMemo(() => asset.high24h.toFixed(asset.high24h < 1 ? 4 : 2), [asset.high24h])
  const formattedLow = useMemo(() => asset.low24h.toFixed(asset.low24h < 1 ? 4 : 2), [asset.low24h])
  const formattedVolume = useMemo(() => (asset.volume24h / 1000000000).toFixed(2), [asset.volume24h])

  const chartData = useMemo(() => {
    const maxPrice = Math.max(...asset.priceHistory)
    const minPrice = Math.min(...asset.priceHistory)
    const range = maxPrice - minPrice

    return asset.priceHistory.map((price, i) => {
      const height = range > 0 ? ((price - minPrice) / range) * 100 : 50
      return {
        height: `${height}%`,
        opacity: 0.3 + (i / asset.priceHistory.length) * 0.7
      }
    })
  }, [asset.priceHistory])

  return (
    <div className="bg-gradient-to-br from-purple-600/20 via-purple-700/10 to-purple-800/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-500/30 shadow-xl hover:scale-105 transition-all duration-300">
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
          ${mounted ? formattedPrice : '0.00'}
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
          {chartData.map((data, i) => (
            <div
              key={i}
              className={`flex-1 rounded-sm transition-all duration-300 ${
                asset.change24h >= 0 ? 'bg-green-500' : 'bg-red-500'
              }`}
              style={{
                height: data.height,
                opacity: data.opacity
              }}
            />
          ))}
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-purple-300 text-xs mb-1">High 24h</div>
          <div className="text-white font-bold text-sm">
            ${formattedHigh}
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-purple-300 text-xs mb-1">Low 24h</div>
          <div className="text-white font-bold text-sm">
            ${formattedLow}
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 col-span-2">
          <div className="text-purple-300 text-xs mb-1">Volume 24h</div>
          <div className="text-white font-bold text-sm">
            ${formattedVolume}B
          </div>
        </div>
      </div>

      {/* Indicador de Atualização */}
      <div className="mt-4 flex items-center justify-center space-x-2 text-purple-400 text-xs">
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
        <span>Atualizando em tempo real</span>
      </div>
    </div>
  )
})

CryptoAssetCard.displayName = 'CryptoAssetCard'

const CryptoAssets = memo(({ assets, mounted }: CryptoAssetsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {assets.map((asset) => (
        <CryptoAssetCard
          key={asset.symbol}
          asset={asset}
          mounted={mounted}
        />
      ))}
    </div>
  )
})

CryptoAssets.displayName = 'CryptoAssets'

export default CryptoAssets