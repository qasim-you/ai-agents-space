"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Loader2, User, Zap, Gauge, Database, SpaceIcon as Planet } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"

export default function SpaceMissionHub() {
  const [agentType, setAgentType] = useState("missionPlanner")
  const [input, setInput] = useState({})
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSummarizeModalOpen, setIsSummarizeModalOpen] = useState(false)
  const [summarizedData, setSummarizedData] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentType, input }),
      })
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setResult(data.result)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderInputFields = () => {
    switch (agentType) {
      case "missionPlanner":
        return (
          <>
            <Input
              placeholder="Enter mission objective"
              value={input.missionObjective || ""}
              onChange={(e) => setInput({ ...input, missionObjective: e.target.value })}
              className="w-full mb-4"
            />
            <Textarea
              placeholder="Enter mission constraints"
              value={input.constraints || ""}
              onChange={(e) => setInput({ ...input, constraints: e.target.value })}
              className="w-full h-32"
            />
          </>
        )
      case "automation":
        return (
          <>
            <Input
              placeholder="Enter mission type"
              value={input.missionType || ""}
              onChange={(e) => setInput({ ...input, missionType: e.target.value })}
              className="w-full mb-4"
            />
            <Input
              placeholder="Enter mission duration"
              value={input.missionDuration || ""}
              onChange={(e) => setInput({ ...input, missionDuration: e.target.value })}
              className="w-full mb-4"
            />
            <Textarea
              placeholder="Enter automation requirements"
              value={input.automationRequirements || ""}
              onChange={(e) => setInput({ ...input, automationRequirements: e.target.value })}
              className="w-full h-32"
            />
          </>
        )
      case "efficiency":
        return (
          <>
            <Textarea
              placeholder="Enter current mission processes"
              value={input.currentProcesses || ""}
              onChange={(e) => setInput({ ...input, currentProcesses: e.target.value })}
              className="w-full mb-4 h-32"
            />
            <Input
              placeholder="Enter efficiency targets"
              value={input.efficiencyTargets || ""}
              onChange={(e) => setInput({ ...input, efficiencyTargets: e.target.value })}
              className="w-full"
            />
          </>
        )
      case "dataAccess":
        return (
          <Textarea
            placeholder="Enter your space data query"
            value={input.dataQuery || ""}
            onChange={(e) => setInput({ ...input, dataQuery: e.target.value })}
            className="w-full h-32"
          />
        )
      case "resourceManagement":
        return (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Crew Resources</h3>
              <Input
                placeholder="Enter crew resources (e.g., oxygen, food, water)"
                value={input.crewResources || ""}
                onChange={(e) => setInput({ ...input, crewResources: e.target.value })}
                className="w-full mb-2"
              />
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Robot Resources</h3>
              <Input
                placeholder="Enter robot resources (e.g., battery, spare parts)"
                value={input.robotResources || ""}
                onChange={(e) => setInput({ ...input, robotResources: e.target.value })}
                className="w-full mb-2"
              />
            </div>
            <Textarea
              placeholder="Enter resource allocation challenges"
              value={input.resourceChallenges || ""}
              onChange={(e) => setInput({ ...input, resourceChallenges: e.target.value })}
              className="w-full h-32"
            />
          </>
        )
      default:
        return null
    }
  }

  const handleSummarize = async () => {
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: result }),
      })
      const data = await response.json()
      setSummarizedData(data.summary)
      setIsSummarizeModalOpen(true)
    } catch (error) {
      console.error("Error summarizing data:", error)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([summarizedData], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "summarized_data.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="w-full">
      <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl">
        <CardHeader className="p-6">
        <div className="flex justify-between items-center p-4">
        <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2">

Space Agent
</CardTitle>
<Link href="/doppler-effect">
<Button className="w-30" variant="outline">Dopler Effect</Button>
</Link>
</div>
          

          <CardDescription className="text-indigo-200 text-center text-sm sm:text-base">
            Comprehensive AI-powered assistance for all aspects of space missions.
          </CardDescription>

        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={agentType} onValueChange={setAgentType} className="w-full">
            <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-2 mb-6 bg-transparent">
              {[
                { value: "missionPlanner", icon: User, label: "Mission Planner" },
                { value: "automation", icon: Zap, label: "Automation" },
                { value: "efficiency", icon: Gauge, label: "Efficiency" },
                { value: "dataAccess", icon: Database, label: "Data Access" },
                { value: "resourceManagement", icon: Planet, label: "Resource Management" },
              ].map(({ value, icon: Icon, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="flex items-center justify-center px-3 py-2 bg-white/5 hover:bg-white/10 text-sm rounded-full transition-colors duration-200"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {renderInputFields()}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-200"
                >
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Brain className="mr-2 h-4 w-4" />}
                  {isLoading
                    ? "Processing..."
                    : `Generate ${
                        agentType.charAt(0).toUpperCase() +
                        agentType
                          .slice(1)
                          .replace(/([A-Z])/g, " $1")
                          .trim()
                      } Plan`}
                </Button>
              </form>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {result && (
        <Card className="mt-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl">
          <CardHeader className="p-6">
            <CardTitle className="text-xl sm:text-2xl font-bold flex items-center">
              <Brain className="mr-2 h-6 w-6" />
              Response
              <Badge variant="secondary" className="ml-2 bg-indigo-600 text-white text-xs rounded-full">
                Output
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="whitespace-pre-wrap text-sm sm:text-base">{result}</p>
            <Button
              onClick={handleSummarize}
              className="mt-6 bg-transparent hover:bg-indigo-700 text-indigo-300 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded-full transition-colors duration-200"
            >
              Download Summarized Data
            </Button>
          </CardContent>
        </Card>
      )}

      <Dialog open={isSummarizeModalOpen} onOpenChange={setIsSummarizeModalOpen}>
        <DialogContent className="sm:max-w-[600px] w-11/12 mx-auto rounded-2xl bg-white text-gray-900">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Summarized Data</DialogTitle>
          </DialogHeader>
          <Card className="mt-4 bg-gray-100 shadow-sm rounded-xl">
            <CardContent className="p-4">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{summarizedData}</p>
            </CardContent>
          </Card>
          <div className="mt-6 flex justify-end space-x-2">
            <Button
              onClick={() => setIsSummarizeModalOpen(false)}
              variant="outline"
              className="rounded-full bg-white text-indigo-600 border-indigo-600 hover:bg-indigo-50"
            >
              Cancel
            </Button>
            <Button onClick={handleDownload} className="rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
              Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

