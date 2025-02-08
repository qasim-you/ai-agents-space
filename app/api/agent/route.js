import { NextResponse } from "next/server"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { HumanMessage, SystemMessage } from "@langchain/core/messages"

const model = new ChatGoogleGenerativeAI({
  modelName: "gemini-pro",
  maxOutputTokens: 2048,
  apiKey: process.env.GOOGLE_API_KEY,
})

export async function POST(request) {
  try {
    const { agentType, input, resourceType } = await request.json()

    if (!agentType) {
      return NextResponse.json({ error: "Missing agent type" }, { status: 400 })
    }

    let systemPrompt = ""
    let userPrompt = ""

    switch (agentType) {
      case "missionPlanner":
        systemPrompt = "You are an AI assistant specialized in planning space missions."
        userPrompt = `Plan a space mission with the following objective: ${input.missionObjective}. Consider these constraints: ${input.constraints}`
        break
      case "automation":
        systemPrompt = "You are an AI assistant specialized in automating space mission processes."
        userPrompt = `Create an automation plan for a ${input.missionType} mission lasting ${input.missionDuration}. Requirements: ${input.automationRequirements}`
        break
      case "efficiency":
        systemPrompt = "You are an AI assistant specialized in optimizing space mission efficiency."
        userPrompt = `Analyze the following mission processes and suggest efficiency improvements: ${input.currentProcesses}. Target efficiency goals: ${input.efficiencyTargets}`
        break
      case "dataAccess":
        systemPrompt = "You are an AI assistant specialized in accessing and interpreting space mission data."
        userPrompt = `Provide information based on the following space data query: ${input.dataQuery}`
        break
      case "resourceManagement":
        systemPrompt =
          "You are an AI assistant specialized in space mission resource management, focusing on crew and robot resources."
        userPrompt = `Create a resource management plan for a space mission. ${
          resourceType === "crew"
            ? `Crew resources: ${input.crewResources}.`
            : `Robot resources: ${input.robotResources}.`
        } Address these challenges: ${input.resourceChallenges}`
        break
      default:
        return NextResponse.json({ error: "Invalid agent type" }, { status: 400 })
    }

    const systemMessage = new SystemMessage(systemPrompt)
    const humanMessage = new HumanMessage(userPrompt)

    const response = await model.invoke([systemMessage, humanMessage])
    const cleanedResponse = response.content.replace(/\*\*/g, "").replace(/\*/g, "")

    return NextResponse.json({ result: cleanedResponse })
  } catch (error) {
    console.error(`Error in agent processing:`, error)
    return NextResponse.json({ error: "Failed to process the request" }, { status: 500 })
  }
}

