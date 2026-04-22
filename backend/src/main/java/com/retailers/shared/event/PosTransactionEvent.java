package com.retailers.shared.event;

public record PosTransactionEvent(
    String storeId, 
    String sku, 
    int quantity, 
    double price
) {}