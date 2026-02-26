import React from 'react';
import type { Stock, Trade } from '../../types/stock.types';
import DataTable from '../../components/DataTable';
import TradeForm from '../../components/TradeForm';
import { useTradeStore } from '../../stores/useTradeStore'; // Import the store

interface TradeFeatureProps {
  stocks: Stock[];
  selectedStock: Stock | null;
}

const TradeFeature: React.FC<TradeFeatureProps> = ({
  stocks,
  selectedStock,
}) => {
  // 1. Destructure state and actions from useTradeStore
  const { tradeHistory, addTrade } = useTradeStore();

  return (
    <>
      <h2 style={{ color: '#1E40AF', marginTop: 32 }}>Trade History</h2>
      <DataTable<Trade>
        data={tradeHistory} // Using store data
        rowKey="id"
        filterKey="symbol"
        pageSize={10}
        columns={[
          { key: 'symbol', header: 'Symbol', sortable: true },
          { 
            key: 'type', 
            header: 'Type',
            render: function(value) {
              // BUY = green text, SELL = red text
              var isBuy = value === 'BUY';
              var colour = isBuy ? '#166534' : '#991B1B';
              return <strong style={{ color: colour }}>{String(value)}</strong>;
            }
          },
          { key: 'quantity', header: 'Qty', sortable: true },
          { 
            key: 'price', 
            header: 'Price', 
            sortable: true,
            render: function(value) { return '$' + Number(value).toFixed(2); }
          },
          { key: 'date', header: 'Date', sortable: true },
        ]}
      />

      <h2 style={{ color: '#1E40AF', marginTop: 32 }}>Place a Trade</h2>
      <TradeForm
        stocks={stocks}
        onSubmitTrade={addTrade} // Using store action
        initialValues={selectedStock ?? {}}
      />
    </>
  );
};

export default TradeFeature;