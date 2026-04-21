/**
 * Mock Data — Simulates backend responses for demo purposes
 * 
 * This data powers the dashboard when the Spring Boot backend is unavailable.
 * Each dataset mirrors the exact response schema the backend would return.
 */

// ─── STORE INFO ─────────────────────────────────────────────

export const mockStore = {
  id: 'store-kl-001',
  name: 'MiXue — Bukit Bintang',
  region: 'Kuala Lumpur',
  tier: 'Tier 1 — High Traffic',
  managerId: 'mgr-001',
  managerName: 'Aisyah binti Mohd',
  status: 'operational',
  openedDate: '2024-03-15',
  coordinates: { lat: 3.1478, lng: 101.7134 },
};

// ─── KPI SUMMARY ────────────────────────────────────────────

export const mockKPIs = {
  dailyRevenue: 12480,
  dailyRevenueChange: 8.3,
  inventoryHealth: 87,
  inventoryHealthChange: -2.1,
  customerSentiment: 4.2,
  customerSentimentChange: 0.3,
  wasteReduction: 15.2,
  wasteReductionChange: 3.1,
  activeSKUs: 42,
  pendingAlerts: 3,
};

// ─── INVENTORY FORECAST (AI DECISION NODE) ──────────────────

export const mockInventoryForecast = {
  decisionId: 'dec-inv-20260419',
  generatedAt: '2026-04-19T15:00:00Z',
  glmModel: 'Z.AI GLM v3.2',
  storeId: 'store-kl-001',
  forecastHorizon: '7 days',
  predictions: [
    {
      sku: 'ICE-CREAM-VANILLA',
      name: 'Vanilla Ice Cream (500ml)',
      currentStock: 120,
      predictedDemand: 185,
      restockRecommendation: 80,
      confidence: 0.92,
      stockoutRisk: 'HIGH',
      daysUntilStockout: 2,
    },
    {
      sku: 'MILK-TEA-TARO',
      name: 'Taro Milk Tea Mix',
      currentStock: 340,
      predictedDemand: 280,
      restockRecommendation: 0,
      confidence: 0.88,
      stockoutRisk: 'LOW',
      daysUntilStockout: 8,
    },
    {
      sku: 'MANGO-SMOOTHIE',
      name: 'Mango Smoothie Base',
      currentStock: 95,
      predictedDemand: 140,
      restockRecommendation: 55,
      confidence: 0.85,
      stockoutRisk: 'MEDIUM',
      daysUntilStockout: 4,
    },
    {
      sku: 'BROWN-SUGAR-BOBA',
      name: 'Brown Sugar Boba',
      currentStock: 200,
      predictedDemand: 310,
      restockRecommendation: 130,
      confidence: 0.94,
      stockoutRisk: 'HIGH',
      daysUntilStockout: 1,
    },
    {
      sku: 'MATCHA-POWDER',
      name: 'Matcha Powder Premium',
      currentStock: 180,
      predictedDemand: 110,
      restockRecommendation: 0,
      confidence: 0.90,
      stockoutRisk: 'LOW',
      daysUntilStockout: 12,
    },
    {
      sku: 'STRAWBERRY-TOP',
      name: 'Strawberry Topping Syrup',
      currentStock: 60,
      predictedDemand: 95,
      restockRecommendation: 45,
      confidence: 0.87,
      stockoutRisk: 'MEDIUM',
      daysUntilStockout: 3,
    },
  ],
  explanation: {
    summary: 'Demand surge predicted due to upcoming school holiday week and sustained high temperatures (34°C avg). Brown Sugar Boba and Vanilla Ice Cream are the highest-risk items.',
    dataVariables: [
      { name: 'Weather Forecast', value: '34°C avg, 72% humidity, no rain expected', source: 'MET Malaysia API', weight: 0.35 },
      { name: 'Historical Sales (30d)', value: '12,450 units across all SKUs', source: 'POS Kafka Stream', weight: 0.30 },
      { name: 'School Calendar', value: 'Holiday starts Apr 21', source: 'MOE Calendar', weight: 0.20 },
      { name: 'Social Trend', value: '"#MiXueBoba" trending on TikTok MY', source: 'Social Listener', weight: 0.15 },
    ],
    reasoning: 'The GLM cross-referenced 4 data streams: weather data indicates sustained heat driving cold-beverage demand (+28% vs. rainy periods), historical POS data shows a 35% spike in boba sales during past school holidays, and current TikTok trending data for Brown Sugar Boba suggests an additional viral-driven demand wave. The combined confidence-weighted model outputs a 7-day demand forecast with per-SKU restock recommendations.',
  },
};

// ─── SENTIMENT ANALYSIS (AI DECISION NODE) ──────────────────

export const mockSentimentAnalysis = {
  decisionId: 'dec-sen-20260419',
  generatedAt: '2026-04-19T14:30:00Z',
  glmModel: 'Z.AI GLM v3.2',
  storeId: 'store-kl-001',
  overallScore: 4.2,
  totalReviews: 1284,
  period: 'Last 30 days',
  breakdown: {
    positive: 68,
    neutral: 22,
    negative: 10,
  },
  topics: [
    { topic: 'Taste Quality', score: 4.5, mentions: 342, trend: 'up' },
    { topic: 'Wait Time', score: 3.2, mentions: 218, trend: 'down' },
    { topic: 'Cleanliness', score: 4.1, mentions: 156, trend: 'stable' },
    { topic: 'Staff Friendliness', score: 4.4, mentions: 198, trend: 'up' },
    { topic: 'Value for Money', score: 4.6, mentions: 287, trend: 'up' },
    { topic: 'Drink Temperature', score: 3.8, mentions: 83, trend: 'down' },
  ],
  alerts: [
    {
      severity: 'critical',
      topic: 'Food Safety',
      message: 'Cluster of 4 reviews mentioning "melted" ice cream and "warm" drinks in the last 48 hours. Possible freezer malfunction.',
      reviewSnippets: [
        '"My ice cream was basically soup when I got it 😡"',
        '"The boba tea was lukewarm, not cold at all"',
        '"Something wrong with their refrigerator maybe?"',
        '"Third time this week my drink wasn\'t cold enough"',
      ],
      recommendedAction: 'Immediate equipment inspection of freezer unit B and cold-storage display.',
    },
  ],
  explanation: {
    summary: 'Overall sentiment is positive (4.2/5), but a critical food safety pattern has been detected. 4 reviews in 48 hours mention temperature issues, which the GLM has correlated with potential equipment failure.',
    dataVariables: [
      { name: 'POS Reviews', value: '1,284 reviews processed', source: 'Google Reviews + Internal POS', weight: 0.40 },
      { name: 'Social Media', value: '847 mentions scraped', source: 'Twitter/X + TikTok', weight: 0.30 },
      { name: 'Historical Patterns', value: 'Equipment failure in Dec 2025 had similar review cluster', source: 'Internal Incident DB', weight: 0.20 },
      { name: 'NLP Confidence', value: '94.2% classification accuracy', source: 'GLM NLP Module', weight: 0.10 },
    ],
    reasoning: 'The GLM performed entity-level sentiment analysis across 2,131 data points (reviews + social mentions). While aggregate sentiment remains positive, the temporal clustering algorithm detected an anomalous spike in negative temperature-related mentions. Cross-referencing with the December 2025 freezer incident (which showed an identical review pattern 3 days before failure), the system has escalated this to a critical food safety alert with 87% confidence.',
  },
};

// ─── DYNAMIC PRICING (AI DECISION NODE) ──────────────────────

export const mockDynamicPricing = {
  decisionId: 'dec-pri-20260419',
  generatedAt: '2026-04-19T13:00:00Z',
  glmModel: 'Z.AI GLM v3.2',
  storeId: 'store-kl-001',
  currentStrategy: 'Peak/Off-Peak Optimization',
  tradeoffWeights: {
    costSaving: 40,
    brandPresence: 35,
    revenueMaximization: 25,
  },
  recommendations: [
    {
      sku: 'BROWN-SUGAR-BOBA',
      name: 'Brown Sugar Boba',
      currentPrice: 8.90,
      recommendedPrice: 9.50,
      changePercent: 6.7,
      period: 'Peak (12PM–2PM)',
      expectedImpact: '+RM 340/day revenue',
      elasticity: -0.82,
    },
    {
      sku: 'ICE-CREAM-VANILLA',
      name: 'Vanilla Ice Cream',
      currentPrice: 3.50,
      recommendedPrice: 2.90,
      changePercent: -17.1,
      period: 'Off-Peak (3PM–5PM)',
      expectedImpact: '+45 units/day volume, -RM 27 margin',
      elasticity: -1.45,
    },
    {
      sku: 'MILK-TEA-TARO',
      name: 'Taro Milk Tea',
      currentPrice: 7.90,
      recommendedPrice: 7.90,
      changePercent: 0,
      period: 'All Day',
      expectedImpact: 'No change — already optimized',
      elasticity: -0.95,
    },
    {
      sku: 'COMBO-STUDENT',
      name: 'Student Combo Meal',
      currentPrice: 12.90,
      recommendedPrice: 10.90,
      changePercent: -15.5,
      period: 'Weekdays 2PM–6PM',
      expectedImpact: '+85 combos/week, brand loyalty +12%',
      elasticity: -1.80,
    },
  ],
  projectedRevenue: {
    withoutOptimization: 12480,
    withOptimization: 14230,
    uplift: 14.0,
    upliftAmount: 1750,
  },
  explanation: {
    summary: 'Dynamic pricing model suggests a blended strategy: increase prices on high-demand items during peak hours while creating value bundles during off-peak to attract the student demographic in the Bukit Bintang area.',
    dataVariables: [
      { name: 'Hourly Sales Heatmap', value: 'Peak at 12–2PM (38% of daily sales)', source: 'POS Kafka Stream', weight: 0.30 },
      { name: 'Price Elasticity Model', value: 'Per-SKU elasticity calculated over 90 days', source: 'GLM Econometric Module', weight: 0.30 },
      { name: 'Demographic Data', value: '65% under-25 customer base (university area)', source: 'Supabase Customer DB', weight: 0.25 },
      { name: 'Competitor Pricing', value: 'CoolBlog RM 9.90, Tealive RM 10.50 for similar', source: 'Market Intelligence', weight: 0.15 },
    ],
    reasoning: 'The GLM analyzed 90 days of transaction-level POS data to compute per-SKU price elasticity. Brown Sugar Boba shows inelastic demand during peak hours (elasticity = -0.82), meaning a 6.7% price increase would increase revenue with minimal volume loss. Conversely, Vanilla Ice Cream shows high elasticity during off-peak (-1.45), making it an ideal loss-leader to drive foot traffic. The Student Combo targets the dominant under-25 demographic with a time-limited discount that builds long-term brand loyalty — a strategic trade-off between short-term margin and lifetime customer value.',
  },
};

// ─── ACTIONABLE INSIGHTS (AI DECISION NODE) ─────────────────

export const mockActionableInsights = {
  decisionId: 'dec-ins-20260419',
  generatedAt: '2026-04-19T12:00:00Z',
  glmModel: 'Z.AI GLM v3.2',
  storeId: 'store-kl-001',
  insights: [
    {
      id: 'insight-001',
      priority: 'critical',
      category: 'Equipment',
      title: 'Freezer Unit B — Possible Malfunction',
      summary: 'Customer reviews indicate drinks and ice cream served warm. Cross-referenced with energy usage data showing 18% spike in freezer power consumption.',
      action: 'Schedule maintenance inspection within 24 hours to prevent product spoilage.',
      estimatedImpact: 'Prevents ~RM 2,400 in potential waste and avoids food safety violation.',
      confidence: 0.87,
      status: 'pending',
    },
    {
      id: 'insight-002',
      priority: 'high',
      category: 'Inventory',
      title: 'Restock Boba & Ice Cream Before Holiday Rush',
      summary: 'School holidays begin April 21st. Historical data shows 35% demand surge for boba products. Current stock covers only 1–2 days.',
      action: 'Place emergency order for 130 units Brown Sugar Boba and 80 units Vanilla Ice Cream today.',
      estimatedImpact: 'Prevents estimated RM 5,200 in lost sales from stockouts.',
      confidence: 0.94,
      status: 'pending',
    },
    {
      id: 'insight-003',
      priority: 'medium',
      category: 'Revenue',
      title: 'Launch Student Combo During Off-Peak',
      summary: 'Price elasticity analysis shows high sensitivity in the under-25 segment. A discounted combo during 2–6PM could capture the after-school crowd.',
      action: 'Activate "Student Combo" at RM 10.90 on the POS system for weekday afternoons.',
      estimatedImpact: 'Projected +85 combos/week = +RM 1,100 weekly revenue in off-peak hours.',
      confidence: 0.81,
      status: 'pending',
    },
    {
      id: 'insight-004',
      priority: 'low',
      category: 'Marketing',
      title: 'Capitalize on TikTok Trend',
      summary: '"#MiXueBoba" is trending on TikTok Malaysia with 2.3M views this week. Store is in high-traffic tourist/student area.',
      action: 'Set up TikTok-friendly photo corner and train staff for "viral moment" preparation.',
      estimatedImpact: 'Organic brand impressions estimated at 50K+ with minimal cost.',
      confidence: 0.72,
      status: 'pending',
    },
  ],
};

// ─── SALES CHART DATA ───────────────────────────────────────

export const mockSalesTimeline = [
  { date: 'Apr 13', revenue: 10200, orders: 412, forecast: 10500 },
  { date: 'Apr 14', revenue: 11800, orders: 478, forecast: 11200 },
  { date: 'Apr 15', revenue: 9800, orders: 396, forecast: 10800 },
  { date: 'Apr 16', revenue: 12100, orders: 490, forecast: 11500 },
  { date: 'Apr 17', revenue: 13200, orders: 534, forecast: 12000 },
  { date: 'Apr 18', revenue: 11900, orders: 482, forecast: 12200 },
  { date: 'Apr 19', revenue: 12480, orders: 505, forecast: 12800 },
  { date: 'Apr 20', revenue: null, orders: null, forecast: 13500 },
  { date: 'Apr 21', revenue: null, orders: null, forecast: 15200 },
  { date: 'Apr 22', revenue: null, orders: null, forecast: 16100 },
  { date: 'Apr 23', revenue: null, orders: null, forecast: 15800 },
  { date: 'Apr 24', revenue: null, orders: null, forecast: 14900 },
  { date: 'Apr 25', revenue: null, orders: null, forecast: 14200 },
];

// ─── KAFKA EVENT STREAM (Simulated) ─────────────────────────

export const mockKafkaEvents = [
  { id: 'evt-001', topic: 'pos.transactions', timestamp: '15:28:42', source: 'POS Terminal #3', payload: 'Order #4521 — Brown Sugar Boba x2, Taro Tea x1', status: 'processed' },
  { id: 'evt-002', topic: 'weather.updates', timestamp: '15:27:10', source: 'MET Malaysia API', payload: 'Temperature: 34°C, Humidity: 72%, Clear skies', status: 'processed' },
  { id: 'evt-003', topic: 'pos.transactions', timestamp: '15:26:55', source: 'POS Terminal #1', payload: 'Order #4520 — Student Combo x1, Add-on Boba', status: 'processed' },
  { id: 'evt-004', topic: 'reviews.ingestion', timestamp: '15:25:30', source: 'Google Reviews', payload: 'New review: ★★☆☆☆ "Ice cream was melted again..."', status: 'flagged' },
  { id: 'evt-005', topic: 'inventory.alerts', timestamp: '15:24:18', source: 'Stock Sensor B4', payload: 'Brown Sugar Boba stock below reorder threshold (200 → 180)', status: 'alert' },
  { id: 'evt-006', topic: 'social.mentions', timestamp: '15:22:05', source: 'TikTok Scraper', payload: '#MiXueBoba trending — 2.3M views, 48K new posts today', status: 'processed' },
  { id: 'evt-007', topic: 'pos.transactions', timestamp: '15:20:41', source: 'POS Terminal #2', payload: 'Order #4519 — Vanilla Ice Cream x3, Mango Smoothie x2', status: 'processed' },
  { id: 'evt-008', topic: 'audit.compliance', timestamp: '15:18:00', source: 'Audit Module', payload: 'Daily hygiene checklist submitted — Score: 94/100', status: 'processed' },
];

// ─── HOURLY SALES HEATMAP DATA ──────────────────────────────

export const mockHourlySales = [
  { hour: '8AM', sales: 320, orders: 18 },
  { hour: '9AM', sales: 580, orders: 32 },
  { hour: '10AM', sales: 890, orders: 48 },
  { hour: '11AM', sales: 1420, orders: 76 },
  { hour: '12PM', sales: 2100, orders: 112 },
  { hour: '1PM', sales: 2340, orders: 125 },
  { hour: '2PM', sales: 1680, orders: 89 },
  { hour: '3PM', sales: 980, orders: 52 },
  { hour: '4PM', sales: 760, orders: 41 },
  { hour: '5PM', sales: 1120, orders: 60 },
  { hour: '6PM', sales: 1540, orders: 82 },
  { hour: '7PM', sales: 1380, orders: 74 },
  { hour: '8PM', sales: 920, orders: 49 },
  { hour: '9PM', sales: 540, orders: 29 },
  { hour: '10PM', sales: 280, orders: 15 },
];
