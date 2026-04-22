package com.retailers.intelligence.adapter.in.dto;

import com.retailers.shared.dto.AiBaseResponse;
import com.retailers.intelligence.domain.model.Sentiment;
import java.util.List;

public record SentimentResponse(
        AiBaseResponse base,
        Sentiment sentiment,
        List<SentimentTopicDTO> topics,
        List<TopicAlert> alerts) {
}
