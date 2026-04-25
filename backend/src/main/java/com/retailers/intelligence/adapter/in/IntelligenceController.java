package com.retailers.intelligence.adapter.in;

import com.retailers.intelligence.adapter.in.dto.ActionableInsightResponse;
import com.retailers.intelligence.adapter.in.dto.ApplyInsightRequest;
import com.retailers.intelligence.adapter.in.dto.SentimentResponse;
import com.retailers.intelligence.application.port.out.IntelligenceAgent;
import com.retailers.intelligence.adapter.out.persistence.IntelligenceAiTools;
import com.retailers.shared.adapter.out.WeatherAiTools;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ai")
public class IntelligenceController {

    private final IntelligenceAgent intelligenceAgent;
    private final IntelligenceAiTools intelligenceTools;
    private final WeatherAiTools weatherTools;

    public IntelligenceController(IntelligenceAgent intelligenceAgent, 
                                 IntelligenceAiTools intelligenceTools, 
                                 WeatherAiTools weatherTools) {
        this.intelligenceAgent = intelligenceAgent;
        this.intelligenceTools = intelligenceTools;
        this.weatherTools = weatherTools;
    }

    @PostMapping("/sentiment/analyze/{storeId}")
    public ResponseEntity<SentimentResponse> analyzeSentiment(@PathVariable String storeId) {
        String eventData = intelligenceTools.getStoreEventsAndKpis(storeId);
        String weatherData = weatherTools.getWeather("Kuala Lumpur");

        String prompt = String.format(
            "CONTEXT DATA: %s\nWEATHER DATA: %s\n" +
            "INSTRUCTION: Perform sentiment analysis for Store %s based on recent feedback and context.",
            eventData, weatherData, storeId);

        return ResponseEntity.ok(intelligenceAgent.analyzeSentiment(prompt));
    }

    @GetMapping("/insights/{storeId}")
    public ResponseEntity<ActionableInsightResponse> getActionableInsights(@PathVariable String storeId) {
        String eventData = intelligenceTools.getStoreEventsAndKpis(storeId);
        String weatherData = weatherTools.getWeather("Kuala Lumpur");

        String prompt = String.format(
            "CONTEXT DATA: %s\nWEATHER DATA: %s\n" +
            "INSTRUCTION: Generate actionable insights for Store %s from recent data and context.",
            eventData, weatherData, storeId);

        return ResponseEntity.ok(intelligenceAgent.generateInsights(prompt));
    }

    @PostMapping("/insights/apply")
    public ResponseEntity<Void> applyInsight(@RequestBody ApplyInsightRequest applyRequest) {
        return ResponseEntity.ok().build();
    }
}
