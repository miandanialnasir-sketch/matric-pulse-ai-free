'use client'

import { Download, ExternalLink } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { ScreenHeader } from '@/components/screen-header'
import { useApp } from '@/components/app-provider'
import { SUBJECTS, toDownloadUrl, type Subject } from '@/lib/data'

type Kind = 'syllabus' | 'notes' | 'practicals' | 'videos'

const CONFIG: Record<
  Kind,
  { title: string; subtitle: string; field: keyof Subject; action: string }
> = {
  syllabus: {
    title: 'Syllabus',
    subtitle: 'Textbooks for your class',
    field: 'textbook',
    action: 'Open Textbook',
  },
  notes: {
    title: 'Notes',
    subtitle: 'Chapter-wise study notes',
    field: 'notes',
    action: 'Open Notes',
  },
  practicals: {
    title: 'Practicals',
    subtitle: 'Interactive lab experiments',
    field: 'practical',
    action: 'Open Practicals',
  },
  videos: {
    title: 'Video Lectures',
    subtitle: 'Curated learning playlists',
    field: 'video',
    action: 'Watch Lectures',
  },
}

export function ResourceScreen({
  kind,
  icon,
  onBack,
}: {
  kind: Kind
  icon: LucideIcon
  onBack: () => void
}) {
  const { user } = useApp()
  const config = CONFIG[kind]
  const subjects = user ? SUBJECTS[user.grade] : []
  const items = subjects.filter((s) => s[config.field])

  return (
    <div className="pb-28">
      <ScreenHeader
        title={config.title}
        subtitle={config.subtitle}
        icon={icon}
        onBack={onBack}
      />
      <div className="mx-auto w-full max-w-md px-4 py-4">
        <div className="flex flex-col gap-3">
          {items.map((subject) => {
            const url = subject[config.field] as string
            return (
              <div
                key={subject.key}
                className="rounded-2xl border border-border bg-card p-4"
              >
                <p className="font-semibold">{subject.name}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition active:scale-95"
                  >
                    <ExternalLink className="size-4" />
                    {config.action}
                  </a>
                  {kind === 'syllabus' && (
                    <a
                      href={toDownloadUrl(url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm font-semibold transition active:scale-95 hover:border-primary/60"
                    >
                      <Download className="size-4" />
                      Download Textbook
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
