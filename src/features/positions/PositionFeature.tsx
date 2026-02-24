import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import type { Position } from "../../types/stock.types";
import DataTable from '../../components/DataTable';
import { positions } from '../../data/stockData';

export default function PositionFeature() {
  const { visibleItems, bottomRef, hasMore } = useInfiniteScroll(positions, 5);

  return (
    <div>
      <h2 style={{ color: '#1E40AF', marginTop: 32 }}>Positions</h2>
      <DataTable<Position>
        data={visibleItems}
        rowKey='id'
        filterKey='symbol'
        columns={[
          { key: 'symbol', header: 'Symbol', sortable: true },
          { key: 'qty', header: 'Qty', sortable: true },
          { key: 'avgPrice', header: 'Avg Price', sortable: true, render: v => `$${Number(v).toFixed(2)}` },
          { key: 'ltp', header: 'LTP', sortable: true, render: v => `$${Number(v).toFixed(2)}` },
          { 
            key: 'pnl', 
            header: 'P&L',
            sortable: true,
            render: (v) => {
              const n = Number(v);
              return (
                <span style={{ color: n >= 0 ? '#166534' : '#991B1B', fontWeight: 'bold' }}>
                  {n >= 0 ? '+' : ''}${n.toFixed(2)}
                </span>
              );
            }
          },
          { 
            key: 'pnlPct', 
            header: 'P&L %',
            sortable: true,
            render: (v) => {
              const n = Number(v);
              return (
                <span style={{ color: n >= 0 ? '#166534' : '#991B1B' }}>
                  {n >= 0 ? '+' : ''}{n.toFixed(2)}%
                </span>
              );
            }
          },
        ]}
      />

      {/* Infinite Scroll Sentinel */}
      <div ref={bottomRef} style={{ height: 1 }} />

      {/* Status Messages */}
      {hasMore && (
        <p style={{ textAlign: 'center', color: '#666', marginTop: 16 }}>
          Loading more positions...
        </p>
      )}
      {!hasMore && visibleItems.length > 0 && (
        <p style={{ textAlign: 'center', color: '#999', marginTop: 16 }}>
          All {positions.length} positions loaded
        </p>
      )}
    </div>
  );
}