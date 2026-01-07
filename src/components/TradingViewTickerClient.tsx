'use client'

import { useEffect, useRef } from 'react'

export default function TradingViewTickerClient() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    // Suprimir erros conhecidos do TradingView
    const originalError = console.error
    console.error = (...args: any[]) => {
      const message = args[0]?.toString() || ''
      if (
        message.includes('contentWindow') ||
        message.includes('Cannot listen to the event') ||
        message.includes('Invalid settings') ||
        message.includes('Script error')
      ) {
        return // Suprimir esses erros específicos
      }
      originalError.apply(console, args)
    }

    const initWidget = () => {
      if (!containerRef.current || scriptLoadedRef.current) return

      // Limpar container
      containerRef.current.innerHTML = ''

      // Criar estrutura do widget
      const widgetContainer = document.createElement('div')
      widgetContainer.className = 'tradingview-widget-container__widget'

      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js'
      
      // Configuração correta do widget
      script.innerHTML = JSON.stringify({
        symbols: [
          { proName: 'BINANCE:BTCUSDT', title: 'Bitcoin' },
          { proName: 'BINANCE:ETHUSDT', title: 'Ethereum' },
          { proName: 'BINANCE:BNBUSDT', title: 'BNB' },
          { proName: 'BINANCE:SOLUSDT', title: 'Solana' },
          { proName: 'BINANCE:XRPUSDT', title: 'XRP' },
          { proName: 'BINANCE:ADAUSDT', title: 'Cardano' },
          { proName: 'BINANCE:AVAXUSDT', title: 'Avalanche' },
          { proName: 'BINANCE:DOTUSDT', title: 'Polkadot' },
          { proName: 'BINANCE:MATICUSDT', title: 'Polygon' },
          { proName: 'BINANCE:LINKUSDT', title: 'Chainlink' }
        ],
        showSymbolLogo: true,
        isTransparent: false,
        displayMode: 'adaptive',
        colorTheme: 'dark',
        locale: 'br'
      })

      script.onerror = () => {
        // Ignorar erros de carregamento
      }

      widgetContainer.appendChild(script)
      containerRef.current.appendChild(widgetContainer)
      scriptLoadedRef.current = true
    }

    // Delay para garantir que o DOM está pronto
    const timer = setTimeout(initWidget, 300)

    return () => {
      clearTimeout(timer)
      console.error = originalError
      scriptLoadedRef.current = false
    }
  }, [])

  return (
    <div className="w-full min-h-[120px] rounded-lg overflow-hidden bg-gray-900/50">
      <div ref={containerRef} className="tradingview-widget-container w-full" />
    </div>
  )
}
