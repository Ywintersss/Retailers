package com.retailers.inventory.adapter.in.dto;

public record InventoryForecastRequest(
        String horizon,
        boolean includeWeather,
        boolean includeSocial) {
    // Compact constructor to handle defaults/nulls
    public InventoryForecastRequest {
        if (horizon == null || horizon.isBlank()) {
            horizon = "7d";
        }
    }
}
