package com.retailers.pricing.adapter.in.dto;

public record PriceRecommendationDTO(
        String skuId,
        Double oldPrice,
        Double recommendedPrice,
        Double marginImpact,
        String rationale // e.g., "High competitor pricing in Bukit Jalil area"
) {
}
