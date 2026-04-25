package com.retailers.inventory.application.service;

import com.retailers.inventory.application.port.in.InventoryForecastUseCase;
import com.retailers.inventory.application.port.out.InventoryForecasterAgent;
import com.retailers.inventory.adapter.in.dto.InventoryForecastRequest;
import com.retailers.inventory.adapter.in.dto.InventoryForecastResponse;
import com.retailers.inventory.adapter.out.persistance.InventoryAiTools;
import com.retailers.shared.adapter.out.WeatherAiTools;
import org.springframework.stereotype.Service;

@Service
public class InventoryAiService implements InventoryForecastUseCase {

    private final InventoryForecasterAgent agent;
    private final InventoryAiTools inventoryTools;
    private final WeatherAiTools weatherTools;

    public InventoryAiService(InventoryForecasterAgent agent, 
                             InventoryAiTools inventoryTools, 
                             WeatherAiTools weatherTools) {
        this.agent = agent;
        this.inventoryTools = inventoryTools;
        this.weatherTools = weatherTools;
    }

    @Override
    public InventoryForecastResponse generateForecast(String storeId, InventoryForecastRequest request) {
        String stockData = inventoryTools.getStoreData(storeId);
        String weatherData = request.includeWeather() ? weatherTools.getWeather("Kuala Lumpur") : "Weather inclusion disabled.";

        String prompt = String.format(
                "CONTEXT DATA: %s\nWEATHER DATA: %s\n" +
                "INSTRUCTION: Generate a 7-day forecast for Store %s. " +
                "Analyze risks (Weather, Social: %b). " +
                "Tailor for the Malaysian retail market.",
                stockData, weatherData, storeId, request.includeSocial());

        InventoryForecastResponse response = agent.analyze(prompt);

        return enrichResponse(response, storeId, request.horizon());
    }

    private InventoryForecastResponse enrichResponse(InventoryForecastResponse response, String storeId,
            String horizon) {
        return response.withMetadata(storeId, horizon);
    }
}
