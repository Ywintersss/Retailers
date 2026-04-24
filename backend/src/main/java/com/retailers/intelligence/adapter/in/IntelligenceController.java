package com.retailers.intelligence.adapter.in;

import com.retailers.intelligence.adapter.in.dto.ActionableInsightResponse;
import com.retailers.intelligence.adapter.in.dto.ApplyInsightRequest;
import com.retailers.intelligence.adapter.in.dto.SentimentResponse;
import com.retailers.intelligence.application.port.out.IntelligenceAgent;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ai")
public class IntelligenceController {

    private final IntelligenceAgent intelligenceAgent;

    public IntelligenceController(IntelligenceAgent intelligenceAgent) {
        this.intelligenceAgent = intelligenceAgent;
    }

    @PostMapping("/sentiment/analyze/{storeId}")
    public ResponseEntity<SentimentResponse> analyzeSentiment(@PathVariable String storeId) {
        String prompt = "Store: " + storeId + ". Perform sentiment analysis on recent store feedback and events.";
        return ResponseEntity.ok(intelligenceAgent.analyzeSentiment(prompt));
    }

    @GetMapping("/insights/{storeId}")
    public ResponseEntity<ActionableInsightResponse> getActionableInsights(@PathVariable String storeId) {
        String prompt = "Store: " + storeId + ". Generate actionable insights from recent store data.";
        return ResponseEntity.ok(intelligenceAgent.generateInsights(prompt));
    }

    @PostMapping("/insights/apply")
    public ResponseEntity<Void> applyInsight(@RequestBody ApplyInsightRequest applyRequest) {
        return ResponseEntity.ok().build();
    }
}
