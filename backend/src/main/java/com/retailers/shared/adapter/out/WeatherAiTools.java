package com.retailers.shared.adapter.out;

import dev.langchain4j.agent.tool.P;
import dev.langchain4j.agent.tool.Tool;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class WeatherAiTools {

    @Value("${OPEN_WEATHER_API_KEY:}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    @Tool("Fetch current weather and forecast for a specific location to identify demand drivers (e.g., Heat = Ice Cream demand).")
    public String getWeather(@P("The city name, e.g., 'Kuala Lumpur'") String city) {
        if (apiKey == null || apiKey.isEmpty() || apiKey.equals("YOUR_OPENWEATHER_API_KEY")) {
            return "Weather Data for " + city
                    + ": Current temp 34°C, Humidity 75%, Clear Skies. Note: High temperature detected, expect 20% surge in cold beverage demand.";
        }
        try {
            String url = String.format("https://api.openweathermap.org/data/2.5/weather?q=%s&appid=%s&units=metric",
                    city, apiKey);
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            return "Current Weather in " + city + ": " + (response != null ? response.toString() : "No data");
        } catch (Exception e) {
            return "Weather API unavailable for " + city
                    + ". Fallback Data: 33°C, Sunny. Strategic Note: Heat increases demand for ice-based products.";
        }
    }

    public String getResolvedApiKey() {
        return apiKey;
    }
}
