import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DynamicPricingPanel } from './DynamicPricingPanel';
import { useDynamicPricing, useRecalculatePricing } from '../../hooks/useApiQueries';

// Mock the hooks
vi.mock('../../hooks/useApiQueries', () => ({
  useDynamicPricing: vi.fn(),
  useRecalculatePricing: vi.fn(),
}));

describe('DynamicPricingPanel', () => {
  const mockData = {
    currentStrategy: 'Peak-Offpeak',
    glmModel: 'Z.AI GLM v5.1',
    tradeoffWeights: { costSaving: 40, brandPresence: 35, revenueMaximization: 25 },
    projectedRevenue: { uplift: 14.5, upliftAmount: 1750, withoutOptimization: 12000, withOptimization: 13750 },
    recommendations: [
      { sku: 'SKU1', name: 'Product 1', currentPrice: 10, recommendedPrice: 11, changePercent: 10, period: 'Peak', expectedImpact: '+100' }
    ],
    explanation: { summary: 'Reasoning here' }
  };

  it('renders loading state initially', () => {
    useDynamicPricing.mockReturnValue({ data: null, isLoading: true });
    useRecalculatePricing.mockReturnValue({ mutate: vi.fn(), isPending: false });
    
    const { container } = render(<DynamicPricingPanel />);
    expect(container.firstChild).toHaveClass('animate-pulse');
  });

  it('renders data correctly', () => {
    useDynamicPricing.mockReturnValue({ data: mockData, isLoading: false });
    useRecalculatePricing.mockReturnValue({ mutate: vi.fn(), isPending: false });

    render(<DynamicPricingPanel />);
    expect(screen.getByText('Dynamic Pricing')).toBeInTheDocument();
    expect(screen.getByText(/14.5%/)).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
  });

  it('triggers recalculation when sliders are changed', async () => {
    vi.useFakeTimers();
    const mutate = vi.fn();
    useDynamicPricing.mockReturnValue({ data: mockData, isLoading: false });
    useRecalculatePricing.mockReturnValue({ mutate, isPending: false });

    render(<DynamicPricingPanel />);
    
    const slider = screen.getAllByRole('slider')[0]; // Cost Saving
    fireEvent.change(slider, { target: { value: '60' } });

    // Verify state change in UI
    expect(slider.value).toBe('60');

    // Run all pending timers (debounce)
    vi.runAllTimers();

    expect(mutate).toHaveBeenCalledWith({
      storeId: 'store-kl-001',
      weights: expect.objectContaining({ costSaving: 60 })
    });
    
    vi.useRealTimers();
  });

  it('shows recalculating indicator', () => {
    useDynamicPricing.mockReturnValue({ data: mockData, isLoading: false });
    useRecalculatePricing.mockReturnValue({ mutate: vi.fn(), isPending: true });

    render(<DynamicPricingPanel />);
    expect(screen.getByText('RECALCULATING...')).toBeInTheDocument();
  });
});
