import { DollarSign, Package, Heart, TrendingDown } from "lucide-react";
import { KPICard } from "../components/shared/KPICard";
import { SalesChart } from "../components/charts/SalesChart";
import { EventStreamFeed } from "../components/shared/EventStreamFeed";
import { useKPIs, useKafkaEvents } from "../hooks/useApiQueries";

export function DashboardView() {
	const { data: kpis } = useKPIs();
	const { data: events } = useKafkaEvents();

	return (
		<div className="space-y-6">
			{/* KPI Row */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<KPICard
					title="Daily Revenue"
					value={`RM ${(kpis?.dailyRevenue || 0).toLocaleString()}`}
					change={kpis?.dailyRevenueChange}
					icon={DollarSign}
					delay={0}
				/>
				<KPICard
					title="Inventory Health"
					value={`${kpis?.inventoryHealth || 0}%`}
					change={kpis?.inventoryHealthChange}
					icon={Package}
					delay={0.05}
				/>
				<KPICard
					title="Customer Sentiment"
					value={`${kpis?.customerSentiment || 0}/5`}
					change={kpis?.customerSentimentChange}
					icon={Heart}
					delay={0.1}
				/>
				<KPICard
					title="Waste Reduction"
					value={`${kpis?.wasteReduction || 0}%`}
					change={kpis?.wasteReductionChange}
					icon={TrendingDown}
					delay={0.15}
				/>
			</div>

			{/* Charts + Stream */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<div className="lg:col-span-2">
					<SalesChart />
				</div>
				<EventStreamFeed events={events || []} />
			</div>
		</div>
	);
}

export default DashboardView;
