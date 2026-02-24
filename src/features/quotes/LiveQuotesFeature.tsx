import React from 'react';
import type{ Stock }    from '../../types/stock.types';
import StockCard    from '../../components/StockCard';
import SearchBar    from '../../components/SearchBar';
import DataTable    from '../../components/DataTable';
 
interface LiveQuotesFeatureProps {
  stocks:         Stock[];       // the filtered list of stocks to display
  selectedStock:  Stock | null;  // which card is currently highlighted
  onSelectStock:  (stock: Stock) => void;   // called when user clicks a card
  onSearch:       (query: string) => void;  // called when user types in search
  onFilterChange: (sector: string) => void; // called when user picks a sector
}
 
const LiveQuotesFeature: React.FC<LiveQuotesFeatureProps> = ({
  stocks,
  selectedStock,
  onSelectStock,
  onSearch,
  onFilterChange,
}) => {
  return (
    <>
      <SearchBar
        onSearch={onSearch}
        onFilterChange={onFilterChange}
        placeholder="Search by symbol or name..."
      />
 
      {/* The 3-column grid of stock cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {stocks.map(function(stock) {
          return (
            <StockCard
              key={stock.id}
              stock={stock}
              isSelected={selectedStock?.id === stock.id}
              onSelect={onSelectStock}
            />
          );
        })}
      </div>
 
      <h2 style={{ color: '#1E40AF' }}>Live Quotes</h2>
      <DataTable<Stock>
        data={stocks}
        rowKey="id"
        onRowClick={onSelectStock}
        emptyMessage="No stocks match your search."
        columns={[
          { key: 'symbol',    header: 'Symbol',   sortable: true },
          { key: 'name',      header: 'Company' },
          { key: 'price',     header: 'Price',    sortable: true,
            render: function(value) {
              return '$' + Number(value).toFixed(2);
            }
          },
          { key: 'changePct', header: 'Change %', sortable: true,
            render: function(value) {
              var numberValue = Number(value);
              var isPositive  = numberValue >= 0;
              var colour      = isPositive ? 'green' : 'red';
              var prefix      = isPositive ? '+' : '';
              return <span style={{ color: colour }}>{prefix}{numberValue.toFixed(2)}%</span>;
            }
          },
          { key: 'volume', header: 'Volume',
            render: function(value) { return Number(value).toLocaleString(); }
          },
          { key: 'sector', header: 'Sector' },
        ]}
      />
    </>
  );
};
 
// DEFAULT export — REQUIRED. React.lazy() will fail without this.
export default LiveQuotesFeature;
