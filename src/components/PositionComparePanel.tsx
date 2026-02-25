import React from 'react';
import { useStockStore } from '../stores/useStockStore';
import type { Position } from '../types/stock.types';

// ── Metric row definitions for Positions ────────────────────────────────────
const POSITION_ROWS: {
  label:  string;
  key:    keyof Position;
  format?: (v: unknown) => string;
}[] = [
  {
    label:  'Qty',
    key:    'qty',
    format: function (v) { return Number(v).toLocaleString(); },
  },
  {
    label:  'Avg Price',
    key:    'avgPrice',
    format: function (v) { return '$' + Number(v).toFixed(2); },
  },
  {
    label:  'LTP',
    key:    'ltp',
    format: function (v) { return '$' + Number(v).toFixed(2); },
  },
  {
    label:  'P&L',
    key:    'pnl',
    format: function (v) { 
      var n = Number(v);
      return (n >= 0 ? '+' : '') + '$' + n.toFixed(2); 
    },
  },
  {
    label:  'P&L %',
    key:    'pnlPct',
    format: function (v) { 
      var n = Number(v);
      return (n >= 0 ? '+' : '') + n.toFixed(2) + '%'; 
    },
  },
];

const PositionComparePanel: React.FC = () => {
  // Subscribe to position-specific store values
  const comparePositions    = useStockStore(function (s) { return s.comparePositions; });
  const clearPositionCompare = useStockStore(function (s) { return s.clearPositionCompare; });
  const togglePositionCompare = useStockStore(function (s) { return s.togglePositionCompare; });

  // Guard: Only show if 2 or more positions are selected
  if (comparePositions.length < 2) return null;

  return (
    <div
      style={{
        position:     'fixed',
        bottom:       0,
        left:         0,
        right:        0,
        background:   '#fff',
        // Green border to distinguish from the Blue stock compare panel
        borderTop:    '3px solid #10B981', 
        padding:      '16px 24px',
        zIndex:       1050, // Slightly higher than StockComparePanel
        boxShadow:    '0 -4px 15px rgba(0,0,0,0.1)',
        maxHeight:    '35vh',
        overflowY:    'auto',
      }}
    >
      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ margin: 0, color: '#0e0f0f', fontSize: 16 }}>
          Comparing {comparePositions.length} Positions
        </h3>
        <button
          onClick={clearPositionCompare}
          style={{
            background:   '#DCFCE7',
            color:        '#166534',
            border:       'none',
            borderRadius: 4,
            padding:      '6px 14px',
            cursor:       'pointer',
            fontSize:     13,
            fontWeight:   'bold',
          }}
        >
          Clear All
        </button>
      </div>

      {/* ── Table ── */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ backgroundColor: '#10B981', color: '#fff' }}>
            <th style={{ padding: '8px 12px', textAlign: 'left', width: 130 }}>Metric</th>
            {comparePositions.map(function (pos) {
              return (
                <th key={pos.id} style={{ padding: '8px 12px', textAlign: 'center' }}>
                  <span>{pos.symbol}</span>
                  <button
                    onClick={function () { togglePositionCompare(pos); }}
                    style={{
                      marginLeft: 8,
                      background: 'rgba(255,255,255,0.2)',
                      border: '1px solid #fff',
                      color: '#fff',
                      borderRadius: 3,
                      cursor: 'pointer',
                      fontSize: 10,
                    }}
                  >✕</button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {POSITION_ROWS.map(function (row, rowIndex) {
            return (
              <tr key={row.key} style={{ backgroundColor: rowIndex % 2 === 0 ? '#fff' : '#F0FDF4' }}>
                <td style={{ padding: '8px 12px', fontWeight: 'bold', color: '#374151', borderRight: '1px solid #E5E7EB' }}>
                  {row.label}
                </td>
                {comparePositions.map(function (pos) {
                  const val = pos[row.key];
                  const display = row.format ? row.format(val) : String(val);

                  // Highlight logic for P&L: show best performer in bold green
                  const isPnl = row.key === 'pnl' || row.key === 'pnlPct';
                  const maxPnl = Math.max(...comparePositions.map(p => Number(p[row.key])));
                  const isBest = isPnl && Number(val) === maxPnl;

                  return (
                    <td
                      key={pos.id}
                      style={{
                        padding: '8px 12px',
                        textAlign: 'center',
                        color: isBest ? '#166534' : '#111827',
                        fontWeight: isBest ? 'bold' : 'normal',
                        backgroundColor: isBest ? '#D1FAE5' : 'transparent',
                      }}
                    >
                      {display}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PositionComparePanel;