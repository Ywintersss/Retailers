package com.retailers.pricing.adapter.in.dto;

import com.retailers.shared.dto.AiBaseResponse;
import java.util.List;

public record PricingOptimizationResponse(
        AiBaseResponse base, // The AI reasoning block
        List<PriceRecommendationDTO> recommendations,
        Double projectedRevenueLift // e.g., 0.12 for 12% increase
) {
}
