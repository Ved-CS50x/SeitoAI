"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageCircle, Phone, Clock, Send } from "lucide-react"

export default function SupportPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showNav, setShowNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#212529]">
      <Header />
      <Navigation isScrolled={isScrolled} showNav={showNav} />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-[#212529] mb-6 tracking-tight">Contact Us & Help Center</h1>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
              Get in touch with our team or find answers to your questions. We're here to help you succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Form */}
            <Card className="bg-white border-gray-200 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#212529] mb-2">Send us a message</CardTitle>
                <p className="text-gray-600 font-light">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#212529] font-medium">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-gray-50 border-gray-300 rounded-xl"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#212529] font-medium">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-gray-50 border-gray-300 rounded-xl"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-[#212529] font-medium">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="bg-gray-50 border-gray-300 rounded-xl"
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[#212529] font-medium">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-gray-50 border-gray-300 rounded-xl min-h-[120px]"
                      placeholder="Tell us more about your question or issue..."
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-[#212529] hover:from-[#B8860B] hover:to-[#FFD700] rounded-xl py-3 font-medium"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="bg-white border-gray-200 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-[#212529] mb-2">Get in touch</CardTitle>
                  <p className="text-gray-600 font-light">
                    Prefer to reach out directly? Here are our contact details.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
                      <Mail className="h-6 w-6 text-[#B8860B]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#212529] mb-1">Email</h3>
                      <p className="text-gray-600 font-light">support@seitoai.com</p>
                      <p className="text-gray-600 font-light text-sm">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
                      <MessageCircle className="h-6 w-6 text-[#B8860B]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#212529] mb-1">Live Chat</h3>
                      <p className="text-gray-600 font-light">Available 9 AM - 6 PM EST</p>
                      <p className="text-gray-600 font-light text-sm">Monday to Friday</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-purple-100 to-violet-100 rounded-xl">
                      <Phone className="h-6 w-6 text-[#B8860B]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#212529] mb-1">Phone</h3>
                      <p className="text-gray-600 font-light">+1 (555) 123-4567</p>
                      <p className="text-gray-600 font-light text-sm">Pro & Team plan subscribers only</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#212529] mb-2">Help Center</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button variant="ghost" className="w-full justify-start text-left hover:bg-gray-50 rounded-xl p-4">
                      <div>
                        <h4 className="font-medium text-[#212529]">Getting Started Guide</h4>
                        <p className="text-sm text-gray-600 font-light">Learn how to use Seito AI effectively</p>
                      </div>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-left hover:bg-gray-50 rounded-xl p-4">
                      <div>
                        <h4 className="font-medium text-[#212529]">Event-Specific Tutorials</h4>
                        <p className="text-sm text-gray-600 font-light">Detailed guides for each competition type</p>
                      </div>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-left hover:bg-gray-50 rounded-xl p-4">
                      <div>
                        <h4 className="font-medium text-[#212529]">Troubleshooting</h4>
                        <p className="text-sm text-gray-600 font-light">Common issues and solutions</p>
                      </div>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-left hover:bg-gray-50 rounded-xl p-4">
                      <div>
                        <h4 className="font-medium text-[#212529]">API Documentation</h4>
                        <p className="text-sm text-gray-600 font-light">For developers and integrations</p>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Response Times */}
          <Card className="bg-white border-gray-200 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#212529] mb-2 text-center">Our Response Times</CardTitle>
              <p className="text-gray-600 font-light text-center">
                We're committed to providing timely support based on your subscription plan.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="p-4 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl mb-4 inline-block">
                    <Clock className="h-8 w-8 text-[#B8860B]" />
                  </div>
                  <h3 className="font-semibold text-[#212529] mb-2">Student Plan</h3>
                  <p className="text-gray-600 font-light">48-72 hours via email</p>
                </div>
                <div className="text-center">
                  <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl mb-4 inline-block">
                    <Clock className="h-8 w-8 text-[#B8860B]" />
                  </div>
                  <h3 className="font-semibold text-[#212529] mb-2">Pro Plan</h3>
                  <p className="text-gray-600 font-light">24 hours priority support</p>
                </div>
                <div className="text-center">
                  <div className="p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl mb-4 inline-block">
                    <Clock className="h-8 w-8 text-[#B8860B]" />
                  </div>
                  <h3 className="font-semibold text-[#212529] mb-2">Team Plan</h3>
                  <p className="text-gray-600 font-light">Same-day dedicated support</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
