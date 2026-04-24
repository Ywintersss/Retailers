package com.retailers.intelligence.application.port.out;

import com.retailers.intelligence.adapter.in.dto.ActionableInsightResponse;
import com.retailers.intelligence.adapter.in.dto.SentimentResponse;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;

public interface IntelligenceAgent {

    @SystemMessage("""
            You are the FranchiseIQ Sentiment Analysis Expert.
            1. Call tools to get recent POS events, sensor data, and KPIs for the store.
            2. Analyze reviews and alerts for sentiment patterns and topics.
            3. Return a valid JSON response matching the SentimentResponse structure.
            """)
    SentimentResponse analyzeSentiment(@UserMessage String userPrompt);

    @SystemMessage("""
            You are the FranchiseIQ Actionable Insights Expert.
            1. Call tools to get recent events, alerts, and store KPIs.
            2. Identify critical issues requiring management action (e.g., equipment failures, high waste).
            3. Return a valid JSON response matching the ActionableInsightResponse structure.
            """)
    ActionableInsightResponse generateInsights(@UserMessage String userPrompt);
}
