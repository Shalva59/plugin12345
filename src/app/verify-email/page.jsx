"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { authAPI } from "../../../lib/api"
import { CheckCircle, XCircle, Loader2, ArrowLeft } from "lucide-react"
import { Button } from "../components/ui/button"

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")
  const [status, setStatus] = useState("verifying") // verifying, success, error
  const [message, setMessage] = useState("")

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error")
        setMessage("No verification token provided")
        return
      }

      try {
        const response = await authAPI.verifyEmail(token)
        if (response.success) {
          setStatus("success")
          setMessage(response.message || "Your email has been successfully verified!")
          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push("/login")
          }, 3000)
        }
      } catch (err) {
        setStatus("error")
        setMessage(err.message || "Verification failed. The link may be expired or invalid.")
      }
    }

    verifyEmail()
  }, [token, router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 w-[600px] h-[600px] bg-cyan-500/10 top-1/4 left-1/4 rounded-full blur-3xl animate-pulse" />
      <div className="absolute inset-0 w-[500px] h-[500px] bg-emerald-500/10 bottom-1/4 right-1/4 rounded-full blur-3xl animate-pulse" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 p-8 md:p-10 rounded-3xl">
            <div className="text-center">
              {status === "verifying" && (
                <>
                  <Loader2 className="w-16 h-16 text-cyan-500 mx-auto mb-4 animate-spin" />
                  <h1 className="text-3xl font-bold text-white mb-2">Verifying Email</h1>
                  <p className="text-gray-400">Please wait while we verify your email address...</p>
                </>
              )}

              {status === "success" && (
                <>
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h1 className="text-3xl font-bold text-white mb-2">Email Verified!</h1>
                  <p className="text-gray-400 mb-6">{message}</p>
                  <p className="text-sm text-gray-500 mb-6">Redirecting to login page...</p>
                  <Link href="/login">
                    <Button className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-white">
                      Go to Login
                    </Button>
                  </Link>
                </>
              )}

              {status === "error" && (
                <>
                  <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h1 className="text-3xl font-bold text-white mb-2">Verification Failed</h1>
                  <p className="text-gray-400 mb-6">{message}</p>
                  <div className="space-y-3">
                    <Link href="/registration">
                      <Button variant="outline" className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
                        Register Again
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-white">
                        Go to Login
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mt-8 group justify-center w-full"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-cyan-500 animate-spin" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}