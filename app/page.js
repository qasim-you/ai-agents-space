import SpaceMissionHub from "./components/SpaceMissionHub"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-2 sm:p-4 md:p-6 bg-gradient-to-b from-slate-900 to-slate-700">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-white text-center">
          AIstronauts: Space Mission Control
        </h1>
        <SpaceMissionHub />
      </div>
    </main>
  )
}

