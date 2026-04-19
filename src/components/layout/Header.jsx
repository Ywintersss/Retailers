import { motion } from 'framer-motion';
import { Bell, Search, MapPin, Calendar } from 'lucide-react';
import { useStoreInfo } from '../../hooks/useApiQueries';

export function Header() {
  const { data: store } = useStoreInfo();

  return (
    <header className="sticky top-0 z-40 glass border-b border-neutral-800/50 px-6 py-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold font-heading text-neutral-100">
            {store?.name || 'FranchiseIQ Dashboard'}
          </h1>
          <div className="flex items-center gap-4 mt-0.5">
            <span className="flex items-center gap-1 text-xs text-neutral-400">
              <MapPin size={12} /> {store?.region}
            </span>
            <span className="flex items-center gap-1 text-xs text-neutral-400">
              <Calendar size={12} /> {new Date().toLocaleDateString('en-MY', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
            </span>
            <span className="text-[10px] bg-success/15 text-success px-2 py-0.5 rounded-full font-medium">
              {store?.tier}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 text-sm bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-primary/50 w-56 transition-colors"
            />
          </div>

          <button className="relative p-2.5 rounded-xl bg-neutral-800/50 border border-neutral-700/50 hover:border-neutral-600 transition-colors cursor-pointer">
            <Bell size={18} className="text-neutral-400" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger rounded-full text-[9px] font-bold text-white flex items-center justify-center">3</span>
          </button>

          <div className="flex items-center gap-2 pl-3 border-l border-neutral-700/50">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">A</div>
            <div className="hidden md:block">
              <p className="text-xs font-medium text-neutral-200">{store?.managerName || 'Manager'}</p>
              <p className="text-[10px] text-neutral-500">Store Manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
