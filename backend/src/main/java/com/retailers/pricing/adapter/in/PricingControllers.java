package com.retailers.pricing.adapter.in;

import org.springframework.web.bind.annotation.*;

import com.retailers.pricing.adapter.in.dto.PricingOptimizationRequest;
import com.retailers.pricing.adapter.in.dto.PricingOptimizationResponse;
import com.retailers.pricing.adapter.in.dto.TradeoffWeightRequest;
import com.retailers.pricing.application.port.out.PricingOptimizationAgent;

import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/v1/ai")
public class PricingControllers {

    private final PricingOptimizationAgent pricingAgent;

    public PricingControllers(PricingOptimizationAgent pricingAgent) {
        this.pricingAgent = pricingAgent;
    }

    // AI-Powered Decision Node
    @PostMapping("/pricing/optimize/{storeId}")
    public ResponseEntity<PricingOptimizationResponse> getOptimizedPricing(
            @PathVariable String storeId,
            @RequestBody PricingOptimizationRequest pricingStrategy) {
        String prompt = String.format("Store: %s. Strategy: %s. Generate price optimizations.", storeId, pricingStrategy.strategy());
        return ResponseEntity.ok(pricingAgent.optimizePricing(prompt));
    }

    // Human-in-the-Loop: Dynamic Recalculation
    @PostMapping("/pricing/recalculate/{storeId}")
    public ResponseEntity<PricingOptimizationResponse> recalculatePricing(
            @PathVariable String storeId,
            @RequestBody PricingOptimizationRequest request) {
        
        String weightsInfo = request.weights() != null ? 
            String.format(" (Adjusted Weights: Cost Saving %d%%, Brand Presence %d%%, Revenue Max %d%%)", 
                request.weights().costSaving(), request.weights().brandPresence(), request.weights().revenueMaximization()) : "";
        
        String prompt = String.format("Store: %s. Strategy: %s.%s Analyze data and generate optimized price recommendations based on these specific trade-off priorities.", 
                storeId, request.strategy(), weightsInfo);
        
        return ResponseEntity.ok(pricingAgent.optimizePricing(prompt));
    }

    // Human-in-the-Loop: Updating AI Weights
    @PutMapping("/pricing/weights/{storeId}")
    public ResponseEntity<Void> updateAiWeights(
            @PathVariable String storeId,
            @RequestBody TradeoffWeightRequest weights) {
        // Just acknowledging the weights for now
        return ResponseEntity.noContent().build();
    }
}
