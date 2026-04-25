import { ActionButtons } from './components/actionbutton'
import { EventStreamTable } from './components/eventstreamtable'

export default function Dashboard() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Mixue Operations
          </h1>
          <p className="text-gray-500 mt-2">Terminal management and live ingestion feed.</p>
        </div>
        
        <ActionButtons />
        <EventStreamTable />
      </div>
    </main>
  )
}