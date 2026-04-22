package com.retailers.intelligence.adapter.in;

import com.retailers.intelligence.adapter.in.dto.ActionableInsightResponse;
import com.retailers.intelligence.adapter.in.dto.ApplyInsightRequest;
import com.retailers.intelligence.adapter.in.dto.SentimentResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ai")
public class RestEndpoints {

    @PostMapping("/sentiment/analyze/{storeId}")
    public ResponseEntity<SentimentResponse> analyzeSentiment(@PathVariable String storeId) {
        // Changed Object -> SentimentResponse
        return ResponseEntity.ok().build();
    }

    @GetMapping("/insights/{storeId}")
    public ResponseEntity<ActionableInsightResponse> getActionableInsights(@PathVariable String storeId) {
        // Changed Object -> ActionableInsightResponse
        return ResponseEntity.ok().build();
    }

    @PostMapping("/insights/apply")
    public ResponseEntity<Void> applyInsight(@RequestBody ApplyInsightRequest applyRequest) {
        return ResponseEntity.ok().build();
    }
}
