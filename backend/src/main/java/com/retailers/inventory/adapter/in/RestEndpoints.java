package com.retailers.inventory.adapter.in;

import org.springframework.web.bind.annotation.*;

import com.retailers.inventory.adapter.in.dto.InventoryForecastRequest;
import com.retailers.inventory.adapter.in.dto.InventoryForecastResponse;

import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class RestEndpoints {

    @GetMapping("/stores/{storeId}/sales")
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
        // return inventoryAiUseCase.generateForecast(storeId, forecastRequest);
        return ResponseEntity.ok().build();
    }
}
