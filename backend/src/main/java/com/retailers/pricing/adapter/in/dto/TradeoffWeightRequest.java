package com.retailers.pricing.adapter.in.dto;

public record TradeoffWeightRequest(
        Integer costSaving,
        Integer brandPresence,
        Integer revenueMaximization) {
}
