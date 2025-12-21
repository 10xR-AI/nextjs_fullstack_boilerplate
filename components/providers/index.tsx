"use client"

import { type ReactNode } from "react"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "./auth-provider"

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      {children}
      <Toaster position="top-right" richColors />
    </AuthProvider>
  )
}

export { AuthProvider, useAuth } from "./auth-provider"
