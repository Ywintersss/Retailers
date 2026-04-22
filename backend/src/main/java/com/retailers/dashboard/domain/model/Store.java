package com.retailers.dashboard.domain.model;

import java.time.LocalDate;

public record Store(
        String id,
        String name,
        String region,
        String tier,
        String status,
        String managerId,
        String managerName,
        LocalDate openedDate,
        Double latitude,
        Double longitude) {
}
