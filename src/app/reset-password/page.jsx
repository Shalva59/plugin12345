"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { authAPI } from "../../../lib/api"
import { Lock, ArrowLeft, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!token) {
      setError("Invalid reset link. Please request a new password reset.")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    setLoading(true)

    try {
      const response = await authAPI.resetPassword(token, {
        password: formData.password,
        confirmPassword: formData.confirmPassword
      })

      if (response.success) {
        setSuccess(true)
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/login")
        }, 3000)
      }
    } catch (err) {
      setError(err.message || "Failed to reset password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 w-[600px] h-[600px] bg-purple-500/10 top-1/4 left-1/4 rounded-full blur-3xl animate-pulse" />
        <div className="absolute inset-0 w-[500px] h-[500px] bg-cyan-500/10 bottom-1/4 right-1/4 rounded-full blur-3xl animate-pulse" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Back to Login
            </Link>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 p-8 md:p-10 rounded-3xl">
              {success ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">Password Reset Successful!</h2>
                  <p className="text-gray-400 mb-4">Your password has been reset successfully.</p>
                  <p className="text-sm text-gray-500">Redirecting to login page...</p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2 text-white">Reset Password</h1>
                    <p className="text-gray-400">Enter your new password below</p>
                  </div>

                  {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                      <AlertCircle className="text-red-500 mt-0.5" size={20} />
                      <p className="text-red-400">{error}</p>
                    </div>
                  )}

                  {!token && (
                    <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <p className="text-yellow-400">Invalid or missing reset token. Please request a new password reset.</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white">
                        New Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Enter new password"
                          value={formData.password}
                          onChange={handleChange}
                          className="pl-10 bg-gray-800/50 border-purple-500/30 focus:border-purple-500/60 text-white placeholder:text-gray-500"
                          required
                          disabled={loading || !token}
                          minLength={6}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-white">
                        Confirm New Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm new password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="pl-10 bg-gray-800/50 border-purple-500/30 focus:border-purple-500/60 text-white placeholder:text-gray-500"
                          required
                          disabled={loading || !token}
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                      size="lg"
                      disabled={loading || !token}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin mr-2" size={20} />
                          Resetting...
                        </>
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 text-center text-sm text-gray-400">
                    Remember your password?{" "}
                    <Link href="/login" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                      Back to Login
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-purple-500 animate-spin" />
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  )
}