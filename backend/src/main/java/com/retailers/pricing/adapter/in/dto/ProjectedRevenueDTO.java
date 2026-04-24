package com.retailers.pricing.adapter.in.dto;

public record ProjectedRevenueDTO(
        Double withoutOptimization,
        Double withOptimization,
        Double uplift,
        Double upliftAmount
) {
}
