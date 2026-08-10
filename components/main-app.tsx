'use client'

import { useState } from 'react'
import {
  BookOpen,
  NotebookPen,
  FlaskConical,
  PlayCircle,
} from 'lucide-react'
import { useApp } from '@/components/app-provider'
import { Dashboard } from '@/components/dashboard'
import { SettingsPanel } from '@/components/settings-panel'
import { BottomNav, type Tab } from '@/components/bottom-nav'
import { ResourceScreen } from '@/components/screens/resource-screen'
import { PastPapers } from '@/components/screens/past-papers'
import { Timetable } from '@/components/screens/timetable'
import { Stopwatch } from '@/components/screens/stopwatch'
import { PerformanceTracker } from '@/components/screens/performance-tracker'
import { Calendar } from '@/components/screens/calendar'
import { AITutor } from '@/components/screens/ai-tutor'
import { Profile } from '@/components/screens/profile'
import type { ScreenKey } from '@/lib/screens'
import { cn } from '@/lib/utils'

export function MainApp() {
  const { layout } = useApp()
  const [tab, setTab] = useState<Tab>('home')
  const [screen, setScreen] = useState<ScreenKey | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const goHome = () => {
    setScreen(null)
    setTab('home')
  }

  function handleTab(next: Tab) {
    if (next === 'search') {
      setTab('search')
      setScreen('ai-tutor')
    } else if (next === 'profile') {
      setTab('profile')
      setScreen(null)
    } else {
      goHome()
    }
  }

  const wide = layout === 'laptop'

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className={cn('mx-auto w-full', wide ? 'max-w-4xl' : 'max-w-md')}>
        {renderScreen(screen, tab, {
          onBack: goHome,
          onOpen: setScreen,
          onOpenSettings: () => setSettingsOpen(true),
        })}
      </div>

      <BottomNav active={tab} onChange={handleTab} />

      {settingsOpen && <SettingsPanel onClose={() => setSettingsOpen(false)} />}
    </div>
  )
}

function renderScreen(
  screen: ScreenKey | null,
  tab: Tab,
  handlers: {
    onBack: () => void
    onOpen: (s: ScreenKey) => void
    onOpenSettings: () => void
  },
) {
  const { onBack, onOpen, onOpenSettings } = handlers

  if (screen === 'syllabus')
    return <ResourceScreen kind="syllabus" icon={BookOpen} onBack={onBack} />
  if (screen === 'notes')
    return <ResourceScreen kind="notes" icon={NotebookPen} onBack={onBack} />
  if (screen === 'practicals')
    return (
      <ResourceScreen kind="practicals" icon={FlaskConical} onBack={onBack} />
    )
  if (screen === 'videos')
    return <ResourceScreen kind="videos" icon={PlayCircle} onBack={onBack} />
  if (screen === 'past-papers') return <PastPapers onBack={onBack} />
  if (screen === 'timetable') return <Timetable onBack={onBack} />
  if (screen === 'stopwatch') return <Stopwatch onBack={onBack} />
  if (screen === 'tracker') return <PerformanceTracker onBack={onBack} />
  if (screen === 'calendar') return <Calendar onBack={onBack} />
  if (screen === 'ai-tutor') return <AITutor onBack={onBack} />

  if (tab === 'profile') return <Profile />

  return <Dashboard onOpen={onOpen} onOpenSettings={onOpenSettings} />
}
