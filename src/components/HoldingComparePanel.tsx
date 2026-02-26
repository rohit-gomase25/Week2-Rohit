import React from 'react';
import { useHoldingsStore } from '../stores/useHoldingsStore';

const HoldingComparePanel: React.FC = () => {
  const { compareHoldings, clearHoldingCompare, toggleHoldingCompare } = useHoldingsStore();

  if (compareHoldings.length < 2) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, 
      background: '#fff', borderTop: '4px solid #3B82F6',
      padding: '16px 24px', zIndex: 1150, boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
      maxHeight: '35vh', overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <h3 style={{ margin: 0, color: '#1E3A8A' }}>Comparing {compareHoldings.length} Holdings</h3>
        <button 
          onClick={clearHoldingCompare} 
          style={{ background: '#DBEAFE', color: '#1E40AF', border: 'none', padding: '6px 16px', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}
        >
          Clear All
        </button>
      </div>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ backgroundColor: '#3B82F6', color: '#fff' }}>
            <th style={{ textAlign: 'left', padding: 10 }}>Metric</th>
            {compareHoldings.map(h => (
              <th key={h.id} style={{ padding: 10 }}>
                {h.symbol} <span onClick={() => toggleHoldingCompare(h)} style={{ cursor: 'pointer', marginLeft: 8 }}>✕</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: 10, fontWeight: 'bold' }}>Qty</td>
            {compareHoldings.map(h => <td key={h.id} style={{ textAlign: 'center' }}>{h.qty}</td>)}
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: 10, fontWeight: 'bold' }}>Invested</td>
            {compareHoldings.map(h => <td key={h.id} style={{ textAlign: 'center' }}>${Number(h.investedValue).toLocaleString()}</td>)}
          </tr>
          <tr>
            <td style={{ padding: 10, fontWeight: 'bold' }}>Total Return</td>
            {compareHoldings.map(h => {
              const isPos = h.totalReturn >= 0;
              return (
                <td key={h.id} style={{ textAlign: 'center', color: isPos ? '#166534' : '#991B1B', fontWeight: 'bold' }}>
                  {isPos ? '+' : ''}${Number(h.totalReturn).toFixed(2)}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HoldingComparePanel;