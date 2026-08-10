'use client'

import { useState } from 'react'
import { CalendarDays, Plus, X, Clock } from 'lucide-react'
import { ScreenHeader } from '@/components/screen-header'
import { Button } from '@/components/ui/button'
import { useApp } from '@/components/app-provider'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { SUBJECTS } from '@/lib/data'
import { cn } from '@/lib/utils'

type Slot = { id: string; subject: string; time: string }
type Week = Record<string, Slot[]>

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function Timetable({ onBack }: { onBack: () => void }) {
  const { user } = useApp()
  const [week, setWeek] = useLocalStorage<Week>('matricpulse:timetable', {})
  const today = DAYS[(new Date().getDay() + 6) % 7]
  const [activeDay, setActiveDay] = useState(today)
  const [adding, setAdding] = useState(false)
  const [subject, setSubject] = useState('')
  const [time, setTime] = useState('')

  const subjects = user ? SUBJECTS[user.grade] : []
  const slots = week[activeDay] ?? []

  function addSlot() {
    if (!subject || !time) return
    const slot: Slot = { id: crypto.randomUUID(), subject, time }
    setWeek((w) => ({
      ...w,
      [activeDay]: [...(w[activeDay] ?? []), slot].sort((a, b) =>
        a.time.localeCompare(b.time),
      ),
    }))
    setSubject('')
    setTime('')
    setAdding(false)
  }

  function removeSlot(id: string) {
    setWeek((w) => ({
      ...w,
      [activeDay]: (w[activeDay] ?? []).filter((s) => s.id !== id),
    }))
  }

  return (
    <div className="pb-28">
      <ScreenHeader
        title="Timetable"
        subtitle="Plan your study week"
        icon={CalendarDays}
        onBack={onBack}
      />
      <div className="mx-auto w-full max-w-md px-4 py-4">
        {/* Day selector */}
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
          {DAYS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setActiveDay(d)}
              className={cn(
                'flex shrink-0 flex-col items-center rounded-xl border px-4 py-2 transition',
                activeDay === d
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-card text-muted-foreground',
              )}
            >
              <span className="text-sm font-semibold">{d}</span>
              {d === today && (
                <span className="mt-0.5 size-1.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Slots */}
        <div className="mt-4 flex flex-col gap-2.5">
          {slots.length === 0 && !adding && (
            <div className="rounded-2xl border border-dashed border-border bg-card/50 py-10 text-center text-sm text-muted-foreground">
              No classes planned for {activeDay}
            </div>
          )}
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
            >
              <span className="flex items-center gap-1.5 rounded-lg bg-primary/15 px-2.5 py-1.5 font-mono text-sm font-semibold text-primary">
                <Clock className="size-3.5" />
                {slot.time}
              </span>
              <span className="flex-1 truncate font-medium">{slot.subject}</span>
              <button
                type="button"
                onClick={() => removeSlot(slot.id)}
                aria-label="Remove slot"
                className="text-muted-foreground transition hover:text-destructive"
              >
                <X className="size-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Add form */}
        {adding ? (
          <div className="mt-3 rounded-2xl border border-border bg-card p-4">
            <div className="flex flex-col gap-3">
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="h-11 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary"
              >
                <option value="">Select subject</option>
                {subjects.map((s) => (
                  <option key={s.key} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="h-11 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary"
              />
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setAdding(false)}
                >
                  Cancel
                </Button>
                <Button className="flex-1 font-semibold" onClick={addSlot}>
                  Add
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-primary/50 bg-primary/5 py-3.5 text-sm font-semibold text-primary transition active:scale-[0.98]"
          >
            <Plus className="size-5" />
            Add Class
          </button>
        )}
      </div>
    </div>
  )
}
