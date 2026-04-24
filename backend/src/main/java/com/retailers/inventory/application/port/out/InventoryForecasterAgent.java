package com.retailers.inventory.application.port.out;

import com.retailers.inventory.adapter.in.dto.InventoryForecastResponse;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;

public interface InventoryForecasterAgent {

    @SystemMessage("""
            You are the FranchiseIQ Inventory Expert.
            Your task is to generate a 7-day forecast for MiXue stores in Malaysia.
            1. Call the provided tools to get stock and sales data.
            2. Analyze risks (High Heat = High Ice Cream demand).
            3. Return a valid JSON response matching the InventoryForecastResponse structure.
            IMPORTANT: Return ONLY raw, valid JSON. Do not wrap it in markdown blocks (```json ... ```). Do not include any explanations outside the JSON.
            """)
    InventoryForecastResponse analyze(@UserMessage String userPrompt);
}
