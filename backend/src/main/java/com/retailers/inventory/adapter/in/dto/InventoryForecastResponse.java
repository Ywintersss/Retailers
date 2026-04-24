package com.retailers.inventory.adapter.in.dto;

import com.retailers.shared.dto.AiBaseResponse;
import com.retailers.inventory.domain.model.ForecastResult;
import java.util.List;

public record InventoryForecastResponse(
        String storeId,
        String forecastHorizon,
        AiBaseResponse base,
        List<ForecastResult> predictions,
        String inventoryHealthStatus) {

    public InventoryForecastResponse withMetadata(String storeId, String horizon) {
        return new InventoryForecastResponse(storeId, horizon, this.base, this.predictions, this.inventoryHealthStatus);
    }
}
