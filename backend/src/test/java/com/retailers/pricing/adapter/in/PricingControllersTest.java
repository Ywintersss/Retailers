package com.retailers.pricing.adapter.in;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.retailers.pricing.adapter.in.dto.PricingOptimizationRequest;
import com.retailers.pricing.adapter.in.dto.PricingOptimizationResponse;
import com.retailers.pricing.adapter.in.dto.TradeoffWeightRequest;
import com.retailers.pricing.application.port.out.PricingOptimizationAgent;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@WebMvcTest(PricingControllers.class)
public class PricingControllersTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private PricingOptimizationAgent pricingAgent;

    @Test
    void testGetOptimizedPricing() throws Exception {
        PricingOptimizationRequest request = new PricingOptimizationRequest("peak-offpeak", null);
        
        when(pricingAgent.optimizePricing(anyString())).thenReturn(
                new PricingOptimizationResponse("dec-123", null, "ilmu-glm", "peak", null, List.of(), null, null)
        );

        mockMvc.perform(post("/api/v1/ai/pricing/optimize/store-kl-001")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.decisionId").value("dec-123"));
    }

    @Test
    void testRecalculatePricing() throws Exception {
        TradeoffWeightRequest weights = new TradeoffWeightRequest(50, 25, 25);
        PricingOptimizationRequest request = new PricingOptimizationRequest("peak-offpeak", weights);

        when(pricingAgent.optimizePricing(anyString())).thenReturn(
                new PricingOptimizationResponse("dec-456", null, "ilmu-glm", "peak", null, List.of(), null, null)
        );

        mockMvc.perform(post("/api/v1/ai/pricing/recalculate/store-kl-001")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.decisionId").value("dec-456"));
    }
}
