"use client"

import { AlertTriangle, X } from "lucide-react"
import { Button } from "./button"

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger", // danger, warning, info
  loading = false
}) {
  if (!isOpen) return null

  const getColorClasses = () => {
    switch (type) {
      case "danger":
        return {
          icon: "text-red-500",
          iconBg: "bg-red-500/10",
          border: "border-red-500/20",
          confirmBtn: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500"
        }
      case "warning":
        return {
          icon: "text-yellow-500",
          iconBg: "bg-yellow-500/10",
          border: "border-yellow-500/20",
          confirmBtn: "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400"
        }
      default:
        return {
          icon: "text-cyan-500",
          iconBg: "bg-cyan-500/10",
          border: "border-cyan-500/20",
          confirmBtn: "bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400"
        }
    }
  }

  const colors = getColorClasses()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative bg-gray-900/95 backdrop-blur-md border ${colors.border} rounded-2xl p-6 max-w-md w-full shadow-2xl animate-slide-up`}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          disabled={loading}
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className={`w-12 h-12 ${colors.iconBg} rounded-full flex items-center justify-center mb-4`}>
          <AlertTriangle className={colors.icon} size={24} />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>

        {/* Message */}
        <p className="text-gray-300 mb-6">{message}</p>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 text-white ${colors.confirmBtn}`}
          >
            {loading ? "Processing..." : confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}