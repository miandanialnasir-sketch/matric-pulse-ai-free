'use client'

import { FileText } from 'lucide-react'
import { ScreenHeader } from '@/components/screen-header'

export function PastPapers({ onBack }: { onBack: () => void }) {
  return (
    <div className="pb-28">
      <ScreenHeader title="Past Papers" icon={FileText} onBack={onBack} />
      <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center px-6 py-24 text-center">
        <span className="flex size-16 items-center justify-center rounded-2xl bg-primary/15 text-primary">
          <FileText className="size-8" />
        </span>
        <p className="mt-5 text-lg font-semibold">No found because new course</p>
      </div>
    </div>
  )
}
