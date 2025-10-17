"use client"
import Navigation from "../components/navigation"
import Footer from "../components/footer"
import { Target, Users, Award, Lightbulb, Zap, Shield, TrendingUp, Heart } from "lucide-react"
import { useLanguage } from "../../../lib/language-context"

export default function AboutPage() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Target,
      title: t.about.mission.title,
      description: t.about.mission.description,
      color: "cyan",
    },
    {
      icon: Lightbulb,
      title: t.about.vision.title,
      description: t.about.vision.description,
      color: "emerald",
    },
    {
      icon: Users,
      title: t.about.team.title,
      description: t.about.team.description,
      color: "purple",
    },
    {
      icon: Award,
      title: t.about.values.title,
      description: t.about.values.description,
      color: "cyan",
    },
  ]

  const stats = [
    { icon: Zap, number: "500+", label: t.about.stats.projects },
    { icon: Users, number: "200+", label: t.about.stats.clients },
    { icon: Award, number: "15+", label: t.about.stats.experience },
    { icon: Heart, number: "98%", label: t.about.stats.satisfaction },
  ]

  const values = [
    {
      icon: Shield,
      title: t.about.coreValues.reliability.title,
      description: t.about.coreValues.reliability.description,
    },
    {
      icon: TrendingUp,
      title: t.about.coreValues.growth.title,
      description: t.about.coreValues.growth.description,
    },
    {
      icon: Lightbulb,
      title: t.about.coreValues.innovation.title,
      description: t.about.coreValues.innovation.description,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="text-white">{t.about.title} </span>
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                {t.about.titleGradient}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">{t.about.description}</p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-6 text-center hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {features.map((feature, index) => {
              const colorClasses = {
                cyan: "border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-cyan-500/20",
                emerald: "border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-emerald-500/20",
                purple: "border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/20",
              }
              const iconColors = {
                cyan: "bg-cyan-500/10 text-cyan-400",
                emerald: "bg-emerald-500/10 text-emerald-400",
                purple: "bg-purple-500/10 text-purple-400",
              }

              return (
                <div
                  key={index}
                  className={`bg-gradient-to-br from-gray-900 to-gray-950 border rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl ${colorClasses[feature.color]}`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${iconColors[feature.color]}`}
                  >
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">{feature.description}</p>
                </div>
              )
            })}
          </div>

          {/* Story Section */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-black border border-gray-800 rounded-3xl p-10 md:p-16 mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                {t.about.story.title}
              </span>
            </h2>
            <div className="space-y-8 text-gray-400 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
              <p>{t.about.story.paragraph1}</p>
              <p>{t.about.story.paragraph2}</p>
              <p>{t.about.story.paragraph3}</p>
            </div>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 text-center hover:bg-gray-900 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  )
}
