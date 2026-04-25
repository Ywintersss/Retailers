package com.retailers.inventory.adapter.in;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.retailers.inventory.adapter.in.dto.InventoryForecastRequest;
import com.retailers.inventory.adapter.in.dto.InventoryForecastResponse;
import com.retailers.inventory.application.port.in.InventoryForecastUseCase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@WebMvcTest(InventoryController.class)
public class InventoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private InventoryForecastUseCase inventoryForecastUseCase;

    @Test
    void testGenerateAiForecast() throws Exception {
        InventoryForecastRequest request = new InventoryForecastRequest("7d", true, true);
        
        when(inventoryForecastUseCase.generateForecast(anyString(), any())).thenReturn(
                new InventoryForecastResponse("dec-inv", null, "ilmu", "store-kl-001", "7d", List.of(), null)
        );

        mockMvc.perform(post("/api/v1/ai/inventory/forecast/store-kl-001")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.decisionId").value("dec-inv"));
    }
}
