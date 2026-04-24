'use server'

import { revalidatePath } from 'next/cache'

const BASE_URL = "https://retailers.webhop.me/api/v1/events"
const STORE_ID = "MIXUE_MAIN"

export async function getSalesData() {
  try {
    const response = await fetch(`${BASE_URL}/stores/${STORE_ID}/sales`, {
      cache: 'no-store'
    })
    if (!response.ok) return []
    return response.json()
  } catch (error) {
    console.error("Failed to fetch sales:", error)
    return []
  }
}

export async function triggerTransaction(transactionType: string) {
  const payload = {
    storeId: STORE_ID,
    terminalId: "TERM_01",
    transactionType: transactionType,
    items: [
      {
        itemId: "PEARL_MILK_TEA",
        quantity: Math.floor(Math.random() * 5) + 1,
        price: 6.50
      }
    ],
    timestamp: new Date().toISOString()
  }

  await fetch(`${BASE_URL}/pos/ingest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  revalidatePath('/')
}