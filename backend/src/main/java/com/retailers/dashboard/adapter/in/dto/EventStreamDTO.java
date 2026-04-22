package com.retailers.dashboard.adapter.in.dto;

public record EventStreamDTO(
        String id,
        String topic, // e.g., "pos.transactions"
        String timestamp, // e.g., "15:28:42"
        String source, // e.g., "POS Terminal #3"
        String payload, // e.g., "Order #4521 — Brown Sugar Boba x2"
        String status // e.g., "processed"
) {
}
