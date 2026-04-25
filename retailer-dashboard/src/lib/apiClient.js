/**
 * API Client — Communicates with Java Spring Boot backend
 *
 * Standard CRUD endpoints go through /api/v1/*
 * AI Decision endpoints go through /api/v1/ai/* (GLM-powered)
 */

const BASE_URL = import.meta.env.PROD
	? import.meta.env.VITE_API_BASE_URL_PROD
	: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

class ApiClient {
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
	}

	async request(endpoint, options = {}) {
		const url = `${this.baseUrl}${endpoint}`;
		const config = {
			headers: {
				"Content-Type": "application/json",
				...options.headers,
			},
			...options,
		};

		try {
			const response = await fetch(url, config);
			if (!response.ok) {
				throw new Error(`API Error: ${response.status} ${response.statusText}`);
			}
			return await response.json();
		} catch (error) {
			console.warn(
				`[API] Request to ${endpoint} failed, using mock data.`,
				error.message,
			);
			return null;
		}
	}

	// ─── Standard CRUD Endpoints ──────────────────────────────

	getStores() {
		return this.request("/stores");
	}

	getStoreById(id) {
		return this.request(`/stores/${id}`);
	}

	getInventory(storeId) {
		return this.request(`/stores/${storeId}/inventory`);
	}

	getSalesData(storeId, params = {}) {
		const query = new URLSearchParams(params).toString();
		return this.request(`/stores/${storeId}/sales?${query}`);
	}

	getReviews(storeId) {
		return this.request(`/stores/${storeId}/reviews`);
	}

	// ─── AI Decision Endpoints (GLM-Powered) ──────────────────

	getInventoryForecast(storeId, payload) {
		return this.request(`/ai/inventory/forecast/${storeId}`, {
			method: "POST",
			body: JSON.stringify(payload),
		});
	}

	getSentimentAnalysis(storeId) {
		return this.request(`/ai/sentiment/analyze/${storeId}`, {
			method: "POST",
		});
	}

	getDynamicPricing(storeId, payload) {
		return this.request(`/ai/pricing/optimize/${storeId}`, {
			method: "POST",
			body: JSON.stringify(payload),
		});
	}

	getActionableInsights(storeId) {
		return this.request(`/ai/insights/${storeId}`);
	}

	// ─── Kafka Event Trigger ──────────────────────────────────

	triggerPosIngestion(storeId, payload) {
		return this.request(`/events/pos/ingest`, {
			method: "POST",
			body: JSON.stringify({ storeId, ...payload }),
		});
	}
}

export const apiClient = new ApiClient(BASE_URL);
export default apiClient;
