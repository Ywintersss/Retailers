package com.retailers.healthcheck;

import com.retailers.inventory.adapter.out.PosEventProducer;
import com.retailers.shared.event.PosTransactionEvent;

import java.sql.Connection;

import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/ai")
public class HealthCheck {

    private final PosEventProducer producer;
    private final JdbcTemplate jdbcTemplate;
    private final DataSource dataSource;
    private final com.retailers.shared.adapter.out.WeatherAiTools weatherTools;

    public HealthCheck(PosEventProducer producer, JdbcTemplate jdbcTemplate, DataSource dataSource, 
                       com.retailers.shared.adapter.out.WeatherAiTools weatherTools) {
        this.producer = producer;
        this.jdbcTemplate = jdbcTemplate;
        this.dataSource = dataSource;
        this.weatherTools = weatherTools;
    }

    // This maps to http://localhost:8080/
    @GetMapping("/")
    public String healthCheck() {
        return "Retailers Backend is running!";
    }

    @GetMapping("/test-jdbc")
    public String testJdbc() {
        try (Connection connection = dataSource.getConnection()) {
            System.out.println("JDBC Connection Successful");
            System.out.println("Connected to: " + connection.getMetaData().getURL());

            Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            if (result != null && result == 1) {
                return "SQL Execution Successful: Database is responsive.";
            }
            return "Connection successful but failed to execute test query";
        } catch (Exception e) {
            System.err.println("Database Connection Failed");
            System.err.println("Cause: " + e.getMessage());
            return "Database Connection Failed";
        }
    }

    @GetMapping("/test-weather")
    public String testWeather() {
        return weatherTools.getWeather("Kuala Lumpur");
    }

    // This maps to http://localhost:8080/test-kafka
    @GetMapping("/test-kafka")
    public String testKafka() {
        PosTransactionEvent event = new PosTransactionEvent("STORE-001", "TEST-SKU", 5, 12.99);
        producer.sendTransaction(event);
        return "Test transaction sent to Kafka!";
    }
}
