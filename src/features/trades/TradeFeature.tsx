import React from 'react';
import type{ Trade, Stock } from '../../types/stock.types';
import DataTable        from '../../components/DataTable';
import TradeForm        from '../../components/TradeForm';
 
// Trade but WITHOUT id and date (the form user hasn't submitted yet)
type NewTradeInput = Omit<Trade, 'id' | 'date'>;
 
interface TradeFeatureProps {
  tradeHistory:  Trade[];
  stocks:        Stock[];
  selectedStock: Stock | null;
  onSubmitTrade: (input: NewTradeInput) => void;
}
 
const TradeFeature: React.FC<TradeFeatureProps> = ({
  tradeHistory,
  stocks,
  selectedStock,
  onSubmitTrade,
}) => {
  return (
    <>
      <h2 style={{ color: '#1E40AF', marginTop: 32 }}>Trade History</h2>
      <DataTable<Trade>
        data={tradeHistory}
        rowKey="id"
        filterKey="symbol"
        pageSize={10}
        columns={[
          { key: 'symbol',   header: 'Symbol',  sortable: true },
          { key: 'type',     header: 'Type',
            render: function(value) {
              // BUY = green text, SELL = red text
              var isBuy   = value === 'BUY';
              var colour  = isBuy ? '#166534' : '#991B1B';
              return <strong style={{ color: colour }}>{String(value)}</strong>;
            }
          },
          { key: 'quantity', header: 'Qty',     sortable: true },
          { key: 'price',    header: 'Price',   sortable: true,
            render: function(value) { return '$' + Number(value).toFixed(2); }
          },
          { key: 'date',     header: 'Date',    sortable: true },
        ]}
      />
 
      <h2 style={{ color: '#1E40AF', marginTop: 32 }}>Place a Trade</h2>
      <TradeForm
        stocks={stocks}
        onSubmitTrade={onSubmitTrade}
        initialValues={selectedStock ?? {}}
      />
    </>
  );
};
 
export default TradeFeature;  // REQUIRED for React.lazy()
