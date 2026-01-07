'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

// Hook para animação de números com easing avançado
export function useCountUp(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = useState(start)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = start + (end - start) * easeOut
      
      setCount(current)
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration, start])

  return Math.round(count * 100) / 100
}

// Hook para detectar se elemento está visível com configurações avançadas
export function useInView(threshold: number = 0.1, rootMargin: string = '0px') {
  const [ref, setRef] = useState<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)
  const [hasBeenInView, setHasBeenInView] = useState(false)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting
        setInView(isIntersecting)
        
        if (isIntersecting && !hasBeenInView) {
          setHasBeenInView(true)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(ref)
    
    return () => observer.disconnect()
  }, [ref, threshold, rootMargin, hasBeenInView])

  return [setRef, inView, hasBeenInView] as const
}

// Hook para dados em tempo real simulados com controle avançado
export function useRealTimeData<T>(
  initialData: T,
  updateInterval: number = 5000,
  updateFn: (data: T) => T,
  options: {
    enabled?: boolean
    maxUpdates?: number
    onUpdate?: (data: T) => void
  } = {}
) {
  const [data, setData] = useState(initialData)
  const [updateCount, setUpdateCount] = useState(0)
  const { enabled = true, maxUpdates, onUpdate } = options

  useEffect(() => {
    if (!enabled || (maxUpdates && updateCount >= maxUpdates)) {
      return
    }

    const interval = setInterval(() => {
      setData(currentData => {
        const newData = updateFn(currentData)
        onUpdate?.(newData)
        return newData
      })
      setUpdateCount(count => count + 1)
    }, updateInterval)

    return () => clearInterval(interval)
  }, [updateInterval, updateFn, enabled, maxUpdates, updateCount, onUpdate])

  const reset = useCallback(() => {
    setData(initialData)
    setUpdateCount(0)
  }, [initialData])

  const pause = useCallback(() => {
    // Implementação seria através de um estado enabled
  }, [])

  return { data, updateCount, reset, pause }
}

// Hook para localStorage persistente com validação
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue] as const
}

// Hook para debounce com cancelamento
export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [value, delay])

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return [debouncedValue, cancel] as const
}

// Hook para media queries responsivas com múltiplas queries
export function useMediaQuery(query: string | Record<string, string>) {
  const [matches, setMatches] = useState<boolean | Record<string, boolean>>(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (typeof query === 'string') {
      const media = window.matchMedia(query)
      setMatches(media.matches)

      const listener = (event: MediaQueryListEvent) => {
        setMatches(event.matches)
      }

      media.addEventListener('change', listener)
      return () => media.removeEventListener('change', listener)
    } else {
      // Multiple queries
      const mediaQueries = Object.entries(query).map(([key, q]) => ({
        key,
        query: q,
        media: window.matchMedia(q)
      }))

      const updateMatches = () => {
        const newMatches = mediaQueries.reduce((acc, { key, media }) => {
          acc[key] = media.matches
          return acc
        }, {} as Record<string, boolean>)
        setMatches(newMatches)
      }

      updateMatches()

      const listeners = mediaQueries.map(({ media }) => {
        const listener = () => updateMatches()
        media.addEventListener('change', listener)
        return { media, listener }
      })

      return () => {
        listeners.forEach(({ media, listener }) => {
          media.removeEventListener('change', listener)
        })
      }
    }
  }, [query])

  return matches
}

// Hook para detectar clique fora do elemento com múltiplos refs
export function useClickOutside<T extends HTMLElement>(
  callback: () => void,
  enabled: boolean = true
) {
  const [refs, setRefs] = useState<T[]>([])

  const addRef = useCallback((ref: T | null) => {
    if (ref && !refs.includes(ref)) {
      setRefs(prev => [...prev, ref])
    }
  }, [refs])

  const removeRef = useCallback((ref: T) => {
    setRefs(prev => prev.filter(r => r !== ref))
  }, [])

  useEffect(() => {
    if (!enabled || refs.length === 0) return

    const handleClickOutside = (event: MouseEvent) => {
      const isOutside = refs.every(ref => !ref.contains(event.target as Node))
      if (isOutside) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [refs, callback, enabled])

  return { addRef, removeRef, refs }
}

// Hook para scroll suave com opções avançadas
export function useSmoothScroll() {
  const scrollTo = useCallback((
    target: string | HTMLElement | number,
    options: {
      offset?: number
      duration?: number
      behavior?: ScrollBehavior
    } = {}
  ) => {
    const { offset = 0, behavior = 'smooth' } = options

    if (typeof target === 'number') {
      window.scrollTo({
        top: target - offset,
        behavior
      })
    } else if (typeof target === 'string') {
      const element = document.getElementById(target) || document.querySelector(target)
      if (element) {
        const top = element.getBoundingClientRect().top + window.pageYOffset - offset
        window.scrollTo({
          top,
          behavior
        })
      }
    } else if (target instanceof HTMLElement) {
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({
        top,
        behavior
      })
    }
  }, [])

  const scrollToTop = useCallback(() => {
    scrollTo(0)
  }, [scrollTo])

  const scrollToBottom = useCallback(() => {
    scrollTo(document.body.scrollHeight)
  }, [scrollTo])

  return { scrollTo, scrollToTop, scrollToBottom }
}

// Hook para animação de entrada com configurações avançadas
export function useSlideIn(
  direction: 'left' | 'right' | 'up' | 'down' = 'up',
  options: {
    delay?: number
    duration?: number
    distance?: number
    easing?: string
  } = {}
) {
  const [isVisible, setIsVisible] = useState(false)
  const { delay = 0, duration = 600, distance = 100, easing = 'cubic-bezier(0.4, 0, 0.2, 1)' } = options

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'left': return `translateX(-${distance}px)`
        case 'right': return `translateX(${distance}px)`
        case 'up': return `translateY(${distance}px)`
        case 'down': return `translateY(-${distance}px)`
      }
    }
    return 'translate(0)'
  }

  return {
    style: {
      transform: getTransform(),
      opacity: isVisible ? 1 : 0,
      transition: `all ${duration}ms ${easing}`
    },
    isVisible
  }
}

// Hook para gerenciamento de estado de loading
export function useLoading(initialState: boolean = false) {
  const [isLoading, setIsLoading] = useState(initialState)
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading)
  }, [])

  const setLoadingState = useCallback((key: string, loading: boolean) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: loading
    }))
  }, [])

  const isAnyLoading = Object.values(loadingStates).some(Boolean) || isLoading

  return {
    isLoading,
    setLoading,
    loadingStates,
    setLoadingState,
    isAnyLoading
  }
}

// Hook para controle de tema
export function useTheme() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'dark')

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }, [setTheme])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return { theme, setTheme, toggleTheme }
}

// Hook para controle de notificações
export function useNotifications() {
  const [notifications, setNotifications] = useState<Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message: string
    duration?: number
  }>>([])

  const addNotification = useCallback((notification: Omit<typeof notifications[0], 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification = { ...notification, id }
    
    setNotifications(prev => [...prev, newNotification])

    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration || 5000)
    }
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const clearNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  return {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications
  }
}

// Hook para controle de modal/dialog
export function useModal(initialOpen: boolean = false) {
  const [isOpen, setIsOpen] = useState(initialOpen)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen(prev => !prev), [])

  // Fechar com ESC
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, close])

  return { isOpen, open, close, toggle }
}

// Hook para controle de formulários
export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationSchema?: (values: T) => Record<string, string>
) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const setValue = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as string]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }, [errors])

  const setFieldTouched = useCallback((name: keyof T, isTouched: boolean = true) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }))
  }, [])

  const validate = useCallback(() => {
    if (!validationSchema) return true

    const newErrors = validationSchema(values)
    setErrors(newErrors)
    
    return Object.keys(newErrors).length === 0
  }, [values, validationSchema])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  const handleSubmit = useCallback((onSubmit: (values: T) => void) => {
    return (event: React.FormEvent) => {
      event.preventDefault()
      
      if (validate()) {
        onSubmit(values)
      }
    }
  }, [values, validate])

  return {
    values,
    errors,
    touched,
    setValue,
    setFieldTouched,
    validate,
    reset,
    handleSubmit,
    isValid: Object.keys(errors).length === 0
  }
}