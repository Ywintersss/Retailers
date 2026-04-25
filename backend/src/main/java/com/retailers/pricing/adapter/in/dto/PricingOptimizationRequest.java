package com.retailers.pricing.adapter.in.dto;

public record PricingOptimizationRequest(
        String strategy, // e.g., "peak-offpeak", "clearance", "margin-focus"
        TradeoffWeightRequest weights
) {
}
