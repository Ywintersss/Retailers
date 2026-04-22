package com.retailers.shared.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {
    @Value("${app.kafka.topics.pos-transactions}")
    private String posTopic;
    
    @Bean
    public NewTopic posTransactionsTopic() {
        return TopicBuilder.name("pos.transactions")
                .partitions(1)
                .replicas(1)
                .build();
    }
}