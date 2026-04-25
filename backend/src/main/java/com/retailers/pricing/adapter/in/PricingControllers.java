package com.retailers.pricing.adapter.in;

import org.springframework.web.bind.annotation.*;

import com.retailers.pricing.adapter.in.dto.PricingOptimizationRequest;
import com.retailers.pricing.adapter.in.dto.PricingOptimizationResponse;
import com.retailers.pricing.adapter.in.dto.TradeoffWeightRequest;
import com.retailers.pricing.application.port.out.PricingOptimizationAgent;
import com.retailers.pricing.adapter.out.persistence.PricingAiTools;
import com.retailers.shared.adapter.out.WeatherAiTools;

import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/v1/ai")
public class PricingControllers {

    private final PricingOptimizationAgent pricingAgent;
    private final PricingAiTools pricingTools;
    private final WeatherAiTools weatherTools;

    public PricingControllers(PricingOptimizationAgent pricingAgent, 
                             PricingAiTools pricingTools, 
                             WeatherAiTools weatherTools) {
        this.pricingAgent = pricingAgent;
        this.pricingTools = pricingTools;
        this.weatherTools = weatherTools;
    }

    @PostMapping("/pricing/optimize/{storeId}")
    public ResponseEntity<PricingOptimizationResponse> getOptimizedPricing(
            @PathVariable String storeId,
            @RequestBody PricingOptimizationRequest pricingStrategy) {
        
        String salesData = pricingTools.getPricingAndSalesData(storeId);
        String weatherData = weatherTools.getWeather("Kuala Lumpur");

        String prompt = String.format(
            "CONTEXT DATA: %s\nWEATHER DATA: %s\nINSTRUCTION: Analyze this data for Store %s using Strategy: %s. Generate price optimizations.", 
            salesData, weatherData, storeId, pricingStrategy.strategy());

        return ResponseEntity.ok(pricingAgent.optimizePricing(prompt));
    }

    @PostMapping("/pricing/recalculate/{storeId}")
    public ResponseEntity<PricingOptimizationResponse> recalculatePricing(
            @PathVariable String storeId,
            @RequestBody PricingOptimizationRequest request) {
        
        String salesData = pricingTools.getPricingAndSalesData(storeId);
        String weatherData = weatherTools.getWeather("Kuala Lumpur");

        String weightsInfo = request.weights() != null ? 
            String.format(" (Adjusted Weights: Cost Saving %d%%, Brand Presence %d%%, Revenue Max %d%%)", 
                request.weights().costSaving(), request.weights().brandPresence(), request.weights().revenueMaximization()) : "";
        
        String prompt = String.format(
            "CONTEXT DATA: %s\nWEATHER DATA: %s\nINSTRUCTION: Analyze data for Store %s using Strategy: %s.%s Generate optimized price recommendations based on these priorities.", 
            salesData, weatherData, storeId, request.strategy(), weightsInfo);
        
        return ResponseEntity.ok(pricingAgent.optimizePricing(prompt));
    }

    @PutMapping("/pricing/weights/{storeId}")
    public ResponseEntity<Void> updateAiWeights(
            @PathVariable String storeId,
            @RequestBody TradeoffWeightRequest weights) {
        return ResponseEntity.noContent().build();
    }
}
