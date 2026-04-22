package com.retailers.intelligence.domain.model;

public record Sentiment(
        Double overallScore,
        Integer positiveCount,
        Integer neutralCount,
        Integer negativeCount) {
    // Domain logic: Calculate the total volume of feedback
    public Integer getTotalMentions() {
        return positiveCount + neutralCount + negativeCount;
    }
}
