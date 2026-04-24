package com.retailers.inventory.adapter.out.persistance;

import com.retailers.inventory.application.port.out.InventoryRepository;
import dev.langchain4j.agent.tool.P;
import dev.langchain4j.agent.tool.Tool;
import org.springframework.stereotype.Component;

@Component
public class InventoryAiTools {

    private final InventoryRepository inventoryRepository;

    public InventoryAiTools(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Tool("Fetch current stock levels and 30-day sales history for a specific store.")
    public String getStoreData(@P("The store ID, e.g., 'store-kl-001'") String storeId) {
        var stock = inventoryRepository.getCurrentStockByStore(storeId);
        var sales = inventoryRepository.getHistoricalSales(storeId, 30);
        return String.format("Current Stock: %s, Sales History: %s", stock, sales);
    }
}
