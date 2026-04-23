package com.retailers.inventory.application.port.out;

import com.retailers.inventory.domain.model.StockLevel;
import java.util.List;
import java.util.Map;

public interface InventoryRepository {
    List<StockLevel> getCurrentStockByStore(String storeId);

    Map<String, Integer> getHistoricalSales(String storeId, int days);
}
