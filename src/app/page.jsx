"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Code, Headphones, Download, Sparkles, Zap, Shield, Rocket } from "lucide-react"
import { Button } from "../app/components/ui/button"
import Navigation from "../app/components/navigation"
import Footer from "../app/components/footer"
import { useLanguage } from "../../lib/language-context"

export default function HomePage() {
  const { t } = useLanguage()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el)
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* <Navigation /> */}

      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] rounded-full bg-cyan-500/20 blur-[120px] animate-pulse"
            style={{
              top: `${mousePosition.y / 20}px`,
              left: `${mousePosition.x / 20}px`,
              transition: "all 0.3s ease-out",
            }}
          />
          <div className="absolute w-[300px] sm:w-[500px] md:w-[600px] h-[300px] sm:h-[500px] md:h-[600px] rounded-full bg-emerald-500/15 blur-[100px] top-1/3 right-1/4 animate-float" />
          <div className="absolute w-[250px] sm:w-[400px] md:w-[500px] h-[250px] sm:h-[400px] md:h-[500px] rounded-full bg-purple-500/10 blur-[90px] bottom-1/4 left-1/3 glow-orb" />
        </div>

        <div className="container mx-auto px-4 pt-20 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Badge with animation */}
            <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full glass-card mb-6 sm:mb-8 animate-fade-in border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300">
              <Sparkles size={16} className="text-cyan-400 animate-pulse sm:w-[18px] sm:h-[18px]" />
              <span className="text-xs sm:text-sm font-medium text-white">{t.home.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-3 sm:mb-4 text-white animate-fade-in tracking-tight px-2">
              {t.home.title}
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 sm:mb-8 animate-fade-in-delay px-2">
              <span className="text-gradient">{t.home.subtitle}</span>
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-delay font-light px-4">
              {t.home.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16 animate-fade-in-delay px-4">
              <Link href="/services" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500 bg-[length:200%_100%] hover:bg-right text-white shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60 hover:scale-105 transition-all duration-500 group px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold min-h-[48px]"
                >
                  {t.home.learnMore}
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={20} />
                </Button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto glass-card hover:border-cyan-400/80 hover:scale-105 transition-all duration-300 text-white bg-transparent border-2 border-cyan-400/40 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold hover:bg-cyan-400/10 min-h-[48px]"
                >
                  {t.home.aboutUs}
                </Button>
              </Link>
            </div>

            {/* Scroll indicator */}
            <div className="animate-float hidden sm:block">
              <div className="w-8 h-14 border-2 border-cyan-400/60 rounded-full mx-auto flex items-start justify-center p-2 hover:border-cyan-400 transition-colors">
                <div className="w-2 h-4 bg-gradient-to-b from-cyan-400 to-emerald-400 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-24 lg:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 px-4">
              {t.home.ourServices}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              {t.home.servicesDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: Code,
                title: t.home.webDevelopment,
                description: t.home.webDevDescription,
                color: "cyan",
              },
              {
                icon: Headphones,
                title: t.home.itSupport,
                description: t.home.itSupportDescription,
                color: "emerald",
              },
              {
                icon: Download,
                title: t.home.remoteInstallation,
                description: t.home.remoteInstallDescription,
                color: "purple",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="animate-on-scroll opacity-0 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-full">
                  {/* Glow effect on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-${service.color}-500/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative glass-card p-6 sm:p-8 md:p-10 rounded-3xl h-full border-2 border-gray-800 hover:border-cyan-400/50 transition-all duration-500 group-hover:transform group-hover:scale-105">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-${service.color}-500/30 to-${service.color}-600/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                    >
                      <service.icon size={32} className={`text-${service.color}-400 sm:w-9 sm:h-9`} />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4 sm:mb-6">
                      {service.description}
                    </p>

                    {/* Arrow link */}
                    <Link
                      href="/services"
                      className="inline-flex items-center text-cyan-400 font-semibold group-hover:gap-3 gap-2 transition-all duration-300 min-h-[44px]"
                    >
                      <span className="text-sm sm:text-base">{t.home.learnMore}</span>
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-2 transition-transform duration-300 sm:w-5 sm:h-5"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-24 lg:py-32 relative">
        <div className="absolute inset-0 glow-orb w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-purple-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[
              { number: "500+", label: t.home.completedProjects, icon: Rocket },
              { number: "98%", label: t.home.satisfiedClients, icon: Shield },
              { number: "24/7", label: t.home.support, icon: Zap },
            ].map((stat, index) => (
              <div
                key={index}
                className="animate-on-scroll opacity-0 text-center group"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="glass-card p-8 sm:p-10 rounded-3xl border-2 border-gray-800 hover:border-emerald-400/50 transition-all duration-500 group-hover:scale-105">
                  <stat.icon
                    size={36}
                    className="text-emerald-400 mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 sm:w-10 sm:h-10"
                  />
                  <div className="text-4xl sm:text-5xl md:text-6xl font-black text-gradient mb-2 sm:mb-3">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-base sm:text-lg font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-24 lg:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center animate-on-scroll opacity-0">
            <div className="relative">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-purple-500/20 rounded-3xl blur-3xl" />

              <div className="relative glass-card gradient-border p-8 sm:p-12 md:p-16 lg:p-20 rounded-3xl">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 text-white px-4">
                  {t.home.readyToStart}
                </h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-10 leading-relaxed max-w-3xl mx-auto px-4">
                  {t.home.readyDescription}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500 bg-[length:200%_100%] hover:bg-right text-white shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60 hover:scale-105 transition-all duration-500 group px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg font-semibold min-h-[48px]"
                    >
                      {t.home.startNow}
                      <ArrowRight
                        className="ml-2 group-hover:translate-x-2 transition-transform duration-300"
                        size={20}
                      />
                    </Button>
                  </Link>
                  <Link href="/services" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto glass-card hover:border-cyan-400/80 hover:scale-105 transition-all duration-300 text-white bg-transparent border-2 border-cyan-400/40 px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg font-semibold hover:bg-cyan-400/10 min-h-[48px]"
                    >
                      {t.home.allServices}
                    </Button>
                  </Link>
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
