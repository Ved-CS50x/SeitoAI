"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { AuthModal } from "@/components/auth-modal"

export function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")

  const handleAuthClick = (mode: "signin" | "signup") => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  return (
    <>
      <header className="w-full bg-[#F8F9FA] border-b border-gray-200 py-4 px-6 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex-1" />

          <div className="flex-1 flex justify-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent tracking-wide">
              Seito AI
            </h1>
          </div>

          <div className="flex-1 flex justify-end gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAuthClick("signin")}
              className="bg-white/80 border-gray-300 text-[#212529] hover:bg-white hover:shadow-md transition-all duration-200 rounded-full px-4 py-2 text-sm font-light"
            >
              Sign In
            </Button>
            <Button
              size="sm"
              onClick={() => handleAuthClick("signup")}
              className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-[#212529] hover:from-[#B8860B] hover:to-[#FFD700] shadow-md hover:shadow-lg transition-all duration-200 rounded-full px-4 py-2 text-sm font-medium"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  )
}
