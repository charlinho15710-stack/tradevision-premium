'use client'

import { useEffect, useRef } from 'react'

export default function TradingViewChartClient() {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<any>(null)

  useEffect(() => {
    // Suprimir erros conhecidos do TradingView
    const originalError = console.error
    console.error = (...args: any[]) => {
      const message = args[0]?.toString() || ''
      if (
        message.includes('contentWindow') ||
        message.includes('Cannot listen to the event') ||
        message.includes('Script error')
      ) {
        return // Suprimir esses erros específicos
      }
      originalError.apply(console, args)
    }

    // Limpar widget anterior se existir
    if (widgetRef.current) {
      try {
        widgetRef.current.remove()
      } catch (e) {
        // Ignorar erros de limpeza
      }
      widgetRef.current = null
    }

    // Função para inicializar o widget
    const initWidget = () => {
      if (!containerRef.current) return

      // Verificar se TradingView está disponível
      if (typeof window === 'undefined' || !(window as any).TradingView) {
        setTimeout(initWidget, 500)
        return
      }

      try {
        // Limpar container
        if (containerRef.current) {
          containerRef.current.innerHTML = ''
        }

        // Criar widget
        widgetRef.current = new (window as any).TradingView.widget({
          container_id: containerRef.current.id,
          symbol: 'BINANCE:BTCUSDT',
          interval: '5',
          timezone: 'America/Sao_Paulo',
          theme: 'dark',
          style: '1',
          locale: 'br',
          toolbar_bg: '#0D0D0D',
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          save_image: false,
          studies: [],
          show_popup_button: false,
          popup_width: '1000',
          popup_height: '650',
          width: '100%',
          height: '600',
          autosize: true,
        })
      } catch (error) {
        // Ignorar erros de inicialização
      }
    }

    // Carregar script do TradingView
    const loadScript = () => {
      if (document.querySelector('script[src*="tv.js"]')) {
        initWidget()
        return
      }

      const script = document.createElement('script')
      script.src = 'https://s3.tradingview.com/tv.js'
      script.async = true
      script.onload = () => {
        setTimeout(initWidget, 500)
      }
      script.onerror = () => {
        // Tentar novamente em caso de erro
        setTimeout(loadScript, 2000)
      }
      document.head.appendChild(script)
    }

    loadScript()

    // Cleanup
    return () => {
      console.error = originalError
      if (widgetRef.current) {
        try {
          widgetRef.current.remove()
        } catch (e) {
          // Ignorar erros de limpeza
        }
      }
    }
  }, [])

  return (
    <div className="w-full min-h-[600px] rounded-lg overflow-hidden bg-gray-900/50">
      <div
        ref={containerRef}
        id={`tradingview_chart_${Date.now()}`}
        className="w-full h-[600px]"
      />
    </div>
  )
}
