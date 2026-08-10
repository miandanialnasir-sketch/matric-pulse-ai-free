'use client'

import { useMemo, useState } from 'react'
import { TrendingUp, Plus, X, Target, Award } from 'lucide-react'
import { ScreenHeader } from '@/components/screen-header'
import { Button } from '@/components/ui/button'
import { useApp } from '@/components/app-provider'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { SUBJECTS } from '@/lib/data'
import { cn } from '@/lib/utils'

type Record = {
  id: string
  subject: string
  score: number
  total: number
  date: string
}

export function PerformanceTracker({ onBack }: { onBack: () => void }) {
  const { user } = useApp()
  const [records, setRecords] = useLocalStorage<Record[]>(
    'matricpulse:tracker',
    [],
  )
  const [adding, setAdding] = useState(false)
  const [subject, setSubject] = useState('')
  const [score, setScore] = useState('')
  const [total, setTotal] = useState('')

  const subjects = user ? SUBJECTS[user.grade] : []

  const stats = useMemo(() => {
    if (records.length === 0) return { avg: 0, best: 0, count: 0 }
    const pcts = records.map((r) => (r.score / r.total) * 100)
    return {
      avg: Math.round(pcts.reduce((a, b) => a + b, 0) / pcts.length),
      best: Math.round(Math.max(...pcts)),
      count: records.length,
    }
  }, [records])

  function addRecord() {
    const s = Number(score)
    const t = Number(total)
    if (!subject || !t || s < 0 || s > t) return
    setRecords((r) => [
      {
        id: crypto.randomUUID(),
        subject,
        score: s,
        total: t,
        date: new Date().toLocaleDateString(),
      },
      ...r,
    ])
    setSubject('')
    setScore('')
    setTotal('')
    setAdding(false)
  }

  return (
    <div className="pb-28">
      <ScreenHeader
        title="Performance Tracker"
        subtitle="Monitor your test results"
        icon={TrendingUp}
        onBack={onBack}
      />
      <div className="mx-auto w-full max-w-md px-4 py-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard icon={Target} label="Average" value={`${stats.avg}%`} />
          <StatCard icon={Award} label="Best" value={`${stats.best}%`} />
          <StatCard icon={TrendingUp} label="Tests" value={`${stats.count}`} />
        </div>

        {/* Records */}
        <div className="mt-5 flex flex-col gap-2.5">
          {records.length === 0 && !adding && (
            <div className="rounded-2xl border border-dashed border-border bg-card/50 py-10 text-center text-sm text-muted-foreground">
              Add your first test result to start tracking
            </div>
          )}
          {records.map((r) => {
            const pct = Math.round((r.score / r.total) * 100)
            return (
              <div
                key={r.id}
                className="rounded-2xl border border-border bg-card p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{r.subject}</p>
                  <button
                    type="button"
                    onClick={() =>
                      setRecords((prev) => prev.filter((x) => x.id !== r.id))
                    }
                    aria-label="Remove record"
                    className="text-muted-foreground transition hover:text-destructive"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {r.score}/{r.total} · {r.date}
                  </span>
                  <span
                    className={cn(
                      'font-bold',
                      pct >= 60 ? 'text-primary' : 'text-destructive',
                    )}
                  >
                    {pct}%
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all',
                      pct >= 60 ? 'bg-primary' : 'bg-destructive',
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
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
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  inputMode="numeric"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  placeholder="Score"
                  className="h-11 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary"
                />
                <input
                  type="number"
                  inputMode="numeric"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  placeholder="Total marks"
                  className="h-11 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setAdding(false)}
                >
                  Cancel
                </Button>
                <Button className="flex-1 font-semibold" onClick={addRecord}>
                  Save Result
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
            Add Test Result
          </button>
        )}
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-3.5">
      <Icon className="size-5 text-primary" />
      <span className="mt-2 text-xl font-bold tabular-nums">{value}</span>
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  )
}
