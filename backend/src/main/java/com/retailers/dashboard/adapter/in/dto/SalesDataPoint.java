package com.retailers.dashboard.adapter.in.dto;

public record SalesDataPoint(
        String date,
        Double revenue,
        Integer orders,
        Double forecast // This allows the chart to show "Actual vs Forecast"
) {
}
