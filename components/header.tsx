"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { AuthModal } from "@/components/auth-modal"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleAuthClick = (mode: "signin" | "signup") => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
  }

  const getUserInitials = (user: User) => {
    const name = user.user_metadata?.full_name || user.email
    return (
      name
        ?.split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase() || "U"
    )
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
            {loading ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-[#212529] text-xs font-medium">
                        {getUserInitials(user)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => (window.location.href = "/pricing")}>Subscription</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => (window.location.href = "/support")}>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
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
              </>
            )}
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
