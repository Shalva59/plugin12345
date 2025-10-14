"use client"

import { useLanguage } from "../../../lib/language-context"
import Navigation from "../components/navigation"
import Footer from "../components/footer"
import { Button } from "../components/ui/button"
import Link from "next/link"

export default function SoftwarePage() {
  const { t } = useLanguage()

  const softwareCategories = [
    {
      id: "adobe",
      icon: "🎨",
      color: "from-red-500 to-pink-500",
      borderColor: "border-red-500/20",
      hoverGlow: "hover:shadow-red-500/20",
    },
    {
      id: "archicad",
      icon: "🏗️",
      color: "from-blue-500 to-cyan-500",
      borderColor: "border-blue-500/20",
      hoverGlow: "hover:shadow-blue-500/20",
    },
    {
      id: "autodesk",
      icon: "🔧",
      color: "from-emerald-500 to-teal-500",
      borderColor: "border-emerald-500/20",
      hoverGlow: "hover:shadow-emerald-500/20",
    },
    {
      id: "windows",
      icon: "💻",
      color: "from-cyan-500 to-blue-500",
      borderColor: "border-cyan-500/20",
      hoverGlow: "hover:shadow-cyan-500/20",
    },
    {
      id: "office",
      icon: "📊",
      color: "from-orange-500 to-red-500",
      borderColor: "border-orange-500/20",
      hoverGlow: "hover:shadow-orange-500/20",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* <Navigation /> */}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">{t.software.title} </span>
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400 text-transparent bg-clip-text">
                {t.software.titleGradient}
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">{t.software.description}</p>
          </div>
        </div>
      </section>

      {/* Software Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {softwareCategories.map((category) => {
              const categoryData = t.software.categories[category.id]
              return (
                <div
                  key={category.id}
                  className={`glass-card border flex flex-col justify-between ${category.borderColor} p-8 hover:scale-105 transition-all duration-300 ${category.hoverGlow} hover:shadow-2xl group`}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`text-5xl p-4 rounded-2xl bg-gradient-to-br ${category.color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">{categoryData.title}</h3>
                      <p className="text-gray-400 text-sm">{categoryData.description}</p>
                    </div>
                  </div>

                  {/* Products or Versions */}
                  <div className="space-y-3 mb-6">
                    {categoryData.products
                      ? Object.values(categoryData.products).map((product, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                          >
                            <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`} />
                            <span>{product}</span>
                          </div>
                        ))
                      : categoryData.versions
                        ? Object.values(categoryData.versions).map((version, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                            >
                              <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`} />
                              <span>{version}</span>
                            </div>
                          ))
                        : null}
                  </div>

                  <Link href="/contact">
                    <Button
                      className={`w-full bg-gradient-to-r ${category.color} hover:opacity-90 text-white shadow-lg transition-all duration-300`}
                    >
                      {t.software.contactUs}
                    </Button>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass-card border border-cyan-400/20 p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-4">{t.software.cta.title}</h2>
            <p className="text-xl text-gray-400 mb-8">{t.software.cta.description}</p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300"
              >
                {t.software.cta.button}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  )
}
