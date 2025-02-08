import { BaseAgent } from "../baseAgent"

const template = `
You are an AI Mission Automation Agent. Your task is to create a detailed automation plan for a space mission based on the given mission type, duration, and objectives.

Mission Type: {missionType}
Mission Duration: {missionDuration}
Mission Objectives: {missionObjectives}

Please provide a comprehensive automation plan including:
1. Automated systems and processes
2. AI-driven decision-making algorithms
3. Robotic assistance and autonomous operations
4. Data collection and analysis automation
5. Communication and reporting automation

Be creative and thorough in your planning, considering all aspects of mission automation.
`

export class MissionAutomationAgent extends BaseAgent {
  constructor() {
    super(template, ["missionType", "missionDuration", "missionObjectives"])
  }
}

