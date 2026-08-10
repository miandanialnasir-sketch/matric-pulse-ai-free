import {
  BookOpen,
  NotebookPen,
  FlaskConical,
  FileText,
  CalendarDays,
  Timer,
  TrendingUp,
  CalendarClock,
  PlayCircle,
  Bot,
  type LucideIcon,
} from 'lucide-react'

export type ScreenKey =
  | 'syllabus'
  | 'notes'
  | 'practicals'
  | 'past-papers'
  | 'timetable'
  | 'stopwatch'
  | 'tracker'
  | 'calendar'
  | 'videos'
  | 'ai-tutor'

export type Tile = {
  key: ScreenKey
  label: string
  icon: LucideIcon
}

export const TILES: Tile[] = [
  { key: 'syllabus', label: 'Syllabus', icon: BookOpen },
  { key: 'notes', label: 'Notes', icon: NotebookPen },
  { key: 'practicals', label: 'Practicals', icon: FlaskConical },
  { key: 'past-papers', label: 'Past Papers', icon: FileText },
  { key: 'timetable', label: 'Timetable', icon: CalendarDays },
  { key: 'stopwatch', label: 'Stop Watch', icon: Timer },
  { key: 'tracker', label: 'Performance Tracker', icon: TrendingUp },
  { key: 'calendar', label: 'Calendar', icon: CalendarClock },
  { key: 'videos', label: 'Video Lectures', icon: PlayCircle },
  { key: 'ai-tutor', label: 'AI Tutor', icon: Bot },
]
