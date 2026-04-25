package com.retailers.ingestion.adapter.in;

import org.springframework.web.bind.annotation.*;

import com.retailers.ingestion.adapter.in.dto.PosIngestRequest;

import org.springframework.http.ResponseEntity;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/events")
public class IngestionController {

    @GetMapping("/ping")
    public ResponseEntity<Map<String, String>> ping() {
        return ResponseEntity.ok(Map.of(
            "status", "success", 
            "message", "Connection to Spring Boot backend successful via Nginx"
        ));
    }

    @PostMapping("/pos/ingest")
    public ResponseEntity<Void> ingestPosData(@RequestBody PosIngestRequest posData) {
        // Pushes payload directly to Kafka Topic: pos.transactions
        return ResponseEntity.accepted().build();
    }
}
