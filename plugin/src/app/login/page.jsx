"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useLanguage } from "../../../lib/language-context"
// import Navigation from "@/components/navigation"
import { Mail, Lock, ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login attempt:", { email, password })
  }

  return (
    <div className="min-h-screen bg-black">
      {/* <Navigation /> */}

      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 w-[600px] h-[600px] bg-cyan-500/10 top-1/4 left-1/4 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute inset-0 w-[500px] h-[500px] bg-emerald-500/10 bottom-1/4 right-1/4 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              {t.login.backToHome}
            </Link>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 p-8 md:p-10 rounded-3xl">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-2 text-white">{t.login.title}</h1>
                <p className="text-gray-400">{t.login.subtitle}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    {t.login.email}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="email"
                      type="email"
                      placeholder={t.login.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-gray-800/50 border-cyan-500/30 focus:border-cyan-500/60 text-white placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    {t.login.password}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="password"
                      type="password"
                      placeholder={t.login.passwordPlaceholder}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-gray-800/50 border-cyan-500/30 focus:border-cyan-500/60 text-white placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                    <input type="checkbox" className="rounded border-cyan-500/30" />
                    {t.login.rememberMe}
                  </label>
                  <Link href="/forgot-password" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                    {t.login.forgotPassword}
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-white shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
                  size="lg"
                >
                  {t.login.loginButton}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-400">
                {t.login.noAccount}{" "}
                <Link href="/registration" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                  {t.login.register}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
