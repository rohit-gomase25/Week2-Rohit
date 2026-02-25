import React from 'react';
import type{ Holding } from '../../types/stock.types';
import DataTable   from '../../components/DataTable';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
 
interface HoldingsFeatureProps {
  holdings: Holding[];
}
 
function pnlCell(value: unknown, suffix: string = ''): React.ReactNode {
  var numberValue  = Number(value);
  var isPositive   = numberValue >= 0;
  var textColour   = isPositive ? '#166534' : '#991B1B';
  var prefix       = isPositive ? '+' : '';
  var currencySign = suffix === '%' ? '' : '$';
  return (
    <span style={{ color: textColour, fontWeight: 'bold' }}>
      {prefix}{currencySign}{numberValue.toFixed(2)}{suffix}
    </span>
  );
}
 
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658'];
 
const HoldingsFeature: React.FC<HoldingsFeatureProps> = ({ holdings }) => {
  const pieData = holdings.map((holding, index) => ({
    name: holding.symbol,
    value: holding.currentValue,
    fill: COLORS[index % COLORS.length]
  }));
  return (
    <>
      <h2 style={{ color: '#1E40AF' }}>Holdings</h2>
      {holdings.length > 0 && (
        <div style={{ width: '100%', height: 400, marginBottom: '20px' }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : '0'}%`}
                outerRadius={80}
                fill="#8884d8"
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
        data={holdings}
        rowKey="id"
        filterKey="symbol"
        pageSize={10}
        columns={[
          { key: 'symbol',        header: 'Symbol',         sortable: true },
          { key: 'qty',           header: 'Qty',            sortable: true },
          { key: 'investedValue', header: 'Invested Value', sortable: true,
            render: function(value) { return '$' + Number(value).toLocaleString(); }
          },
          { key: 'currentValue',  header: 'Current Value',  sortable: true,
            render: function(value) { return '$' + Number(value).toLocaleString(); }
          },
          { key: 'totalReturn',   header: 'Total Return',   sortable: true,
            render: function(value) { return pnlCell(value); }
          },
        ]}
      />
    </>
  );
};
 
export default HoldingsFeature;
