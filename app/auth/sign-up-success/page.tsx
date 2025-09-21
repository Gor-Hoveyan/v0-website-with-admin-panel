import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-emerald-900">Thank you for signing up!</CardTitle>
            <CardDescription className="text-emerald-600">Check your email to confirm your account</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-emerald-700">
              You've successfully signed up for admin access. Please check your email to confirm your account before
              signing in.
            </p>
            <div className="space-y-2">
              <Link
                href="/auth/login"
                className="inline-block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Go to Login
              </Link>
              <Link
                href="/"
                className="inline-block text-emerald-600 hover:text-emerald-800 underline underline-offset-4"
              >
                ← Back to website
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
