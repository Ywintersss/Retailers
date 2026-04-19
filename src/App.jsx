import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardView } from './views/DashboardView';
import { InventoryForecastPanel } from './components/features/InventoryForecastPanel';
import { SentimentAnalysisPanel } from './components/features/SentimentAnalysisPanel';
import { DynamicPricingPanel } from './components/features/DynamicPricingPanel';
import { ActionableInsightsPanel } from './components/features/ActionableInsightsPanel';
import { EventStreamFeed } from './components/shared/EventStreamFeed';
import { useKafkaEvents } from './hooks/useApiQueries';

function ViewRenderer({ activeView, events }) {
  switch (activeView) {
    case 'dashboard':
      return <DashboardView />;
    case 'inventory':
      return <div className="max-w-4xl"><InventoryForecastPanel /></div>;
    case 'sentiment':
      return <div className="max-w-4xl"><SentimentAnalysisPanel /></div>;
    case 'pricing':
      return <div className="max-w-4xl"><DynamicPricingPanel /></div>;
    case 'insights':
      return <div className="max-w-4xl"><ActionableInsightsPanel /></div>;
    case 'stream':
      return <div className="max-w-3xl"><EventStreamFeed events={events || []} /></div>;
    default:
      return <DashboardView />;
  }
}

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const { data: events } = useKafkaEvents();

  return (
    <div className="flex min-h-screen bg-neutral-950 gradient-mesh">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <ViewRenderer activeView={activeView} events={events} />
        </main>
      </div>
    </div>
  );
}

export default App;
