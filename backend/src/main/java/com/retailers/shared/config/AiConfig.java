package com.retailers.shared.config;

import dev.langchain4j.model.chat.ChatModel;
import dev.langchain4j.model.openai.OpenAiChatModel;
import dev.langchain4j.service.AiServices;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.retailers.inventory.adapter.out.persistance.InventoryAiTools;
import com.retailers.inventory.application.port.out.InventoryForecasterAgent;

import java.time.Duration;

@Configuration
public class AiConfig {

    @Bean
    public ChatModel chatLanguageModel(
            @Value("${ILMU_AI_API_KEY}") String apiKey) {

        return OpenAiChatModel.builder()
                .apiKey(apiKey)
                .baseUrl("https://api.ilmu.ai/v1")
                .modelName("ilmu-nemo-nano")
                .timeout(Duration.ofSeconds(60))
                .logRequests(true)
                .logResponses(true)
                .build();
    }

    @Bean
    public InventoryForecasterAgent inventoryForecasterAgent(
            ChatModel chatModel,
            InventoryAiTools inventoryTools) {
        return AiServices.builder(InventoryForecasterAgent.class)
                .chatModel(chatModel)
                .tools(inventoryTools)
                .build();
    }
}
