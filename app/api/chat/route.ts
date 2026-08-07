import { convertToModelMessages, streamText, UIMessage } from 'ai'
import { SUBJECTS, gradeLabel, type Grade } from '@/lib/data'
import { createOpenAI } from '@ai-sdk/openai'

export const maxDuration = 30

// Groq configuration through OpenAI provider
const groq = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://groq.com',
})

export async function POST(req: Request) {
  const {
    messages,
    grade,
    firstName,
  }: { messages: UIMessage[]; grade?: Grade; firstName?: string } =
    await req.json()

  const subjects =
    grade && SUBJECTS[grade]
      ? SUBJECTS[grade].map((s) => s.name).join(', ')
      : 'the core Matric subjects'

  const instructions = `You are MatricPulse AI, a friendly and knowledgeable study assistant built into the MatricPulse AI app for Pakistani Matric students.

Student context:
- Name: ${firstName || 'the student'}
- Class: ${grade ? gradeLabel(grade) : 'Matric'}
- Subjects available: ${subjects}

The MatricPulse AI app includes these features the student can use: Syllabus (textbooks with open/download), Notes, Practicals, Past Papers, Timetable, Stop Watch, Performance Tracker, Calendar, Video Lectures, and this AI Tutor. The bottom navigation has Home, AI Tutor (search), and Profile.

Your job:
- Answer academic questions clearly and concisely for the student's class level.
- Help explain concepts, solve problems step by step, and give study tips.
- Guide the student through today's tasks and how to use app features when asked.
- You may write math using LaTeX wrapped in double dollar signs.
- Keep replies focused, encouraging, and age-appropriate. You can reply in English, Urdu, or Roman Urdu to match the student.
- Do not mention regional boards unless the student asks.`

  const result = streamText({
    model: groq('llama-3.3-70b-versatile'), // Free and super-fast Groq model
    system: instructions,
    messages: await convertToModelMessages(messages),
  })

  return result.toDataStreamResponse()
}
