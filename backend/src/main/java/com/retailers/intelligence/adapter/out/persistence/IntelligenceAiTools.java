package com.retailers.intelligence.adapter.out.persistence;

import com.retailers.shared.repository.EventStreamRepository;
import com.retailers.shared.repository.DashboardKpiRepository;
import com.retailers.shared.entity.EventStream;
import com.retailers.shared.entity.DashboardKpi;
import dev.langchain4j.agent.tool.P;
import dev.langchain4j.agent.tool.Tool;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class IntelligenceAiTools {

    private final EventStreamRepository eventStreamRepository;
    private final DashboardKpiRepository dashboardKpiRepository;

    public IntelligenceAiTools(EventStreamRepository eventStreamRepository, DashboardKpiRepository dashboardKpiRepository) {
        this.eventStreamRepository = eventStreamRepository;
        this.dashboardKpiRepository = dashboardKpiRepository;
    }

    @Tool("Fetch recent event streams (POS and sensor data) and KPIs for a specific store to analyze sentiment and generate actionable insights.")
    public String getStoreEventsAndKpis(@P("The store ID, e.g., 'store-kl-001'") String storeId) {
        List<EventStream> events = eventStreamRepository.findTop10ByOrderByEventTimestampDesc();
        String eventsStr = events.stream()
            .map(e -> e.getTopic() + " [" + e.getSource() + "]: " + e.getPayload())
            .collect(Collectors.joining("; "));

        List<DashboardKpi> kpis = dashboardKpiRepository.findByStoreId(storeId);
        String kpisStr = kpis.stream()
            .map(k -> "Sentiment: " + k.getCustomerSentiment() + "/5.0, Alerts: " + k.getPendingAlerts())
            .collect(Collectors.joining("; "));

        return String.format("Recent Events: [%s], Current KPIs: [%s]", eventsStr, kpisStr);
    }
}
