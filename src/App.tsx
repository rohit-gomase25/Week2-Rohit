import { lazy, useState } from 'react';
import PriceTicker from './components/PriceTicker';
import { stocks, trades, holdings } from './data/stockData';
import type { Stock, Trade } from './types/stock.types';
import SuspenseBoundary from './boundaries/SuspenseBoundary';
import TableSkeleton from './skeletons/TableSkeleton';
import CardGridSkeleton from './skeletons/CardGridSkeleton';
import FormSkeleton from './skeletons/FormSkeleton';

// Comparison Panels
import StockComparePanel from './components/StockComparePanel';
import PositionComparePanel from './components/PositionComparePanel';

const LiveQuotesFeature = lazy(function() {
  return import('./features/quotes/LiveQuotesFeature');
});

const PortfolioFeature = lazy(function() {
  return import('./features/portfolio/PortfolioFeature');
});

const PositionsFeature = lazy(function() {
  return import('./features/positions/PositionFeature');
});

const HoldingsFeature = lazy(function() {
  return import('./features/holdings/HoldingsFeature');
});

const TradeFeature = lazy(function() {
  return import('./features/trades/TradeFeature');
});

type NewTradeInput = Omit<Trade, 'id' | 'date'>;

function App() {
  // Local state for features not yet migrated to Zustand
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [tradeHistory, setTradeHistory] = useState<Trade[]>(trades);

  // Derived filtered stocks for Quotes feature
  var filteredStocks = stocks.filter(function(stock) {
    var queryLower = searchQuery.toLowerCase();
    var symbolMatches = stock.symbol.toLowerCase().includes(queryLower);
    var nameMatches = stock.name.toLowerCase().includes(queryLower);
    var searchMatches = symbolMatches || nameMatches;
    var noFilter = sectorFilter === '';
    var sectorMatches = noFilter || stock.sector === sectorFilter;
    return searchMatches && sectorMatches;
  });

  function handleNewTrade(input: NewTradeInput): void {
    var newTrade: Trade = {
      ...input,
      id: `t${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setTradeHistory(function(previousTrades) {
      return [newTrade, ...previousTrades];
    });
  }

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

      {/* Portfolio Summary Section - RESTORED: availableStocks prop to fix TS error */}
      <SuspenseBoundary
        fallback={<TableSkeleton rows={3} cols={3} title="Portfolio Summary" />}
      >
        <PortfolioFeature availableStocks={stocks} />
      </SuspenseBoundary>

      {/* Positions Section (Zustand managed for Comparison) */}
      <SuspenseBoundary
        fallback={<TableSkeleton rows={5} cols={6} title="Positions" />}
      >
        <PositionsFeature />
      </SuspenseBoundary>

      {/* Holdings Section - Safeguarded with fallback to prevent "data is not iterable" */}
      <SuspenseBoundary
        fallback={<TableSkeleton rows={5} cols={5} title="Holdings" />}
      >
        <HoldingsFeature holdings={holdings || []} />
      </SuspenseBoundary>

      {/* Trade History and Form Section */}
      <SuspenseBoundary
        fallback={
          <>
            <TableSkeleton rows={3} cols={5} title="Trade History" />
            <FormSkeleton />
          </>
        }
      >
        <TradeFeature
          tradeHistory={tradeHistory}
          stocks={stocks}
          selectedStock={selectedStock}
          onSubmitTrade={handleNewTrade}
        />
      </SuspenseBoundary>

      {/* Floating Comparison UI Panels */}
      <StockComparePanel />
      <PositionComparePanel />
    </div>
  );
}

export default App;