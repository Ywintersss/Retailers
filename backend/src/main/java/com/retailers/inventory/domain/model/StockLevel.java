package com.retailers.inventory.domain.model;

public record StockLevel(String productId, Double currentQuantity, String unit) {
}
