package com.retailers.inventory.domain.model;

import com.retailers.shared.RiskLevel;

public record ForecastResult(
        String sku,
        String name,
        Integer currentStock,
        Integer predictedDemand,
        Integer restockRecommendation,
        Double confidence,
        String stockoutRisk,
        Integer daysUntilStockout,
        String restockJustification
) {
}
