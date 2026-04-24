package com.retailers.pricing.adapter.in.dto;

public record PriceRecommendationDTO(
        String sku,
        String name,
        Double currentPrice,
        Double recommendedPrice,
        Double changePercent,
        String period,
        String expectedImpact,
        Double elasticity,
        String rationale 
) {
}
