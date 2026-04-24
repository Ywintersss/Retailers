CREATE TABLE IF NOT EXISTS store (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    region VARCHAR(100),
    tier VARCHAR(50),
    manager_id VARCHAR(50),
    manager_name VARCHAR(255),
    status VARCHAR(50),
    opened_date DATE,
    latitude DECIMAL(10, 6),
    longitude DECIMAL(10, 6)
);

CREATE TABLE IF NOT EXISTS dashboard_kpi (
    id SERIAL PRIMARY KEY,
    store_id VARCHAR(50) REFERENCES store(id),
    daily_revenue DECIMAL(12, 2),
    daily_revenue_change DECIMAL(5, 2),
    inventory_health DECIMAL(5, 2),
    inventory_health_change DECIMAL(5, 2),
    customer_sentiment DECIMAL(3, 1),
    customer_sentiment_change DECIMAL(3, 1),
    waste_reduction DECIMAL(5, 2),
    waste_reduction_change DECIMAL(5, 2),
    active_skus INTEGER,
    pending_alerts INTEGER,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS store_sale (
    id SERIAL PRIMARY KEY,
    store_id VARCHAR(50) REFERENCES store(id),
    sale_date DATE NOT NULL,
    revenue DECIMAL(12, 2),
    orders_count INTEGER,
    forecast DECIMAL(12, 2),
    UNIQUE(store_id, sale_date)
);

CREATE TABLE IF NOT EXISTS event_stream (
    id VARCHAR(50) PRIMARY KEY,
    topic VARCHAR(100) NOT NULL,
    event_timestamp TIMESTAMP NOT NULL,
    source VARCHAR(100),
    payload TEXT,
    status VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS product (
    sku VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    current_stock INTEGER,
    current_price DECIMAL(10, 2)
);
