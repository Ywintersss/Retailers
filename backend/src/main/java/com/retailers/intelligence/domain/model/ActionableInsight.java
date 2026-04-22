package com.retailers.intelligence.domain.model;

public record ActionableInsight(
        String id,
        String priority, // "critical", "high", "medium"
        String category, // "Inventory", "Equipment", "Staffing"
        String title,
        String summary,
        String recommendedAction,
        String estimatedImpact, // Added: e.g., "RM 2,400 saved"
        Double confidence, // Added: 0.0 - 1.0
        String status // "pending", "in-progress", "resolved"
) {
}
