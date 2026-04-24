package com.retailers.shared.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "dashboard_kpi")
public class DashboardKpi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String storeId;
    private BigDecimal dailyRevenue;
    private BigDecimal dailyRevenueChange;
    private BigDecimal inventoryHealth;
    private BigDecimal inventoryHealthChange;
    private BigDecimal customerSentiment;
    private BigDecimal customerSentimentChange;
    private BigDecimal wasteReduction;
    private BigDecimal wasteReductionChange;
    private Integer activeSkus;
    private Integer pendingAlerts;
    private LocalDateTime recordedAt;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getStoreId() { return storeId; }
    public void setStoreId(String storeId) { this.storeId = storeId; }
    public BigDecimal getDailyRevenue() { return dailyRevenue; }
    public void setDailyRevenue(BigDecimal dailyRevenue) { this.dailyRevenue = dailyRevenue; }
    public BigDecimal getDailyRevenueChange() { return dailyRevenueChange; }
    public void setDailyRevenueChange(BigDecimal dailyRevenueChange) { this.dailyRevenueChange = dailyRevenueChange; }
    public BigDecimal getInventoryHealth() { return inventoryHealth; }
    public void setInventoryHealth(BigDecimal inventoryHealth) { this.inventoryHealth = inventoryHealth; }
    public BigDecimal getInventoryHealthChange() { return inventoryHealthChange; }
    public void setInventoryHealthChange(BigDecimal inventoryHealthChange) { this.inventoryHealthChange = inventoryHealthChange; }
    public BigDecimal getCustomerSentiment() { return customerSentiment; }
    public void setCustomerSentiment(BigDecimal customerSentiment) { this.customerSentiment = customerSentiment; }
    public BigDecimal getCustomerSentimentChange() { return customerSentimentChange; }
    public void setCustomerSentimentChange(BigDecimal customerSentimentChange) { this.customerSentimentChange = customerSentimentChange; }
    public BigDecimal getWasteReduction() { return wasteReduction; }
    public void setWasteReduction(BigDecimal wasteReduction) { this.wasteReduction = wasteReduction; }
    public BigDecimal getWasteReductionChange() { return wasteReductionChange; }
    public void setWasteReductionChange(BigDecimal wasteReductionChange) { this.wasteReductionChange = wasteReductionChange; }
    public Integer getActiveSkus() { return activeSkus; }
    public void setActiveSkus(Integer activeSkus) { this.activeSkus = activeSkus; }
    public Integer getPendingAlerts() { return pendingAlerts; }
    public void setPendingAlerts(Integer pendingAlerts) { this.pendingAlerts = pendingAlerts; }
    public LocalDateTime getRecordedAt() { return recordedAt; }
    public void setRecordedAt(LocalDateTime recordedAt) { this.recordedAt = recordedAt; }
}
