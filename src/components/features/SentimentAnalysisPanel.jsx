import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  AlertOctagon,
  TrendingUp,
  TrendingDown,
  Minus,
  Star,
  ShieldAlert,
} from 'lucide-react';
import { AIDecisionBadge, ExplainDecisionPanel } from '../shared/AIDecisionNode';
import { useSentimentAnalysis } from '../../hooks/useApiQueries';

/**
 * SentimentAnalysisPanel — AI-powered review & social sentiment
 * Core Feature #2: Interprets unstructured POS reviews & social data
 */
export function SentimentAnalysisPanel() {
  const { data, isLoading } = useSentimentAnalysis();
  const [showExplanation, setShowExplanation] = useState(false);

  if (isLoading) {
    return (
      <div className="glass-card p-6 animate-pulse">
        <div className="h-6 bg-neutral-700 rounded w-48 mb-4" />
        <div className="h-40 bg-neutral-800 rounded-xl" />
      </div>
    );
  }

  const trendIcons = {
    up: <TrendingUp size={12} className="text-success" />,
    down: <TrendingDown size={12} className="text-danger" />,
    stable: <Minus size={12} className="text-neutral-400" />,
  };

  const sentimentBarWidth = {
    positive: data?.breakdown?.positive || 0,
    neutral: data?.breakdown?.neutral || 0,
    negative: data?.breakdown?.negative || 0,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <MessageSquare size={20} className="text-secondary" />
            <h2 className="text-lg font-bold font-heading text-neutral-100">
              Sentiment Analysis
            </h2>
          </div>
          <p className="text-xs text-neutral-400 ml-8">
            {data?.totalReviews?.toLocaleString()} reviews • {data?.period}
          </p>
        </div>
        <AIDecisionBadge model={data?.glmModel} />
      </div>

      {/* Overall Score */}
      <div className="flex items-center gap-6 mb-5 p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/50">
        <div className="text-center">
          <div className="text-4xl font-bold font-heading text-neutral-100 flex items-center gap-1">
            {data?.overallScore}
            <Star size={20} className="text-secondary fill-secondary" />
          </div>
          <p className="text-xs text-neutral-400 mt-1">Overall Score</p>
        </div>

        {/* Sentiment Bar */}
        <div className="flex-1">
          <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${sentimentBarWidth.positive}%` }}
              transition={{ duration: 0.8 }}
              className="bg-success rounded-l-full"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${sentimentBarWidth.neutral}%` }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-neutral-500"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${sentimentBarWidth.negative}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-danger rounded-r-full"
            />
          </div>
          <div className="flex justify-between mt-1.5 text-[10px]">
            <span className="text-success">{sentimentBarWidth.positive}% Positive</span>
            <span className="text-neutral-400">{sentimentBarWidth.neutral}% Neutral</span>
            <span className="text-danger">{sentimentBarWidth.negative}% Negative</span>
          </div>
        </div>
      </div>

      {/* Topic Breakdown */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        {data?.topics?.map((topic, idx) => (
          <motion.div
            key={topic.topic}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/30 border border-neutral-800/40"
          >
            <div>
              <p className="text-sm font-medium text-neutral-200">{topic.topic}</p>
              <p className="text-[10px] text-neutral-500">{topic.mentions} mentions</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-neutral-100">{topic.score}</span>
              {trendIcons[topic.trend]}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Critical Alerts */}
      {data?.alerts?.length > 0 && (
        <div className="mb-4">
          {data.alerts.map((alert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-4 rounded-xl bg-danger/5 border border-danger/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert size={16} className="text-danger" />
                <span className="text-sm font-bold text-danger">
                  {alert.severity.toUpperCase()} — {alert.topic}
                </span>
              </div>
              <p className="text-sm text-neutral-200 mb-3">{alert.message}</p>

              <div className="space-y-1.5 mb-3">
                {alert.reviewSnippets?.map((snippet, i) => (
                  <p key={i} className="text-xs text-neutral-400 italic pl-3 border-l-2 border-neutral-700">
                    {snippet}
                  </p>
                ))}
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-danger/10 border border-danger/15">
                <AlertOctagon size={14} className="text-danger flex-shrink-0" />
                <p className="text-xs text-neutral-200 font-medium">
                  {alert.recommendedAction}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Explain Decision */}
      <ExplainDecisionPanel
        explanation={data?.explanation}
        isOpen={showExplanation}
        onToggle={() => setShowExplanation(!showExplanation)}
      />
    </motion.div>
  );
}

export default SentimentAnalysisPanel;
