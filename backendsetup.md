# FranchiseIQ Backend Setup Summary

Here is a summary of everything that has been implemented to migrate the backend from mock data to a PostgreSQL-backed data layer for the standard CRUD operations.

## 1. Database Schema & Seeding
To initialize the PostgreSQL database cleanly, standard Spring Boot initialization scripts were added to the `src/main/resources/` directory:

*   **`schema.sql`**: Created table definitions for the core domain.
    *   `store`: Store demographics, coordinates, and manager details.
    *   `dashboard_kpi`: Tracks aggregated KPIs like revenue, inventory health, and sentiment.
    *   `store_sale`: Historical timeline of sales and forecasts.
    *   `event_stream`: A log of Kafka events (e.g., POS transactions, sensor alerts).
    *   `product`: Product catalog with current stock and pricing.
*   **`data.sql`**: Populated the tables with initial mock data mirroring the frontend demo requirements (e.g., MiXue locations, sample sales timelines, product SKUs).
*   **`application.properties`**: Configured `spring.sql.init.mode=always` to ensure these scripts run automatically on application startup.

## 2. JPA Entities
Created domain entities in `com.retailers.shared.entity` using Jakarta Persistence annotations (`@Entity`, `@Table`, `@Id`) to map directly to the newly created database tables:
*   `Store.java`
*   `DashboardKpi.java`
*   `StoreSale.java`
*   `EventStream.java`
*   `Product.java`

## 3. Data Access Layer (Repositories)
Created Spring Data JPA repositories in `com.retailers.shared.repository` to provide out-of-the-box data access methods:
*   `StoreRepository`
*   `DashboardKpiRepository`
*   `StoreSaleRepository` (Includes custom queries like `findByStoreIdAndSaleDateBetween`)
*   `EventStreamRepository` (Includes custom queries like `findTop10ByOrderByEventTimestampDesc`)
*   `ProductRepository`

## 4. REST Controller Integration
Refactored the existing `DashboardController` (`com.retailers.dashboard.adapter.in.DashboardController`) to use the new repositories:
*   **Removed Mock Data**: Removed the empty `ResponseEntity.ok().build()` mock responses.
*   **Repository Injection**: Autowired the necessary repositories via constructor injection.
*   **DTO Mapping**: Added mapping logic to cleanly convert the fetched database Entities into the specific DTO Records (e.g., `SalesDataPoint`, `DashboardKPIResponse`, `EventStreamDTO`) expected by the React frontend.
*   **Endpoints Updated**:
    *   `GET /api/v1/stores/{storeId}`
    *   `GET /api/v1/stores/{storeId}/sales`
    *   `GET /api/v1/dashboard/kpis`
    *   `GET /api/v1/events/stream/latest`

## 5. Kafka Event Ingestion
Implemented a Kafka Consumer (`PosTransactionConsumer`) to ingest real-time events from the POS systems directly into the database.
*   **Consumer Setup**: Uses `@KafkaListener` configured to listen to the `pos.transactions` topic.
*   **Event Handling**: Deserializes incoming `PosTransactionEvent` payloads.
*   **Database Persistence**: Automatically maps the event data into the `EventStream` entity and persists it into the `event_stream` table via the `EventStreamRepository` for the frontend to query.

## 6. AI Decision Nodes Integration (Z.AI GLM)
Successfully wired the LangChain4j Agents to pull real historical data from our new PostgreSQL JPA Repositories instead of using mock or broken data pipelines.

*   **Inventory Forecast (`InventoryAiTools`)**: Injects `ProductRepository` and `StoreSaleRepository` to provide the AI with real-time global stock and 30-day sales history.
*   **Pricing Optimization (`PricingAiTools`)**: Injects `ProductRepository` and `StoreSaleRepository` to provide the AI with product pricing and historical revenue data for peak/off-peak elasticity analysis.
*   **Actionable Insights & Sentiment (`IntelligenceAiTools`)**: Injects `EventStreamRepository` and `DashboardKpiRepository` to feed recent POS/sensor events and store KPI data into the AI context for sentiment pattern detection and critical issue flagging.

All AI Agents are configured and registered as Spring Beans in `AiConfig` and actively used by their respective REST Controllers (`InventoryController`, `PricingControllers`, `IntelligenceController`).
