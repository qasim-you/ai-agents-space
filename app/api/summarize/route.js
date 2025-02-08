import { NextResponse } from "next/server"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { HumanMessage, SystemMessage } from "@langchain/core/messages"

const model = new ChatGoogleGenerativeAI({
  modelName: "gemini-pro",
  maxOutputTokens: 1024,
  apiKey: process.env.GOOGLE_API_KEY,
})

export async function POST(request) {
  try {
    const { text } = await request.json()

    const systemMessage = new SystemMessage(
      "You are an AI assistant specialized in summarizing space mission data. Provide a concise summary of the given text.",
    )
    const humanMessage = new HumanMessage(`Summarize the following text: ${text}`)

    const response = await model.invoke([systemMessage, humanMessage])
    const summary = response.content.replace(/\*\*/g, "").replace(/\*/g, "")

    return NextResponse.json({ summary })
  } catch (error) {
    console.error(`Error in summarization:`, error)
    return NextResponse.json({ error: "Failed to summarize the data" }, { status: 500 })
  }
}

