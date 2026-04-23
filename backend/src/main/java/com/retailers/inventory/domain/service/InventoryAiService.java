package com.retailers.inventory.domain.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.retailers.inventory.adapter.in.dto.InventoryForecastRequest;
import com.retailers.inventory.adapter.in.dto.InventoryForecastResponse;
import com.retailers.inventory.application.port.out.InventoryRepository;
import com.retailers.inventory.domain.model.StockLevel;

import dev.langchain4j.model.chat.ChatModel;

@Service
public class InventoryAiService {
    private final InventoryRepository inventoryRepository;
    private final ChatModel aiClient;

    // public InventoryAiService(InventoryRepository inventoryRepository,
    // AiModelClient aiClient) {
    public InventoryAiService(InventoryRepository inventoryRepository, ChatModel aiClient) {
        this.inventoryRepository = inventoryRepository;
        this.aiClient = aiClient;
    }

    // public InventoryForecastResponse generateForecast(String storeId,
    // InventoryForecastRequest request) {
    public String generateForecast(String storeId, InventoryForecastRequest request) {
        // 1. Fetch Current State from DB
        List<StockLevel> currentStock = inventoryRepository.getCurrentStockByStore(storeId);
        Map<String, Integer> history = inventoryRepository.getHistoricalSales(storeId, 30);

        // 2. Prepare the AI Prompt context
        // In a real app, you'd also fetch Weather/Social data here via other Outbound
        // Ports
        String context = String.format("Store: %s, Current Stock: %s, History: %s",
                storeId, currentStock, history);

        // 3. Call Z.AI (LangChain4j)
        // This maps the LLM response to your InventoryForecastResponse DTO
        String aiRawResponse = aiClient.chat(context);

        // 4. Return the Actionable Insight
        return aiRawResponse;
    }
}
