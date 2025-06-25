"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import Link from "next/link"

interface NavigationProps {
  isScrolled: boolean
  showNav: boolean
}

export function Navigation({ isScrolled, showNav }: NavigationProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 h-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <nav
        className={cn(
          "transition-all duration-300 rounded-full px-6 py-3",
          isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-black/20 backdrop-blur-sm",
          showNav || isHovered
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform -translate-y-4 pointer-events-none",
        )}
      >
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            className="text-white hover:text-[#FFD700] hover:bg-white/10 rounded-full px-4 py-2 text-sm transition-all duration-200 font-sans font-extrabold"
            onClick={() => {
              window.location.href = "/"
            }}
          >
            🏠︎
          </Button>
          <Link href="/faq">
            <Button
              variant="ghost"
              className="text-white hover:text-[#FFD700] hover:bg-white/10 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200"
            >
              FAQ's
            </Button>
          </Link>
          <Link href="/pricing">
            <Button
              variant="ghost"
              className="text-white hover:text-[#FFD700] hover:bg-white/10 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200"
            >
              Subscribe
            </Button>
          </Link>
          <Link href="/events">
            <Button
              variant="ghost"
              className="text-white hover:text-[#FFD700] hover:bg-white/10 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200"
            >
              Events
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  )
}
