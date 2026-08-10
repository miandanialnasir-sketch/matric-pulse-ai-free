'use client'

import { Zap, Code2, GraduationCap, BookMarked, Info } from 'lucide-react'
import { useApp } from '@/components/app-provider'
import { gradeLabel, SUBJECTS } from '@/lib/data'

export function Profile() {
  const { user } = useApp()
  const subjectCount = user ? SUBJECTS[user.grade].length : 0

  return (
    <div className="mx-auto w-full max-w-md px-4 pb-28 pt-6">
      {/* Developer card */}
      <div className="glow flex flex-col items-center rounded-3xl border border-primary/30 bg-primary/10 p-6 text-center">
        <span className="flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Code2 className="size-8" />
        </span>
        <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-primary">
          Developer
        </p>
        <h1 className="mt-1 text-xl font-bold">Muhammad Daniyal Nasir</h1>
      </div>

      {/* Student info */}
      <div className="mt-5 flex flex-col gap-2.5">
        <InfoRow
          icon={GraduationCap}
          label="Student"
          value={user ? `${user.firstName} ${user.lastName}` : '-'}
        />
        <InfoRow
          icon={BookMarked}
          label="Class"
          value={user ? gradeLabel(user.grade) : '-'}
        />
        <InfoRow
          icon={Info}
          label="Subjects Loaded"
          value={`${subjectCount} subjects`}
        />
      </div>

      {/* App details */}
      <div className="mt-5 rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary">
            <Zap className="size-4 text-primary-foreground" strokeWidth={2.5} />
          </span>
          <div>
            <p className="font-bold leading-none">MatricPulse AI</p>
            <p className="mt-1 text-xs text-muted-foreground">Version 1.0.0</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Empowering Matric students with textbooks, notes, practicals, video
          lectures, planning tools, and a smart AI tutor — all in one place.
        </p>
      </div>
    </div>
  )
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate font-semibold">{value}</p>
      </div>
    </div>
  )
}
