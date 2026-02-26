import React from 'react';
import type { Position } from '../../types/stock.types';
import DataTable from '../../components/DataTable';
import { usePositionsStore } from '../../stores/usePositionsStore';

const PositionsFeature: React.FC = () => {
  // Destructure the new actions from the store
  const { 
    positions, 
    togglePositionCompare, 
    comparePositions,
    removePosition,
    addPosition // Added addPosition to handle weighted average logic
  } = usePositionsStore();

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
          },
          // --- NEW ACTIONS COLUMN ---
          {
            key: 'actions' as any,
            header: 'Actions',
            render: (_, pos) => (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => 
                    // Use addPosition instead of updatePosition. 
                    // Buying 1 more share at a set price (e.g., $200) triggers the math.
                    addPosition({ ...pos, qty: 1, avgPrice: 200 })
                  }
                  style={{ cursor: 'pointer', padding: '2px 8px' , background: '#1ed856', color: 'white', border: 'none', borderRadius: '4px' }}
                  title="Buy 1 more @ $200"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Remove ${pos.symbol}?`)) {
                      removePosition(pos.id);
                    }
                  }}
                  style={{ 
                    cursor: 'pointer', 
                    padding: '2px 8px', 
                    color: 'white', 
                    background: '#DC2626',
                    border: 'none',
                    borderRadius: '4px'
                  }}
                >
                  Delete
                </button>
              </div>
            )
          }
        ]}
      />
    </div>
  );
};

export default PositionsFeature;