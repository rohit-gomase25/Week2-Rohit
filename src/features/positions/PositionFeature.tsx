import React from 'react';
import type { Position } from '../../types/stock.types';
import DataTable from '../../components/DataTable';
import { useStockStore } from '../../stores/useStockStore';

function pnlCell(value: unknown, suffix: string = ''): React.ReactNode {
  var numberValue = Number(value);
  var isPositive = numberValue >= 0;
  var textColour = isPositive ? '#166534' : '#991B1B';
  var prefix = isPositive ? '+' : '';
  var currencySign = suffix === '%' ? '' : '$';

  return (
    <span style={{ color: textColour, fontWeight: 'bold' }}>
      {prefix}{currencySign}{numberValue.toFixed(2)}{suffix}
    </span>
  );
}

const PositionsFeature: React.FC = () => {
  // Read directly from Store
  const positions = useStockStore(function(s) { return s.positions; });
  const removePosition = useStockStore(function(s) { return s.removePosition; });
  const togglePositionCompare = useStockStore(function(s) { return s.togglePositionCompare; });
  const comparePositions = useStockStore(function(s) { return s.comparePositions; });

  return (
    <>
      <h2 style={{ color: '#1E40AF' }}>Positions</h2>
      <DataTable<Position>
        data={positions}
        rowKey="id"
        filterKey="symbol"
        pageSize={10}
        columns={[
          {
            key: 'compare' as any,
            header: 'Compare',
            render: function (_, pos) {
              var inCompare = comparePositions.some(p => p.id === pos.id);
              return (
                <button
                  onClick={function() { togglePositionCompare(pos); }}
                  style={{
                    background: inCompare ? '#10B981' : '#E5E7EB',
                    color: inCompare ? '#fff' : '#374151',
                    border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer'
                  }}
                >
                  {inCompare ? '✓' : '+'}
                </button>
              );
            }
          },
          { key: 'symbol', header: 'Symbol', sortable: true },
          { key: 'qty', header: 'Qty', sortable: true },
          {
            key: 'avgPrice', header: 'Avg Price', sortable: true,
            render: function (v) { return '$' + Number(v).toFixed(2); }
          },
          {
            key: 'pnl', header: 'P&L', sortable: true,
            render: function (v) { return pnlCell(v); }
          },
          {
            key: 'remove' as any,
            header: 'Actions',
            render: function (_, pos) {
              return (
                <button
                  onClick={function() { removePosition(pos.id); }}
                  style={{
                    background: '#FEE2E2', color: '#991B1B', border: 'none',
                    borderRadius: 4, padding: '4px 12px', cursor: 'pointer', fontWeight: 'bold'
                  }}
                >
                  Remove
                </button>
              );
            }
          }
        ]}
      />
    </>
  );
};

export default PositionsFeature;