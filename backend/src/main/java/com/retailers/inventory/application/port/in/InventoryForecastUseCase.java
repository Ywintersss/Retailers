package com.retailers.inventory.application.port.in;

import com.retailers.inventory.adapter.in.dto.InventoryForecastRequest;
import com.retailers.inventory.adapter.in.dto.InventoryForecastResponse;

public interface InventoryForecastUseCase {
    InventoryForecastResponse generateForecast(String storeId, InventoryForecastRequest request);
}
