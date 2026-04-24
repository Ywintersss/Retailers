package com.retailers.inventory.application.service;

import com.retailers.inventory.application.port.in.InventoryForecastUseCase;
import com.retailers.inventory.application.port.out.InventoryForecasterAgent;
import com.retailers.inventory.adapter.in.dto.InventoryForecastRequest;
import com.retailers.inventory.adapter.in.dto.InventoryForecastResponse;
import org.springframework.stereotype.Service;

@Service
public class InventoryAiService implements InventoryForecastUseCase {

    private final InventoryForecasterAgent agent;

    public InventoryAiService(InventoryForecasterAgent agent) {
        this.agent = agent;
    }

    @Override
    public InventoryForecastResponse generateForecast(String storeId, InventoryForecastRequest request) {
        String prompt = String.format(
                "Store: %s. Forecast Horizon: %s. " +
                        "Please analyze internal inventory data and external context (Weather: %b, Social: %b). " +
                        "Ensure the response is tailored for the Malaysian retail market.",
                storeId, request.horizon(), request.includeWeather(), request.includeSocial());

        InventoryForecastResponse response = agent.analyze(prompt);

        return enrichResponse(response, storeId, request.horizon());
    }

    private InventoryForecastResponse enrichResponse(InventoryForecastResponse response, String storeId,
            String horizon) {
        return new InventoryForecastResponse(
                storeId,
                horizon,
                response.base(), // Keeping the AI's reasoning
                response.predictions(),
                response.inventoryHealthStatus());
    }
}
