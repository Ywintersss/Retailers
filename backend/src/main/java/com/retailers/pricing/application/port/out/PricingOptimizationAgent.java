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
            3. Return a valid JSON response matching the PricingOptimizationResponse structure.
            """)
    PricingOptimizationResponse optimizePricing(@UserMessage String userPrompt);
}
