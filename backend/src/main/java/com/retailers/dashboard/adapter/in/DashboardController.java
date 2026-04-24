package com.retailers.dashboard.adapter.in;

import com.retailers.dashboard.adapter.in.dto.DashboardKPIResponse;
import com.retailers.dashboard.adapter.in.dto.EventStreamDTO;
import com.retailers.dashboard.adapter.in.dto.SalesDataPoint;
import com.retailers.dashboard.domain.model.Store;
import com.retailers.shared.repository.StoreRepository;
import com.retailers.shared.repository.DashboardKpiRepository;
import com.retailers.shared.repository.StoreSaleRepository;
import com.retailers.shared.repository.EventStreamRepository;
import com.retailers.shared.entity.DashboardKpi;
import com.retailers.shared.entity.StoreSale;
import com.retailers.shared.entity.EventStream;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1")
public class DashboardController {

    private final StoreRepository storeRepository;
    private final DashboardKpiRepository kpiRepository;
    private final StoreSaleRepository saleRepository;
    private final EventStreamRepository eventRepository;

    @Autowired
    public DashboardController(StoreRepository storeRepository, 
                               DashboardKpiRepository kpiRepository, 
                               StoreSaleRepository saleRepository, 
                               EventStreamRepository eventRepository) {
        this.storeRepository = storeRepository;
        this.kpiRepository = kpiRepository;
        this.saleRepository = saleRepository;
        this.eventRepository = eventRepository;
    }

    @GetMapping("/stores/{storeId}")
    public ResponseEntity<Store> getStoreDetails(@PathVariable String storeId) {
        return storeRepository.findById(storeId)
                .map(s -> new Store(
                        s.getId(),
                        s.getName(),
                        s.getRegion(),
                        s.getTier(),
                        s.getStatus(),
                        s.getManagerId(),
                        s.getManagerName(),
                        s.getOpenedDate(),
                        s.getLatitude() != null ? s.getLatitude().doubleValue() : null,
                        s.getLongitude() != null ? s.getLongitude().doubleValue() : null
                ))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/stores/{storeId}/sales")
    public ResponseEntity<List<SalesDataPoint>> getSalesHistory(
            @PathVariable String storeId,
            @RequestParam(defaultValue = "14d") String range) {
        
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(14);
        
        List<StoreSale> sales = saleRepository.findByStoreIdAndSaleDateBetween(storeId, startDate, endDate);
        
        List<SalesDataPoint> dataPoints = sales.stream()
                .map(sale -> new SalesDataPoint(
                        sale.getSaleDate().format(DateTimeFormatter.ofPattern("MMM dd")),
                        sale.getRevenue() != null ? sale.getRevenue().doubleValue() : 0.0,
                        sale.getOrdersCount(),
                        sale.getForecast() != null ? sale.getForecast().doubleValue() : 0.0
                ))
                .collect(Collectors.toList());
                
        return ResponseEntity.ok(dataPoints);
    }

    @GetMapping("/dashboard/kpis")
    public ResponseEntity<DashboardKPIResponse> getGlobalKpis() {
        List<DashboardKpi> kpis = kpiRepository.findAll();
        if (kpis.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        DashboardKpi kpi = kpis.get(0);
        DashboardKPIResponse response = new DashboardKPIResponse(
                kpi.getDailyRevenue() != null ? kpi.getDailyRevenue().doubleValue() : 0.0,
                kpi.getDailyRevenueChange() != null ? kpi.getDailyRevenueChange().doubleValue() : 0.0,
                kpi.getInventoryHealth() != null ? kpi.getInventoryHealth().intValue() : 0,
                kpi.getCustomerSentiment() != null ? kpi.getCustomerSentiment().doubleValue() : 0.0,
                kpi.getWasteReduction() != null ? kpi.getWasteReduction().doubleValue() : 0.0,
                kpi.getPendingAlerts()
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/events/stream/latest")
    public ResponseEntity<List<EventStreamDTO>> getLatestKafkaEvents() {
        List<EventStream> events = eventRepository.findTop10ByOrderByEventTimestampDesc();
        List<EventStreamDTO> dtos = events.stream()
                .map(e -> new EventStreamDTO(
                        e.getId(),
                        e.getTopic(),
                        e.getEventTimestamp() != null ? e.getEventTimestamp().toLocalTime().toString() : "",
                        e.getSource(),
                        e.getPayload(),
                        e.getStatus()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
}
