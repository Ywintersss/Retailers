package com.retailers.inventory.domain.service;

import org.springframework.stereotype.Service;

@Service
public class InventoryDomainService {
    public int calculateSafetyStock(int leadTimeDays, int avgDailySales) {
        return leadTimeDays * avgDailySales;
    }
}
