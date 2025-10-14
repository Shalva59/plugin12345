"use client"

import Link from "next/link"
import { Code, Headphones, Download, Check, ArrowRight, Zap, Shield, Clock, Star, Users, Award } from "lucide-react"
import { Button } from "../components/ui/button"
import Navigation from "../components/navigation"
import Footer from "../components/footer"
import { useLanguage } from "../../../lib/language-context"

export default function ServicesPage() {
  const { t } = useLanguage()

  const services = [
    {
      icon: Code,
      title: t.services.webDevelopment.title,
      description: t.services.webDevelopment.description,
      features: [
        t.services.webDevelopment.features.responsive,
        t.services.webDevelopment.features.seo,
        t.services.webDevelopment.features.fast,
        t.services.webDevelopment.features.security,
        t.services.webDevelopment.features.maintenance,
      ],
      color: "cyan",
      badge: t.services.webDevelopment.badge,
      stats: { projects: "500+", rating: "4.9/5" },
    },
    {
      icon: Headphones,
      title: t.services.itSupport.title,
      description: t.services.itSupport.description,
      features: [
        t.services.itSupport.features.availability,
        t.services.itSupport.features.response,
        t.services.itSupport.features.troubleshooting,
        t.services.itSupport.features.preventive,
        t.services.itSupport.features.consultation,
      ],
      color: "emerald",
      badge: t.services.itSupport.badge,
      stats: { projects: "200+", rating: "5.0/5" },
    },
    {
      icon: Download,
      title: t.services.remoteInstallation.title,
      description: t.services.remoteInstallation.description,
      features: [
        t.services.remoteInstallation.features.secure,
        t.services.remoteInstallation.features.fast,
        t.services.remoteInstallation.features.testing,
        t.services.remoteInstallation.features.training,
        t.services.remoteInstallation.features.documentation,
      ],
      color: "purple",
      badge: t.services.remoteInstallation.badge,
      stats: { projects: "150+", rating: "4.8/5" },
    },
  ]

  const benefits = [
    {
      icon: Zap,
      title: t.services.whyUs.fastService.title,
      description: t.services.whyUs.fastService.description,
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: Shield,
      title: t.services.whyUs.reliability.title,
      description: t.services.whyUs.reliability.description,
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: Clock,
      title: t.services.whyUs.support.title,
      description: t.services.whyUs.support.description,
      color: "from-purple-500 to-pink-500",
    },
  ]

  const stats = [
    { icon: Users, value: "200+", label: t.services.stats.clients },
    { icon: Award, value: "500+", label: t.services.stats.projects },
    { icon: Star, value: "4.9/5", label: t.services.stats.rating },
  ]

  const getColorClasses = (color) => {
    const colors = {
      cyan: {
        bg: "bg-cyan-500/10",
        text: "text-cyan-400",
        border: "border-cyan-500/30",
        hover: "hover:border-cyan-500/60 hover:shadow-cyan-500/20",
        button: "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600",
        badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
        glow: "shadow-cyan-500/50",
      },
      emerald: {
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
        border: "border-emerald-500/30",
        hover: "hover:border-emerald-500/60 hover:shadow-emerald-500/20",
        button: "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600",
        badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        glow: "shadow-emerald-500/50",
      },
      purple: {
        bg: "bg-purple-500/10",
        text: "text-purple-400",
        border: "border-purple-500/30",
        hover: "hover:border-purple-500/60 hover:shadow-purple-500/20",
        button: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
        badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        glow: "shadow-purple-500/50",
      },
    }
    return colors[color]
  }

  return (
    <div className="min-h-screen bg-black">
      {/* <Navigation /> */}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-40 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-20">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 text-white animate-fade-in">
              {t.services.title}{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
                {t.services.titleGradient}
              </span>
            </h1>
            <p className="text-2xl text-gray-300 leading-relaxed mb-12 animate-fade-in-delay">
              {t.services.description}
            </p>

            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <stat.icon size={32} className="text-cyan-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-12 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const colors = getColorClasses(service.color)

              return (
                <div
                  key={index}
                  className={`group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border-2 ${colors.border} ${colors.hover} p-10 rounded-3xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div
                    className={`absolute top-6 right-6 px-4 py-1.5 rounded-full border ${colors.badge} text-sm font-semibold`}
                  >
                    {service.badge}
                  </div>

                  <div className="flex flex-col lg:flex-row gap-10 items-center">
                    <div className="flex-shrink-0 text-center lg:text-left">
                      <div
                        className={`w-28 h-28 rounded-2xl ${colors.bg} flex items-center justify-center mb-6 mx-auto lg:mx-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl ${colors.glow}`}
                      >
                        <service.icon size={56} className={colors.text} />
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-3">{service.title}</h3>
                      <div className="flex gap-4 justify-center lg:justify-start text-sm">
                        <span className="text-gray-400">
                          <Users size={16} className="inline mr-1" />
                          {service.stats.projects}
                        </span>
                        <span className={colors.text}>
                          <Star size={16} className="inline mr-1" />
                          {service.stats.rating}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <p className="text-lg text-gray-300 mb-8 leading-relaxed">{service.description}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3 group/item">
                            <div
                              className={`w-6 h-6 rounded-lg ${colors.bg} flex items-center justify-center transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-12`}
                            >
                              <Check size={16} className={colors.text} />
                            </div>
                            <span className="text-gray-300 group-hover/item:text-white group-hover/item:translate-x-1 transition-all duration-300">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex-shrink-0 w-full lg:w-auto">
                      <Link href="/login">
                        <Button
                          size="lg"
                          className={`w-full lg:w-56 ${colors.button} text-white font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl ${colors.glow} group-hover:animate-pulse`}
                        >
                          {t.services.orderNow}
                          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-gradient-to-b from-black via-gray-900/50 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 text-white">
              {t.services.whyUs.title}{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
                {t.services.whyUs.titleGradient}
              </span>
            </h2>
            <p className="text-xl text-gray-400 text-center mb-20 max-w-2xl mx-auto">{t.services.whyUs.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="group relative text-center p-10 rounded-3xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-2 border-gray-700 hover:border-gray-600 transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  <div className="relative z-10">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg`}
                    >
                      <benefit.icon size={40} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:scale-105 transition-transform duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-2 border-gray-700 p-16 md:p-20 rounded-[3rem] text-center overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-purple-500/10 animate-pulse" />
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />

              <div className="relative z-10">
                <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">{t.services.cta.title}</h2>
                <p className="text-2xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
                  {t.services.cta.description}
                </p>
                <Link href="/login">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 via-emerald-500 to-purple-500 hover:from-cyan-600 hover:via-emerald-600 hover:to-purple-600 text-white text-lg px-12 py-7 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/50 font-semibold"
                  >
                    {t.services.cta.button}
                    <ArrowRight className="ml-3" size={24} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  )
}
