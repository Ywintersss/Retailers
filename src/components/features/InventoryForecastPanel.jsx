import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { AIDecisionBadge, ExplainDecisionPanel } from '../shared/AIDecisionNode';
import { useInventoryForecast } from '../../hooks/useApiQueries';

/**
 * InventoryForecastPanel — AI-powered stockout prediction
 * Core Feature #1: Context-aware reasoning (weather + sales)
 */
export function InventoryForecastPanel() {
  const { data, isLoading } = useInventoryForecast();
  const [showExplanation, setShowExplanation] = useState(false);

  if (isLoading) {
    return (
      <div className="glass-card p-6 animate-pulse">
        <div className="h-6 bg-neutral-700 rounded w-48 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-neutral-800 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const riskColors = {
    HIGH: { bg: 'bg-danger/10', text: 'text-danger', border: 'border-danger/30' },
    MEDIUM: { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/30' },
    LOW: { bg: 'bg-success/10', text: 'text-success', border: 'border-success/30' },
  };

  const RiskIcon = {
    HIGH: AlertTriangle,
    MEDIUM: Clock,
    LOW: CheckCircle,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Package size={20} className="text-primary" />
            <h2 className="text-lg font-bold font-heading text-neutral-100">
              Inventory Forecast
            </h2>
          </div>
          <p className="text-xs text-neutral-400 ml-8">
            {data?.forecastHorizon} prediction horizon • Updated {new Date(data?.generatedAt).toLocaleTimeString()}
          </p>
        </div>
        <AIDecisionBadge model={data?.glmModel} />
      </div>

      {/* SKU Table */}
      <div className="space-y-2">
        {data?.predictions?.map((item, idx) => {
          const risk = riskColors[item.stockoutRisk] || riskColors.LOW;
          const IconComp = RiskIcon[item.stockoutRisk] || CheckCircle;

          return (
            <motion.div
              key={item.sku}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.07 }}
              className={`flex items-center gap-4 p-3.5 rounded-xl border ${risk.border} ${risk.bg} transition-all hover:scale-[1.01]`}
            >
              <IconComp size={18} className={risk.text} />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-100 truncate">
                  {item.name}
                </p>
                <p className="text-[11px] text-neutral-400">{item.sku}</p>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-neutral-200">
                  {item.currentStock} <span className="text-neutral-500 font-normal">in stock</span>
                </p>
                <p className="text-xs text-neutral-400">
                  Need: {item.predictedDemand}
                </p>
              </div>

              <div className="text-right min-w-[100px]">
                {item.restockRecommendation > 0 ? (
                  <p className="text-sm font-bold text-primary">
                    +{item.restockRecommendation} units
                  </p>
                ) : (
                  <p className="text-sm text-success font-medium">Sufficient</p>
                )}
                <p className="text-[11px] text-neutral-500">
                  {item.confidence * 100}% confidence
                </p>
              </div>

              <div className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold ${risk.bg} ${risk.text}`}>
                {item.daysUntilStockout}d
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Explain Decision */}
      <ExplainDecisionPanel
        explanation={data?.explanation}
        isOpen={showExplanation}
        onToggle={() => setShowExplanation(!showExplanation)}
      />
    </motion.div>
  );
}

export default InventoryForecastPanel;
