'use client'

import { useEffect, useState } from 'react'
import { Settings, Zap, Moon } from 'lucide-react'
import { useApp } from '@/components/app-provider'
import { TILES, type ScreenKey } from '@/lib/screens'
import { gradeLabel } from '@/lib/data'
import { cn } from '@/lib/utils'

function getGreeting(hour: number) {
  if (hour >= 5 && hour < 12) return { text: 'Good Morning', night: false }
  if (hour >= 12 && hour < 17) return { text: 'Good Afternoon', night: false }
  if (hour >= 17 && hour < 21) return { text: 'Good Evening', night: false }
  return { text: 'Good Night', night: true }
}

export function Dashboard({
  onOpen,
  onOpenSettings,
}: {
  onOpen: (s: ScreenKey) => void
  onOpenSettings: () => void
}) {
  const { user } = useApp()
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  const greeting = now ? getGreeting(now.getHours()) : null

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-28 pt-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="glow flex size-10 items-center justify-center rounded-xl bg-primary">
            <Zap className="size-5 text-primary-foreground" strokeWidth={2.5} />
          </span>
          <div>
            <p className="text-sm font-bold leading-none">MatricPulse AI</p>
            <p className="mt-1 text-[11px] uppercase tracking-widest text-primary">
              {user ? gradeLabel(user.grade).split(' (')[0] : ''}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenSettings}
          aria-label="Open settings"
          className="flex size-11 items-center justify-center rounded-xl border border-border bg-card text-foreground transition active:scale-95 hover:border-primary/60"
        >
          <Settings className="size-5" />
        </button>
      </div>

      {/* Greeting */}
      <div className="mt-6">
        <h1 className="text-balance text-2xl font-bold tracking-tight">
          Hello {user?.firstName} {user?.lastName}
        </h1>
        {greeting && (
          <p className="mt-1 text-base text-muted-foreground">{greeting.text}</p>
        )}
        {greeting?.night && (
          <div className="glow mt-4 flex items-start gap-3 rounded-2xl border border-primary/30 bg-primary/10 p-4">
            <Moon className="mt-0.5 size-5 shrink-0 text-primary" />
            <p className="text-sm leading-relaxed text-foreground">
              Close your MatricPulse AI for now and go to sleep, we will continue tomorrow
            </p>
          </div>
        )}
      </div>

      {/* Tiles */}
      <div className="mt-7 grid grid-cols-2 gap-3.5 sm:grid-cols-3">
        {TILES.map((tile, i) => {
          const Icon = tile.icon
          const featured = tile.key === 'ai-tutor'
          return (
            <button
              key={tile.key}
              type="button"
              onClick={() => onOpen(tile.key)}
              style={{ animationDelay: `${i * 40}ms` }}
              className={cn(
                'group flex animate-in fade-in slide-in-from-bottom-2 flex-col items-start gap-6 rounded-2xl border p-4 text-left transition duration-300 active:scale-[0.97]',
                featured
                  ? 'glow border-primary/50 bg-primary/10 hover:bg-primary/15'
                  : 'border-border bg-card hover:border-primary/50',
              )}
            >
              <span
                className={cn(
                  'flex size-11 items-center justify-center rounded-xl transition',
                  featured
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-primary/15 text-primary group-hover:bg-primary/25',
                )}
              >
                <Icon className="size-5" strokeWidth={2} />
              </span>
              <span className="text-sm font-semibold leading-tight text-pretty">
                {tile.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
