"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "../../../lib/language-context"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import {
  Check,
  CreditCard,
  Building2,
  Banknote,
  ArrowRight,
  ArrowLeft,
  X,
  Package,
  Database,
  Palette,
} from "lucide-react"
import Link from "next/link"

const softwareProducts = {
  adobe: [
    { id: "photoshop", nameGe: "Photoshop", nameEn: "Photoshop", nameRu: "Photoshop", price: 299 },
    { id: "illustrator", nameGe: "Illustrator", nameEn: "Illustrator", nameRu: "Illustrator", price: 299 },
    { id: "premiere", nameGe: "Premiere Pro", nameEn: "Premiere Pro", nameRu: "Premiere Pro", price: 399 },
    { id: "aftereffects", nameGe: "After Effects", nameEn: "After Effects", nameRu: "After Effects", price: 399 },
    { id: "indesign", nameGe: "InDesign", nameEn: "InDesign", nameRu: "InDesign", price: 299 },
    { id: "acrobat", nameGe: "Acrobat Pro", nameEn: "Acrobat Pro", nameRu: "Acrobat Pro", price: 199 },
  ],
  archicad: [
    { id: "archicad26", nameGe: "ArchiCAD 26", nameEn: "ArchiCAD 26", nameRu: "ArchiCAD 26", price: 499 },
    { id: "archicad27", nameGe: "ArchiCAD 27", nameEn: "ArchiCAD 27", nameRu: "ArchiCAD 27", price: 549 },
    { id: "archicad28", nameGe: "ArchiCAD 28", nameEn: "ArchiCAD 28", nameRu: "ArchiCAD 28", price: 599 },
  ],
  autodesk: [
    { id: "autocad", nameGe: "AutoCAD", nameEn: "AutoCAD", nameRu: "AutoCAD", price: 399 },
    { id: "revit", nameGe: "Revit", nameEn: "Revit", nameRu: "Revit", price: 449 },
    { id: "3dsmax", nameGe: "3ds Max", nameEn: "3ds Max", nameRu: "3ds Max", price: 399 },
    { id: "maya", nameGe: "Maya", nameEn: "Maya", nameRu: "Maya", price: 399 },
    { id: "inventor", nameGe: "Inventor", nameEn: "Inventor", nameRu: "Inventor", price: 399 },
    { id: "civil3d", nameGe: "Civil 3D", nameEn: "Civil 3D", nameRu: "Civil 3D", price: 449 },
  ],
  windows: [
    { id: "win10pro", nameGe: "Windows 10 Pro", nameEn: "Windows 10 Pro", nameRu: "Windows 10 Pro", price: 199 },
    { id: "win11pro", nameGe: "Windows 11 Pro", nameEn: "Windows 11 Pro", nameRu: "Windows 11 Pro", price: 219 },
  ],
  office: [
    { id: "office2019", nameGe: "Office 2019", nameEn: "Office 2019", nameRu: "Office 2019", price: 179 },
    { id: "office2021", nameGe: "Office 2021", nameEn: "Office 2021", nameRu: "Office 2021", price: 199 },
    { id: "office2024", nameGe: "Office 2024", nameEn: "Office 2024", nameRu: "Office 2024", price: 219 },
    { id: "office365", nameGe: "Office 365", nameEn: "Office 365", nameRu: "Office 365", price: 99 },
  ],
}

const webBuildingServices = [
  {
    id: "adminPanel",
    nameGe: "1 გვერდი ადმინ პანელი",
    nameEn: "1 Page Admin Panel",
    nameRu: "1 страница админ-панель",
    price: 1000,
    icon: Building2,
  },
  { id: "database", nameGe: "მონაცემთა ბაზა", nameEn: "Database", nameRu: "База данных", price: 800, icon: Database },
  { id: "uiux", nameGe: "UI/UX დიზაინი", nameEn: "UI/UX Design", nameRu: "UI/UX дизайн", price: 600, icon: Palette },
]

export default function CheckoutPage() {
  const { t, language } = useLanguage()
  const [step, setStep] = useState(1)
  const [serviceType, setServiceType] = useState(null) // added service type selection
  const [selectedSoftware, setSelectedSoftware] = useState([])
  const [selectedWebServices, setSelectedWebServices] = useState([]) // added web services selection
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [orderComplete, setOrderComplete] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState("adobe")

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const toggleSoftware = (product) => {
    setSelectedSoftware((prev) => {
      const exists = prev.find((p) => p.id === product.id)
      if (exists) {
        return prev.filter((p) => p.id !== product.id)
      } else {
        return [...prev, product]
      }
    })
  }

  const toggleWebService = (service) => {
    setSelectedWebServices((prev) => {
      const exists = prev.find((s) => s.id === service.id)
      if (exists) {
        return prev.filter((s) => s.id !== service.id)
      } else {
        return [...prev, service]
      }
    })
  }

  const handleNext = () => {
    if (step === 1) {
      if (serviceType === "software" && selectedSoftware.length === 0) return
      if (serviceType === "webBuilding" && selectedWebServices.length === 0) return
    }
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) {
      if (step === 2) setServiceType(null)
      setStep(step - 1)
    }
  }

  const handleComplete = () => {
    setOrderComplete(true)
  }

  const getProductName = (product) => {
    if (language === "ge") return product.nameGe
    if (language === "ru") return product.nameRu
    return product.nameEn
  }

  const subtotal =
    selectedSoftware.reduce((sum, p) => sum + p.price, 0) + selectedWebServices.reduce((sum, s) => sum + s.price, 0)
  const tax = subtotal * 0.18
  const total = subtotal + tax

  if (!mounted) return null

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-black to-slate-900 overflow-x-clip w-full max-w-full py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <div className="mb-12 rounded-2xl p-12 bg-slate-900/50 border border-slate-700 backdrop-blur-xl">
            <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500">
              <Check className="h-10 w-10 text-white" strokeWidth={3} />
            </div>
            <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">{t.checkout.success.title}</h1>
            <p className="text-slate-400 text-lg">{t.checkout.success.description}</p>
          </div>

          <div className="mb-12 rounded-xl p-6 bg-slate-900/30 border border-slate-700">
            <p className="text-sm text-slate-300 mb-1">{t.checkout.success.orderNumber}</p>
            <p className="text-xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">
              {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
          </div>

          <Link href="/">
            <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold rounded-xl px-8 py-4 transition-all duration-300">
              {t.checkout.success.backToHome}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white overflow-x-clip w-full max-w-full py-12">
      {/* Background gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 via-emerald-500/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-3 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400">
              {t.checkout.title || "Secure Checkout"}
            </span>
          </h1>
          <p className="text-slate-400 text-lg">{t.checkout.selectService?.description || "Complete your order"}</p>

          {/* Progress bar */}
          <div className="flex items-center justify-center gap-3 mt-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-sm transition-all duration-300 ${
                    step >= s
                      ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/50"
                      : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`h-1 w-16 transition-all duration-300 ${
                      step > s ? "bg-gradient-to-r from-emerald-500 to-green-500" : "bg-slate-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-700 p-8 sm:p-10 bg-slate-900/50 backdrop-blur-xl shadow-2xl">
              {step === 1 && !serviceType && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-white mb-2">{t.checkout.selectService.title}</h2>
                  <p className="text-slate-400 mb-8">{t.checkout.selectService.description}</p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <button
                      onClick={() => setServiceType("software")}
                      className="rounded-xl border-2 border-slate-700 hover:border-emerald-500 p-6 bg-slate-900/50 hover:bg-slate-800 transition-all text-left group"
                    >
                      <Package className="h-8 w-8 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
                      <h3 className="text-xl font-bold text-white mb-2">{t.checkout.services.software}</h3>
                      <p className="text-slate-400 text-sm">Professional software & licenses</p>
                    </button>

                    <button
                      onClick={() => setServiceType("webBuilding")}
                      className="rounded-xl border-2 border-slate-700 hover:border-green-500 p-6 bg-slate-900/50 hover:bg-slate-800 transition-all text-left group"
                    >
                      <Building2 className="h-8 w-8 text-green-400 mb-3 group-hover:scale-110 transition-transform" />
                      <h3 className="text-xl font-bold text-white mb-2">{t.checkout.services.webBuilding}</h3>
                      <p className="text-slate-400 text-sm">Custom web development services</p>
                    </button>
                  </div>
                </div>
              )}

              {step === 1 && serviceType === "software" && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-white mb-2">{t.checkout.selectService.title}</h2>
                  <p className="text-slate-400 mb-6">Choose the packages you need</p>

                  <div className="space-y-4">
                    {Object.entries(softwareProducts).map(([category, products]) => (
                      <div
                        key={category}
                        className="border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-colors"
                      >
                        <button
                          onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                          className="w-full bg-slate-900/50 hover:bg-slate-800 p-4 text-left flex items-center justify-between transition-all"
                        >
                          <span className="font-semibold text-white capitalize">{category.toUpperCase()}</span>
                          <span className="text-slate-400">{expandedCategory === category ? "−" : "+"}</span>
                        </button>

                        {expandedCategory === category && (
                          <div className="bg-slate-950/50 p-4 space-y-3 border-t border-slate-700">
                            {products.map((product) => (
                              <button
                                key={product.id}
                                onClick={() => toggleSoftware(product)}
                                className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center justify-between ${
                                  selectedSoftware.find((p) => p.id === product.id)
                                    ? "border-emerald-500 bg-emerald-500/10"
                                    : "border-slate-700 hover:border-slate-600 bg-slate-900/50"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${
                                      selectedSoftware.find((p) => p.id === product.id)
                                        ? "border-emerald-500 bg-emerald-500"
                                        : "border-slate-600"
                                    }`}
                                  >
                                    {selectedSoftware.find((p) => p.id === product.id) && (
                                      <Check className="h-3 w-3 text-white" />
                                    )}
                                  </div>
                                  <span className="text-white font-medium">{getProductName(product)}</span>
                                </div>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400 font-bold">
                                  ₾{product.price}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && serviceType === "webBuilding" && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-white mb-2">{t.checkout.services.webBuilding}</h2>
                  <p className="text-slate-400 mb-6">Select the services you need for your project</p>

                  <div className="space-y-4">
                    {webBuildingServices.map((service) => {
                      const Icon = service.icon
                      return (
                        <button
                          key={service.id}
                          onClick={() => toggleWebService(service)}
                          className={`w-full p-6 rounded-lg border-2 transition-all text-left flex items-start justify-between ${
                            selectedWebServices.find((s) => s.id === service.id)
                              ? "border-emerald-500 bg-emerald-500/10"
                              : "border-slate-700 hover:border-slate-600 bg-slate-900/50"
                          }`}
                        >
                          <div className="flex items-start gap-4 flex-1">
                            <div
                              className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all flex-shrink-0 mt-1 ${
                                selectedWebServices.find((s) => s.id === service.id)
                                  ? "border-emerald-500 bg-emerald-500"
                                  : "border-slate-600"
                              }`}
                            >
                              {selectedWebServices.find((s) => s.id === service.id) && (
                                <Check className="h-3 w-3 text-white" />
                              )}
                            </div>
                            <div>
                              <Icon className="h-6 w-6 text-emerald-400 mb-2" />
                              <p className="text-white font-medium">{getProductName(service)}</p>
                            </div>
                          </div>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400 font-bold flex-shrink-0 ml-4">
                            ₾{service.price}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-white mb-2">{t.checkout.contactInfo.title}</h2>
                  <p className="text-slate-400 mb-6">{t.checkout.contactInfo.description}</p>

                  <div className="space-y-5">
                    <Input
                      name="fullName"
                      placeholder={t.checkout.contactInfo.fullNamePlaceholder}
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-lg py-3"
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        name="email"
                        type="email"
                        placeholder={t.checkout.contactInfo.emailPlaceholder}
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-lg py-3"
                      />
                      <Input
                        name="phone"
                        placeholder={t.checkout.contactInfo.phonePlaceholder}
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-lg py-3"
                      />
                    </div>

                    <Input
                      name="company"
                      placeholder={t.checkout.contactInfo.companyPlaceholder}
                      value={formData.company}
                      onChange={handleInputChange}
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-lg py-3"
                    />

                    <Textarea
                      name="message"
                      placeholder={t.checkout.contactInfo.messagePlaceholder}
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-lg py-3"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-white mb-2">{t.checkout.payment.title}</h2>
                  <p className="text-slate-400 mb-6">{t.checkout.payment.description}</p>

                  <div className="grid gap-4 sm:grid-cols-3 mb-8">
                    {[
                      { id: "card", label: t.checkout.payment.card, icon: CreditCard },
                      { id: "bank", label: t.checkout.payment.bank, icon: Building2 },
                      { id: "cash", label: t.checkout.payment.cash, icon: Banknote },
                    ].map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => setPaymentMethod(id)}
                        className={`rounded-lg border-2 p-4 transition-all ${
                          paymentMethod === id
                            ? "border-emerald-500 bg-emerald-500/10 text-white"
                            : "border-slate-700 hover:border-slate-600 text-slate-400 hover:text-white"
                        }`}
                      >
                        <Icon className="mx-auto mb-2 h-6 w-6" />
                        <p className="text-sm font-medium">{label}</p>
                      </button>
                    ))}
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-5 border border-slate-700 p-6 rounded-xl bg-slate-950/50">
                      <Input
                        name="cardNumber"
                        placeholder={t.checkout.payment.cardNumberPlaceholder}
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-lg py-3"
                      />

                      <div className="grid gap-4 sm:grid-cols-3">
                        <Input
                          name="expiryDate"
                          placeholder={t.checkout.payment.expiryDatePlaceholder}
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-lg py-3"
                        />
                        <Input
                          name="cvv"
                          placeholder={t.checkout.payment.cvvPlaceholder}
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-lg py-3"
                        />
                        <Input
                          name="cardholderName"
                          placeholder={t.checkout.payment.cardholderNamePlaceholder}
                          value={formData.cardholderName}
                          onChange={handleInputChange}
                          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-lg py-3"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="mt-12 flex items-center justify-between pt-8 border-t border-slate-700">
                {step > 1 && (
                  <Button
                    onClick={handleBack}
                    className="border-2 border-slate-600 bg-transparent text-white hover:bg-slate-800 rounded-lg px-6 py-3"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t.checkout.buttons.back}
                  </Button>
                )}
                {step === 1 && !serviceType && <div />}
                {step < 3 ? (
                  <Button
                    onClick={handleNext}
                    disabled={
                      (step === 1 && serviceType === "software" && selectedSoftware.length === 0) ||
                      (step === 1 && serviceType === "webBuilding" && selectedWebServices.length === 0)
                    }
                    className="ml-auto bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-lg px-6 py-3 disabled:opacity-50 transition-all"
                  >
                    {t.checkout.buttons.next}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleComplete}
                    className="ml-auto bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-lg px-6 py-3 shadow-lg shadow-emerald-500/50 transition-all"
                  >
                    {t.checkout.buttons.complete}
                    <Check className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-2xl border border-slate-700 p-8 bg-slate-900/50 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-2 mb-8">
                <Package className="h-6 w-6 text-emerald-500" />
                <h3 className="text-2xl font-bold text-white">{t.checkout.orderSummary.title}</h3>
              </div>

              {selectedSoftware.length > 0 || selectedWebServices.length > 0 ? (
                <div className="space-y-6">
                  <div className="space-y-3 max-h-72 overflow-y-auto">
                    {selectedSoftware.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700 text-sm"
                      >
                        <span className="text-slate-300">{getProductName(product)}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400 font-bold">
                            ₾{product.price}
                          </span>
                          <button
                            onClick={() => toggleSoftware(product)}
                            className="text-slate-500 hover:text-red-400 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {selectedWebServices.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700 text-sm"
                      >
                        <span className="text-slate-300">{getProductName(service)}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400 font-bold">
                            ₾{service.price}
                          </span>
                          <button
                            onClick={() => toggleWebService(service)}
                            className="text-slate-500 hover:text-red-400 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 border-t border-slate-700 pt-6 text-sm">
                    <div className="flex justify-between text-slate-400">
                      <span>{t.checkout.orderSummary.subtotal}</span>
                      <span>₾{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>{t.checkout.orderSummary.tax}</span>
                      <span>₾{tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between border-t border-slate-700 pt-6 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">
                    <span>{t.checkout.orderSummary.total}</span>
                    <span>₾{total.toFixed(2)}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-500 text-sm">No items selected</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
