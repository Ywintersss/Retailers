package com.retailers.shared.repository;

import com.retailers.shared.entity.DashboardKpi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DashboardKpiRepository extends JpaRepository<DashboardKpi, Long> {
    List<DashboardKpi> findByStoreId(String storeId);
}
