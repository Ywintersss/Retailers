'use client'

import { useState, useEffect, useRef } from 'react'
import { triggerTransaction, submitEodReport, checkInventory, testBackendConnection } from '@/app/actions'
import { Button } from '@/components/ui/button'

// Define the structure for our log entries
type LogEntry = {
  id: string
  time: string
  message: string
  type: 'info' | 'success' | 'error' | 'sim'
}

export function ActionButtons() {
  const [loading, setLoading] = useState(false)
  const [isSimulating, setIsSimulating] = useState(false)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const logsEndRef = useRef<HTMLDivElement>(null)

  // Helper to append logs (keeps the last 50 entries)
  const addLog = (message: string, type: LogEntry['type'] = 'info') => {
    setLogs((prev) => {
      const newLog: LogEntry = {
        id: Math.random().toString(36).substring(7),
        time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' }),
        message,
        type
      }
      return [newLog, ...prev].slice(0, 50)
    })
  }

  // Auto-scroll logs to bottom (since we are prepending, the top is the newest)
  // Actually, standard terminals append to bottom. Let's append to top for easier reading without scrolling,
  // so no auto-scroll is strictly necessary if newest is at the top.

  // Simulation Loop
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const runSimulationStep = async () => {
      const type = Math.random() > 0.15 ? 'SALE' : 'REFUND'
      
      addLog(`Auto-Simulating ${type} transaction...`, 'sim')
      await triggerTransaction(type)

      const nextDelay = Math.floor(Math.random() * (40000 - 20000 + 1)) + 20000
      timeoutId = setTimeout(runSimulationStep, nextDelay)
    }

    if (isSimulating) {
      addLog('Auto-Simulation started. Firing every 20-40s.', 'success')
      timeoutId = setTimeout(runSimulationStep, 1000)
    } else if (logs.length > 0) {
      // Only log stopped if we actually have logs (prevents logging on initial mount)
      addLog('Auto-Simulation stopped.', 'info')
    }

    return () => clearTimeout(timeoutId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSimulating])

  // Handlers
  const handleTestConnection = async () => {
    setLoading(true)
    addLog('Pinging backend API...', 'info')
    const result = await testBackendConnection()
    
    if (result.success) {
      addLog(`Ping Success: ${result.message}`, 'success')
    } else {
      addLog(`Ping Failed: ${result.message}`, 'error')
    }
    setLoading(false)
  }

  const handleTransaction = async (type: string) => {
    setLoading(true)
    addLog(`Dispatching manual ${type} event...`, 'info')
    await triggerTransaction(type)
    addLog(`Manual ${type} dispatched to backend.`, 'success')
    setLoading(false)
  }

  const handleEod = async () => {
    setLoading(true)
    addLog('Submitting End of Day report...', 'info')
    await submitEodReport()
    addLog('EOD report successfully submitted.', 'success')
    setLoading(false)
  }

  const handleInventory = async () => {
    setLoading(true)
    addLog('Requesting inventory sync...', 'info')
    await checkInventory()
    addLog('Inventory sync request dispatched.', 'success')
    setLoading(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      
      {/* Controls Section - Takes up 2/3 width on large screens */}
      <div className="lg:col-span-2 flex flex-col gap-4">
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
        </div>

        {/* Bottom Row: Manual Actions */}
        <div className="flex flex-wrap gap-4">
          <Button 
            onClick={() => handleTransaction('SALE')} 
            disabled={loading || isSimulating}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Manual Sale
          </Button>
          <Button 
            onClick={() => handleTransaction('REFUND')} 
            disabled={loading || isSimulating}
            variant="outline"
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            Manual Refund
          </Button>

          <div className="w-px h-10 bg-gray-300 mx-2 hidden sm:block"></div>
          
          <Button 
            onClick={handleInventory} 
            disabled={loading}
            variant="outline"
          >
            Sync Inventory
          </Button>
          <Button 
            onClick={handleEod} 
            disabled={loading}
            className="bg-slate-800 hover:bg-slate-900 text-white"
          >
            Submit EOD Report
          </Button>
        </div>
      </div>

      {/* Terminal / Log Output - Takes up 1/3 width */}
      <div className="bg-slate-950 rounded-lg p-4 h-64 flex flex-col shadow-inner font-mono text-sm">
        <div className="flex justify-between items-center mb-2 border-b border-slate-800 pb-2">
          <span className="text-slate-400 text-xs font-bold tracking-wider uppercase">Activity Console</span>
          <button 
            onClick={() => setLogs([])}
            className="text-slate-500 hover:text-slate-300 text-xs"
          >
            Clear
          </button>
        </div>
        
        <div className="overflow-y-auto flex-1 space-y-1 pr-2 custom-scrollbar">
          {logs.length === 0 ? (
            <div className="text-slate-600 italic text-xs mt-2">Ready. Awaiting actions...</div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="flex gap-2 text-xs">
                <span className="text-slate-500 shrink-0">[{log.time}]</span>
                <span className={`
                  ${log.type === 'success' ? 'text-green-400' : ''}
                  ${log.type === 'error' ? 'text-red-400' : ''}
                  ${log.type === 'sim' ? 'text-purple-400' : ''}
                  ${log.type === 'info' ? 'text-blue-300' : ''}
                `}>
                  {log.message}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}