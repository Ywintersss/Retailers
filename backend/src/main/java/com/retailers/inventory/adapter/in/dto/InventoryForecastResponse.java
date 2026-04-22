package com.retailers.inventory.adapter.in.dto;

import com.retailers.shared.dto.AiBaseResponse;
import com.retailers.inventory.domain.model.ForecastResult;
import java.util.List;

public record InventoryForecastResponse(
        AiBaseResponse base, // Metadata & Reasoning
        List<ForecastResult> predictions, // The actual numbers
        String inventoryHealthStatus // e.g., "STABLE", "RISK_OF_OUTAGE"
) {
}
