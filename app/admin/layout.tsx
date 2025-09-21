import type React from "react"
import { Suspense } from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div>Loading admin...</div>}>{children}</Suspense>
    </div>
  )
}
