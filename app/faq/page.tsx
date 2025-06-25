"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    id: 1,
    question: "What is Seito AI and how does it work?",
    answer:
      "Seito AI is an intelligent academic mentor designed specifically for competitive academic events. It uses advanced AI models to provide format-specific guidance, structured responses, and personalized mentoring for various TLHEvents including moot courts, Model UN, debates, and more.",
  },
  {
    id: 2,
    question: "Which events does Seito AI support?",
    answer:
      "Seito AI supports over 15 different competitive academic events across 5 categories: Legal & Policy Simulation (Moot Courts, Client Counselling, Negotiation), Diplomacy & Global Governance (Model UN, Youth Parliament), Speech & Discourse (British Parliamentary, Public Speaking), Legal & Academic Research (Legal Essays, Case Commentaries), and Skill-Based Competitions (Youth Think Tanks, Changemaker Platforms).",
  },
  {
    id: 3,
    question: "How is Seito AI different from regular AI chatbots?",
    answer:
      "Unlike generic chatbots, Seito AI acts as a specialized mentor for each event type. It understands the specific formats, requirements, and judging criteria for each competition. The AI adapts its persona and output style based on the selected event, providing structured responses that match competition expectations.",
  },
  {
    id: 4,
    question: "Is there a free trial available?",
    answer:
      "Yes! We offer a 7-day free trial that includes access to all event categories and up to 10 AI-generated responses. No credit card required to start your trial.",
  },
  {
    id: 5,
    question: "What subscription plans are available?",
    answer:
      "We offer three plans: Student ($9.99/month) with unlimited access to all events and 100 AI responses per month, Pro ($19.99/month) with unlimited responses and priority support, and Team ($49.99/month) for educational institutions with multi-user access and analytics.",
  },
  {
    id: 6,
    question: "Can I use Seito AI for team preparation?",
    answer:
      "Our Team plan is designed for educational institutions, debate societies, and study groups. It includes collaborative features, shared workspaces, and progress tracking for multiple users.",
  },
  {
    id: 7,
    question: "How accurate and reliable are the AI responses?",
    answer:
      "Seito AI is trained on extensive datasets of successful competition entries, legal documents, and academic resources. While highly accurate, we recommend using the AI as a guide and always verify information with official sources and mentors.",
  },
  {
    id: 8,
    question: "Can I export or save my AI-generated content?",
    answer:
      "Yes, all generated content can be exported as PDF or Word documents. Your conversation history is automatically saved and accessible from your dashboard.",
  },
]

export default function FAQPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showNav, setShowNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

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

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#212529]">
      <Header />
      <Navigation isScrolled={isScrolled} showNav={showNav} />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-[#212529] mb-6 tracking-tight">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
              Everything you need to know about Seito AI and how it can help you excel in competitive academic events.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={faq.id} className="bg-white border-gray-200 rounded-2xl overflow-hidden">
                <CardHeader className="pb-0">
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-left p-6 h-auto hover:bg-transparent"
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <CardTitle className="text-lg font-semibold text-[#212529] pr-4">{faq.question}</CardTitle>
                    {openFAQ === faq.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-600 flex-shrink-0" />
                    )}
                  </Button>
                </CardHeader>
                <CardContent
                  className={cn(
                    "transition-all duration-300 overflow-hidden",
                    openFAQ === faq.id ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0 pb-0",
                  )}
                >
                  <p className="text-gray-600 font-light leading-relaxed px-6">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-[#212529] mb-4">Still have questions?</h3>
            <p className="text-gray-600 font-light mb-6">
              Can't find the answer you're looking for? Please chat with our friendly team.
            </p>
            <Button className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-[#212529] hover:from-[#B8860B] hover:to-[#FFD700] rounded-full px-8 py-3 font-medium">
              Contact Support
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
