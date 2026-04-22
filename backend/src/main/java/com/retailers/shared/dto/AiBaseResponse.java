package com.retailers.shared.dto;

import java.time.OffsetDateTime;

public record AiBaseResponse(
        String decisionId,
        OffsetDateTime generatedAt,
        String glmModel,
        AiExplanationResponse aiExplanation) {
}
