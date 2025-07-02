"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { type TLHEvent, eventCategories } from "@/types/events"
import { Scale, Globe, MessageSquare, FileText, Lightbulb, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"

interface EventCardsProps {
  onEventSelect: (event: TLHEvent) => void
}

const categoryIcons = {
  "Legal & Policy Simulation": Scale,
  "Diplomacy & Global Governance": Globe,
  "Speech & Discourse": MessageSquare,
  "Legal & Academic Research": FileText,
  "Skill-Based Competitions": Lightbulb,
}

const accentColors = [
  "from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20",
  "from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
  "from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20",
  "from-purple-100 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20",
  "from-orange-100 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20",
]

export function EventCards({ onEventSelect }: EventCardsProps) {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, index])
            }, index * 150)
          }
        },
        { threshold: 0.2 },
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })
  }, [])

  return (
    <section id="event-cards" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-foreground mb-4 tracking-tight">Choose Your Event Category</h3>
          <p className="text-lg font-light max-w-2xl mx-auto text-slate-600">
            Select from our comprehensive range of competitive academic events and get personalized AI mentoring
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventCategories.map((category, index) => {
            const IconComponent = categoryIcons[category.name as keyof typeof categoryIcons]
            const isVisible = visibleCards.includes(index)
            const isHovered = hoveredCard === category.name

            return (
              <div
                key={category.name}
                ref={(el) => (cardRefs.current[index] = el)}
                className={cn(
                  "transition-all duration-700",
                  isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8",
                )}
                onMouseEnter={() => setHoveredCard(category.name)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Card
                  className={cn(
                    "h-full hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group cursor-pointer shadow-sm border-amber-400 opacity-90 bg-slate-50",
                    isHovered && "transform -translate-y-2",
                  )}
                >
                  <div
                    className={cn(
                      "h-2 bg-gradient-to-r transition-all duration-300",
                      accentColors[index % accentColors.length],
                    )}
                  />

                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={cn(
                          "p-3 rounded-xl bg-gradient-to-br transition-all duration-300",
                          accentColors[index % accentColors.length],
                        )}
                      >
                        <IconComponent className="h-6 w-6 text-[#B8860B]" />
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 text-muted-foreground transition-all duration-300",
                          isHovered && "transform rotate-180 text-[#FFD700]",
                        )}
                      />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground tracking-tight leading-tight">
                      {category.name}
                    </CardTitle>
                    <p className="font-light text-sm leading-relaxed text-black">{category.description}</p>
                  </CardHeader>

                  <CardContent
                    className={cn(
                      "transition-all duration-300 overflow-hidden",
                      isHovered ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                    )}
                  >
                    <div className="space-y-2 pb-4">
                      {category.events.map((event) => (
                        <Button
                          key={event.id}
                          variant="ghost"
                          className={cn(
                            "w-full justify-start text-left hover:bg-accent rounded-xl px-4 py-3 font-medium transition-all duration-200 text-amber-300 bg-slate-50",
                            hoveredEvent === event.id && "transform scale-105",
                          )}
                          onMouseEnter={() => setHoveredEvent(event.id)}
                          onMouseLeave={() => setHoveredEvent(null)}
                          onClick={() => {
                            if (!user) {
                              // Trigger auth modal or redirect to sign in
                              alert("Please sign in to access events")
                              return
                            }
                            onEventSelect(event)
                          }}
                        >
                          {event.name}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
