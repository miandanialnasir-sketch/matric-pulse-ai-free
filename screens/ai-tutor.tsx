'use client'

import { useMemo, useRef, useState, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Bot, Send, Sparkles, User } from 'lucide-react'
import { ScreenHeader } from '@/components/screen-header'
import { useApp } from '@/components/app-provider'
import { cn } from '@/lib/utils'

const SUGGESTIONS = [
  'Explain photosynthesis simply',
  'Give me a study plan for today',
  'Help me solve a quadratic equation',
  'How do I use the Performance Tracker?',
]

export function AITutor({ onBack }: { onBack: () => void }) {
  const { user } = useApp()
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: '/api/chat',
        body: { grade: user?.grade, firstName: user?.firstName },
      }),
    [user?.grade, user?.firstName],
  )

  const { messages, sendMessage, status, error } = useChat({ transport })

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, status])

  const busy = status === 'submitted' || status === 'streaming'

  function submit(text: string) {
    const value = text.trim()
    if (!value || busy) return
    sendMessage({ text: value })
    setInput('')
  }

  return (
    <div className="flex h-[100dvh] flex-col pb-[68px]">
      <ScreenHeader
        title="AI Tutor"
        subtitle="Your smart study assistant"
        icon={Bot}
        onBack={onBack}
      />

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-md px-4 py-5">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center pt-8 text-center">
              <span className="glow flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Sparkles className="size-8" />
              </span>
              <h2 className="mt-5 text-xl font-bold">
                Hi {user?.firstName}, ask me anything
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                I can explain concepts, solve problems, and guide your studies.
              </p>
              <div className="mt-6 grid w-full grid-cols-1 gap-2.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => submit(s)}
                    className="rounded-xl border border-border bg-card px-4 py-3 text-left text-sm transition hover:border-primary/60 active:scale-[0.98]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    'flex gap-2.5',
                    m.role === 'user' ? 'flex-row-reverse' : 'flex-row',
                  )}
                >
                  <span
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-lg',
                      m.role === 'user'
                        ? 'bg-secondary text-foreground'
                        : 'bg-primary text-primary-foreground',
                    )}
                  >
                    {m.role === 'user' ? (
                      <User className="size-4" />
                    ) : (
                      <Bot className="size-4" />
                    )}
                  </span>
                  <div
                    className={cn(
                      'max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                      m.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'border border-border bg-card',
                    )}
                  >
                    {m.parts.map((part, i) =>
                      part.type === 'text' ? (
                        <span key={i}>{part.text}</span>
                      ) : null,
                    )}
                  </div>
                </div>
              ))}
              {status === 'submitted' && (
                <div className="flex gap-2.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Bot className="size-4" />
                  </span>
                  <div className="flex items-center gap-1 rounded-2xl border border-border bg-card px-4 py-3.5">
                    <Dot /> <Dot delay="0.15s" /> <Dot delay="0.3s" />
                  </div>
                </div>
              )}
              {error && (
                <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-background/90 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit(input)
          }}
          className="mx-auto flex w-full max-w-md items-end gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your question..."
            className="h-12 flex-1 rounded-2xl border border-border bg-card px-4 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            aria-label="Send message"
            className="glow flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition active:scale-95 disabled:opacity-40 disabled:shadow-none"
          >
            <Send className="size-5" />
          </button>
        </form>
      </div>
    </div>
  )
}

function Dot({ delay = '0s' }: { delay?: string }) {
  return (
    <span
      className="size-2 animate-bounce rounded-full bg-muted-foreground"
      style={{ animationDelay: delay }}
    />
  )
}
