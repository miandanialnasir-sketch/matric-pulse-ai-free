'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  Moon,
  Sun,
  Smartphone,
  Laptop,
  UserPen,
  RotateCcw,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useApp } from '@/components/app-provider'
import { gradeLabel, type Grade } from '@/lib/data'
import { cn } from '@/lib/utils'

export function SettingsPanel({ onClose }: { onClose: () => void }) {
  const { user, theme, layout, toggleTheme, setLayout, updateUser, reset } =
    useApp()

  const [editing, setEditing] = useState(false)
  const [firstName, setFirstName] = useState(user?.firstName ?? '')
  const [lastName, setLastName] = useState(user?.lastName ?? '')
  const [grade, setGrade] = useState<Grade>(user?.grade ?? '9')
  const [confirmReset, setConfirmReset] = useState(false)

  function saveEdits() {
    updateUser({
      firstName: firstName.trim() || user?.firstName || '',
      lastName: lastName.trim() || user?.lastName || '',
      grade,
    })
    setEditing(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background animate-in slide-in-from-right-6 fade-in duration-300">
      <header className="flex items-center gap-3 border-b border-border px-4 py-3">
        <button
          type="button"
          onClick={onClose}
          aria-label="Back to dashboard"
          className="flex size-10 items-center justify-center rounded-xl border border-border bg-card transition active:scale-95 hover:border-primary/60"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="text-lg font-bold">Settings</h1>
      </header>

      <div className="mx-auto w-full max-w-md flex-1 overflow-y-auto px-4 py-5">
        {/* Theme */}
        <Section title="Appearance">
          <Row
            icon={theme === 'dark' ? Moon : Sun}
            label="Theme"
            desc={theme === 'dark' ? 'Athletic Dark' : 'Light'}
          >
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm font-medium transition hover:border-primary/60"
            >
              Switch
            </button>
          </Row>

          <Row
            icon={layout === 'mobile' ? Smartphone : Laptop}
            label="Layout"
            desc={layout === 'mobile' ? 'Mobile' : 'Laptop'}
          >
            <ToggleSwitch
              on={layout === 'laptop'}
              onChange={(v) => setLayout(v ? 'laptop' : 'mobile')}
              labelOff="Mobile"
              labelOn="Laptop"
            />
          </Row>
        </Section>

        {/* Profile */}
        <Section title="Profile">
          {!editing ? (
            <Row icon={UserPen} label="Name & Class" desc={`${user?.firstName} ${user?.lastName} · ${user ? gradeLabel(user.grade).split(' (')[0] : ''}`}>
              <button
                type="button"
                onClick={() => {
                  setFirstName(user?.firstName ?? '')
                  setLastName(user?.lastName ?? '')
                  setGrade(user?.grade ?? '9')
                  setEditing(true)
                }}
                className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm font-medium transition hover:border-primary/60"
              >
                Edit
              </button>
            </Row>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="flex flex-col gap-3">
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="h-11 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary"
                />
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="h-11 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary"
                />
                <div className="grid grid-cols-2 gap-2">
                  {(['9', '10'] as Grade[]).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGrade(g)}
                      className={cn(
                        'flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-sm font-medium transition',
                        grade === g
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-background',
                      )}
                    >
                      {grade === g && <Check className="size-4" />}
                      {g === '9' ? 'Part 1' : 'Part 2'}
                    </button>
                  ))}
                </div>
                <div className="mt-1 flex gap-2">
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="flex-1 font-semibold" onClick={saveEdits}>
                    Save
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Section>

        {/* Danger zone */}
        <Section title="App">
          {!confirmReset ? (
            <Row
              icon={RotateCcw}
              label="Reset App"
              desc="Restart from the welcome screen"
            >
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-1.5 text-sm font-medium text-destructive transition hover:bg-destructive/20"
              >
                Reset
              </button>
            </Row>
          ) : (
            <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-4">
              <p className="text-sm text-foreground">
                This will erase your details and restart setup. Continue?
              </p>
              <div className="mt-3 flex gap-2">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setConfirmReset(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={reset}
                >
                  Reset
                </Button>
              </div>
            </div>
          )}
        </Section>
      </div>
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-6">
      <h2 className="mb-2.5 px-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </h2>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  )
}

function Row({
  icon: Icon,
  label,
  desc,
  children,
}: {
  icon: React.ElementType
  label: string
  desc: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{label}</p>
        <p className="truncate text-xs text-muted-foreground">{desc}</p>
      </div>
      {children}
    </div>
  )
}

function ToggleSwitch({
  on,
  onChange,
  labelOff,
  labelOn,
}: {
  on: boolean
  onChange: (v: boolean) => void
  labelOff: string
  labelOn: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={`Layout: ${on ? labelOn : labelOff}`}
      onClick={() => onChange(!on)}
      className={cn(
        'relative h-7 w-12 shrink-0 rounded-full border transition',
        on ? 'border-primary bg-primary/30' : 'border-border bg-secondary',
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 size-5 rounded-full bg-primary transition-all',
          on ? 'left-[calc(100%-1.375rem)]' : 'left-0.5 bg-muted-foreground',
        )}
      />
    </button>
  )
}
