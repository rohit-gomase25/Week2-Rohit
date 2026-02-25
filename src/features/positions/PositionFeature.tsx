import React from 'react';
import type { Position } from '../../types/stock.types';
import DataTable from '../../components/DataTable';
import { usePositionsStore } from '../../stores/usePositionsStore';

const PositionsFeature: React.FC = () => {
  const { positions, togglePositionCompare, comparePositions } = usePositionsStore();

  return (
    <div style={{ marginBottom: '40px' }}>
      <h2 style={{ color: '#1E40AF' }}>Positions</h2>
      <DataTable<Position>
        data={positions || []}
        rowKey="id"
        filterKey="symbol"
        pageSize={10}
        columns={[
          {
            // FIX for TS error: Cast to any because 'compare' is a custom column
            key: 'compare' as any,
            header: 'Compare',
            render: (_, pos) => {
              const inCompare = comparePositions.some(p => p.id === pos.id);
              return (
                <button
                  onClick={() => togglePositionCompare(pos)}
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
            key: 'avgPrice', 
            header: 'Avg Price', 
            render: (v) => `$${Number(v).toFixed(2)}` 
          },
          { 
            key: 'pnl', 
            header: 'P&L', 
            render: (v) => (
              <span style={{ color: Number(v) >= 0 ? '#166534' : '#991B1B', fontWeight: 'bold' }}>
                {Number(v) >= 0 ? '+' : ''}${Number(v).toFixed(2)}
              </span>
            )
          }
        ]}
      />
    </div>
  );
};

export default PositionsFeature;