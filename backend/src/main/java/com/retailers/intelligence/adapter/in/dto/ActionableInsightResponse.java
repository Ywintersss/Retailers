package com.retailers.intelligence.adapter.in.dto;

import com.retailers.shared.dto.AiBaseResponse;
import com.retailers.intelligence.domain.model.ActionableInsight;
import java.util.List;

public record ActionableInsightResponse(
        AiBaseResponse base,
        List<ActionableInsight> insights) {
}
