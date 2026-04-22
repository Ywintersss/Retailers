package com.retailers.pricing.domain.model;

public record StrategyWeights(
        Integer costSaving,
        Integer brandPresence,
        Integer revenueMaximization) {
    public StrategyWeights {
        if ((costSaving + brandPresence + revenueMaximization) != 100) {
            throw new IllegalArgumentException("Weights must sum to exactly 100");
        }
    }
}
