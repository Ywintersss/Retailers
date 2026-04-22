package com.retailers.healthcheck;

import com.retailers.inventory.adapter.out.PosEventProducer;
import com.retailers.shared.event.PosTransactionEvent;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheck {

    private final PosEventProducer producer;

    public HealthCheck(PosEventProducer producer) {
        this.producer = producer;
    }

    // This maps to http://localhost:8080/
    @GetMapping("/")
    public String healthCheck() {
        return "Retailers Backend is running!";
    }

    // This maps to http://localhost:8080/test-kafka
    @GetMapping("/test-kafka")
    public String testKafka() {
        PosTransactionEvent event = new PosTransactionEvent("STORE-001", "TEST-SKU", 5, 12.99);
        producer.sendTransaction(event);
        return "Test transaction sent to Kafka!";
    }
}