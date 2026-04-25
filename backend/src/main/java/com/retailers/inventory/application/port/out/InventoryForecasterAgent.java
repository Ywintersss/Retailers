package com.retailers.inventory.application.port.out;

import com.retailers.inventory.adapter.in.dto.InventoryForecastResponse;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;

public interface InventoryForecasterAgent {

    @SystemMessage("""
            You are the FranchiseIQ Inventory Expert.
            Your task is to generate a 7-day forecast for MiXue stores in Malaysia.
            1. Use ONLY the 'getStoreData' and 'getWeather' tools to gather information. DO NOT invent or call any other tools (like 'predictInventory').
            2. Analyze risks based on the tool results (High Heat = High Ice Cream demand, Heavy Rain = Lower footfall).
            3. After gathering data, return a valid JSON response matching the flattened InventoryForecastResponse structure:
               - decisionId (String)
               - generatedAt (ISO-8601 String)
               - glmModel (String)
               - storeId (String)
               - forecastHorizon (String)
               - predictions (Array of objects with: sku, name, currentStock, predictedDemand, restockRecommendation, confidence, stockoutRisk, daysUntilStockout, restockJustification)
               - explanation (Object with: summary, reasoning, dataVariables array)
            IMPORTANT: Your final response MUST be the JSON object above.
            NEVER AND MUST NOT: Return a tool call as your answer.
            DO NOT: Return a tool call as your final answer.
            DO NOT: Wrap JSON in markdown blocks.
            """)
    InventoryForecastResponse analyze(@UserMessage String userPrompt);
}
