package com.retailers.ingestion.adapter.in;

import org.springframework.web.bind.annotation.*;

import com.retailers.ingestion.adapter.in.dto.PosIngestRequest;

import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/v1/events")
public class IngestionController {

    @PostMapping("/pos/ingest")
    public ResponseEntity<Void> ingestPosData(@RequestBody PosIngestRequest posData) {
        // This should push the payload directly to a Kafka Topic
        return ResponseEntity.accepted().build();
    }
}
