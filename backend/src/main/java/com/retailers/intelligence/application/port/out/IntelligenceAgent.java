package com.retailers.intelligence.application.port.out;

import com.retailers.intelligence.adapter.in.dto.ActionableInsightResponse;
import com.retailers.intelligence.adapter.in.dto.SentimentResponse;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;

public interface IntelligenceAgent {

    @SystemMessage("""
            You are the FranchiseIQ Sentiment Analysis Expert.
            1. Call tools to get recent POS events, KPIs, and WEATHER data.
            2. Return a valid JSON response matching the flattened SentimentResponse structure:
               - decisionId, generatedAt, glmModel
               - overallScore (Double)
               - totalReviews (Integer)
               - period (String, e.g., "Last 30 days")
               - breakdown (Object: positive, neutral, negative)
               - topics (Array: topic, score, mentions, trend)
               - alerts (Array: severity, topic, message, reviewSnippets array, recommendedAction)
               - explanation (Object: summary, reasoning, dataVariables)
            IMPORTANT: Return ONLY raw, valid JSON. Do not wrap it in markdown blocks (```json ... ```). Do not nest metadata under a "base" object.
            """)
    SentimentResponse analyzeSentiment(@UserMessage String userPrompt);

    @SystemMessage("""
            You are the FranchiseIQ Actionable Insights Expert.
            1. Call tools to get recent events, alerts, store KPIs, and WEATHER data.
            2. Return a valid JSON response matching the flattened ActionableInsightResponse structure:
               - decisionId, generatedAt, glmModel
               - insights (Array: id, priority, category, title, summary, action, estimatedImpact, confidence, status)
            IMPORTANT: Return ONLY raw, valid JSON. Do not wrap it in markdown blocks (```json ... ```). Do not nest metadata under a "base" object.
            """)
    ActionableInsightResponse generateInsights(@UserMessage String userPrompt);
}
