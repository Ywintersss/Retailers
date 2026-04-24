package com.retailers.pricing.adapter.out.persistence;

import com.retailers.shared.repository.ProductRepository;
import com.retailers.shared.repository.StoreSaleRepository;
import com.retailers.shared.entity.Product;
import com.retailers.shared.entity.StoreSale;
import dev.langchain4j.agent.tool.P;
import dev.langchain4j.agent.tool.Tool;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class PricingAiTools {

    private final ProductRepository productRepository;
    private final StoreSaleRepository storeSaleRepository;

    public PricingAiTools(ProductRepository productRepository, StoreSaleRepository storeSaleRepository) {
        this.productRepository = productRepository;
        this.storeSaleRepository = storeSaleRepository;
    }

    @Tool("Fetch current product prices and historical sales data for a specific store to generate optimal pricing.")
    public String getPricingAndSalesData(@P("The store ID, e.g., 'store-kl-001'") String storeId) {
        List<Product> products = productRepository.findAll();
        String productsStr = products.stream()
            .map(p -> p.getName() + " (" + p.getSku() + "): RM " + p.getCurrentPrice())
            .collect(Collectors.joining(", "));

        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(30);
        List<StoreSale> sales = storeSaleRepository.findByStoreIdAndSaleDateBetween(storeId, startDate, endDate);
        
        String salesStr = sales.stream()
            .map(s -> s.getSaleDate() + " -> " + s.getRevenue() + " revenue")
            .collect(Collectors.joining(", "));

        return String.format("Current Prices: [%s], Recent Store Sales Revenue: [%s]", productsStr, salesStr);
    }
}
