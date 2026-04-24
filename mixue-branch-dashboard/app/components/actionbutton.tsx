'use client'

import { useState } from 'react'
import { triggerTransaction } from '@/app/actions'
import { Button } from '@/components/ui/button'

export function ActionButtons() {
  const [loading, setLoading] = useState(false)

  const handleTransaction = async (type: string) => {
    setLoading(true)
    await triggerTransaction(type)
    setLoading(false)
  }

  return (
    <div className="flex gap-4 mb-6">
      <Button 
        onClick={() => handleTransaction('SALE')} 
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        {loading ? 'Processing...' : 'Record Sale'}
      </Button>
      <Button 
        onClick={() => handleTransaction('REFUND')} 
        disabled={loading}
        variant="destructive"
      >
        {loading ? 'Processing...' : 'Record Refund'}
      </Button>
    </div>
  )
}