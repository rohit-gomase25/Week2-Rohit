import { lazy, useState, useEffect } from 'react';
import PriceTicker from './components/PriceTicker';
import { stocks } from './data/stockData'; 
import type { Stock } from './types/stock.types';
import SuspenseBoundary from './boundaries/SuspenseBoundary';
import TableSkeleton from './skeletons/TableSkeleton';
import CardGridSkeleton from './skeletons/CardGridSkeleton';
import FormSkeleton from './skeletons/FormSkeleton';

// Stores
import { usePortfolioStore } from './stores/usePortfolioStore';

// Comparison Panels
import StockComparePanel from './components/StockComparePanel';
import PositionComparePanel from './components/PositionComparePanel';
import HoldingComparePanel from './components/HoldingComparePanel';

const LiveQuotesFeature = lazy(() => import('./features/quotes/LiveQuotesFeature'));
const PortfolioFeature = lazy(() => import('./features/portfolio/PortfolioFeature'));
const PositionsFeature = lazy(() => import('./features/positions/PositionFeature'));
const HoldingsFeature = lazy(() => import('./features/holdings/HoldingsFeature'));
const TradeFeature = lazy(() => import('./features/trades/TradeFeature'));

function App() {
  // Local state for UI selection and filtering only
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');

  // 1. Initialize Portfolio Store on mount
  const loadPortfolio = usePortfolioStore((state) => state.loadPortfolio);
  
  useEffect(() => {
    loadPortfolio(stocks);
  }, [loadPortfolio]);

  // 2. Derived filtered stocks for Quotes feature
  const filteredStocks = stocks.filter((stock) => {
    const queryLower = searchQuery.toLowerCase();
    const searchMatches = stock.symbol.toLowerCase().includes(queryLower) || 
                          stock.name.toLowerCase().includes(queryLower);
    const sectorMatches = sectorFilter === '' || stock.sector === sectorFilter;
    return searchMatches && sectorMatches;
  });

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#1E3A8A' }}>Stock Market Dashboard</h1>

      <div style={{ margin: '0 -24px 24px -24px' }}>
        <PriceTicker />
      </div>

      {/* Live Quotes Section */}
      <SuspenseBoundary
        fallback={
          <>
            <CardGridSkeleton count={filteredStocks.length || 3} />
            <TableSkeleton rows={5} cols={6} title="Live Quotes" />
          </>
        }
      >
        <LiveQuotesFeature
          stocks={filteredStocks}
          selectedStock={selectedStock}
          onSelectStock={setSelectedStock}
          onSearch={setSearchQuery}
          onFilterChange={setSectorFilter}
        />
      </SuspenseBoundary>

      {/* Portfolio Summary Section - Clean (Zustand) */}
      <SuspenseBoundary fallback={<TableSkeleton rows={3} cols={3} title="Portfolio Summary" />}>
        <PortfolioFeature /> 
      </SuspenseBoundary>

      {/* Positions Section (Zustand managed) */}
      <SuspenseBoundary fallback={<TableSkeleton rows={5} cols={6} title="Positions" />}>
        <PositionsFeature />
      </SuspenseBoundary>

      {/* Holdings Section (Zustand managed) */}
      <SuspenseBoundary fallback={<TableSkeleton rows={5} cols={5} title="Holdings" />}>
        <HoldingsFeature />
      </SuspenseBoundary>

      {/* Trade History and Form Section - UPDATED: Removed tradeHistory and onSubmitTrade props */}
      <SuspenseBoundary
        fallback={
          <>
            <TableSkeleton rows={3} cols={5} title="Trade History" />
            <FormSkeleton />
          </>
        }
      >
        <TradeFeature
          stocks={stocks}
          selectedStock={selectedStock}
        />
      </SuspenseBoundary>

      {/* Floating Comparison UI Panels */}
      <StockComparePanel />
      <PositionComparePanel />
      <HoldingComparePanel />
    </div>
  );
}

export default App;