-- Insert Stores
INSERT INTO store (id, name, region, tier, manager_id, manager_name, status, opened_date, latitude, longitude)
VALUES 
('store-kl-001', 'MiXue — Bukit Bintang', 'Kuala Lumpur', 'Tier 1 — High Traffic', 'mgr-001', 'Aisyah binti Mohd', 'operational', '2024-03-15', 3.1478, 101.7134),
('store-pg-002', 'MiXue — Georgetown', 'Penang', 'Tier 1 — High Traffic', 'mgr-002', 'Lim Wei Ming', 'operational', '2023-11-20', 5.4141, 100.3288),
('store-jb-003', 'MiXue — Mount Austin', 'Johor Bahru', 'Tier 2 — Sinking Market', 'mgr-003', 'Siti Nurhaliza', 'operational', '2024-01-10', 1.5644, 103.7770);

-- Insert Dashboard KPIs (Aggregated or specific to store)
INSERT INTO dashboard_kpi (store_id, daily_revenue, daily_revenue_change, inventory_health, inventory_health_change, customer_sentiment, customer_sentiment_change, waste_reduction, waste_reduction_change, active_skus, pending_alerts)
VALUES 
('store-kl-001', 12480.00, 8.3, 87.0, -2.1, 4.2, 0.3, 15.2, 3.1, 42, 3),
('store-pg-002', 9850.00, -1.2, 92.0, 1.5, 4.5, 0.1, 18.0, 2.5, 40, 1),
('store-jb-003', 7200.00, 5.0, 78.0, -5.0, 3.8, -0.2, 10.5, -1.0, 38, 5);

-- Insert Sales Timeline Data
INSERT INTO store_sale (store_id, sale_date, revenue, orders_count, forecast)
VALUES 
('store-kl-001', CURRENT_DATE - INTERVAL '1 day', 10200.00, 412, 10500.00),
('store-kl-001', CURRENT_DATE - INTERVAL '2 days', 11050.00, 430, 10800.00),
('store-kl-001', CURRENT_DATE - INTERVAL '3 days', 9800.00, 395, 10000.00);

-- Insert Event Streams
INSERT INTO event_stream (id, topic, event_timestamp, source, payload, status)
VALUES 
('evt-001', 'pos.transactions', CURRENT_TIMESTAMP - INTERVAL '1 hour', 'POS Terminal #3', 'Order #4521 — Brown Sugar Boba x2', 'processed'),
('evt-002', 'pos.transactions', CURRENT_TIMESTAMP - INTERVAL '30 minutes', 'POS Terminal #1', 'Order #4522 — Vanilla Ice Cream x1', 'processed'),
('evt-003', 'sensor.temperature', CURRENT_TIMESTAMP - INTERVAL '5 minutes', 'Freezer Unit B', 'Temperature Alert: -10°C (Expected -18°C)', 'pending');

-- Insert Products
INSERT INTO product (sku, name, current_stock, current_price)
VALUES 
('ICE-CREAM-VANILLA', 'Vanilla Ice Cream (500ml)', 120, 4.50),
('BROWN-SUGAR-BOBA', 'Brown Sugar Boba', 85, 8.90),
('MANGO-SUNDAE', 'Mango Sundae', 60, 6.50);
