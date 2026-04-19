import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Sparkles, Database, Brain } from 'lucide-react';

/**
 * AIDecisionBadge — Visual indicator that a component is powered by GLM
 * Addresses the "Remove the AI" test by making AI nodes visually distinct
 */
export function AIDecisionBadge({ model = 'Z.AI GLM' }) {
  return (
    <span className="ai-badge">
      <Sparkles size={12} />
      {model}
    </span>
  );
}

/**
 * ExplainDecisionPanel — Shows WHY the AI made a recommendation
 * Addresses the "Hallucination" Risk — never just says "Do X"
 */
export function ExplainDecisionPanel({ explanation, isOpen: controlledOpen, onToggle }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const toggle = onToggle || (() => setInternalOpen(!internalOpen));

  if (!explanation) return null;

  return (
    <div className="mt-4">
      <button
        onClick={toggle}
        className="flex items-center gap-2 text-sm font-semibold text-primary-light hover:text-primary transition-colors cursor-pointer"
      >
        <Brain size={16} />
        <span>Explain This Decision</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="explain-panel mt-3">
              {/* Summary */}
              <p className="text-sm text-neutral-200 leading-relaxed mb-4">
                {explanation.summary}
              </p>

              {/* Data Variables Used */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Database size={12} />
                  Data Variables Used
                </h4>
                <div className="space-y-2">
                  {explanation.dataVariables?.map((v, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs">
                      <div className="flex-1">
                        <span className="font-medium text-neutral-100">{v.name}</span>
                        <span className="text-neutral-400 ml-2">{v.value}</span>
                      </div>
                      <span className="text-neutral-500 whitespace-nowrap">
                        via {v.source}
                      </span>
                      <div className="w-16">
                        <div className="h-1.5 bg-neutral-700 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                            style={{ width: `${v.weight * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-neutral-500">
                          {(v.weight * 100).toFixed(0)}% weight
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Reasoning */}
              <div>
                <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  GLM Reasoning Chain
                </h4>
                <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-900/50 rounded-lg p-3 border border-neutral-700/50 font-mono">
                  {explanation.reasoning}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ExplainDecisionPanel;
