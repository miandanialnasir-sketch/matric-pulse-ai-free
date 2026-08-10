'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { Grade } from '@/lib/data'

type Theme = 'dark' | 'light'
type Layout = 'mobile' | 'laptop'

export type UserData = {
  firstName: string
  lastName: string
  grade: Grade
}

type AppState = {
  ready: boolean
  user: UserData | null
  theme: Theme
  layout: Layout
  setUser: (u: UserData) => void
  updateUser: (u: Partial<UserData>) => void
  setTheme: (t: Theme) => void
  toggleTheme: () => void
  setLayout: (l: Layout) => void
  reset: () => void
}

const STORAGE_KEY = 'matricpulse:v1'

const AppContext = createContext<AppState | null>(null)

type Persisted = {
  user: UserData | null
  theme: Theme
  layout: Layout
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const [user, setUserState] = useState<UserData | null>(null)
  const [theme, setThemeState] = useState<Theme>('dark')
  const [layout, setLayoutState] = useState<Layout>('mobile')

  // Load persisted state
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const data = JSON.parse(raw) as Persisted
        if (data.user) setUserState(data.user)
        if (data.theme) setThemeState(data.theme)
        if (data.layout) setLayoutState(data.layout)
      }
    } catch {
      // ignore corrupt storage
    }
    setReady(true)
  }, [])

  // Persist state
  useEffect(() => {
    if (!ready) return
    const data: Persisted = { user, theme, layout }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      // ignore
    }
  }, [ready, user, theme, layout])

  // Apply theme class to <html>
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') root.classList.add('light')
    else root.classList.remove('light')
  }, [theme])

  const setUser = useCallback((u: UserData) => setUserState(u), [])
  const updateUser = useCallback(
    (u: Partial<UserData>) =>
      setUserState((prev) => (prev ? { ...prev, ...u } : prev)),
    [],
  )
  const setTheme = useCallback((t: Theme) => setThemeState(t), [])
  const toggleTheme = useCallback(
    () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark')),
    [],
  )
  const setLayout = useCallback((l: Layout) => setLayoutState(l), [])
  const reset = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
    setUserState(null)
    setThemeState('dark')
    setLayoutState('mobile')
  }, [])

  const value = useMemo<AppState>(
    () => ({
      ready,
      user,
      theme,
      layout,
      setUser,
      updateUser,
      setTheme,
      toggleTheme,
      setLayout,
      reset,
    }),
    [ready, user, theme, layout, setUser, updateUser, setTheme, toggleTheme, setLayout, reset],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
