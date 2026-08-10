'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useApp } from '@/components/app-provider'
import { gradeLabel, type Grade } from '@/lib/data'
import { cn } from '@/lib/utils'

const TOTAL_STEPS = 3

export function SetupFlow() {
  const { setUser } = useApp()
  const [step, setStep] = useState(0)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [grade, setGrade] = useState<Grade | null>(null)

  const progress = ((step + 1) / TOTAL_STEPS) * 100
  const canProceedDetails = firstName.trim() && lastName.trim()

  function finish() {
    if (!grade) return
    setUser({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      grade,
    })
  }

  return (
    <div className="relative flex min-h-[100dvh] flex-col bg-background">
      {/* Progress bar */}
      <div className="fixed inset-x-0 top-0 z-20 h-1 bg-secondary">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 pb-10 pt-14">
        {step === 0 && <Welcome onNext={() => setStep(1)} />}
        {step === 1 && (
          <UserDetails
            firstName={firstName}
            lastName={lastName}
            onFirst={setFirstName}
            onLast={setLastName}
            canProceed={!!canProceedDetails}
            onBack={() => setStep(0)}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <PathSelection
            grade={grade}
            onSelect={setGrade}
            onBack={() => setStep(1)}
            onFinish={finish}
          />
        )}
      </div>
    </div>
  )
}

function Welcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-1 animate-in fade-in duration-500 flex-col items-center justify-center text-center">
      <div className="glow flex size-24 items-center justify-center rounded-3xl bg-primary">
        <Zap className="size-12 text-primary-foreground" strokeWidth={2.5} />
      </div>
      <h1 className="mt-8 text-balance text-4xl font-bold tracking-tight text-glow">
        MatricPulse AI
      </h1>
      <p className="mt-3 text-pretty text-base text-muted-foreground">
        Empowering Matric Students
      </p>
      <Button
        size="lg"
        onClick={onNext}
        className="mt-10 h-12 w-full rounded-2xl text-base font-semibold"
      >
        Get Started
        <ArrowRight className="size-5" />
      </Button>
    </div>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 rounded-2xl border border-border bg-card px-4 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
      />
    </div>
  )
}

function UserDetails({
  firstName,
  lastName,
  onFirst,
  onLast,
  canProceed,
  onBack,
  onNext,
}: {
  firstName: string
  lastName: string
  onFirst: (v: string) => void
  onLast: (v: string) => void
  canProceed: boolean
  onBack: () => void
  onNext: () => void
}) {
  return (
    <div className="flex flex-1 animate-in fade-in slide-in-from-right-4 duration-300 flex-col">
      <div className="pt-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Step 2 of 3
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">Your Details</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Tell us who you are so we can personalize your dashboard.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-5">
        <Field
          id="firstName"
          label="First Name"
          value={firstName}
          onChange={onFirst}
          placeholder="e.g. Ali"
        />
        <Field
          id="lastName"
          label="Last Name"
          value={lastName}
          onChange={onLast}
          placeholder="e.g. Khan"
        />
      </div>

      <div className="mt-auto flex items-center gap-3 pt-10">
        <Button
          variant="secondary"
          size="lg"
          onClick={onBack}
          className="h-12 flex-1 rounded-2xl"
        >
          <ArrowLeft className="size-5" />
          Back
        </Button>
        <Button
          size="lg"
          onClick={onNext}
          disabled={!canProceed}
          className="h-12 flex-1 rounded-2xl font-semibold"
        >
          Next
          <ArrowRight className="size-5" />
        </Button>
      </div>
    </div>
  )
}

function PathSelection({
  grade,
  onSelect,
  onBack,
  onFinish,
}: {
  grade: Grade | null
  onSelect: (g: Grade) => void
  onBack: () => void
  onFinish: () => void
}) {
  const options: Grade[] = ['9', '10']
  return (
    <div className="flex flex-1 animate-in fade-in slide-in-from-right-4 duration-300 flex-col">
      <div className="pt-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Step 3 of 3
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">Choose Your Path</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Select your current class to load the right subjects.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {options.map((g) => {
          const active = grade === g
          return (
            <button
              key={g}
              type="button"
              onClick={() => onSelect(g)}
              className={cn(
                'flex items-center justify-between rounded-2xl border p-5 text-left transition',
                active
                  ? 'glow border-primary bg-primary/10'
                  : 'border-border bg-card hover:border-primary/50',
              )}
            >
              <div>
                <p className="text-lg font-semibold">{gradeLabel(g)}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {g === '9' ? 'Foundation year subjects' : 'Board year subjects'}
                </p>
              </div>
              <span
                className={cn(
                  'flex size-7 items-center justify-center rounded-full border-2 transition',
                  active
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted-foreground/40',
                )}
              >
                {active && <Check className="size-4" strokeWidth={3} />}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-auto flex items-center gap-3 pt-10">
        <Button
          variant="secondary"
          size="lg"
          onClick={onBack}
          className="h-12 flex-1 rounded-2xl"
        >
          <ArrowLeft className="size-5" />
          Back
        </Button>
        <Button
          size="lg"
          onClick={onFinish}
          disabled={!grade}
          className="h-12 flex-1 rounded-2xl font-semibold"
        >
          Finish
          <Check className="size-5" />
        </Button>
      </div>
    </div>
  )
}
