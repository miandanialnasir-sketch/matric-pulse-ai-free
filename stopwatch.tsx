'use client'

import { useEffect, useRef, useState } from 'react'
import { Timer, Play, Pause, RotateCcw, Flag } from 'lucide-react'
import { ScreenHeader } from '@/components/screen-header'

function format(ms: number) {
  const totalSec = Math.floor(ms / 1000)
  const m = String(Math.floor(totalSec / 60)).padStart(2, '0')
  const s = String(totalSec % 60).padStart(2, '0')
  const cs = String(Math.floor((ms % 1000) / 10)).padStart(2, '0')
  return { main: `${m}:${s}`, cs }
}

export function Stopwatch({ onBack }: { onBack: () => void }) {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState<number[]>([])
  const startRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!running) return
    startRef.current = performance.now() - elapsed
    const tick = () => {
      setElapsed(performance.now() - startRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])

  const t = format(elapsed)

  function reset() {
    setRunning(false)
    setElapsed(0)
    setLaps([])
  }

  return (
    <div className="pb-28">
      <ScreenHeader
        title="Stop Watch"
        subtitle="Track your focus sessions"
        icon={Timer}
        onBack={onBack}
      />
      <div className="mx-auto w-full max-w-md px-4 py-6">
        <div className="glow flex flex-col items-center rounded-3xl border border-border bg-card p-8">
          <div className="flex items-end font-mono tabular-nums">
            <span className="text-6xl font-bold tracking-tight">{t.main}</span>
            <span className="mb-1.5 ml-1 text-2xl font-semibold text-primary">
              {t.cs}
            </span>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={reset}
              aria-label="Reset"
              className="flex size-14 items-center justify-center rounded-full border border-border bg-secondary transition active:scale-95"
            >
              <RotateCcw className="size-6" />
            </button>
            <button
              type="button"
              onClick={() => setRunning((r) => !r)}
              aria-label={running ? 'Pause' : 'Start'}
              className="glow flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground transition active:scale-95"
            >
              {running ? (
                <Pause className="size-8" fill="currentColor" />
              ) : (
                <Play className="ml-1 size-8" fill="currentColor" />
              )}
            </button>
            <button
              type="button"
              onClick={() => running && setLaps((l) => [elapsed, ...l])}
              aria-label="Lap"
              disabled={!running}
              className="flex size-14 items-center justify-center rounded-full border border-border bg-secondary transition active:scale-95 disabled:opacity-40"
            >
              <Flag className="size-6" />
            </button>
          </div>
        </div>

        {laps.length > 0 && (
          <div className="mt-5 rounded-2xl border border-border bg-card p-2">
            {laps.map((lap, i) => {
              const lt = format(lap)
              return (
                <div
                  key={laps.length - i}
                  className="flex items-center justify-between border-b border-border/60 px-3 py-2.5 text-sm last:border-0"
                >
                  <span className="text-muted-foreground">
                    Lap {laps.length - i}
                  </span>
                  <span className="font-mono font-semibold tabular-nums">
                    {lt.main}.{lt.cs}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
