"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../../lib/auth-context"
import { useLanguage } from "../../../lib/language-context"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { ArrowLeft, User, Mail, Save, Loader2, CheckCircle, AlertCircle, Lock, Trash2 } from "lucide-react"
import Link from "next/link"
import ConfirmationModal from "../components/ui/confirmation-modal"

export default function SettingsPage() {
  const { user, isAuthenticated, loading: authLoading, checkAuth, logout } = useAuth()
  const router = useRouter()
  const { t } = useLanguage()

  const [formData, setFormData] = useState({
    name: "",
    email: ""
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [authLoading, isAuthenticated, router])

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || ""
      })
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: "", text: "" })
    setLoading(true)

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setMessage({ type: "success", text: t.settings.profileUpdated })
        // Refresh user data
        await checkAuth()
      } else {
        setMessage({ type: "error", text: data.message || t.settings.profileUpdateFailed })
      }
    } catch (error) {
      setMessage({ type: "error", text: t.settings.errorOccurred })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    setDeleteLoading(true)

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/delete-account`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Logout and redirect
        logout()
      } else {
        setMessage({ type: "error", text: data.message || t.settings.deleteFailed })
        setShowDeleteModal(false)
      }
    } catch (error) {
      setMessage({ type: "error", text: t.settings.errorOccurred })
      setShowDeleteModal(false)
    } finally {
      setDeleteLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-black pt-24">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 w-[600px] h-[600px] bg-cyan-500/10 top-1/4 left-1/4 rounded-full blur-3xl animate-pulse" />
        <div className="absolute inset-0 w-[500px] h-[500px] bg-purple-500/10 bottom-1/4 right-1/4 rounded-full blur-3xl animate-pulse" />

        <div className="container mx-auto px-4 relative z-10 py-12">
          <div className="max-w-2xl mx-auto">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              {t.settings.backToDashboard}
            </Link>

            <Card className="bg-gray-900/50 backdrop-blur-sm border-cyan-500/20 p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">{t.settings.title}</h1>
                <p className="text-gray-400">{t.settings.subtitle}</p>
              </div>

              {message.text && (
                <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                  message.type === "success"
                    ? "bg-emerald-500/10 border border-emerald-500/30"
                    : "bg-red-500/10 border border-red-500/30"
                }`}>
                  {message.type === "success" ? (
                    <CheckCircle className="text-emerald-500 mt-0.5" size={20} />
                  ) : (
                    <AlertCircle className="text-red-500 mt-0.5" size={20} />
                  )}
                  <p className={message.type === "success" ? "text-emerald-400" : "text-red-400"}>
                    {message.text}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    {t.settings.fullName}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10 bg-gray-800/50 border-cyan-500/30 focus:border-cyan-500/60 text-white placeholder:text-gray-500"
                      placeholder={t.settings.enterName}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    {t.settings.emailAddress}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 bg-gray-800/50 border-cyan-500/30 focus:border-cyan-500/60 text-white placeholder:text-gray-500"
                      placeholder={t.settings.enterEmail}
                      required
                      disabled={loading}
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    {t.settings.emailChangeNote}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-800/30 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">{t.settings.accountStatus}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">{t.settings.emailVerified}</span>
                        <span className={`text-sm ${user.isEmailVerified ? 'text-emerald-400' : 'text-yellow-400'}`}>
                          {user.isEmailVerified ? t.settings.yes : t.settings.no}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">{t.settings.accountType}</span>
                        <span className="text-sm text-cyan-400 capitalize">{user.role || t.settings.user}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">{t.settings.memberSince}</span>
                        <span className="text-sm text-gray-400">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={20} />
                        {t.settings.saving}
                      </>
                    ) : (
                      <>
                        <Save className="mr-2" size={20} />
                        {t.settings.saveChanges}
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    onClick={() => router.push("/dashboard")}
                    disabled={loading}
                  >
                    {t.settings.cancel}
                  </Button>
                </div>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">{t.settings.security}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link href="/change-password" className="w-full">
                    <Button
                      variant="outline"
                      className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/50 transition-all group"
                    >
                      <Lock className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                      {t.settings.changePassword}
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 transition-all group"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    <Trash2 className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    {t.settings.deleteAccount}
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  {t.settings.deleteNote}
                </p>
              </div>
            </Card>

            {/* Delete Account Confirmation Modal */}
            <ConfirmationModal
              isOpen={showDeleteModal}
              onClose={() => setShowDeleteModal(false)}
              onConfirm={handleDeleteAccount}
              title={t.settings.deleteModalTitle}
              message={t.settings.deleteModalMessage}
              confirmText={t.settings.deleteConfirm}
              cancelText={t.settings.cancel}
              type="danger"
              loading={deleteLoading}
            />
          </div>
        </div>
      </section>
    </div>
  )
}