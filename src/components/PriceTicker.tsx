import React from 'react';
import { stocks } from '../data/stockData';

const PriceTicker: React.FC = () => {
  // We duplicate the array to ensure the scroll is seamless/infinite
  const tickerData = [...stocks, ...stocks];

  return (
    <div style={{
      width: '100%',
      overflow: 'hidden',
      background: '#fff',
      borderBottom: '1px solid #E5E7EB',
      padding: '12px 0',
      display: 'flex',
      alignItems: 'center'
    }}>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
      <div style={{
        display: 'flex',
        whiteSpace: 'nowrap',
        animation: 'marquee 40s linear infinite',
      }}>
        {tickerData.map((stock, index) => {
          // Mock logic: Groww usually shows a small % change
          const mockChange = (stock.price * 0.01).toFixed(2);
          const isPositive = index % 2 === 0; // Alternating for visual variety in mock

          return (
            <div key={`${stock.symbol}-${index}`} style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0 25px',
              borderRight: '1px solid #F3F4F6'
            }}>
              <span style={{ fontWeight: 600, fontSize: '14px', color: '#111827', marginRight: '8px' }}>
                {stock.symbol}
              </span>
              <span style={{ fontSize: '14px', color: '#374151', marginRight: '8px' }}>
                ₹{stock.price.toLocaleString()}
              </span>
              <span style={{ 
                fontSize: '13px', 
                fontWeight: 500, 
                color: isPositive ? '#00D09C' : '#EB5B3C' 
              }}>
                {isPositive ? '▲' : '▼'} {mockChange}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PriceTicker;