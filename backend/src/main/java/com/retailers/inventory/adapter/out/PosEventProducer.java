package com.retailers.inventory.adapter.out;

import com.retailers.shared.event.PosTransactionEvent;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class PosEventProducer {

    private final KafkaTemplate<String, PosTransactionEvent> kafkaTemplate;

    @Value("${app.kafka.topics.pos-transactions}")
    private String posTopic;

    public PosEventProducer(KafkaTemplate<String, PosTransactionEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendTransaction(PosTransactionEvent event) {
        kafkaTemplate.send(posTopic, event.storeId(), event);
        System.out.println("Sent POS event for store: " + event.storeId());
    }
}