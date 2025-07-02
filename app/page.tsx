"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { WelcomeSection } from "@/components/welcome-section"
import { EventCards } from "@/components/event-cards"
import { ChatInterface } from "@/components/chat-interface"
import { Footer } from "@/components/footer"
import type { TLHEvent } from "@/types/events"
import { TestimonialsSection } from "@/components/testimonials-section"

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<TLHEvent | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showNav, setShowNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      setIsScrolled(currentScrollY > 50)

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false)
      } else {
        setShowNav(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const handleEventSelect = (event: TLHEvent) => {
    setSelectedEvent(event)
  }

  const handleBackToSelection = () => {
    setSelectedEvent(null)
  }

  if (selectedEvent) {
    return <ChatInterface selectedEvent={selectedEvent} onBack={handleBackToSelection} />
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#212529]">
      <Header />
      <Navigation isScrolled={isScrolled} showNav={showNav} />
      <WelcomeSection />
      <EventCards onEventSelect={handleEventSelect} />
      <TestimonialsSection />
      <Footer />
    </div>
  )
}
