package com.retailers.intelligence.adapter.in.dto;

import com.retailers.intelligence.domain.model.ActionableInsight;
import java.util.List;
import java.time.OffsetDateTime;

public record ActionableInsightResponse(
        String decisionId,
        OffsetDateTime generatedAt,
        String glmModel,
        List<ActionableInsight> insights) {
}
