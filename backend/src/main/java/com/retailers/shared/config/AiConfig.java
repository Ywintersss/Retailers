package com.retailers.shared.config;

import dev.langchain4j.model.chat.ChatModel;
import dev.langchain4j.model.openai.OpenAiChatModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

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
}
