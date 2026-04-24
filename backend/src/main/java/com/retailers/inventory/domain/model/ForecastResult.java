package com.retailers.inventory.domain.model;

import com.retailers.shared.RiskLevel;

public record ForecastResult(
        String skuId,
        Integer predictedDemand,
        Double confidenceScore,
        RiskLevel riskLevel,
        Integer suggestedRestockAmount, // Added: The "Actionable" part
        String restockJustification // Added: e.g., "High demand expected due to public holiday"
) {
}
