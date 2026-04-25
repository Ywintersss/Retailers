package com.retailers.intelligence.adapter.in;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.retailers.intelligence.adapter.in.dto.ActionableInsightResponse;
import com.retailers.intelligence.adapter.in.dto.SentimentResponse;
import com.retailers.intelligence.application.port.out.IntelligenceAgent;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@WebMvcTest(IntelligenceController.class)
public class IntelligenceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private IntelligenceAgent intelligenceAgent;

    @Test
    void testAnalyzeSentiment() throws Exception {
        when(intelligenceAgent.analyzeSentiment(anyString())).thenReturn(
                new SentimentResponse("dec-sen", "ilmu", 4.5, 100, "30d", null, List.of(), List.of(), null)
        );

        mockMvc.perform(post("/api/v1/ai/sentiment/analyze/store-kl-001"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.decisionId").value("dec-sen"));
    }

    @Test
    void testGetActionableInsights() throws Exception {
        when(intelligenceAgent.generateInsights(anyString())).thenReturn(
                new ActionableInsightResponse("dec-ins", null, "ilmu", List.of())
        );

        mockMvc.perform(get("/api/v1/ai/insights/store-kl-001"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.decisionId").value("dec-ins"));
    }
}
