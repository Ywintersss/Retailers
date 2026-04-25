'use server'

import { revalidatePath } from 'next/cache'

const BASE_URL = process.env.VITE_API_BASE_URL_PROD ? `${process.env.VITE_API_BASE_URL_PROD}/api/v1/events` : "https://retailers.webhop.me/api/v1/events"
const STORE_ID = "MIXUE_MAIN"

const CATALOG = [
  { sku: "PEARL_MILK_TEA", price: 6.50 },
  { sku: "STRAWBERRY_MI_SHAKE", price: 7.00 },
  { sku: "MANGO_SUNDAE", price: 5.50 },
  { sku: "FRESH_LEMONADE", price: 4.00 },
  { sku: "BROWN_SUGAR_BOBA", price: 8.00 }
];

export async function testBackendConnection() {
  console.log(`[Server Action] Testing connection to: ${BASE_URL}/ping`);
  try {
    const response = await fetch(`${BASE_URL}/ping`, { cache: 'no-store' })
    console.log(`[Server Action] Ping response status: ${response.status}`);
    
    if (!response.ok) {
      return { success: false, message: `HTTP Error: ${response.status}` }
    }
    
    const data = await response.json()
    console.log(`[Server Action] Ping payload:`, data);
    return { success: true, message: data.message }
    
  } catch (error) {
    console.error("[Server Action] Connection test failed:", error)
    return { success: false, message: "Network or proxy configuration error" }
  }
}

export async function getLatestEvents() {
  console.log(`[Server Action] Fetching latest events from: ${BASE_URL}/stream/latest`);
  try {
    const response = await fetch(`${BASE_URL}/stream/latest`, { cache: 'no-store' })
    console.log(`[Server Action] Event stream response status: ${response.status}`);
    
    if (!response.ok) return []
    const data = await response.json()
    console.log(`[Server Action] Retrieved ${data.length} events.`);
    return data;
  } catch (error) {
    console.error("[Server Action] Failed to fetch event stream:", error)
    return []
  }
}

export async function triggerTransaction(transactionType: string = 'SALE') {
  const randomItem = CATALOG[Math.floor(Math.random() * CATALOG.length)];
  const randomQuantity = Math.floor(Math.random() * 3) + 1;

  const payload = {
    storeId: STORE_ID,
    terminalId: "TERM_01",
    transactionType: transactionType,
    items: [{ sku: randomItem.sku, quantity: randomQuantity, price: randomItem.price }],
    timestamp: new Date().toISOString()
  }

  console.log(`[Server Action] Triggering ${transactionType}. Payload:`, JSON.stringify(payload, null, 2));

  try {
    const response = await fetch(`${BASE_URL}/pos/ingest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    console.log(`[Server Action] Ingest response status: ${response.status}`);
    revalidatePath('/')
  } catch (error) {
    console.error("[Server Action] Transaction trigger failed:", error)
  }
}

export async function getSalesData() {
  console.log(`[Server Action] Fetching sales data for store: ${STORE_ID}`);
  try {
    const response = await fetch(`${BASE_URL}/stores/${STORE_ID}/sales`, { cache: 'no-store' })
    console.log(`[Server Action] Sales data response status: ${response.status}`);
    if (!response.ok) return []
    return response.json()
  } catch (error) {
    console.error("[Server Action] Failed to fetch sales:", error)
    return []
  }
}

export async function checkInventory() {
  console.log(`[Server Action] Checking inventory for store: ${STORE_ID}`);
  try {
    const response = await fetch(`${BASE_URL}/stores/${STORE_ID}/inventory`, { cache: 'no-store' })
    console.log(`[Server Action] Inventory response status: ${response.status}`);
    if (!response.ok) return null
    return response.json()
  } catch (error) {
    console.error("[Server Action] Failed to fetch inventory:", error)
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

  console.log(`[Server Action] Submitting EOD Report. Payload:`, payload);

  try {
    const response = await fetch(`${BASE_URL}/pos/eod`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    console.log(`[Server Action] EOD submission response status: ${response.status}`);
    revalidatePath('/')
  } catch (error) {
    console.error("[Server Action] EOD submission failed:", error)
  }
}