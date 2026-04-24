package com.retailers.pricing.domain.model;

public record PriceRule(
        String skuId,
        Double basePrice,
        Double currentPrice,
        Double competitorPrice, // Added for AI comparison
        Double elasticityScore // Added: how sensitive customers are to price changes
) {
}
