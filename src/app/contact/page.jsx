"use client"

import { useState, useEffect } from "react"
// import Navigation from "@/app/components/navigation"
// import Footer from "@/app/components/footer"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useLanguage } from "../../../lib/language-context"
import { useAuth } from "../../../lib/auth-context"
import { contactAPI } from "../../../lib/api"

export default function ContactPage() {
  const { t } = useLanguage()
  const { user, isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Auto-fill name and email if user is logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }))
    }
  }, [isAuthenticated, user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await contactAPI.sendContact(formData)

      if (response.success) {
        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
          // Only clear subject and message, keep name and email if logged in
          setFormData(prev => ({
            ...prev,
            subject: "",
            message: "",
          }))
        }, 3000)
      }
    } catch (err) {
      setError(err.message || "Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-black">
      {/* <Navigation /> */}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">{t.contact.title}</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t.contact.description}</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6">{t.contact.formTitle}</h2>

              {submitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/50 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-4">{t.contact.successIcon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{t.contact.successTitle}</h3>
                  <p className="text-gray-400">{t.contact.successMessage}</p>
                </div>
              ) : error ? (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6 mb-4">
                  <p className="text-red-400">{error}</p>
                  <Button
                    onClick={() => setError("")}
                    className="mt-4 bg-red-500 hover:bg-red-600"
                  >
                    {t.contact.tryAgain}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-white mb-2 block">
                      {t.contact.name}
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isAuthenticated}
                      className="bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500 disabled:opacity-60 disabled:cursor-not-allowed"
                      placeholder={t.contact.namePlaceholder}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white mb-2 block">
                      {t.contact.email}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isAuthenticated}
                      className="bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500 disabled:opacity-60 disabled:cursor-not-allowed"
                      placeholder={t.contact.emailPlaceholder}
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-white mb-2 block">
                      {t.contact.subject}
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500"
                      placeholder={t.contact.subjectPlaceholder}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white mb-2 block">
                      {t.contact.message}
                    </Label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="flex w-full rounded-md border border-gray-700 bg-black/50 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder={t.contact.messagePlaceholder}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-6 text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? t.contact.sending : t.contact.sendButton}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">{t.contact.infoTitle}</h2>
                <p className="text-gray-400 mb-8">{t.contact.infoDescription}</p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {/* Email */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{t.contact.emailLabel}</h3>
                      <p className="text-gray-400">{t.contact.emailPrimary}</p>
                      {/* <p className="text-gray-400">{t.contact.emailSecondary}</p> */}
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{t.contact.phoneLabel}</h3>
                      <p className="text-gray-400">{t.contact.phonePrimary}</p>
                      <p className="text-gray-400">{t.contact.phoneSecondary}</p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{t.contact.addressLabel}</h3>
                      <p className="text-gray-400">{t.contact.addressCity}</p>
                      <p className="text-gray-400">{t.contact.addressStreet}</p>
                    </div>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{t.contact.hoursLabel}</h3>
                      <p className="text-gray-400">{t.contact.hoursWeekday}</p>
                      <p className="text-gray-400">{t.contact.hoursSaturday}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  )
}
