import { lazy, useState } from 'react';
import PriceTicker from './components/PriceTicker';
import { stocks, trades, positions, holdings } from './data/stockData';
import type { Stock, Trade } from './types/stock.types';
import SuspenseBoundary from './boundaries/SuspenseBoundary';
import TableSkeleton from './skeletons/TableSkeleton';
import CardGridSkeleton from './skeletons/CardGridSkeleton';
import FormSkeleton from './skeletons/FormSkeleton';

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
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [tradeHistory, setTradeHistory] = useState<Trade[]>(trades);

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

      <SuspenseBoundary
        fallback={<TableSkeleton rows={3} cols={3} title="Portfolio Summary" />}
      >
        <PortfolioFeature availableStocks={stocks} />
      </SuspenseBoundary>

      <SuspenseBoundary
        fallback={<TableSkeleton rows={5} cols={6} title="Positions" />}
      >
        <PositionsFeature positions={positions} />
      </SuspenseBoundary>

      <SuspenseBoundary
        fallback={<TableSkeleton rows={5} cols={5} title="Holdings" />}
      >
        <HoldingsFeature holdings={holdings} />
      </SuspenseBoundary>

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
    </div>
  );
}

export default App;