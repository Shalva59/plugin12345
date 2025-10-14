"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useLanguage } from "../../../lib/language-context"
// import Navigation from "@/components/navigation"
import { Mail, Lock, User, ArrowLeft } from "lucide-react"

export default function RegisterPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert(t.register.passwordMismatch)
      return
    }
    console.log("Registration attempt:", formData)
  }

  return (
    <div className="min-h-screen bg-black">
      {/* <Navigation /> */}

      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 w-[600px] h-[600px] bg-emerald-500/10 top-1/4 left-1/4 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute inset-0 w-[500px] h-[500px] bg-cyan-500/10 bottom-1/4 right-1/4 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              {t.register.backToHome}
            </Link>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-emerald-500/20 p-8 md:p-10 rounded-3xl">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-2 text-white">{t.register.title}</h1>
                <p className="text-gray-400">{t.register.subtitle}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    {t.register.name}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder={t.register.namePlaceholder}
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10 bg-gray-800/50 border-emerald-500/30 focus:border-emerald-500/60 text-white placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    {t.register.email}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={t.register.emailPlaceholder}
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 bg-gray-800/50 border-emerald-500/30 focus:border-emerald-500/60 text-white placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    {t.register.password}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder={t.register.passwordPlaceholder}
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 bg-gray-800/50 border-emerald-500/30 focus:border-emerald-500/60 text-white placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">
                    {t.register.confirmPassword}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder={t.register.confirmPasswordPlaceholder}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-10 bg-gray-800/50 border-emerald-500/30 focus:border-emerald-500/60 text-white placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2 text-sm">
                  <input type="checkbox" className="mt-1 rounded border-emerald-500/30" required />
                  <label className="text-gray-300">
                    {t.register.agreeToTerms}{" "}
                    <a href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                      {t.register.termsAndConditions}
                    </a>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300"
                  size="lg"
                >
                  {t.register.registerButton}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-400">
                {t.register.haveAccount}{" "}
                <Link href="/login" className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
                  {t.register.login}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
