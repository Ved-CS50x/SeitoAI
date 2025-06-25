"use client"

import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Send, User, Bot } from "lucide-react"
import type { TLHEvent } from "@/types/events"
import { cn } from "@/lib/utils"

interface ChatInterfaceProps {
  selectedEvent: TLHEvent
  onBack: () => void
}

export function ChatInterface({ selectedEvent, onBack }: ChatInterfaceProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: {
      eventType: selectedEvent.id,
      eventName: selectedEvent.name,
      eventCategory: selectedEvent.category,
      outputFormat: selectedEvent.outputFormat,
      mentorPersona: selectedEvent.mentorPersona,
    },
  })

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FA]">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4 max-w-7xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-gray-600 hover:text-[#212529] hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="font-bold text-[#212529] text-lg">{selectedEvent.name}</h2>
            <p className="text-sm text-gray-600 font-light">{selectedEvent.mentorPersona}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {messages.length === 0 && (
            <Card className="bg-white border-gray-200 shadow-sm rounded-2xl p-8">
              <div className="text-center">
                <div className="h-16 bg-gradient-to-br from-[#FFD700] to-[#B8860B] rounded-2xl flex justify-center mx-auto mb-6 items-center w-16 shadow-lg">
                  <Bot className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#212529] mb-3">Welcome to your {selectedEvent.name} mentor!</h3>
                <p className="text-gray-600 mb-6 leading-relaxed font-normal">
                  I'm here to help you prepare for {selectedEvent.name} competitions. I'll provide structured guidance
                  in the proper format and style.
                </p>
                
              </div>
            </Card>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn("flex gap-4", message.role === "user" ? "justify-end" : "justify-start")}
            >
              <div className={cn("flex gap-4 max-w-[85%]", message.role === "user" ? "flex-row-reverse" : "flex-row")}>
                <div
                  className={cn(
                    "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm",
                    message.role === "user"
                      ? "bg-gradient-to-br from-[#FFD700] to-[#B8860B] text-white"
                      : "bg-white border border-gray-200 text-[#B8860B]",
                  )}
                >
                  {message.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                </div>
                <Card
                  className={cn(
                    "p-6 shadow-sm rounded-2xl",
                    message.role === "user"
                      ? "bg-gradient-to-br from-[#FFD700] to-[#B8860B] text-white border-0"
                      : "bg-white text-[#212529] border-gray-200",
                  )}
                >
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap font-sans font-light leading-relaxed">{message.content}</pre>
                  </div>
                </Card>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-gray-200 text-[#B8860B] flex items-center justify-center shadow-sm">
                  <Bot className="h-5 w-5" />
                </div>
                <Card className="bg-white text-[#212529] border-gray-200 shadow-sm rounded-2xl p-6">
                  <div className="flex items-center gap-2">
                    <div className="animate-pulse font-light">Thinking...</div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex gap-4">
            <Textarea
              value={input}
              onChange={handleInputChange}
              placeholder={`Enter your topic, motion, or agenda for ${selectedEvent.name}...`}
              className="flex-1 bg-gray-50 border-gray-300 text-[#212529] placeholder-gray-500 focus:border-[#FFD700] focus:ring-[#FFD700] resize-none rounded-xl font-light"
              rows={3}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-white hover:from-[#B8860B] hover:to-[#FFD700] disabled:opacity-50 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
