"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Star } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Student",
    price: "₹99",
    period: "per month",
    description: "Perfect for individual students preparing for competitions",
    features: [
      "Access to all 15+ event categories",
      "100 AI responses per month",
      "Format-specific guidance",
      "Email support",
      "Conversation history",
    ],
    popular: false,
    cta: "Start Free Trial",
  },
  {
    name: "Pro",
    price: "₹499",
    period: "per month",
    description: "For serious competitors who need unlimited access",
    features: [
      "Everything in Student plan",
      "Unlimited AI responses",
      "Export options",
      "Custom templates",
      "Progress tracking",
      "1-on-1 consultation (monthly)",
    ],
    popular: true,
    cta: "Start Free Trial",
  },
  {
    name: "Team",
    price: "₹1,199",
    period: "per month",
    description: "For educational institutions and debate societies",
    features: [
      "Everything in Pro plan",
      "Up to 10 team members",
      "Collaborative workspaces",
      "Team analytics dashboard",
      "Bulk export features",
      "Admin controls",
      "Dedicated account manager",
      "Custom integrations",
    ],
    popular: false,
    cta: "Contact Sales",
  },
]

export default function PricingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showNav, setShowNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isAnnual, setIsAnnual] = useState(false)

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
            <h1 className="text-5xl font-bold text-[#212529] mb-6 tracking-tight">Subscription & Pricing Plans</h1>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto mb-8">
              Choose the perfect plan for your academic journey. All plans include a 7-day free trial.
            </p>

            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={cn("text-sm font-medium", !isAnnual ? "text-[#212529]" : "text-gray-600")}>Monthly</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAnnual(!isAnnual)}
                className={cn(
                  "relative w-12 h-6 rounded-full p-0 border-2",
                  isAnnual ? "bg-[#FFD700] border-[#FFD700]" : "bg-white border-gray-300",
                )}
              >
                <div
                  className={cn(
                    "absolute w-4 h-4 bg-white rounded-full transition-transform duration-200",
                    isAnnual ? "transform translate-x-6" : "transform translate-x-1",
                  )}
                />
              </Button>
              <span className={cn("text-sm font-medium", isAnnual ? "text-[#212529]" : "text-gray-600")}>
                Annual
                <span className="ml-2 text-xs bg-[#FFD700] text-[#212529] px-2 py-1 rounded-full font-semibold">
                  Save 20%
                </span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card
                key={plan.name}
                className={cn(
                  "relative bg-white border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl",
                  plan.popular && "border-[#FFD700] shadow-lg transform scale-105",
                )}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-[#212529] text-center py-2 text-sm font-semibold">
                    <Star className="inline h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                )}

                <CardHeader className={cn("text-center", plan.popular && "pt-12")}>
                  <CardTitle className="text-2xl font-bold text-[#212529] mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-[#212529]">
                      {isAnnual && plan.name !== "Team"
                        ? `₹${(Number.parseFloat(plan.price.replace("₹", "")) * 0.8 * 12).toFixed(0)}`
                        : plan.price}
                    </span>
                    <span className="text-gray-600 font-light">
                      {isAnnual && plan.name !== "Team" ? " per year" : ` ${plan.period}`}
                    </span>
                  </div>
                  <p className="text-gray-600 font-light text-sm">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600 font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={cn(
                      "w-full rounded-xl py-3 font-medium transition-all duration-200",
                      plan.popular
                        ? "bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-[#212529] hover:from-[#B8860B] hover:to-[#FFD700] shadow-md hover:shadow-lg"
                        : "bg-white border border-gray-300 text-[#212529] hover:bg-gray-50",
                    )}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#212529] mb-4">Need a custom solution?</h3>
            <p className="text-gray-600 font-light mb-6 max-w-2xl mx-auto">
              We offer enterprise solutions for large educational institutions with custom features, integrations, and
              dedicated support.
            </p>
            <Button
              variant="outline"
              className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#212529] rounded-full px-8 py-3 font-medium bg-transparent"
            >
              Contact Enterprise Sales
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
