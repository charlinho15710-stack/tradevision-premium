'use client'

import { useEffect, useRef } from 'react'

export function TradingViewTicker() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: 'BINANCE:BTCUSDT', title: 'BTC/USDT' },
        { proName: 'BINANCE:ETHUSDT', title: 'ETH/USDT' },
        { proName: 'BINANCE:BNBUSDT', title: 'BNB/USDT' },
        { proName: 'BINANCE:SOLUSDT', title: 'SOL/USDT' },
        { proName: 'BINANCE:XRPUSDT', title: 'XRP/USDT' },
        { proName: 'BINANCE:ADAUSDT', title: 'ADA/USDT' },
        { proName: 'BINANCE:AVAXUSDT', title: 'AVAX/USDT' },
        { proName: 'BINANCE:DOTUSDT', title: 'DOT/USDT' },
        { proName: 'BINANCE:MATICUSDT', title: 'MATIC/USDT' },
        { proName: 'BINANCE:LINKUSDT', title: 'LINK/USDT' }
      ],
      showSymbolLogo: true,
      colorTheme: 'dark',
      isTransparent: false,
      locale: 'br'
    })

    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [])

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  )
}

export function TradingViewChart() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return

    // Carregar biblioteca TradingView
    const tvScript = document.createElement('script')
    tvScript.src = 'https://s3.tradingview.com/tv.js'
    tvScript.async = true
    tvScript.onload = () => {
      if (containerRef.current && (window as any).TradingView) {
        new (window as any).TradingView.widget({
          container_id: containerRef.current.id,
          symbol: 'BINANCE:BTCUSDT',
          interval: '5',
          theme: 'dark',
          style: '1',
          locale: 'br',
          width: '100%',
          height: '600'
        })
      }
    }

    document.head.appendChild(tvScript)

    return () => {
      if (document.head.contains(tvScript)) {
        document.head.removeChild(tvScript)
      }
    }
  }, [])

  return <div id="tradingview_chart" ref={containerRef} className="rounded-2xl overflow-hidden"></div>
}
