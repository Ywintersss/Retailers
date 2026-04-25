# Product Context: FranchiseIQ (Retailers Intelligence Platform)
**UMHackathon 2026 - Official Submission Context**

---

## 1. Project Overview
**Problem Statement:** 
Retail managers currently rely on static, historical reports to make critical decisions about pricing, inventory, and equipment maintenance. This manual process is slow, reactive, and often ignores real-time market shifts (e.g., sudden demand surges for "Boba" or equipment malfunctions), leading to significant revenue leakage and high waste.

**Target Domain:** 
Retail & Franchise Management (Specifically high-traffic sinking markets like MiXue outlets in Malaysia).

**Proposed Solution Summary:** 
FranchiseIQ is an AI-native "Command Center" that shifts the manager's role from a manual analyst to a high-level curator. By leveraging a real-time event-driven architecture (Kafka) and Generative AI (Z AI GLM), the system identifies anomalies and provides instant, actionable "Decision Nodes" for pricing, sentiment, and stock management.

---

## 2. Background & Business Objective
**Background of the Problem:** 
For years, franchise management followed a linear, manual path: POS data was uploaded EOD, analyzed by corporate next week, and pricing changes were pushed via PDF. This disconnect prevents stores from responding to hyper-local events (festivals, weather changes, or competitor price drops) in real-time.

**Importance of Solving This Issue:** 
Accelerating the decision-making cycle from weeks to seconds allows retailers to capture missed revenue during peak hours and drastically reduce perishable waste. It empowers local managers with "Data-Scientist-level" insights without requiring them to leave the store floor.

**Strategic Fit / Impact:** 
Aligns with the **AI-Native Development Lifecycle**. By using **LangChain4j** and **Google Gemini/GLM**, the entire intelligence layer is decoupled from the UI, allowing for rapid iteration of "Decision Agents" that can be exported to various cloud environments.

---

## 3. Product Purpose
### 3.1. Main Goal of the System: 
To provide an AI-enabled co-pilot for retail managers that bridges the gap between raw data (POS transactions) and executive action.

### 3.2. Intended Users:
- Store/Franchise Managers
- Regional Supervisors
- Inventory & Supply Chain Leads
- Product Owners

---

## 4. System Functionalities
### 4.1. Description:
The system operates as a real-time generative engine for retail strategy. It consumes unstructured POS streams and translates them into structured "Actionable Insights" and "Optimization Recalculations."

### 4.2. Key Functionalities:
- **Dynamic Pricing (Human-in-the-Loop):** Translates complex trade-off priorities (e.g., "Max Revenue") into per-SKU price recommendations.
- **Sentiment Re-analysis:** Aggregates real-time feedback and equipment alerts (e.g., Freezer Temp) to score store health.
- **Inventory Forecasting:** Predictive stock modeling with "Generated Explanations" for why specific restocks are needed.
- **Kafka Event Streaming:** A live "heartbeat" of every transaction occurring across the franchise network.

### 4.3. AI Model & Prompt Design
- **4.3.1. Model Selection:** **Z AI GLM (FranchiseIQ-Sentiment-v2.3)**. Chosen for its high reasoning capabilities in financial trade-offs and ability to generate strictly structured JSON without markdown overhead.
- **4.3.2. Prompting Strategy:** **Multi-step Agentic Prompting**. We use a chain-of-thought approach where the agent first "fetches" store data via custom Tools and then "analyzes" it against user-defined weights.
- **4.3.3. Context & Input Handling:** The system uses **DTO Flattening** to ensure the LLM receives only relevant, high-density data. Maximum input is capped at 128k tokens (Gemini 1.5 Pro backend support), with truncation logic prioritizing the most recent 30 days of sales history.
- **4.3.4. Fallback Behavior:** Implements a **Graceful Error State** with a "RECALCULATING..." UI fallback. If the model hallucinations are detected (invalid JSON), the system retries with a "Strict Schema" correction prompt.

---

## 5. User Stories & Use Cases
**User Stories:** 
- *"As a store manager, I want to adjust my revenue priorities using a slider so the AI can instantly recalculate my drink prices for the afternoon peak."*
- *"As a supervisor, I want to see a live stream of alerts so I can identify a broken freezer before it ruins the ice cream stock."*

**Use Cases:**
- **Weight-Based Recalculation:** User moves slider -> React triggers debounced `POST /recalculate` -> AI generates new RM price list -> UI updates instantly.

---

## 6. Features Included (Scope)
- Interactive 2D Dashboard with glassmorphism aesthetics.
- Real-time Pricing sliders with auto-balancing weights.
- Sentiment analysis cards with "AI Explanations."
- Full Spring Boot backend with PostgreSQL persistence.
- Automated Testing Suite (Vitest & JUnit).

---

## 7. Features Not Included (Scope Control)
- Real-time communication between users (Chat).
- Production-ready payment gateway integration.
- Mobile App version (Initial version is Web-only).

---

## 8. Assumptions & Constraints
- **LLM Cost Constraint:** Estimated token cost is $0.05 per manager session. Decision: We use **Debounced Updates (1s)** and **React Query Caching** to prevent redundant AI inference.
- **Technical Constraints:** Backend built on **Spring Boot 3.4.1 (Java 21/26)**. API responses are limited to raw JSON (no markdown).
- **Performance Constraints:** AI re-analysis takes ~2-5 seconds; handled via `AnimatePresence` loading states.

---

## 9. Risks & Questions
- **Hallucination Risk:** Can the AI suggest prices that are *too* high? *Mitigation: Hard-coded pricing bounds in the backend.*
- **Data Latency:** Will Kafka keep up with 100+ stores? *Status: Tested with mock producer streams.*
- **Model Stability:** Ensuring the AI always returns the "flattened" DTO required by the frontend.
---

## 10. System Analysis Documentation (SAD)
### Introduction
This section introduces the strategic solution of the identified problem statement highlighted in Section 1 & 2. FranchiseIQ is designed as a modular, AI-native platform that bridges the gap between high-volume retail data and executive decision-making.

### Purpose
The SAD highlights the technical scope and architectural decisions behind the FranchiseIQ development.

### Target Stakeholders
| Stakeholder | Roles | Expectations |
|---|---|---|
| **Store Manager** | Adjusts weights for pricing, reviews AI insights, and monitors daily KPIs. | Real-time feedback, simple UI/UX, and "explainable" AI decisions. |
| **Regional Supervisor** | Monitors health across multiple stores and tracks sentiment trends. | Aggregated data views and proactive anomaly detection (e.g., freezer failure). |
| **Dev Team** | Builds and maintains the platform, AI agents, and data pipelines. | Modular (Hexagonal) codebase, clear API contracts, and stable AI structured outputs. |
| **QA Team** | Validates system behavior, AI accuracy, and real-time data integrity. | Defined request/response formats (flattened DTOs) and coverage of edge cases (e.g., Kafka lag). |

---

## 11. System Architecture & Design
### High-Level Architecture
- **Type**: Web Dashboard (React) + RESTful Backend (Spring Boot)
- **Architecture**: **Hexagonal Architecture (Ports & Adapters)** with an **Event-Driven Data Ingestion Layer (Kafka)**.

**LLM as a Service Layer (Dependency Flow):**
1. **Prompt Construction**: LangChain4j constructs prompts using system templates + real-time store data (Sales, Sentiment, Weights).
2. **Context Window**: Injects the last 30 days of sales history and current weight overrides (Cost/Brand/Revenue).
3. **Response Parsing**: System enforces "Raw JSON" output from GLM, parses it into flattened DTOs, and passes it to the React frontend.
4. **Token Enforcement**: Input is chunked via rolling sales windows to ensure we stay within the GLM context limits while maintaining historical relevance.

### Technological Stack
- **Frontend**: React 19 (Vite), Framer Motion, Recharts, TanStack Query.
- **Backend**: Spring Boot 3.4.1 (Java 21/26), LangChain4j.
- **Database**: PostgreSQL (JPA/Hibernate) for persistence.
- **Ingestion**: Apache Kafka for high-throughput POS data streaming.
- **Testing**: JUnit 5 (Backend), Vitest (Frontend).

---

## 12. Functional Requirements & Scope
### Minimum Viable Product (MVP)
| # | Feature | Description |
|---|---|---|
| 1 | **Dynamic Pricing Overrides** | Managers adjust trade-off weights; AI instantly recalculates per-SKU pricing recommendations. |
| 2 | **Sentiment Scorecard** | Aggregates feedback and technical alerts into a single 1-5 health score with AI summaries. |
| 3 | **Real-time Event Stream** | A "ticker" style view of the latest Kafka-ingested POS transactions. |
| 4 | **Automated AI Explanations** | Every decision node includes an "Explain This Decision" panel powered by GLM reasoning. |

### Non-Functional Requirements (NFRs)
| Quality | Requirements | Implementation |
|---|---|---|
| **Scalability** | Handle high-traffic "sinking markets" (MiXue) with thousands of daily transactions. | Kafka-based ingestion decoupled from the AI/REST layer. |
| **Reliability** | AI pricing suggestions must remain within +/- 20% of current prices. | Backend validation bounds for GLM outputs. |
| **Token Latency** | AI re-analysis must return within 3-5s (p95). | Debounced inputs (1s) and high-timeout (180s) client configuration. |
| **Cost Efficiency** | Limit LLM API costs per manager session. | React Query caching for 24h on static data; debounced re-calculations. |

---

## 13. Monitor, Evaluation & Dependencies
### Technical Evaluation
- **Grayscale Rollout**: New AI "Strategy Modules" (e.g., "Clearance Sale") are released to 5% of stores initially for monitoring.
- **Emergency Rollback**: If the GLM returns >1% invalid JSON, the system reverts to a "Heuristic-based" pricing fallback.

### Assumptions & Dependencies
- **Assumptions**: 
    - Store managers have stable internet for the web-dashboard.
    - POS systems can push data to our `/pos/ingest` endpoint via webhooks/Kafka.
- **External Dependencies**:
    - **Z AI GLM API**: Core reasoning engine. Risk: Rate limits. Mitigation: Local caching and graceful loading states.
    - **Google Gemini**: Secondary fallback engine for sentiment analysis.

---

## 14. Project Management
- **Timeline**: 
    - Day 1-3: Core Hexagonal Structure & Schema Design.
    - Day 4-6: AI Agent Orchestration & Kafka Ingestion.
    - Day 7-9: Frontend Rich UI & Real-time Sync.
    - Day 10: Final Deployment & Documentation (PRD/SAD).
- **Contributions**:
    - **Backend Lead**: Hexagonal design, AI Prompting, Kafka config.
    - **Frontend Lead**: React UI, Motion Design, API Integration.
---

## 15. Quality Assurance Testing Documentation (QATD)
### Objective
The primary objective is to ensure that FranchiseIQ reliably handles real-time POS data ingestion, AI-driven pricing recalculations, and sentiment scoring under concurrent load, with automated CI/CD checkpoints to prevent regression.

### 15.1 Scope & Requirements Traceability
- **In-Scope Core Features**:
    - **AI Pricing**: Weight-based optimization and real-time recalculation.
    - **Sentiment Tracking**: Analyzing store feedback and equipment alerts.
    - **Kafka Ingestion**: High-throughput transaction streaming from `/pos/ingest`.
- **Out-of-Scope**:
    - Multi-user real-time collaboration.
    - Production-grade payment gateway.

### 15.2 Risk Assessment & Mitigation Strategy
| Technical Risk | Likelihood (1-5) | Severity (1-5) | Risk Score | Mitigation Strategy | Testing Approach |
|---|---|---|---|---|---|
| **AI Hallucination in Pricing** | 2 | 5 | 10 (Med) | Implement backend "Sanity Bounds" (+/- 20% limit). | Unit tests for PriceValidator service. |
| **Kafka Topic Backlog** | 3 | 4 | 12 (High) | Use asynchronous processing and consumer monitoring. | Load testing with 10k+ mock events. |
| **Invalid JSON from GLM** | 3 | 5 | 15 (High) | Use LangChain4j Structured Output Parsers with retry logic. | Integration tests using malformed JSON mocks. |

---

### 15.3 Test Environment & Execution Strategy
- **Unit Tests**:
    - **Scope**: Java Domain logic & React utility functions.
    - **Execution**: JUnit 5 (Backend) and Vitest (Frontend) run on every commit.
    - **Isolation**: Heavy use of Mockito and Vi Mocks to isolate AI and DB dependencies.
- **Integration Tests**:
    - **Scope**: Controller-to-Agent communication.
    - **Execution**: `@WebMvcTest` with `MockMvc`.
    - **Isolation**: Mocks the physical GLM API to test our parsing logic and DTO flattening.
- **Passing Rate Threshold**:
    - **Critical Path**: 100% (Pricing Recalculation, POS Ingestion).
    - **Overall**: 90% test coverage for the core `application` layer.

---

### 15.4 Test Case Specifications (FranchiseIQ)
| ID | Type | Description | Expected Result |
|---|---|---|---|
| **TC-01** | **Happy Case: Dynamic Recalculation** | User drags "Revenue Max" slider to 80% and pauses. | Mutation triggers; AI returns new prices; UI updates with "uplift" amount. |
| **TC-02** | **Negative: Invalid Weight Sum** | User attempts to manually bypass slider logic to set weights totaling 150%. | UI auto-balances to 100% before API call; backend rejects any non-100 sum. |
| **TC-03** | **NFR: AI Response Latency** | Verify AI re-analysis speed under simulated load. | p95 response time < 5s; "RECALCULATING" badge visible during wait. |
| **TC-04** | **NFR: Kafka Throughput** | Ingest 100 POS events in < 1 second. | Backend returns `202 Accepted` immediately; events appear in dashboard ticker. |

---

### 15.5 AI Output & Boundary Testing
- **6.1 Prompt/Response Test Pair**:
    - **Input**: "Optimize pricing for store-kl-001 with 80% Cost Saving priority."
    - **Acceptance Criteria**: JSON must contain `recommendations` list where `recommendedPrice` is lower or equal to `currentPrice` to reflect cost-saving focus.
- **6.2 Oversized Input**:
    - **Limit**: 30 days of sales history.
    - **Behavior**: System automatically chunks sales data, keeping only the most recent 100 transactions per SKU if the limit is exceeded.
- **6.3 Hallucination Handling**:
    - **Mechanism**: We use **Z AI GLM** with a temperature of 0.1 for maximum determinism. The backend performs a post-inference schema validation. If the schema is broken, the system falls back to the previous stable decision cached in the database.
