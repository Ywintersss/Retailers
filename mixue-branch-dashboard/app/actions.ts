'use server'

import { revalidatePath } from 'next/cache'

const BASE_URL = "https://retailers.webhop.me/api/v1/events"
const STORE_ID = "MIXUE_MAIN"

// Define a catalog for random transactions
const CATALOG = [
  { sku: "PEARL_MILK_TEA", price: 6.50 },
  { sku: "STRAWBERRY_MI_SHAKE", price: 7.00 },
  { sku: "MANGO_SUNDAE", price: 5.50 },
  { sku: "FRESH_LEMONADE", price: 4.00 },
  { sku: "BROWN_SUGAR_BOBA", price: 8.00 }
];

export async function triggerTransaction(transactionType: string = 'SALE') {
  // Select a random item from the catalog
  const randomItem = CATALOG[Math.floor(Math.random() * CATALOG.length)];
  const randomQuantity = Math.floor(Math.random() * 3) + 1;

  const payload = {
    storeId: STORE_ID,
    terminalId: "TERM_01",
    transactionType: transactionType,
    items: [
      {
        sku: randomItem.sku, // Updated from itemId to sku
        quantity: randomQuantity,
        price: randomItem.price
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

export async function checkInventory() {
    try {
        const response = await fetch(`${BASE_URL}/stores/${STORE_ID}/inventory`, {
            cache: 'no-store'
    })
    if (!response.ok) return null
    return response.json()
  } catch (error) {
    console.error("Failed to fetch inventory:", error)
    return null
  }
}

export async function submitEodReport() {
  const payload = {
    storeId: STORE_ID,
    terminalId: "TERM_01",
    timestamp: new Date().toISOString(),
    status: "CLOSED"
  }

  await fetch(`${BASE_URL}/pos/eod`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  // Revalidate the page to reflect any changes after EOD
  revalidatePath('/')
}