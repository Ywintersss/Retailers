package com.retailers.intelligence.adapter.in.dto;

public record SentimentTopicDTO(
        String topic, // e.g., "Taste Quality", "Service Speed"
        Double score, // 0.0 - 5.0
        Integer mentions,
        String trend // "up", "down", "stable"
) {
}
