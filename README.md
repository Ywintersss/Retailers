# 🧠 FranchiseIQ — [AI Decision Intelligence Dashboard](https://retailers.webhop.me)
https://retailers.webhop.me

https://github.com/user-attachments/assets/afde86fc-5a13-4cc5-9bd1-9706b7f7e276

> **UMHackathon 2026 Submission**
> AI-powered franchise intelligence for retail chains in Malaysia's sinking markets.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154)](https://tanstack.com/query)

---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Solution Overview](#-solution-overview)
- [Core Features (MVP)](#-core-features-mvp)
- [Architecture](#-architecture)



- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Design System](#-design-system)

---

## 🎯 Problem Statement

In Malaysia, franchise operators in **sinking markets** (Tier 2–3 cities) face:

| Challenge                    | Impact                                                 |
| ---------------------------- | ------------------------------------------------------ |
| **Supply Chain Fragility**   | 23% product waste from inaccurate forecasting          |
| **Fragmented Data**          | POS, weather, social, and audit data in separate silos |
| **Operational Bottlenecks**  | Manual decision-making by non-technical store managers |
| **No Decision Intelligence** | Reactive instead of proactive store management         |

---

## 💡 Solution Overview

**FranchiseIQ** is a real-time decision intelligence dashboard that uses **Z.AI's GLM** (Generative Language Model) to transform fragmented data into actionable, explainable recommendations for store managers.

### Key Differentiators

1. **"Remove the AI" Test** — AI sits purely in the Use Case layer. Standard CRUD works without it; only the highlighted "Decision Nodes" require GLM.
2. **Anti-Hallucination** — Every recommendation has an "Explain Decision" panel showing data variables and reasoning chains.
3. **Human-in-the-Loop** — Managers can adjust AI priorities via trade-off sliders.
4. **Data Unification** — Apache Kafka streams visualize real-time data from POS, weather, social, and audit sources.

---

## 🚀 Core Features (MVP)

### 1. Inventory Forecasting

- **What:** 7-day demand prediction per SKU with stockout risk scoring
- **AI Role:** Cross-references weather (OpenWeatherAPI), historical POS data, school calendar, and social trends
- **Impact:** 15% reduction in waste, prevents stockout-related revenue loss
- **Component:** `InventoryForecastPanel.jsx`

### 2. Sentiment Analysis

- **What:** NLP analysis of POS reviews, Google Reviews, and social media mentions
- **AI Role:** Entity-level sentiment extraction, temporal clustering for anomaly detection
- **Impact:** Faster crisis response (food safety alerts within hours, not days)
- **Component:** `SentimentAnalysisPanel.jsx`

### 3. Dynamic Pricing

- **What:** Peak/off-peak price optimization with per-SKU elasticity modeling
- **AI Role:** Econometric modeling + demographic analysis for localized pricing
- **Impact:** +14% projected revenue uplift per store
- **Component:** `DynamicPricingPanel.jsx`

### 4. Actionable Insights

- **What:** Priority-ranked, plain-language recommendations for non-technical managers
- **AI Role:** Synthesizes all data streams into clear action items with confidence scores
- **Impact:** Increased manager "buy-in" and faster action execution
- **Component:** `ActionableInsightsPanel.jsx`

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │ Standard │  │    AI    │  │  Kafka   │  │   Supabase   │   │
│  │   CRUD   │  │ Decision │  │  Stream  │  │  Real-time   │   │
│  │ Endpoints│  │  Nodes   │  │  Feed    │  │    Sync      │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────┬───────┘   │
│       │              │             │               │            │
│  TanStack Query (Data Layer + Caching)             │            │
└───────┼──────────────┼─────────────┼───────────────┼────────────┘
        │              │             │               │
        ▼              ▼             ▼               ▼
┌───────────────────────────────────────────────────────────────┐
│                 BACKEND (Java Spring Boot)                     │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                   Adapter Layer                          │  │
│  │  REST Controllers  │  Kafka Consumer  │  Supabase Repo  │  │
│  └─────────────────────────┬───────────────────────────────┘  │
│  ┌─────────────────────────┼───────────────────────────────┐  │
│  │              Application / Use Case Layer                │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │         Z.AI GLM (via LangChain4j)               │   │  │
│  │  │  • Inventory Forecast Use Case                    │   │  │
│  │  │  • Sentiment Analysis Use Case                    │   │  │
│  │  │  • Dynamic Pricing Use Case                       │   │  │
│  │  │  • Insight Generation Use Case                    │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  └─────────────────────────┬───────────────────────────────┘  │
│  ┌─────────────────────────┼───────────────────────────────┐  │
│  │                   Domain Layer                           │  │
│  │  Entities  │  Value Objects  │  Domain Services          │  │
│  └─────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
        │              │             │
        ▼              ▼             ▼
┌──────────────┐ ┌───────────┐ ┌──────────────┐
│  Supabase    │ │   Kafka   │ │ External APIs│
│ (PostgreSQL) │ │  Cluster  │ │ (Weather,etc)│
└──────────────┘ └───────────┘ └──────────────┘
```

---

## 📁 Folder Structure

```
src/
├── main.jsx                          # App entry point + TanStack Query provider
├── App.jsx                           # Root component with sidebar routing
├── index.css                         # Design system (Tailwind v4 theme + utilities)
│
├── lib/                              # Infrastructure / external service clients
│   ├── supabaseClient.js             # Supabase JS client initialization
│   └── apiClient.js                  # REST API client for Spring Boot backend
│
├── data/
│   └── mockData.js                   # Mock data mirroring backend response schemas
│
├── hooks/
│   └── useApiQueries.js              # TanStack Query hooks (CRUD + AI Decision)
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx               # Collapsible sidebar navigation
│   │   └── Header.jsx                # Top bar: store info, search, notifications
│   │
│   ├── shared/
│   │   ├── AIDecisionNode.jsx        # AI badge + "Explain Decision" panel
│   │   ├── KPICard.jsx               # Metric card with trend indicator
│   │   └── EventStreamFeed.jsx       # Real-time Kafka event stream display
│   │
│   ├── features/
│   │   ├── InventoryForecastPanel.jsx # Feature #1: Stockout prediction
│   │   ├── SentimentAnalysisPanel.jsx # Feature #2: Review/social sentiment
│   │   ├── DynamicPricingPanel.jsx    # Feature #3: Price optimization
│   │   └── ActionableInsightsPanel.jsx# Feature #4: Manager recommendations
│   │
│   └── charts/
│       └── SalesChart.jsx            # Revenue vs AI forecast area chart
│
└── views/
    └── DashboardView.jsx             # Main dashboard composing all panels
```

### File Responsibilities

| File                                    | Purpose                                                                 |
| --------------------------------------- | ----------------------------------------------------------------------- |
| `lib/supabaseClient.js`                 | Initializes Supabase with env credentials; falls back to demo mode      |
| `lib/apiClient.js`                      | HTTP client separating standard CRUD from AI decision endpoints         |
| `data/mockData.js`                      | Complete mock responses matching backend schemas for demo               |
| `hooks/useApiQueries.js`                | TanStack Query hooks with automatic mock data fallback                  |
| `components/shared/AIDecisionNode.jsx`  | `<AIDecisionBadge>` and `<ExplainDecisionPanel>` — core transparency UX |
| `components/shared/EventStreamFeed.jsx` | Visualizes multi-source Kafka data streams                              |
| `components/features/*.jsx`             | Each file = one core AI feature with explanation panel                  |

---

## 🛠 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
git clone https://github.com/your-org/franchise-iq.git
cd franchise-iq

# Copy environment variables
cp .env.example .env

# Install dependencies
npm install

# Start dev server
npm run dev
```

The dashboard runs at `http://localhost:5173` with **mock data** when the backend is unavailable.

### Environment Variables

| Variable                 | Description                                                        |
| ------------------------ | ------------------------------------------------------------------ |
| `VITE_SUPABASE_URL`      | Supabase project URL                                               |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key                                             |
| `VITE_API_BASE_URL`      | Spring Boot API base URL (default: `http://localhost:8080/api/v1`) |

---

## 📡 API Documentation

### Base URL

```
http://localhost:8080/api/v1
```

---

### Standard CRUD Endpoints

These endpoints work **without** the GLM — pure data retrieval.

#### `GET /stores/{storeId}`

Returns store information.

**Response:**

```json
{
  "id": "store-kl-001",
  "name": "MiXue — Bukit Bintang",
  "region": "Kuala Lumpur",
  "tier": "Tier 1 — High Traffic",
  "managerId": "mgr-001",
  "managerName": "Aisyah binti Mohd",
  "status": "operational",
  "openedDate": "2024-03-15",
  "coordinates": { "lat": 3.1478, "lng": 101.7134 }
}
```

#### `GET /dashboard/kpis`

Returns aggregated KPI metrics.

**Response:**

```json
{
  "dailyRevenue": 12480,
  "dailyRevenueChange": 8.3,
  "inventoryHealth": 87,
  "inventoryHealthChange": -2.1,
  "customerSentiment": 4.2,
  "customerSentimentChange": 0.3,
  "wasteReduction": 15.2,
  "wasteReductionChange": 3.1,
  "activeSKUs": 42,
  "pendingAlerts": 3
}
```

#### `GET /stores/{storeId}/sales?range=14d`

Returns sales timeline data.

**Response:**

```json
[
  {
    "date": "Apr 13",
    "revenue": 10200,
    "orders": 412,
    "forecast": 10500
  }
]
```

#### `GET /events/stream/latest`

Returns latest Kafka event stream entries.

**Response:**

```json
[
  {
    "id": "evt-001",
    "topic": "pos.transactions",
    "timestamp": "15:28:42",
    "source": "POS Terminal #3",
    "payload": "Order #4521 — Brown Sugar Boba x2",
    "status": "processed"
  }
]
```

---

### AI Decision Endpoints (GLM-Powered)

These endpoints **require** the Z.AI GLM. If the GLM is removed, they return error responses and the frontend shows "AI Unavailable" states.

#### `POST /ai/inventory/forecast/{storeId}`

Generates AI-powered inventory forecast.

**Request:**

```json
{
  "horizon": "7d",
  "includeWeather": true,
  "includeSocial": true
}
```

**Response:**

```json
{
  "decisionId": "dec-inv-20260419",
  "generatedAt": "2026-04-19T15:00:00Z",
  "glmModel": "Z.AI GLM v3.2",
  "storeId": "store-kl-001",
  "forecastHorizon": "7 days",
  "predictions": [
    {
      "sku": "ICE-CREAM-VANILLA",
      "name": "Vanilla Ice Cream (500ml)",
      "currentStock": 120,
      "predictedDemand": 185,
      "restockRecommendation": 80,
      "confidence": 0.92,
      "stockoutRisk": "HIGH",
      "daysUntilStockout": 2
    }
  ],
  "explanation": {
    "summary": "Demand surge predicted due to school holidays...",
    "dataVariables": [
      {
        "name": "Weather Forecast",
        "value": "34°C avg, 72% humidity",
        "source": "OpenWeather API",
        "weight": 0.35
      }
    ],
    "reasoning": "The GLM cross-referenced 4 data streams..."
  }
}
```

#### `POST /ai/sentiment/analyze/{storeId}`

Runs NLP sentiment analysis on reviews and social data.

**Response:**

```json
{
  "decisionId": "dec-sen-20260419",
  "glmModel": "Z.AI GLM v3.2",
  "overallScore": 4.2,
  "totalReviews": 1284,
  "period": "Last 30 days",
  "breakdown": { "positive": 68, "neutral": 22, "negative": 10 },
  "topics": [
    { "topic": "Taste Quality", "score": 4.5, "mentions": 342, "trend": "up" }
  ],
  "alerts": [
    {
      "severity": "critical",
      "topic": "Food Safety",
      "message": "Cluster of 4 reviews mentioning temperature issues...",
      "reviewSnippets": ["\"My ice cream was basically soup...\""],
      "recommendedAction": "Immediate equipment inspection of freezer unit B."
    }
  ],
  "explanation": {
    "summary": "Overall sentiment is positive (4.2/5), but a critical pattern detected...",
    "dataVariables": [...],
    "reasoning": "The GLM performed entity-level sentiment analysis..."
  }
}
```

#### `POST /ai/pricing/optimize/{storeId}`

Generates dynamic pricing recommendations.

**Request:**

```json
{
  "strategy": "peak-offpeak"
}
```

**Response:**

```json
{
  "decisionId": "dec-pri-20260419",
  "glmModel": "Z.AI GLM v3.2",
  "currentStrategy": "Peak/Off-Peak Optimization",
  "tradeoffWeights": {
    "costSaving": 40,
    "brandPresence": 35,
    "revenueMaximization": 25
  },
  "recommendations": [
    {
      "sku": "BROWN-SUGAR-BOBA",
      "name": "Brown Sugar Boba",
      "currentPrice": 8.90,
      "recommendedPrice": 9.50,
      "changePercent": 6.7,
      "period": "Peak (12PM–2PM)",
      "expectedImpact": "+RM 340/day revenue",
      "elasticity": -0.82
    }
  ],
  "projectedRevenue": {
    "withoutOptimization": 12480,
    "withOptimization": 14230,
    "uplift": 14.0,
    "upliftAmount": 1750
  },
  "explanation": { ... }
}
```

#### `PUT /ai/pricing/weights/{storeId}`

Updates trade-off weights (Human-in-the-Loop override).

**Request:**

```json
{
  "costSaving": 50,
  "brandPresence": 30,
  "revenueMaximization": 20
}
```

#### `GET /ai/insights/{storeId}`

Returns prioritized actionable insights.

**Response:**

```json
{
  "decisionId": "dec-ins-20260419",
  "glmModel": "Z.AI GLM v3.2",
  "insights": [
    {
      "id": "insight-001",
      "priority": "critical",
      "category": "Equipment",
      "title": "Freezer Unit B — Possible Malfunction",
      "summary": "Customer reviews indicate drinks served warm...",
      "action": "Schedule maintenance inspection within 24 hours.",
      "estimatedImpact": "Prevents ~RM 2,400 in potential waste.",
      "confidence": 0.87,
      "status": "pending"
    }
  ]
}
```

#### `POST /ai/insights/apply`

Applies a recommended insight action.

**Request:**

```json
{
  "insightId": "insight-001",
  "action": "Schedule maintenance inspection within 24 hours."
}
```

---

### Event Ingestion Endpoint

#### `POST /events/pos/ingest`

Triggers POS data ingestion into the Kafka pipeline.

**Request:**

```json
{
  "storeId": "store-kl-001",
  "terminalId": "POS-03",
  "transactionType": "sale",
  "items": [{ "sku": "BROWN-SUGAR-BOBA", "quantity": 2, "price": 8.9 }],
  "timestamp": "2026-04-19T15:28:42Z"
}
```

---

## 🎨 Design System

### Color Palette

| Token       | Hex       | Usage                             |
| ----------- | --------- | --------------------------------- |
| Primary     | `#F54E00` | CTAs, active states, AI accents   |
| Secondary   | `#F1A82C` | Warnings, secondary highlights    |
| Tertiary    | `#2F80FA` | Info, forecasts, data viz         |
| Neutral-950 | `#0D0E10` | Page background                   |
| Neutral-800 | `#1E1F23` | Card backgrounds                  |
| Success     | `#22C55E` | Positive trends, sufficient stock |
| Danger      | `#EF4444` | Alerts, critical items            |

### Typography

| Role      | Font          | Weight  |
| --------- | ------------- | ------- |
| Headings  | Space Grotesk | 600–700 |
| Body text | Inter         | 300–500 |
| Labels    | Space Grotesk | 500     |

### Key UI Patterns

- **Glassmorphism** — `.glass-card` class for all card containers
- **AI Decision Badge** — Pulsing `ai-badge` on every GLM-powered component
- **Explain Decision Panel** — Expandable panel showing data variables, weights, and reasoning
- **Trade-off Sliders** — Human-in-the-loop adjustment that auto-balances to 100%
- **Event Stream Feed** — Color-coded real-time Kafka events showing data provenance

---

## 📄 License

MIT — Built for UMHackathon 2026.
