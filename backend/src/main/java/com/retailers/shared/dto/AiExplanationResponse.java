package com.retailers.shared.dto;

import java.util.List;

import com.retailers.shared.DataVariable;

public record AiExplanationResponse(
        String summary,
        List<DataVariable> dataVariables,
        String reasoning) {
}
