package com.retailers.inventory.adapter.in.dto;

import com.retailers.shared.dto.AiExplanationResponse;
import com.retailers.inventory.domain.model.ForecastResult;
import java.util.List;
import java.time.OffsetDateTime;

public record InventoryForecastResponse(
        String decisionId,
        OffsetDateTime generatedAt,
        String glmModel,
        String storeId,
        String forecastHorizon,
        List<ForecastResult> predictions,
        AiExplanationResponse explanation) {

    public InventoryForecastResponse withMetadata(String storeId, String horizon) {
        return new InventoryForecastResponse(this.decisionId, this.generatedAt, this.glmModel, storeId, horizon, this.predictions, this.explanation);
    }
}
