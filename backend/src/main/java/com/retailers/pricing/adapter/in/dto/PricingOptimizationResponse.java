package com.retailers.pricing.adapter.in.dto;

import com.retailers.shared.dto.AiExplanationResponse;
import java.util.List;
import java.time.OffsetDateTime;

public record PricingOptimizationResponse(
        String decisionId,
        OffsetDateTime generatedAt,
        String glmModel,
        String currentStrategy,
        TradeoffWeightsDTO tradeoffWeights,
        List<PriceRecommendationDTO> recommendations,
        ProjectedRevenueDTO projectedRevenue,
        AiExplanationResponse explanation
) {
}
