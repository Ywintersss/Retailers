package com.retailers.dashboard.adapter.in;

import com.retailers.dashboard.adapter.in.dto.DashboardKPIResponse; // Added
import com.retailers.dashboard.adapter.in.dto.EventStreamDTO;
import com.retailers.dashboard.adapter.in.dto.SalesDataPoint;
import com.retailers.dashboard.domain.model.Store; // Added
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class RestEndpoints {

    @GetMapping("/stores/{storeId}")
    public ResponseEntity<Store> getStoreDetails(@PathVariable String storeId) {
        // Changed Object -> Store
        return ResponseEntity.ok().build();
    }

    @GetMapping("/stores/{storeId}/sales")
    public ResponseEntity<List<SalesDataPoint>> getSalesHistory(
            @PathVariable String storeId,
            @RequestParam(defaultValue = "14d") String range) {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/dashboard/kpis")
    public ResponseEntity<DashboardKPIResponse> getGlobalKpis() {
        // Changed Object -> DashboardKPIResponse
        return ResponseEntity.ok().build();
    }

    @GetMapping("/events/stream/latest")
    public ResponseEntity<List<EventStreamDTO>> getLatestKafkaEvents() {
        return ResponseEntity.ok().build();
    }
}
