"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Clock, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Conversation {
  id: string
  title: string
  event_name: string
  created_at: string
  updated_at: string
}

interface ChatHistorySidebarProps {
  currentConversationId?: string
  onConversationSelect: (conversationId: string) => void
}

export function ChatHistorySidebar({ currentConversationId, onConversationSelect }: ChatHistorySidebarProps) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchConversations()
  }, [])

  const fetchConversations = async () => {
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data, error } = await supabase
        .from("conversations")
        .select(`
          id,
          title,
          created_at,
          updated_at,
          events (
            name
          )
        `)
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(20)

      if (error) throw error

      const formattedConversations =
        data?.map((conv) => ({
          id: conv.id,
          title: conv.title || "Untitled Conversation",
          event_name: conv.events?.name || "Unknown Event",
          created_at: conv.created_at,
          updated_at: conv.updated_at,
        })) || []

      setConversations(formattedConversations)
    } catch (error) {
      console.error("Error fetching conversations:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    } else if (diffInHours < 168) {
      // 7 days
      return date.toLocaleDateString("en-US", { weekday: "short" })
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    }
  }

  return (
    <div className="w-80 h-full border-l border-gray-200 bg-white flex flex-col">
      <CardHeader className="pb-3 border-b border-gray-100">
        <CardTitle className="text-lg font-semibold text-[#212529] flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-[#B8860B]" />
          Chat History
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full">
          {loading ? (
            <div className="p-4 space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : conversations.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm font-light">No conversations yet</p>
              <p className="text-xs text-gray-400 mt-1">Start chatting to see your history</p>
            </div>
          ) : (
            <div className="p-2">
              {conversations.map((conversation) => (
                <Button
                  key={conversation.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start p-3 h-auto mb-1 rounded-xl transition-all duration-200",
                    currentConversationId === conversation.id
                      ? "bg-gradient-to-r from-[#FFD700]/10 to-[#B8860B]/10 border border-[#FFD700]/20"
                      : "hover:bg-gray-50",
                  )}
                  onClick={() => onConversationSelect(conversation.id)}
                >
                  <div className="flex-1 text-left space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-[#212529] truncate pr-2">{conversation.title}</p>
                      <ChevronRight className="h-3 w-3 text-gray-400 flex-shrink-0" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="truncate">{conversation.event_name}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(conversation.updated_at)}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </div>
  )
}
