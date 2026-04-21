import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { useSalesTimeline } from '../../hooks/useApiQueries';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card p-3 !rounded-lg text-xs">
      <p className="font-semibold text-neutral-100 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          {p.name}: {p.value !== null ? `RM ${p.value.toLocaleString()}` : '—'}
        </p>
      ))}
    </div>
  );
};

export function SalesChart() {
  const { data, isLoading } = useSalesTimeline();

  if (isLoading) return <div className="glass-card p-6 h-[300px] animate-pulse"><div className="h-full bg-neutral-800 rounded-xl" /></div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 size={18} className="text-primary" />
        <h3 className="text-sm font-semibold font-heading text-neutral-100">Revenue & AI Forecast</h3>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F54E00" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#F54E00" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2F80FA" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#2F80FA" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A2B30" />
          <XAxis dataKey="date" tick={{ fill: '#8A8B95', fontSize: 11 }} axisLine={{ stroke: '#2A2B30' }} />
          <YAxis tick={{ fill: '#8A8B95', fontSize: 11 }} axisLine={{ stroke: '#2A2B30' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '11px', color: '#B0B1BA' }} />
          <Area type="monotone" dataKey="revenue" name="Actual Revenue" stroke="#F54E00" fill="url(#revenueGrad)" strokeWidth={2} connectNulls={false} dot={{ r: 3, fill: '#F54E00' }} />
          <Area type="monotone" dataKey="forecast" name="AI Forecast" stroke="#2F80FA" fill="url(#forecastGrad)" strokeWidth={2} strokeDasharray="6 3" dot={{ r: 3, fill: '#2F80FA' }} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export default SalesChart;
