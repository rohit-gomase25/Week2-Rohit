import React from 'react';
import type { Holding } from '../../types/stock.types';
import DataTable from '../../components/DataTable';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useHoldingsStore } from '../../stores/useHoldingsStore';

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

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#EC4899'];

const HoldingsFeature: React.FC = () => {
  const { holdings, toggleHoldingCompare, compareHoldings } = useHoldingsStore();

  const pieData = (holdings || []).map((holding, index) => ({
    name: holding.symbol,
    value: holding.currentValue,
    fill: COLORS[index % COLORS.length]
  }));

  return (
    <div style={{ marginBottom: '40px' }}>
      <h2 style={{ color: '#1E40AF' }}>Holdings</h2>
      
      {holdings && holdings.length > 0 && (
        <div style={{ width: '100%', height: 350, marginBottom: '20px', background: '#f8fafc', borderRadius: '8px', padding: '16px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : '0'}%`}
                outerRadius={100}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Value']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <DataTable<Holding>
        data={holdings || []}
        rowKey="id"
        filterKey="symbol"
        pageSize={10}
        columns={[
          {
            key: 'compare' as any,
            header: 'Compare',
            render: (_, item) => {
              const inCompare = compareHoldings.some(h => h.id === item.id);
              return (
                <button
                  onClick={() => toggleHoldingCompare(item)}
                  style={{
                    background: inCompare ? '#3B82F6' : '#E5E7EB',
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
            key: 'investedValue', 
            header: 'Invested Value', 
            render: (v) => '$' + Number(v).toLocaleString() 
          },
          { 
            key: 'currentValue', 
            header: 'Current Value', 
            render: (v) => '$' + Number(v).toLocaleString() 
          },
          { 
            key: 'totalReturn', 
            header: 'Total Return', 
            render: (v) => pnlCell(v) 
          }
        ]}
      />
    </div>
  );
};

export default HoldingsFeature;



// label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : '0'}%`}