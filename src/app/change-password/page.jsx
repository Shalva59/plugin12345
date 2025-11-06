"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../../lib/auth-context"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { ArrowLeft, Lock, Save, Loader2, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function ChangePasswordPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth()
  const router = useRouter()

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [authLoading, isAuthenticated, router])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ""
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required"
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required"
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters"
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = "Password must contain at least one letter and one number"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password"
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (formData.currentPassword && formData.newPassword && formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = "New password must be different from current password"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: "", text: "" })

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/update-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setMessage({ type: "success", text: "Password changed successfully!" })
        // Clear form
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        })
        // Update token if provided
        if (data.token) {
          localStorage.setItem("token", data.token)
        }
        // Redirect after 2 seconds
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      } else {
        setMessage({ type: "error", text: data.message || "Failed to change password" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field]
    })
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
        <div className="absolute inset-0 w-[600px] h-[600px] bg-purple-500/10 top-1/4 left-1/4 rounded-full blur-3xl animate-pulse" />
        <div className="absolute inset-0 w-[500px] h-[500px] bg-cyan-500/10 bottom-1/4 right-1/4 rounded-full blur-3xl animate-pulse" />

        <div className="container mx-auto px-4 relative z-10 py-12">
          <div className="max-w-2xl mx-auto">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </Link>

            <Card className="bg-gray-900/50 backdrop-blur-sm border-purple-500/20 p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Change Password</h1>
                <p className="text-gray-400">Update your account password</p>
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
                  <Label htmlFor="currentPassword" className="text-white">
                    Current Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type={showPasswords.current ? "text" : "password"}
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className={`pl-10 pr-10 bg-gray-800/50 border-purple-500/30 focus:border-purple-500/60 text-white placeholder:text-gray-500 ${
                        errors.currentPassword ? 'border-red-500/50' : ''
                      }`}
                      placeholder="Enter current password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p className="text-red-400 text-sm">{errors.currentPassword}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-white">
                    New Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type={showPasswords.new ? "text" : "password"}
                      value={formData.newPassword}
                      onChange={handleChange}
                      className={`pl-10 pr-10 bg-gray-800/50 border-purple-500/30 focus:border-purple-500/60 text-white placeholder:text-gray-500 ${
                        errors.newPassword ? 'border-red-500/50' : ''
                      }`}
                      placeholder="Enter new password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-red-400 text-sm">{errors.newPassword}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    Password must be at least 6 characters and contain both letters and numbers
                  </p>
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
                      type={showPasswords.confirm ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`pl-10 pr-10 bg-gray-800/50 border-purple-500/30 focus:border-purple-500/60 text-white placeholder:text-gray-500 ${
                        errors.confirmPassword ? 'border-red-500/50' : ''
                      }`}
                      placeholder="Confirm new password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm">{errors.confirmPassword}</p>
                  )}
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-400 text-sm">
                    <strong>Security Tips:</strong>
                  </p>
                  <ul className="text-yellow-400/80 text-sm mt-2 space-y-1 list-disc list-inside">
                    <li>Use a unique password that you don't use elsewhere</li>
                    <li>Consider using a password manager</li>
                    <li>Enable two-factor authentication when available</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={20} />
                        Changing Password...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2" size={20} />
                        Change Password
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
                    Cancel
                  </Button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <Link
                  href="/forgot-password"
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Forgot your current password?
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}