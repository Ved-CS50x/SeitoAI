"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    name: "Arjun Sharma",
    role: "Law Student, NLSIU",
    event: "Moot Court",
    content:
      "Seito AI transformed my moot court preparation. The AI mentor provided structured legal arguments and proper citation formats that helped me win the National Moot Court Competition.",
    rating: 5,
    avatar: "AS",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Debate Society President, DU",
    event: "British Parliamentary",
    content:
      "The format-specific guidance for BP debates is incredible. Seito AI helped me understand complex argument structures and improved my extension speeches significantly.",
    rating: 5,
    avatar: "PP",
  },
  {
    id: 3,
    name: "Rahul Krishnan",
    role: "MUN Enthusiast, IIT Delhi",
    event: "Model UN",
    content:
      "From position papers to resolution drafts, Seito AI guided me through every aspect of MUN preparation. I secured Best Delegate at Harvard MUN thanks to this platform.",
    rating: 5,
    avatar: "RK",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    role: "Public Speaking Coach",
    event: "Public Speaking",
    content:
      "As a coach, I recommend Seito AI to all my students. The rhetorical structures and delivery techniques suggested by the AI are spot-on and competition-ready.",
    rating: 5,
    avatar: "SG",
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Policy Research Student, JNU",
    event: "Youth Think Tank",
    content:
      "The policy brief formats and research methodologies provided by Seito AI are exceptional. It's like having a personal policy expert available 24/7.",
    rating: 5,
    avatar: "VS",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-4xl font-bold text-[#212529] mb-4 tracking-tight">What Our Students Say</h3>
        <p className="text-lg text-gray-600 font-light mb-16 max-w-2xl mx-auto">
          Join thousands of students who have transformed their competition preparation with Seito AI
        </p>

        <div className="relative h-80 flex items-center justify-center">
          <Card
            key={currentTestimonial.id}
            className="bg-white border-gray-200 shadow-xl rounded-2xl p-8 max-w-2xl mx-auto transform transition-all duration-700 ease-in-out animate-in fade-in-0 slide-in-from-bottom-4"
          >
            <CardContent className="space-y-6">
              <div className="flex justify-center mb-4">
                <Quote className="h-8 w-8 text-[#FFD700]" />
              </div>

              <p className="text-lg text-gray-700 font-light leading-relaxed italic">"{currentTestimonial.content}"</p>

              <div className="flex justify-center mb-4">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-[#FFD700] fill-current" />
                ))}
              </div>

              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FFD700] to-[#B8860B] rounded-full flex items-center justify-center text-white font-semibold">
                  {currentTestimonial.avatar}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-[#212529]">{currentTestimonial.name}</p>
                  <p className="text-sm text-gray-600 font-light">{currentTestimonial.role}</p>
                  <p className="text-xs text-[#B8860B] font-medium">{currentTestimonial.event}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentIndex ? "bg-[#FFD700] scale-110" : "bg-gray-300 hover:bg-gray-400",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
