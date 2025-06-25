"use client"

import { useEffect, useRef, useState } from "react"

export function WelcomeSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div
        className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
        }`}
      >
        <h2 className="text-6xl md:text-7xl font-bold text-[#212529] mb-6 tracking-tight leading-tight">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent">Seito AI</span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">
          Your intelligent academic mentor for competitive events. Transform your preparation with AI-powered,
          format-specific guidance tailored to excel in every competition.
        </p>
        <div className="mt-12">
          <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-[#B8860B] mx-auto rounded-full"></div>
        </div>
      </div>
    </section>
  )
}
