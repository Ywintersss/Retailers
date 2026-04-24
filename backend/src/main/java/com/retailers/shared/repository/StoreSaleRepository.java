package com.retailers.shared.repository;

import com.retailers.shared.entity.StoreSale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface StoreSaleRepository extends JpaRepository<StoreSale, Long> {
    List<StoreSale> findByStoreIdAndSaleDateBetween(String storeId, LocalDate startDate, LocalDate endDate);
}
