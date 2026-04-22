package com.retailers.pricing.adapter.in;

import org.springframework.web.bind.annotation.*;

import com.retailers.pricing.adapter.in.dto.PricingOptimizationRequest;
import com.retailers.pricing.adapter.in.dto.PricingOptimizationResponse;
import com.retailers.pricing.adapter.in.dto.TradeoffWeightRequest;

import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/v1/ai")
public class RestEndpoints {

    // AI-Powered Decision Node
    @PostMapping("/pricing/optimize/{storeId}")
    public ResponseEntity<PricingOptimizationResponse> getOptimizedPricing(
            @PathVariable String storeId,
            @RequestBody PricingOptimizationRequest pricingStrategy) {
        // return pricingAiUseCase.optimize(storeId, pricingStrategy);
        return ResponseEntity.ok().build();
    }

    // Human-in-the-Loop: Updating AI Weights
    @PutMapping("/pricing/weights/{storeId}")
    public ResponseEntity<Void> updateAiWeights(
            @PathVariable String storeId,
            @RequestBody TradeoffWeightRequest weights) {
        // pricingAiUseCase.updateWeights(storeId, weights);
        return ResponseEntity.noContent().build();
    }
}
