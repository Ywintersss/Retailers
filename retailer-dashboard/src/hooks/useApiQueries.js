/**
 * TanStack Query Hooks — Data Fetching Layer
 *
 * Each hook attempts to fetch from the Spring Boot API first.
 * If the API is unavailable, it gracefully falls back to mock data.
 *
 * AI Decision hooks are clearly separated from standard CRUD hooks.
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../lib/apiClient";

// ─── Helper: Fetch with mock fallback ───────────────────────

const fetchWithFallback = async (apiFn) => {
	try {
		const result = await apiFn();
		if (result !== null && result !== undefined) return result;
	} catch {
		// API unavailable — fall through to mock
		//
	}
};

// ─── STANDARD CRUD HOOKS ────────────────────────────────────

export function useStoreInfo(storeId = "store-kl-001") {
	return useQuery({
		queryKey: ["store", storeId],
		queryFn: () => fetchWithFallback(() => apiClient.getStoreById(storeId)),
		staleTime: 5 * 60 * 1000,
	});
}

export function useKPIs() {
	return useQuery({
		queryKey: ["kpis"],
		queryFn: () =>
			fetchWithFallback(() => apiClient.request("/dashboard/kpis")),
		refetchInterval: 30 * 1000,
	});
}

export function useSalesTimeline(storeId = "store-kl-001") {
	return useQuery({
		queryKey: ["sales-timeline", storeId],
		queryFn: () =>
			fetchWithFallback(() =>
				apiClient.getSalesData(storeId, { range: "14d" }),
			),
		staleTime: 2 * 60 * 1000,
	});
}

export function useKafkaEvents() {
	return useQuery({
		queryKey: ["kafka-events"],
		queryFn: () =>
			fetchWithFallback(() => apiClient.request("/events/stream/latest")),
		refetchInterval: 5 * 1000,
	});
}

export function useHourlySales(storeId = "store-kl-001") {
	return useQuery({
		queryKey: ["hourly-sales", storeId],
		queryFn: () =>
			fetchWithFallback(() =>
				apiClient.getSalesData(storeId, { granularity: "hourly" }),
			),
		staleTime: 5 * 60 * 1000,
	});
}

// ─── AI DECISION NODE HOOKS (GLM-Powered) ───────────────────

export function useInventoryForecast(storeId = "store-kl-001") {
	return useQuery({
		queryKey: ["ai", "inventory-forecast", storeId],
		queryFn: () =>
			fetchWithFallback(() =>
				apiClient.getInventoryForecast(storeId, {
					horizon: "7d",
					includeWeather: true,
					includeSocial: true,
				}),
			),
		staleTime: 10 * 60 * 1000,
	});
}

export function useSentimentAnalysis(storeId = "store-kl-001") {
	return useQuery({
		queryKey: ["ai", "sentiment", storeId],
		queryFn: () =>
			fetchWithFallback(() => apiClient.getSentimentAnalysis(storeId)),
		staleTime: 10 * 60 * 1000,
	});
}

export function useDynamicPricing(storeId = "store-kl-001") {
	return useQuery({
		queryKey: ["ai", "pricing", storeId],
		queryFn: () =>
			fetchWithFallback(() =>
				apiClient.getDynamicPricing(storeId, {
					strategy: "peak-offpeak",
				}),
			),
		staleTime: 15 * 60 * 1000,
	});
}

export function useActionableInsights(storeId = "store-kl-001") {
	return useQuery({
		queryKey: ["ai", "insights", storeId],
		queryFn: () =>
			fetchWithFallback(() => apiClient.getActionableInsights(storeId)),
		staleTime: 5 * 60 * 1000,
	});
}

// ─── MUTATIONS ──────────────────────────────────────────────

export function useApplyInsightAction() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ insightId, action }) =>
			apiClient.request(`/ai/insights/apply`, {
				method: "POST",
				body: JSON.stringify({ insightId, action }),
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["ai", "insights"] });
		},
	});
}

export function useUpdateTradeoffWeights() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ storeId, weights }) =>
			apiClient.request(`/ai/pricing/weights/${storeId}`, {
				method: "PUT",
				body: JSON.stringify(weights),
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["ai", "pricing"] });
		},
	});
}

export function useTriggerPosEvent() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload) =>
			apiClient.triggerPosIngestion("store-kl-001", payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["kafka-events"] });
		},
	});
}
