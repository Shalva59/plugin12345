"use client"

import { useLanguage } from "../../../lib/language-context"
import { Globe } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const languages = [
    { code: "ge", label: "ქარ", flag: "🇬🇪" },
    { code: "en", label: "ENG", flag: "🇬🇧" },
    { code: "ru", label: "РУС", flag: "🇷🇺" },
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLanguageChange = (code) => {
    changeLanguage(code)
    setIsOpen(false)
  }

  return (
    <div className="relative w-full md:w-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg glass-card border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 text-white w-full md:w-auto justify-center md:justify-start"
      >
        <Globe size={18} className="text-cyan-400" />
        <span className="text-sm font-medium">{languages.find((l) => l.code === language)?.label}</span>
      </button>

      <div
        className={`absolute top-full left-0 right-0 md:left-0 md:right-auto lg:left-auto lg:right-0 mt-2 glass-card border border-cyan-400/30 rounded-lg overflow-hidden transition-all duration-300 z-50 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`w-full px-4 py-3 text-left hover:bg-cyan-400/10 transition-colors duration-200 flex items-center gap-3 ${
              language === lang.code ? "bg-cyan-400/20 text-cyan-400" : "text-gray-300"
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="text-sm font-medium">{lang.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
