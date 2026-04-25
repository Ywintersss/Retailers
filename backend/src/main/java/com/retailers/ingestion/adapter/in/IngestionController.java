package com.retailers.ingestion.adapter.in;

import org.springframework.web.bind.annotation.*;

import com.retailers.ingestion.adapter.in.dto.PosIngestRequest;

import com.retailers.shared.event.PosTransactionEvent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.http.ResponseEntity;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/events")
public class IngestionController {

    private final KafkaTemplate<String, PosTransactionEvent> kafkaTemplate;

    @Value("${app.kafka.topics.pos-transactions}")
    private String posTopic;

    public IngestionController(KafkaTemplate<String, PosTransactionEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    @GetMapping("/ping")
    public ResponseEntity<Map<String, String>> ping() {
        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Connection to Spring Boot backend successful via Nginx"));
    }

    @PostMapping("/pos/ingest")
    public ResponseEntity<Void> ingestPosData(@RequestBody PosIngestRequest posData) {
        // Map request to internal events (one per item)
        posData.items().forEach(item -> {
            PosTransactionEvent event = new PosTransactionEvent(
                    posData.storeId(),
                    item.sku(),
                    item.quantity(),
                    item.price()
            );

            // Pushes payload directly to Kafka Topic
            kafkaTemplate.send(posTopic, event.storeId(), event);
        });
        
        return ResponseEntity.accepted().build();
    }
}
