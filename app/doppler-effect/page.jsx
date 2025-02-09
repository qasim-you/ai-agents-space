"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Waves, Rocket, Satellite } from "lucide-react"

export default function DopplerSpeedInSpace() {
  const [frequency, setFrequency] = useState(1000)
  const [velocity, setVelocity] = useState(0)
  const [dopplerShift, setDopplerShift] = useState(0)

  const calculateDopplerShift = () => {
    // Simplified Doppler shift calculation (not accounting for relativistic effects)
    const c = 299792458 // Speed of light in m/s
    const shift = frequency * (velocity / c)
    setDopplerShift(shift)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-4 sm:p-6 md:p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6">Doppler Speed in Space</h1>
        <p className="text-lg text-center mb-8 max-w-2xl mx-auto">
          Explore how the Doppler effect works in space and its crucial role in space exploration.
        </p>
      </motion.div>

      <Tabs defaultValue="explanation" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-4 bg-transparent">
          <TabsTrigger value="explanation" className="data-[state=active]:bg-blue-600">
            <Waves className="mr-2" /> Explanation
          </TabsTrigger>
          <TabsTrigger value="applications" className="data-[state=active]:bg-blue-600">
            <Rocket className="mr-2" /> Applications
          </TabsTrigger>
          <TabsTrigger value="calculator" className="data-[state=active]:bg-blue-600">
            <Satellite className="mr-2" /> Calculator
          </TabsTrigger>
        </TabsList>

        <TabsContent value="explanation">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Understanding Doppler Effect in Space</CardTitle>
              <CardDescription>How frequency shifts occur in cosmic phenomena</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Doppler effect in space is a phenomenon where the frequency of electromagnetic waves (like light or
                radio waves) changes based on the relative motion between the source and the observer.
              </p>
              <p>In space, this effect is crucial for:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Measuring the speed of distant celestial objects</li>
                <li>Detecting exoplanets</li>
                <li>Studying the expansion of the universe</li>
              </ul>
              <p>
                When a source moves away from an observer, the waves are stretched, causing a redshift. Conversely, when
                a source moves towards an observer, the waves are compressed, causing a blueshift.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Applications in Space Exploration</CardTitle>
              <CardDescription>How we use the Doppler effect in space missions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-xl font-semibold">1. Measuring Cosmic Velocities</h3>
              <p>
                Astronomers use the Doppler effect to measure the radial velocity of stars, galaxies, and other
                celestial objects. This helps in understanding the structure and dynamics of the universe.
              </p>

              <h3 className="text-xl font-semibold">2. Exoplanet Detection</h3>
              <p>
                The Doppler effect is used to detect exoplanets by observing the slight wobble in a star's motion caused
                by an orbiting planet. This technique has led to the discovery of numerous exoplanets.
              </p>

              <h3 className="text-xl font-semibold">3. Spacecraft Communication</h3>
              <p>
                The Doppler effect is considered in deep space communication to maintain accurate data transmission
                between Earth and spacecraft.
              </p>

              <h3 className="text-xl font-semibold">4. Studying the Expanding Universe</h3>
              <p>
                The redshift observed in distant galaxies, explained by the Doppler effect, provides evidence for the
                expansion of the universe.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Doppler Shift Calculator</CardTitle>
              <CardDescription>Calculate the frequency shift based on relative motion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="frequency">Original Frequency (Hz)</Label>
                  <Input
                    id="frequency"
                    type="number"
                    value={frequency}
                    onChange={(e) => setFrequency(Number(e.target.value))}
                    className="bg-slate-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="velocity">Relative Velocity (m/s, positive if moving away)</Label>
                  <Input
                    id="velocity"
                    type="number"
                    value={velocity}
                    onChange={(e) => setVelocity(Number(e.target.value))}
                    className="bg-slate-700 text-white"
                  />
                </div>
                <Button onClick={calculateDopplerShift} className="w-full">
                  Calculate Doppler Shift
                </Button>
                {dopplerShift !== 0 && (
                  <div className="mt-4 p-4 bg-blue-900 rounded-md">
                    <p className="text-lg font-semibold">Doppler Shift: {dopplerShift.toFixed(2)} Hz</p>
                    <p>
                      {dopplerShift > 0
                        ? "The source is moving away (redshift)"
                        : "The source is moving towards the observer (blueshift)"}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-12 text-center"
      >
        <Button className="bg-blue-600 hover:bg-blue-700">
          Learn More About Space Exploration <ArrowRight className="ml-2" />
        </Button>
      </motion.div>
    </div>
  )
}

