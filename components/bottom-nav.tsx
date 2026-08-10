'use client'

import { Home, Search, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export type Tab = 'home' | 'search' | 'profile'

const ITEMS: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'search', label: 'AI Tutor', icon: Search },
  { key: 'profile', label: 'Profile', icon: User },
]

export function BottomNav({
  active,
  onChange,
}: {
  active: Tab
  onChange: (t: Tab) => void
}) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-md items-center justify-around px-4 pb-[env(safe-area-inset-bottom)] pt-2">
        {ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = active === item.key
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onChange(item.key)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex flex-1 flex-col items-center gap-1 rounded-xl py-2 transition',
                isActive ? 'text-primary' : 'text-muted-foreground',
              )}
            >
              <span
                className={cn(
                  'flex size-9 items-center justify-center rounded-xl transition',
                  isActive && 'bg-primary/15',
                )}
              >
                <Icon className="size-5" strokeWidth={isActive ? 2.5 : 2} />
              </span>
              <span className="text-[11px] font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
