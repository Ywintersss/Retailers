'use client'

import { useState, useEffect } from 'react'
import { triggerTransaction, submitEodReport, checkInventory, testBackendConnection } from '@/app/actions'
import { Button } from '@/components/ui/button'

export function ActionButtons() {
  const [loading, setLoading] = useState(false)
  const [isSimulating, setIsSimulating] = useState(false)

  // Simulation Loop
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const runSimulationStep = async () => {
      // 85% chance of a Sale, 15% chance of a Refund
      const type = Math.random() > 0.15 ? 'SALE' : 'REFUND';
      
      console.log(`[Simulation] Triggering ${type}`);
      await triggerTransaction(type);

      // Schedule next run between 20s (20000ms) and 40s (40000ms)
      const nextDelay = Math.floor(Math.random() * (40000 - 20000 + 1)) + 20000;
      timeoutId = setTimeout(runSimulationStep, nextDelay);
    };

    if (isSimulating) {
      // Start the first simulated transaction after 1 second
      timeoutId = setTimeout(runSimulationStep, 1000);
    }

    // Cleanup function to clear the timeout if the component unmounts or state changes
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isSimulating]);

  const handleTransaction = async (type: string) => {
    setLoading(true)
    await triggerTransaction(type)
    setLoading(false)
  }

  const handleEod = async () => {
    setLoading(true)
    await submitEodReport()
    alert("End of Day report submitted to corporate.")
    setLoading(false)
  }

  const handleInventory = async () => {
    setLoading(true)
    await checkInventory()
    alert("Inventory sync triggered.")
    setLoading(false)
  }

  const handleTestConnection = async () => {
    setLoading(true)
    const result = await testBackendConnection()
    alert(result.success ? `Success: ${result.message}` : `Failed: ${result.message}`)
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-4 mb-6">
      
      {/* Top Row: Admin & Testing */}
      <div className="flex flex-wrap gap-4 border-b pb-4">
        <Button 
          onClick={handleTestConnection} 
          disabled={loading}
          variant="outline"
          className="border-blue-300 text-blue-700 bg-blue-50 hover:bg-blue-100"
        >
          Test API Connection
        </Button>
        
        <div className="w-px h-10 bg-gray-300 mx-2 hidden sm:block"></div>

        <Button 
          onClick={() => setIsSimulating(!isSimulating)} 
          variant={isSimulating ? "destructive" : "default"}
          className={isSimulating ? "animate-pulse" : "bg-indigo-600 hover:bg-indigo-700 text-white"}
        >
          {isSimulating ? 'Stop Simulation' : 'Start Auto-Simulation'}
        </Button>
        {isSimulating && (
          <span className="text-sm text-gray-500 self-center">
            Transactions firing randomly every 20-40s...
          </span>
        )}
      </div>

      {/* Bottom Row: Manual Actions (Keep your existing buttons here) */}
      <div className="flex flex-wrap gap-4">
        {/* ... Manual Sale, Refund, Sync Inventory, Submit EOD ... */}
      </div>
    </div>
  )
}