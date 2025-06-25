"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { eventCategories } from "@/types/events"
import { Scale, Globe, MessageSquare, FileText, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

const categoryIcons = {
  "Legal & Policy Simulation": Scale,
  "Diplomacy & Global Governance": Globe,
  "Speech & Discourse": MessageSquare,
  "Legal & Academic Research": FileText,
  "Skill-Based Competitions": Lightbulb,
}

const accentColors = [
  "from-rose-100 to-pink-100",
  "from-blue-100 to-indigo-100",
  "from-green-100 to-emerald-100",
  "from-purple-100 to-violet-100",
  "from-orange-100 to-amber-100",
]

export default function EventsPage() {
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

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#212529]">
      <Header />
      <Navigation isScrolled={isScrolled} showNav={showNav} />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-[#212529] mb-6 tracking-tight">Event Categories</h1>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
              Explore our comprehensive range of competitive academic events. Each category is designed to provide
              specialized AI mentoring tailored to specific competition formats and requirements.
            </p>
          </div>

          <div className="space-y-16">
            {eventCategories.map((category, categoryIndex) => {
              const IconComponent = categoryIcons[category.name as keyof typeof categoryIcons]

              return (
                <div key={category.name} className="space-y-8">
                  <div className="text-center">
                    <div
                      className={cn(
                        "inline-flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br mb-6",
                        accentColors[categoryIndex % accentColors.length],
                      )}
                    >
                      <IconComponent className="h-8 w-8 text-[#B8860B]" />
                      <h2 className="text-3xl font-bold text-[#212529]">{category.name}</h2>
                    </div>
                    <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">{category.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.events.map((event, eventIndex) => (
                      <Card
                        key={event.id}
                        className="bg-white border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300"
                      >
                        <CardHeader>
                          <CardTitle className="text-xl font-bold text-[#212529] mb-2">{event.name}</CardTitle>
                          <p className="text-gray-600 font-light text-sm leading-relaxed">{event.description}</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-[#212529] mb-2 text-sm">Output Format:</h4>
                            <p className="text-gray-600 font-light text-sm leading-relaxed">{event.outputFormat}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#212529] mb-2 text-sm">AI Mentor:</h4>
                            <p className="text-gray-600 font-light text-sm leading-relaxed">{event.mentorPersona}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-20">
            <h3 className="text-3xl font-bold text-[#212529] mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 font-light mb-8 max-w-2xl mx-auto">
              Choose your event category and start receiving personalized AI mentoring tailored to your specific
              competition needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => (window.location.href = "/")}
                className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-[#212529] hover:from-[#B8860B] hover:to-[#FFD700] rounded-full px-8 py-3 font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Start Free Trial
              </button>
              <button
                onClick={() => (window.location.href = "/pricing")}
                className="border border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#212529] rounded-full px-8 py-3 font-medium transition-all duration-200"
              >
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
