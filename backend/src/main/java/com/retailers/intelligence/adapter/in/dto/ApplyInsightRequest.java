package com.retailers.intelligence.adapter.in.dto;

public record ApplyInsightRequest(
        String insightId,
        String action // e.g., "Schedule maintenance inspection within 24 hours."
) {
}
