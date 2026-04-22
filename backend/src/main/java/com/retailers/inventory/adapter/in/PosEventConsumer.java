package com.retailers.inventory.adapter.in;

import com.retailers.shared.event.PosTransactionEvent;

import jakarta.annotation.PostConstruct;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class PosEventConsumer {

    @KafkaListener(topics = "${app.kafka.topics.pos-transactions}", groupId = "retailers-group")
    public void consumeTransaction(PosTransactionEvent event) {
        System.out.println("Received POS event: Sold " + event.quantity() + "x " + event.sku());
        // Pass this event to your LangChain application service here
    }

    @PostConstruct
    public void init() {
        System.out.println("PosEventConsumer bean created");
    }
}