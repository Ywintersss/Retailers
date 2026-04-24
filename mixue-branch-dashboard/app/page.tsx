import { getSalesData } from '@/app/actions'
import { ActionButtons } from './components/actionbutton'
import { SalesTable } from './components/salestable'

export default async function Dashboard() {
  const sales = await getSalesData()

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Mixue Operations
          </h1>
          <p className="text-gray-500 mt-2">Terminal and Sales Management Interface</p>
        </div>
        
        <ActionButtons />
        <SalesTable sales={sales} />
      </div>
    </main>
  )
}