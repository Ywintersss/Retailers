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
            3. Return a valid JSON response matching the flattened InventoryForecastResponse structure:
               - decisionId (String)
               - generatedAt (ISO-8601 String)
               - glmModel (String)
               - storeId (String)
               - forecastHorizon (String)
               - predictions (Array of objects with: sku, name, currentStock, predictedDemand, restockRecommendation, confidence, stockoutRisk, daysUntilStockout, restockJustification)
               - explanation (Object with: summary, reasoning, dataVariables array)
            IMPORTANT: Return ONLY raw, valid JSON. Do not wrap it in markdown blocks (```json ... ```). Do not nest metadata under a "base" object.
            """)
    InventoryForecastResponse analyze(@UserMessage String userPrompt);
}
