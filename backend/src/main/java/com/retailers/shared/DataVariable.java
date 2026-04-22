package com.retailers.shared;

public record DataVariable(
        String name,
        String value,
        String source,
        Double weight) {
}
