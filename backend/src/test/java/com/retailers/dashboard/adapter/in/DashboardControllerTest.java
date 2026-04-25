package com.retailers.dashboard.adapter.in;

import com.retailers.shared.repository.DashboardKpiRepository;
import com.retailers.shared.repository.EventStreamRepository;
import com.retailers.shared.repository.StoreRepository;
import com.retailers.shared.repository.StoreSaleRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(DashboardController.class)
public class DashboardControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private StoreRepository storeRepository;

    @MockitoBean
    private DashboardKpiRepository kpiRepository;

    @MockitoBean
    private StoreSaleRepository saleRepository;

    @MockitoBean
    private EventStreamRepository eventRepository;

    @Test
    void testGetGlobalKpis() throws Exception {
        when(kpiRepository.findAll()).thenReturn(List.of());

        mockMvc.perform(get("/api/v1/dashboard/kpis"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testGetLatestKafkaEvents() throws Exception {
        when(eventRepository.findTop10ByOrderByEventTimestampDesc()).thenReturn(List.of());

        mockMvc.perform(get("/api/v1/events/stream/latest"))
                .andExpect(status().isOk());
    }
}
