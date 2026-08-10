'use client'

import { ArrowLeft } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export function ScreenHeader({
  title,
  subtitle,
  icon: Icon,
  onBack,
}: {
  title: string
  subtitle?: string
  icon?: LucideIcon
  onBack: () => void
}) {
  return (
    <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-md">
      <button
        type="button"
        onClick={onBack}
        aria-label="Go back"
        className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-foreground transition active:scale-95 hover:border-primary/60"
      >
        <ArrowLeft className="size-5" />
      </button>
      <div className="flex items-center gap-2.5">
        {Icon && (
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Icon className="size-5" />
          </span>
        )}
        <div>
          <h1 className="text-lg font-bold leading-tight">{title}</h1>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
    </header>
  )
}
