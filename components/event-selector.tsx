"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { type TLHEvent, eventCategories } from "@/types/events"
import { Scale, Globe, MessageSquare, FileText, Lightbulb } from "lucide-react"

interface EventSelectorProps {
  onEventSelect: (event: TLHEvent) => void
}

const categoryIcons = {
  "Legal & Policy Simulation": Scale,
  "Diplomacy & Global Governance": Globe,
  "Speech & Discourse": MessageSquare,
  "Legal & Academic Research": FileText,
  "Skill-Based Competitions": Lightbulb,
}

export function EventSelector({ onEventSelect }: EventSelectorProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
          TLHEvents AI Mentor
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Your personal academic mentor for competitive events. Select your event category to get started with
          AI-powered, format-specific guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventCategories.map((category) => {
          const IconComponent = categoryIcons[category.name as keyof typeof categoryIcons]

          return (
            <Card key={category.name} className="bg-[#1A1A1A] border-[#333] hover:border-[#FFD700] transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <IconComponent className="h-6 w-6 text-[#FFD700]" />
                  <CardTitle className="text-white text-lg">{category.name}</CardTitle>
                </div>
                <CardDescription className="text-gray-400">{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {category.events.map((event) => (
                    <Button
                      key={event.id}
                      variant="outline"
                      className="w-full justify-start text-left bg-[#0F0F0F] border-[#444] text-white hover:bg-[#FFD700] hover:text-[#0F0F0F] hover:border-[#FFD700]"
                      onClick={() => onEventSelect(event)}
                    >
                      {event.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
