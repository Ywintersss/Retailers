package com.retailers.intelligence.adapter.in.dto;

import com.retailers.shared.dto.AiExplanationResponse;
import java.util.List;
import java.time.OffsetDateTime;

public record SentimentResponse(
        String decisionId,
        String glmModel,
        Double overallScore,
        Integer totalReviews,
        String period,
        SentimentBreakdown breakdown,
        List<SentimentTopicDTO> topics,
        List<TopicAlert> alerts,
        AiExplanationResponse explanation) {
}
