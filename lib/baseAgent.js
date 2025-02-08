import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { PromptTemplate } from "langchain/prompts"
import { RunnableSequence } from "langchain/schema/runnable"

export class BaseAgent {
  constructor(template, inputVariables) {
    this.model = new ChatGoogleGenerativeAI({
      modelName: "gemini-pro",
      maxOutputTokens: 2048,
      apiKey: process.env.GOOGLE_API_KEY,
    })

    this.prompt = new PromptTemplate({
      template,
      inputVariables,
    })

    this.chain = RunnableSequence.from([this.prompt, this.model])
  }

  async run(input) {
    return this.chain.invoke(input)
  }
}

