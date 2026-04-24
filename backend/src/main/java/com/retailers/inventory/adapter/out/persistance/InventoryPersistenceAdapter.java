package com.retailers.inventory.adapter.out.persistance;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.retailers.inventory.application.port.out.InventoryRepository;
import com.retailers.inventory.domain.model.StockLevel;

@Repository
public class InventoryPersistenceAdapter implements InventoryRepository {
    private final JdbcTemplate jdbc;

    public InventoryPersistenceAdapter(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public List<StockLevel> getCurrentStockByStore(String storeId) {
        String sql = "SELECT sku_id, quantity, unit FROM stock WHERE store_id = ?";
        return jdbc.query(sql, (rs, row) -> new StockLevel(
                rs.getString("product_id"),
                rs.getDouble("quantity"),
                rs.getString("unit")), storeId);
    }

    @Override
    public Map<String, Integer> getHistoricalSales(String storeId, int days) {
        String sql = "SELECT sku, SUM(quantity) as total FROM sales_history " +
                "WHERE store_id = ? AND sale_date > NOW() - INTERVAL '? days' " +
                "GROUP BY sku";
        // Implementation would map results to a Map<String, Integer>
        return new HashMap<>();
    }
}
