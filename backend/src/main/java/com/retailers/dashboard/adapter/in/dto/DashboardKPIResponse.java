package com.retailers.dashboard.adapter.in.dto;

public record DashboardKPIResponse(
        Double dailyRevenue,
        Double dailyRevenueChange,
        Integer inventoryHealth,
        Double customerSentiment,
        Double wasteReduction,
        Integer pendingAlerts) {
}
