package com.retailers.inventory.domain.model;

public record StockLevel(String skuId, Double currentQuantity, String unit) {
}
