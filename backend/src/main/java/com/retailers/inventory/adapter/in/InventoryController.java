package com.retailers.inventory.adapter.in;

import org.springframework.web.bind.annotation.*;

import com.retailers.inventory.adapter.in.dto.InventoryForecastRequest;
import com.retailers.inventory.adapter.in.dto.InventoryForecastResponse;
import com.retailers.inventory.application.port.in.InventoryForecastUseCase;

import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class InventoryController {

    private final InventoryForecastUseCase inventoryForecastUseCase;

    public InventoryController(
            InventoryForecastUseCase inventoryForecastUseCase) {
        this.inventoryForecastUseCase = inventoryForecastUseCase;

    }

    @GetMapping("/inventory/{storeId}/sales")
    public ResponseEntity<List<Object>> getSalesTimeline(
            @PathVariable String storeId,
            @RequestParam(defaultValue = "14d") String range) {
        // return inventoryUseCase.getSalesHistory(storeId, range);
        return ResponseEntity.ok().build();
    }

    // AI-Powered Decision Node
    @PostMapping("/ai/inventory/forecast/{storeId}")
    public ResponseEntity<InventoryForecastResponse> generateAiForecast(
            @PathVariable String storeId,
            @RequestBody InventoryForecastRequest forecastRequest) {
        // This triggers the Z.AI GLM via LangChain4j
        return ResponseEntity.ok(inventoryForecastUseCase.generateForecast(storeId, forecastRequest));
    }
}
