package com.retailers.ingestion.domain.model;

public record LineItem(
        String sku,
        Integer quantity,
        Double price) {
}
