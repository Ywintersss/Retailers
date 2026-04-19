import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

/**
 * KPICard — Displays a single KPI metric with trend indicator
 */
export function KPICard({ title, value, unit, change, icon: Icon, delay = 0 }) {
  const isPositive = change > 0;
  const isNeutral = change === 0;
  const TrendIcon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown;
  const trendColor = isNeutral
    ? 'text-neutral-400'
    : isPositive
    ? 'text-success'
    : 'text-danger';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card p-5 flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon size={18} className="text-primary" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold font-heading text-neutral-100">
          {value}
        </span>
        {unit && (
          <span className="text-sm text-neutral-500">{unit}</span>
        )}
      </div>

      <div className={`flex items-center gap-1 text-sm ${trendColor}`}>
        <TrendIcon size={14} />
        <span className="font-medium">
          {isPositive ? '+' : ''}{change}%
        </span>
        <span className="text-neutral-500 text-xs">vs last week</span>
      </div>
    </motion.div>
  );
}

export default KPICard;
