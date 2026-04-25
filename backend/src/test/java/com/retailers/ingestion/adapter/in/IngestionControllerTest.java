package com.retailers.ingestion.adapter.in;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.retailers.ingestion.adapter.in.dto.PosIngestRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(IngestionController.class)
public class IngestionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testIngestPosData() throws Exception {
        PosIngestRequest request = new PosIngestRequest("store-kl-001", "T1", "SALE", java.util.List.of(), java.time.OffsetDateTime.now());
        
        mockMvc.perform(post("/api/v1/events/pos/ingest")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isAccepted());
    }
}
