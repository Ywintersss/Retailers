package com.retailers.intelligence.adapter.in.dto;

public record TopicAlert(
        String severity,
        String topic,
        String message) {
}
