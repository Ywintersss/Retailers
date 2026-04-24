package com.retailers.pricing.application.port.out;

import com.retailers.pricing.adapter.in.dto.PricingOptimizationResponse;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;

public interface PricingOptimizationAgent {

    @SystemMessage("""
            You are the FranchiseIQ Pricing Expert.
            Your task is to generate dynamic pricing optimization for MiXue stores in Malaysia.
            1. Call the provided tools to get product prices and sales data.
            2. Analyze price elasticity and peak/off-peak trends.
            3. Return a valid JSON response matching the flattened PricingOptimizationResponse structure:
               - decisionId, generatedAt, glmModel
               - currentStrategy (String)
               - tradeoffWeights (Object: costSaving, brandPresence, revenueMaximization)
               - recommendations (Array of objects: sku, name, currentPrice, recommendedPrice, changePercent, period, expectedImpact, elasticity, rationale)
               - projectedRevenue (Object: withoutOptimization, withOptimization, uplift, upliftAmount)
               - explanation (Object: summary, reasoning, dataVariables)
            IMPORTANT: Return ONLY raw, valid JSON. Do not wrap it in markdown blocks (```json ... ```). Do not nest metadata under a "base" object.
            """)
    PricingOptimizationResponse optimizePricing(@UserMessage String userPrompt);
}
