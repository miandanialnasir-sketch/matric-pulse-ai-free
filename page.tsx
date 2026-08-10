"use client"

import { AppProvider, useApp } from "@/components/app-provider"
import { SetupFlow } from "@/components/setup-flow"
import { MainApp } from "@/components/main-app"

function Root() {
  const { ready, user } = useApp()

  if (!ready) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-background">
        <div className="size-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
      </div>
    )
  }

  if (!user) {
    return <SetupFlow />
  }

  return <MainApp />
}

export default function Page() {
  return (
    <AppProvider>
      <Root />
    </AppProvider>
  )
}
