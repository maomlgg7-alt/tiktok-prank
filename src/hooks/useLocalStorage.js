import { useState, useCallback } from 'react'

export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : defaultValue
    } catch {
      return defaultValue
    }
  })

  const set = useCallback((v) => {
    const next = typeof v === 'function' ? v(value) : v
    setValue(next)
    try { localStorage.setItem(key, JSON.stringify(next)) } catch {}
  }, [key, value])

  return [value, set]
}
