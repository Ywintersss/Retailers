import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	DollarSign,
	ArrowUpRight,
	ArrowDownRight,
	Minus,
	SlidersHorizontal,
	Loader2,
} from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import {
	AIDecisionBadge,
	ExplainDecisionPanel,
} from "../shared/AIDecisionNode";
import {
	useDynamicPricing,
	useRecalculatePricing,
} from "../../hooks/useApiQueries";

export function DynamicPricingPanel() {
	const { data, isLoading } = useDynamicPricing();
	const { mutate, isPending: isUpdating } = useRecalculatePricing();
	const [showExplanation, setShowExplanation] = useState(false);
	const [weights, setWeights] = useState({
		costSaving: 40,
		brandPresence: 35,
		revenueMaximization: 25,
	});

	// Sync local weights with backend data when it loads
	useEffect(() => {
		if (data?.tradeoffWeights) {
			setWeights(data.tradeoffWeights);
		}
	}, [data?.tradeoffWeights]);

	const debouncedUpdate = useDebouncedCallback((newWeights) => {
		mutate({ storeId: "store-kl-001", weights: newWeights });
	}, 2000);

	const handleWeightChange = useCallback(
		(key, value) => {
			const numValue = Number(value);
			const others = Object.keys(weights).filter((k) => k !== key);
			const remaining = 100 - numValue;
			const otherTotal = weights[others[0]] + weights[others[1]];

			const newWeights = {
				...weights,
				[key]: numValue,
				[others[0]]:
					otherTotal > 0
						? Math.round((weights[others[0]] / otherTotal) * remaining)
						: Math.round(remaining / 2),
				[others[1]]:
					otherTotal > 0
						? remaining -
							Math.round((weights[others[0]] / otherTotal) * remaining)
						: remaining - Math.round(remaining / 2),
			};

			setWeights(newWeights);
			debouncedUpdate(newWeights);
		},
		[weights, debouncedUpdate],
	);

	if (isLoading)
		return (
			<div className="glass-card p-6 animate-pulse">
				<div className="h-6 bg-neutral-700 rounded w-48 mb-4" />
				<div className="h-40 bg-neutral-800 rounded-xl" />
			</div>
		);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
			className="glass-card p-6"
		>
			<div className="flex items-center justify-between mb-5">
				<div>
					<div className="flex items-center gap-3 mb-1">
						<DollarSign size={20} className="text-secondary" />
						<h2 className="text-lg font-bold font-heading text-neutral-100">
							Dynamic Pricing
						</h2>
						<AnimatePresence>
							{isUpdating && (
								<motion.div
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -10 }}
									className="flex items-center gap-1.5 ml-2 text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20"
								>
									<Loader2 size={10} className="animate-spin" />
									RECALCULATING...
								</motion.div>
							)}
						</AnimatePresence>
					</div>
					<p className="text-xs text-neutral-400 ml-8">
						Strategy: {data?.currentStrategy}
					</p>
				</div>
				<AIDecisionBadge model={data?.glmModel} />
			</div>

			{/* Revenue Projection */}
			<div className="flex items-center gap-4 mb-5 p-4 rounded-xl bg-linear-to-r from-primary/5 to-secondary/5 border border-primary/15">
				<div className="flex-1">
					<p className="text-xs text-neutral-400 mb-1">
						Projected Revenue Uplift
					</p>
					<div className="flex items-baseline gap-2">
						<span className="text-3xl font-bold font-heading text-primary">
							+{data?.projectedRevenue?.uplift}%
						</span>
						<span className="text-sm text-neutral-400">
							(RM {data?.projectedRevenue?.upliftAmount?.toLocaleString()}/day)
						</span>
					</div>
				</div>
				<div className="text-right">
					<p className="text-xs text-neutral-500">Without → With</p>
					<p className="text-sm text-neutral-300">
						RM {data?.projectedRevenue?.withoutOptimization?.toLocaleString()}{" "}
						<span className="text-primary mx-1">→</span>{" "}
						<span className="font-bold text-neutral-100">
							RM {data?.projectedRevenue?.withOptimization?.toLocaleString()}
						</span>
					</p>
				</div>
			</div>

			{/* Trade-off Sliders */}
			<div className="mb-5 p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/50">
				<div className="flex items-center gap-2 mb-3">
					<SlidersHorizontal size={14} className="text-tertiary" />
					<h3 className="text-sm font-semibold text-neutral-200">
						Trade-off Adjustment
					</h3>
					<span className="text-[10px] text-tertiary bg-tertiary/10 px-2 py-0.5 rounded-full font-medium">
						MANAGER OVERRIDE
					</span>
				</div>
				<div className="space-y-4">
					{[
						{ key: "costSaving", label: "Cost Saving", color: "text-success" },
						{
							key: "brandPresence",
							label: "Brand Presence",
							color: "text-tertiary",
						},
						{
							key: "revenueMaximization",
							label: "Revenue Max",
							color: "text-primary",
						},
					].map(({ key, label, color }) => (
						<div key={key} className="flex items-center gap-3">
							<span className={`text-xs font-medium w-28 ${color}`}>
								{label}
							</span>
							<input
								type="range"
								min="0"
								max="80"
								value={weights[key]}
								onChange={(e) => handleWeightChange(key, e.target.value)}
								className="flex-1"
							/>
							<span className="text-sm font-bold text-neutral-200 w-10 text-right">
								{weights[key]}%
							</span>
						</div>
					))}
				</div>
				<p className="text-[10px] text-neutral-500 mt-2">
					Drag sliders to adjust AI priorities. Changes auto-balance to 100%.
				</p>
			</div>

			{/* Price Recommendations */}
			<div className="space-y-2">
				{data?.recommendations?.map((item, idx) => {
					const isIncrease = item.changePercent > 0;
					const isDecrease = item.changePercent < 0;
					const ChangeIcon = isIncrease
						? ArrowUpRight
						: isDecrease
							? ArrowDownRight
							: Minus;
					const changeColor = isIncrease
						? "text-danger"
						: isDecrease
							? "text-success"
							: "text-neutral-400";
					return (
						<motion.div
							key={item.sku}
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3, delay: idx * 0.07 }}
							className="flex items-center gap-4 p-3.5 rounded-xl bg-neutral-900/30 border border-neutral-800/40 hover:border-neutral-700/50 transition-all"
						>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium text-neutral-200 truncate">
									{item.name}
								</p>
								<p className="text-[11px] text-neutral-500">{item.period}</p>
							</div>
							<div className="text-center">
								<p className="text-xs text-neutral-500">Current</p>
								<p className="text-sm text-neutral-300">
									RM {item.currentPrice}
								</p>
							</div>
							<div className="text-center">
								<ChangeIcon size={14} className={`mx-auto ${changeColor}`} />
								<span className={`text-[10px] font-semibold ${changeColor}`}>
									{item.changePercent > 0 ? "+" : ""}
									{item.changePercent}%
								</span>
							</div>
							<div className="text-center">
								<p className="text-xs text-neutral-500">Recommended</p>
								<p className="text-sm font-bold text-neutral-100">
									RM {item.recommendedPrice}
								</p>
							</div>
							<div className="text-right min-w-30">
								<p className="text-xs text-neutral-400">
									{item.expectedImpact}
								</p>
							</div>
						</motion.div>
					);
				})}
			</div>

			<ExplainDecisionPanel
				explanation={data?.explanation}
				isOpen={showExplanation}
				onToggle={() => setShowExplanation(!showExplanation)}
			/>
		</motion.div>
	);
}

export default DynamicPricingPanel;
