"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../../lib/auth-context"
import { useLanguage } from "../../../lib/language-context"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { User, Mail, Calendar, Shield, LogOut } from "lucide-react"

export default function DashboardPage() {
  const { user, isAuthenticated, loading, logout } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [loading, isAuthenticated, router])

  if (loading) {
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
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">{t.dashboard.welcomeBack}, {user.name}!</h1>
              <p className="text-gray-400">{t.dashboard.manageAccount}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-gray-900/50 backdrop-blur-sm border-cyan-500/20 p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cyan-500/10 rounded-lg">
                    <User className="w-6 h-6 text-cyan-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{t.dashboard.profileInfo}</h3>
                    <p className="text-gray-400 text-sm mb-4">{t.dashboard.accountDetails}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-300">{user.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-300">{user.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gray-900/50 backdrop-blur-sm border-emerald-500/20 p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-500/10 rounded-lg">
                    <Shield className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{t.dashboard.accountStatus}</h3>
                    <p className="text-gray-400 text-sm mb-4">{t.dashboard.securityVerification}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${user.isEmailVerified ? 'bg-emerald-500' : 'bg-yellow-500'}`} />
                        <span className="text-gray-300">
                          {user.isEmailVerified ? t.dashboard.emailVerified : t.dashboard.emailNotVerified}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-300">
                          {t.dashboard.joined} {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                className="bg-gradient-to-r from-cyan-500/80 to-emerald-500/80 hover:from-cyan-500 hover:to-emerald-500 text-white"
                onClick={() => router.push("/settings")}
              >
                {t.dashboard.accountSettings}
              </Button>
              <Button
                variant="outline"
                className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                onClick={() => router.push("/change-password")}
              >
                {t.dashboard.changePassword}
              </Button>
              <Button
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                onClick={logout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t.dashboard.logout}
              </Button>
            </div>

            {user.role === 'admin' && (
              <Card className="bg-gray-900/50 backdrop-blur-sm border-purple-500/20 p-6 mt-8">
                <h3 className="text-lg font-semibold text-white mb-4">{t.dashboard.adminPanel}</h3>
                <p className="text-gray-400 mb-4">{t.dashboard.adminPrivileges}</p>
                <Button
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white"
                  onClick={() => router.push("/admin")}
                >
                  {t.dashboard.goToAdminDashboard}
                </Button>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}