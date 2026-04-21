import { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, MessageSquare, DollarSign, Lightbulb, Radio, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'sentiment', label: 'Sentiment', icon: MessageSquare },
  { id: 'pricing', label: 'Pricing', icon: DollarSign },
  { id: 'insights', label: 'Insights', icon: Lightbulb },
  { id: 'stream', label: 'Data Stream', icon: Radio },
];

export function Sidebar({ activeView, onViewChange }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-screen sticky top-0 flex flex-col glass border-r border-neutral-800/50 z-50"
    >
      {/* Logo */}
      <div className="p-4 flex items-center gap-3 border-b border-neutral-800/50">
        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm font-heading">FQ</span>
        </div>
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h1 className="text-sm font-bold font-heading text-neutral-100">FranchiseIQ</h1>
            <p className="text-[10px] text-neutral-500">Decision Intelligence</p>
          </motion.div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeView === id;
          return (
            <button
              key={id}
              onClick={() => onViewChange(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${isActive ? 'bg-primary/15 text-primary' : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'}`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && <span>{label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-neutral-800/50 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 transition-all cursor-pointer">
          <Settings size={18} className="flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-neutral-500 hover:text-neutral-300 transition-all cursor-pointer"
        >
          {collapsed ? <ChevronRight size={18} /> : <><ChevronLeft size={18} /><span>Collapse</span></>}
        </button>
      </div>
    </motion.aside>
  );
}

export default Sidebar;
