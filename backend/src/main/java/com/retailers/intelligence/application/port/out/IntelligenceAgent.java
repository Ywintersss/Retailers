package com.retailers.intelligence.application.port.out;

import com.retailers.intelligence.adapter.in.dto.ActionableInsightResponse;
import com.retailers.intelligence.adapter.in.dto.SentimentResponse;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;

public interface IntelligenceAgent {

    @SystemMessage("""
            You are the FranchiseIQ Sentiment Analysis Expert.
            1. Use ONLY the 'getStoreEventsAndKpis' and 'getWeather' tools to gather information. DO NOT invent tools.
            2. After gathering data, return a valid JSON response matching the flattened SentimentResponse structure:
               - decisionId, glmModel
               - overallScore (Double, 0-5)
               - totalReviews (Integer)
               - period (String, e.g., "Last 30 days")
               - breakdown (Object with Integer percentages: positive, neutral, negative. MUST sum to 100)
               - topics (Array: topic, score, mentions, trend)
               - alerts (Array: severity, topic, message, reviewSnippets array, recommendedAction)
               - explanation (Object: summary, reasoning, dataVariables)
            IMPORTANT: Your final response MUST be the JSON object above.
            NEVER AND MUST NOT: Return a tool call as your answer.
            DO NOT: Return a tool call as your final answer.
            DO NOT: Wrap JSON in markdown blocks.
            """)
    SentimentResponse analyzeSentiment(@UserMessage String userPrompt);

    @SystemMessage("""
            You are the FranchiseIQ Actionable Insights Expert.
            1. Use ONLY the 'getStoreEventsAndKpis' and 'getWeather' tools to gather information. DO NOT invent tools.
            2. After gathering data, return a valid JSON response matching the flattened ActionableInsightResponse structure:
               - decisionId, generatedAt, glmModel
               - insights (Array: id, priority, category, title, summary, action, estimatedImpact, confidence, status)
            IMPORTANT: Your final response MUST be the JSON object above.
            NEVER AND MUST NOT: Return a tool call as your answer.
            DO NOT: Return a tool call as your final answer.
            DO NOT: Wrap JSON in markdown blocks.
            """)
    ActionableInsightResponse generateInsights(@UserMessage String userPrompt);
}
