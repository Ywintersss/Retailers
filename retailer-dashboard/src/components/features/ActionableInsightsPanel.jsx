import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, AlertTriangle, ArrowRight, CheckCircle2, Shield, TrendingUp, Megaphone } from 'lucide-react';
import { AIDecisionBadge } from '../shared/AIDecisionNode';
import { useActionableInsights, useApplyInsightAction } from '../../hooks/useApiQueries';

const priorityConfig = {
  critical: { color: 'border-danger/30 bg-danger/5', badge: 'bg-danger/20 text-danger', icon: Shield },
  high: { color: 'border-warning/30 bg-warning/5', badge: 'bg-warning/20 text-warning', icon: AlertTriangle },
  medium: { color: 'border-tertiary/30 bg-tertiary/5', badge: 'bg-tertiary/20 text-tertiary', icon: TrendingUp },
  low: { color: 'border-neutral-700/50 bg-neutral-900/30', badge: 'bg-neutral-700 text-neutral-300', icon: Megaphone },
};

export function ActionableInsightsPanel() {
  const { data, isLoading } = useActionableInsights();
  const applyAction = useApplyInsightAction();
  const [appliedIds, setAppliedIds] = useState(new Set());

  if (isLoading) return <div className="glass-card p-6 animate-pulse"><div className="h-6 bg-neutral-700 rounded w-48 mb-4" /><div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className="h-24 bg-neutral-800 rounded-xl" />)}</div></div>;

  const handleApply = (insight) => {
    setAppliedIds(prev => new Set([...prev, insight.id]));
    applyAction.mutate({ insightId: insight.id, action: insight.action });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="glass-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Lightbulb size={20} className="text-primary" />
            <h2 className="text-lg font-bold font-heading text-neutral-100">Actionable Insights</h2>
          </div>
          <p className="text-xs text-neutral-400 ml-8">Plain-language recommendations for store managers</p>
        </div>
        <AIDecisionBadge />
      </div>

      <div className="space-y-3">
        {data?.insights?.map((insight, idx) => {
          const config = priorityConfig[insight.priority] || priorityConfig.low;
          const IconComp = config.icon;
          const isApplied = appliedIds.has(insight.id);

          return (
            <motion.div key={insight.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: idx * 0.08 }} className={`p-4 rounded-xl border ${config.color} transition-all`}>
              <div className="flex items-start gap-3">
                <IconComp size={18} className="mt-0.5 flex-shrink-0 text-neutral-300" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${config.badge}`}>{insight.priority}</span>
                    <span className="text-[10px] text-neutral-500">{insight.category}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-neutral-100 mb-1">{insight.title}</h3>
                  <p className="text-xs text-neutral-400 mb-2 leading-relaxed">{insight.summary}</p>

                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-900/60 border border-neutral-800/50 mb-2">
                    <ArrowRight size={12} className="text-primary flex-shrink-0" />
                    <p className="text-xs text-neutral-200 font-medium">{insight.action}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-neutral-500">Impact: {insight.estimatedImpact} • Confidence: {(insight.confidence * 100).toFixed(0)}%</p>
                    <button
                      onClick={() => handleApply(insight)}
                      disabled={isApplied}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${isApplied ? 'bg-success/20 text-success' : 'bg-primary/20 text-primary hover:bg-primary/30'}`}
                    >
                      {isApplied ? <span className="flex items-center gap-1"><CheckCircle2 size={12} /> Applied</span> : 'Apply Action'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default ActionableInsightsPanel;
