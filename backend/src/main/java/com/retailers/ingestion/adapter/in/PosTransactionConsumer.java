package com.retailers.ingestion.adapter.in;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.retailers.shared.entity.EventStream;
import com.retailers.shared.event.PosTransactionEvent;
import com.retailers.shared.repository.EventStreamRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.UUID;

@Component
public class PosTransactionConsumer {

    private static final Logger log = LoggerFactory.getLogger(PosTransactionConsumer.class);

    private final EventStreamRepository eventStreamRepository;
    private final ObjectMapper objectMapper;

    public PosTransactionConsumer(EventStreamRepository eventStreamRepository, ObjectMapper objectMapper) {
        this.eventStreamRepository = eventStreamRepository;
        this.objectMapper = objectMapper;
    }

    @KafkaListener(topics = "${app.kafka.topics.pos-transactions}", groupId = "retailers-group")
    public void consumePosTransaction(PosTransactionEvent event) {
        log.info("Received POS Transaction Event: {}", event);

        EventStream eventStream = new EventStream();
        eventStream.setId(UUID.randomUUID().toString());
        eventStream.setTopic("pos.transactions");
        eventStream.setEventTimestamp(LocalDateTime.now());
        eventStream.setSource(event.storeId());
        
        try {
            // Alternatively, a readable string could be used here depending on requirement
            String payloadJson = objectMapper.writeValueAsString(event);
            eventStream.setPayload(payloadJson);
        } catch (JsonProcessingException e) {
            log.error("Failed to serialize PosTransactionEvent", e);
            eventStream.setPayload(event.toString());
        }
        
        eventStream.setStatus("processed");

        eventStreamRepository.save(eventStream);
        log.info("Saved EventStream record with ID {}", eventStream.getId());
    }
}
