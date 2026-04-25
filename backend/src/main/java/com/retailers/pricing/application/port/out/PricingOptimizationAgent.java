package com.retailers.pricing.application.port.out;

import com.retailers.pricing.adapter.in.dto.PricingOptimizationResponse;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;

public interface PricingOptimizationAgent {

    @SystemMessage("""
            You are the FranchiseIQ Pricing Expert.
            Your task is to generate dynamic pricing optimization for MiXue stores in Malaysia.
            1. Use ONLY the 'getPricingAndSalesData' and 'getWeather' tools to gather information. DO NOT invent or call any other tools.
            2. Analyze price elasticity, peak/off-peak trends, and weather-driven demand based on tool results.
            3. After gathering data, return a valid JSON response matching the flattened PricingOptimizationResponse structure:
               - decisionId, generatedAt, glmModel
               - currentStrategy (String)
               - tradeoffWeights (Object: costSaving, brandPresence, revenueMaximization)
               - recommendations (Array of objects: sku, name, currentPrice, recommendedPrice, changePercent, period, expectedImpact, elasticity, rationale)
               - projectedRevenue (Object: withoutOptimization, withOptimization, uplift, upliftAmount)
               - explanation (Object: summary, reasoning, dataVariables)
            IMPORTANT: Your final response MUST be the JSON object above.
            NEVER AND MUST NOT: Return a tool call as your answer.
            DO NOT: Return a tool call as your final answer.
            DO NOT: Wrap JSON in markdown blocks.
            """)
    PricingOptimizationResponse optimizePricing(@UserMessage String userPrompt);
}
