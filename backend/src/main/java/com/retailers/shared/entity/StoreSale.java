package com.retailers.shared.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.math.BigDecimal;

@Entity
@Table(name = "store_sale")
public class StoreSale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String storeId;
    private LocalDate saleDate;
    private BigDecimal revenue;
    private Integer ordersCount;
    private BigDecimal forecast;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getStoreId() { return storeId; }
    public void setStoreId(String storeId) { this.storeId = storeId; }
    public LocalDate getSaleDate() { return saleDate; }
    public void setSaleDate(LocalDate saleDate) { this.saleDate = saleDate; }
    public BigDecimal getRevenue() { return revenue; }
    public void setRevenue(BigDecimal revenue) { this.revenue = revenue; }
    public Integer getOrdersCount() { return ordersCount; }
    public void setOrdersCount(Integer ordersCount) { this.ordersCount = ordersCount; }
    public BigDecimal getForecast() { return forecast; }
    public void setForecast(BigDecimal forecast) { this.forecast = forecast; }
}
