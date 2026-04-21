import { motion } from 'framer-motion';
import { Radio } from 'lucide-react';

/**
 * EventStreamFeed — Real-time Kafka event stream visualization
 * Demonstrates data flowing from multiple sources (POS, Weather, Audits)
 * Addresses the "Data Fragmentation" challenge
 */
export function EventStreamFeed({ events = [] }) {
  const topicColors = {
    'pos.transactions': 'bg-primary/20 text-primary-light',
    'weather.updates': 'bg-tertiary/20 text-tertiary-light',
    'reviews.ingestion': 'bg-secondary/20 text-secondary-light',
    'inventory.alerts': 'bg-danger/20 text-danger',
    'social.mentions': 'bg-purple-500/20 text-purple-400',
    'audit.compliance': 'bg-success/20 text-success',
  };

  const statusDot = {
    processed: 'bg-success',
    flagged: 'bg-warning',
    alert: 'bg-danger',
  };

  return (
    <div className="glass-card p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Radio size={16} className="text-primary animate-pulse" />
          <h3 className="text-sm font-semibold font-heading text-neutral-100">
            Live Data Stream
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span className="stream-dot stream-dot--active" />
          Kafka Connected
        </div>
      </div>

      <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
        {events.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="flex items-start gap-3 p-3 rounded-xl bg-neutral-900/40 border border-neutral-800/50 hover:border-neutral-700/50 transition-colors"
          >
            <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${statusDot[event.status] || 'bg-neutral-500'}`} />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${topicColors[event.topic] || 'bg-neutral-700 text-neutral-400'}`}>
                  {event.topic}
                </span>
                <span className="text-[10px] text-neutral-500">
                  {event.timestamp}
                </span>
              </div>
              <p className="text-xs text-neutral-300 truncate">
                {event.payload}
              </p>
              <p className="text-[10px] text-neutral-500 mt-0.5">
                {event.source}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default EventStreamFeed;
