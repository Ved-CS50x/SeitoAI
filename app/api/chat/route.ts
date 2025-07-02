import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  try {
    const { messages, eventType, eventName, eventCategory, outputFormat, mentorPersona } = await req.json()

    // Check user authentication and usage limits
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return new Response("Unauthorized", { status: 401 })
    }

    // Get user data to check limits
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("prompts_used, prompts_limit, subscription_tier")
      .eq("id", user.id)
      .single()

    if (userError) {
      return new Response("User data not found", { status: 404 })
    }

    // Check if user has reached limit (for free tier)
    if (userData.subscription_tier === "free" && userData.prompts_used >= userData.prompts_limit) {
      return new Response("Usage limit reached", { status: 429 })
    }

    const systemPrompt = `You are an expert ${mentorPersona} specializing in ${eventName} competitions. 

Your role is to:
1. Act as a personal academic mentor for students preparing for ${eventName} events
2. Transform user inputs (topics, motions, agendas) into structured, competition-ready content
3. Provide responses in the exact format expected for ${eventName}: ${outputFormat}
4. Maintain the tone and expertise level appropriate for ${eventCategory} events
5. Focus on practical, actionable guidance that helps students excel in competitions

Key guidelines:
- Always structure your responses according to the specific format requirements of ${eventName}
- Provide well-researched, accurate, and context-aware content
- Include relevant examples, precedents, or case studies where appropriate
- Offer strategic advice on presentation, argumentation, or performance
- Maintain academic rigor while being accessible to student competitors

Remember: You are not just providing information - you are formatting and presenting it in the exact style and structure that judges and evaluators expect to see in ${eventName} competitions.`

    const result = streamText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      messages,
      temperature: 0.7,
      maxTokens: 2000,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("Internal server error", { status: 500 })
  }
}
