'use client'

import { useState } from 'react'
import { CalendarClock, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react'
import { ScreenHeader } from '@/components/screen-header'
import { Button } from '@/components/ui/button'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { cn } from '@/lib/utils'

type Events = Record<string, string[]>

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function key(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

export function Calendar({ onBack }: { onBack: () => void }) {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [selected, setSelected] = useState(now.getDate())
  const [events, setEvents] = useLocalStorage<Events>('matricpulse:calendar', {})
  const [text, setText] = useState('')

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const isCurrentMonth =
    year === now.getFullYear() && month === now.getMonth()

  const selectedKey = key(year, month, selected)
  const dayEvents = events[selectedKey] ?? []

  function shift(dir: number) {
    let m = month + dir
    let y = year
    if (m < 0) {
      m = 11
      y -= 1
    } else if (m > 11) {
      m = 0
      y += 1
    }
    setMonth(m)
    setYear(y)
    setSelected(1)
  }

  function addEvent() {
    if (!text.trim()) return
    setEvents((e) => ({
      ...e,
      [selectedKey]: [...(e[selectedKey] ?? []), text.trim()],
    }))
    setText('')
  }

  function removeEvent(i: number) {
    setEvents((e) => ({
      ...e,
      [selectedKey]: (e[selectedKey] ?? []).filter((_, idx) => idx !== i),
    }))
  }

  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  return (
    <div className="pb-28">
      <ScreenHeader
        title="Calendar"
        subtitle="Track events & deadlines"
        icon={CalendarClock}
        onBack={onBack}
      />
      <div className="mx-auto w-full max-w-md px-4 py-4">
        <div className="rounded-3xl border border-border bg-card p-4">
          {/* Month nav */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => shift(-1)}
              aria-label="Previous month"
              className="flex size-9 items-center justify-center rounded-lg bg-secondary transition active:scale-95"
            >
              <ChevronLeft className="size-5" />
            </button>
            <p className="font-bold">
              {MONTHS[month]} {year}
            </p>
            <button
              type="button"
              onClick={() => shift(1)}
              aria-label="Next month"
              className="flex size-9 items-center justify-center rounded-lg bg-secondary transition active:scale-95"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          {/* Weekday labels */}
          <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
            {WEEKDAYS.map((w, i) => (
              <span key={i}>{w}</span>
            ))}
          </div>

          {/* Days */}
          <div className="mt-1 grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (d === null) return <span key={`e${i}`} />
              const isToday = isCurrentMonth && d === now.getDate()
              const isSelected = d === selected
              const hasEvents = (events[key(year, month, d)] ?? []).length > 0
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelected(d)}
                  className={cn(
                    'relative flex aspect-square items-center justify-center rounded-xl text-sm font-medium transition',
                    isSelected
                      ? 'bg-primary text-primary-foreground'
                      : isToday
                        ? 'bg-primary/15 text-primary'
                        : 'hover:bg-secondary',
                  )}
                >
                  {d}
                  {hasEvents && !isSelected && (
                    <span className="absolute bottom-1 size-1 rounded-full bg-primary" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Events */}
        <div className="mt-5">
          <p className="px-1 text-sm font-semibold">
            {MONTHS[month]} {selected}, {year}
          </p>
          <div className="mt-2 flex flex-col gap-2">
            {dayEvents.length === 0 && (
              <p className="rounded-2xl border border-dashed border-border bg-card/50 py-6 text-center text-sm text-muted-foreground">
                No events on this day
              </p>
            )}
            {dayEvents.map((ev, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5"
              >
                <span className="size-2 shrink-0 rounded-full bg-primary" />
                <span className="flex-1 text-sm">{ev}</span>
                <button
                  type="button"
                  onClick={() => removeEvent(i)}
                  aria-label="Remove event"
                  className="text-muted-foreground transition hover:text-destructive"
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.nativeEvent.isComposing) addEvent()
              }}
              placeholder="Add an event or deadline"
              className="h-11 flex-1 rounded-xl border border-border bg-card px-3 text-sm outline-none focus:border-primary"
            />
            <Button
              onClick={addEvent}
              aria-label="Add event"
              className="size-11 shrink-0 p-0"
            >
              <Plus className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
