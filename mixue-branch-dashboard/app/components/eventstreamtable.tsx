'use client'

import { useState, useEffect } from 'react'
import { getLatestEvents } from '@/app/actions'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function EventStreamTable() {
  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    // Fetch immediately on mount
    const fetchEvents = async () => {
      const data = await getLatestEvents()
      setEvents(data)
    }
    
    fetchEvents()

    // Poll every 3 seconds
    const interval = setInterval(() => {
      fetchEvents()
    }, 3000)

    // Cleanup interval on unmount
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="shadow-sm mt-6">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800 flex items-center justify-between">
          <span>Live Kafka Event Stream</span>
          <span className="flex items-center gap-2 text-sm font-normal text-green-600">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Live Updates
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Topic</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payload Preview</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                  Waiting for events...
                </TableCell>
              </TableRow>
            ) : (
              events.map((event, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium whitespace-nowrap">{event.eventTimestamp}</TableCell>
                  <TableCell>
                    <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-mono">
                      {event.topic}
                    </span>
                  </TableCell>
                  <TableCell>{event.source || 'POS_TERMINAL'}</TableCell>
                  <TableCell>
                    <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded-full text-xs">
                      {event.status || 'PROCESSED'}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-xs font-mono text-gray-500">
                    {event.payload}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}