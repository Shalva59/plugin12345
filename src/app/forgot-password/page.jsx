"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import Navigation from "../components/navigation"
import { useLanguage } from "../../../lib/language-context"
import { authAPI } from "../../../lib/api"

import { Mail, ArrowLeft, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function ForgotPasswordPage() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await authAPI.forgotPassword(email)
      setSubmitted(true)
    } catch (err) {
      setError(err.message || "Failed to send reset email. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 w-[600px] h-[600px] bg-purple-500/10 top-1/4 left-1/4 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute inset-0 w-[500px] h-[500px] bg-cyan-500/10 bottom-1/4 right-1/4 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              {t.forgotPassword.backToLogin}
            </Link>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 p-8 md:p-10 rounded-3xl">
              {!submitted ? (
                <>
                  <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2 text-white">{t.forgotPassword.title}</h1>
                    <p className="text-gray-400">{t.forgotPassword.subtitle}</p>
                  </div>

                  {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                      <AlertCircle className="text-red-500 mt-0.5" size={20} />
                      <p className="text-red-400">{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        {t.forgotPassword.email}
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <Input
                          id="email"
                          type="email"
                          placeholder={t.forgotPassword.emailPlaceholder}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 bg-gray-800/50 border-purple-500/30 focus:border-purple-500/60 text-white placeholder:text-gray-500"
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin mr-2" size={20} />
                          Sending...
                        </>
                      ) : (
                        t.forgotPassword.resetButton
                      )}
                    </Button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/20 rounded-full mb-6">
                    <CheckCircle className="text-emerald-400" size={32} />
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-white">{t.forgotPassword.successTitle}</h2>
                  <p className="text-gray-400 mb-6">
                    {t.forgotPassword.successMessage} <span className="text-white font-medium">{email}</span>
                    {t.forgotPassword.successMessageOn}
                  </p>
                  <p className="text-sm text-gray-500 mb-8">{t.forgotPassword.spamNote}</p>
                  <Link href="/login">
                    <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white">
                      {t.forgotPassword.backToLoginButton}
                    </Button>
                  </Link>
                </div>
              )}

              <div className="mt-6 text-center text-sm text-gray-400">
                {t.forgotPassword.rememberedPassword}{" "}
                <Link href="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                  {t.forgotPassword.login}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
