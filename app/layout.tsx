import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/ui/scroll-to-top"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "EduPlatform - Quality Education & Training",
  description:
    "Empowering learners through quality education, innovative courses, and professional training programs in AI, Data Science, and Technology.",
  generator: "v0.app",
  keywords:
    "education, training, AI, artificial intelligence, data science, machine learning, programming, courses, online learning",
  authors: [{ name: "EduPlatform" }],
  creator: "EduPlatform",
  publisher: "EduPlatform",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eduplatform.com",
    title: "EduPlatform - Quality Education & Training",
    description:
      "Empowering learners through quality education, innovative courses, and professional training programs.",
    siteName: "EduPlatform",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduPlatform - Quality Education & Training",
    description:
      "Empowering learners through quality education, innovative courses, and professional training programs.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      <body className="font-sans">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
            </div>
          }
        >
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ScrollToTop />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
