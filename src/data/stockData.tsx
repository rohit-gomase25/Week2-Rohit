import type { Stock, Trade, Holding, Position } from '../types/stock.types';

export const stocks: Stock[] = [
  { id: '1', symbol: 'AAPL', name: 'Apple Inc.', price: 189.30, change: 2.15, changePct: 1.15, volume: 54_200_000, marketCap: 2_950_000_000_000, sector: 'Technology' },
  { id: '2', symbol: 'GOOGL', name: 'Alphabet Inc.', price: 141.80, change: -0.95, changePct: -0.67, volume: 22_300_000, marketCap: 1_770_000_000_000, sector: 'Technology' },
  { id: '3', symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.90, change: 4.20, changePct: 1.12, volume: 19_600_000, marketCap: 2_810_000_000_000, sector: 'Technology' },
  { id: '4', symbol: 'TSLA', name: 'Tesla Inc.', price: 248.50, change: -7.30, changePct: -2.85, volume: 98_700_000, marketCap: 791_000_000_000, sector: 'Automotive' },
  { id: '5', symbol: 'JPM', name: 'JPMorgan Chase', price: 196.40, change: 1.05, changePct: 0.54, volume: 8_900_000, marketCap: 568_000_000_000, sector: 'Finance' },
  { id: '6', symbol: 'AMZN', name: 'Amazon.com Inc.', price: 175.20, change: 1.45, changePct: 0.83, volume: 31_200_000, marketCap: 1_820_000_000_000, sector: 'Consumer' },
  { id: '7', symbol: 'NVDA', name: 'NVIDIA Corp.', price: 726.10, change: 15.30, changePct: 2.15, volume: 45_000_000, marketCap: 1_790_000_000_000, sector: 'Technology' },
  { id: '8', symbol: 'META', name: 'Meta Platforms', price: 485.40, change: -2.10, changePct: -0.43, volume: 18_400_000, marketCap: 1_240_000_000_000, sector: 'Technology' },
  { id: '9', symbol: 'V', name: 'Visa Inc.', price: 282.15, change: 0.65, changePct: 0.23, volume: 6_200_000, marketCap: 580_000_000_000, sector: 'Finance' },
  { id: '10', symbol: 'NFLX', name: 'Netflix Inc.', price: 590.20, change: 5.80, changePct: 0.99, volume: 4_100_000, marketCap: 255_000_000_000, sector: 'Entertainment' },
  { id: '11', symbol: 'DIS', name: 'Walt Disney Co.', price: 110.50, change: -1.20, changePct: -1.07, volume: 12_500_000, marketCap: 202_000_000_000, sector: 'Entertainment' },
  { id: '12', symbol: 'ADBE', name: 'Adobe Inc.', price: 540.30, change: 3.40, changePct: 0.63, volume: 2_800_000, marketCap: 245_000_000_000, sector: 'Technology' },
  { id: '13', symbol: 'PYPL', name: 'PayPal Holdings', price: 62.10, change: -0.85, changePct: -1.35, volume: 15_200_000, marketCap: 68_000_000_000, sector: 'Finance' },
  { id: '14', symbol: 'BRK.B', name: 'Berkshire Hathaway', price: 408.20, change: 1.90, changePct: 0.47, volume: 3_100_000, marketCap: 880_000_000_000, sector: 'Finance' },
  
];

export const trades: Trade[] = [
  { id: 't1', stockId: '1', symbol: 'AAPL', type: 'BUY', quantity: 10, price: 175.00, date: '2024-01-15' },
  { id: 't2', stockId: '3', symbol: 'MSFT', type: 'BUY', quantity: 5, price: 360.00, date: '2024-02-20' },
  { id: 't3', stockId: '4', symbol: 'TSLA', type: 'SELL', quantity: 8, price: 265.00, date: '2024-03-10' },
  { id: 't4', stockId: '7', symbol: 'NVDA', type: 'BUY', quantity: 2, price: 650.00, date: '2024-03-15' },
  { id: 't5', stockId: '6', symbol: 'AMZN', type: 'BUY', quantity: 15, price: 168.00, date: '2024-03-18' },
  { id: 't6', stockId: '13', symbol: 'PYPL', type: 'BUY', quantity: 50, price: 58.00, date: '2024-03-20' },
  { id: 't7', stockId: '12', symbol: 'ADBE', type: 'BUY', quantity: 4, price: 520.00, date: '2024-03-22' },
];

export const holdings: Holding[] = [
  { id: 'h1', symbol: 'AAPL', qty: 10, investedValue: 1750.00, currentValue: 1893.00, totalReturn: 143.00 },
  { id: 'h2', symbol: 'MSFT', qty: 5, investedValue: 1800.00, currentValue: 1894.50, totalReturn: 94.50 },
  { id: 'h3', symbol: 'TSLA', qty: 8, investedValue: 2120.00, currentValue: 1988.00, totalReturn: -132.00 },
  { id: 'h4', symbol: 'GOOGL', qty: 15, investedValue: 2175.00, currentValue: 2127.00, totalReturn: -48.00 },
  { id: 'h5', symbol: 'JPM', qty: 20, investedValue: 3840.00, currentValue: 3928.00, totalReturn: 88.00 },
  { id: 'h6', symbol: 'NVDA', qty: 2, investedValue: 1300.00, currentValue: 1452.20, totalReturn: 152.20 },
  { id: 'h7', symbol: 'AMZN', qty: 15, investedValue: 2520.00, currentValue: 2628.00, totalReturn: 108.00 },
  { id: 'h8', symbol: 'META', qty: 4, investedValue: 1800.00, currentValue: 1941.60, totalReturn: 141.60 },
  { id: 'h9', symbol: 'V', qty: 10, investedValue: 2750.00, currentValue: 2821.50, totalReturn: 71.50 },
  { id: 'h10', symbol: 'NFLX', qty: 3, investedValue: 1700.00, currentValue: 1770.60, totalReturn: 70.60 },
  { id: 'h11', symbol: 'DIS', qty: 10, investedValue: 1150.00, currentValue: 1105.00, totalReturn: -45.00 },
  { id: 'h12', symbol: 'ADBE', qty: 4, investedValue: 2080.00, currentValue: 2161.20, totalReturn: 81.20 },
  { id: 'h13', symbol: 'PYPL', qty: 50, investedValue: 2900.00, currentValue: 3105.00, totalReturn: 205.00 },
  { id: 'h14', symbol: 'BRK.B', qty: 5, investedValue: 1950.00, currentValue: 2041.00, totalReturn: 91.00 },
];

export const positions: Position[] = [
  { id: 'p1', symbol: 'AAPL', qty: 10, avgPrice: 175.00, ltp: 189.30, pnl: 143.00, pnlPct: 8.17 },
  { id: 'p2', symbol: 'MSFT', qty: 5, avgPrice: 360.00, ltp: 378.90, pnl: 94.50, pnlPct: 5.25 },
  { id: 'p3', symbol: 'TSLA', qty: 8, avgPrice: 265.00, ltp: 248.50, pnl: -132.00, pnlPct: -6.23 },
  { id: 'p4', symbol: 'GOOGL', qty: 15, avgPrice: 145.00, ltp: 141.80, pnl: -48.00, pnlPct: -2.21 },
  { id: 'p5', symbol: 'JPM', qty: 20, avgPrice: 192.00, ltp: 196.40, pnl: 88.00, pnlPct: 2.29 },
  { id: 'p6', symbol: 'NVDA', qty: 2, avgPrice: 650.00, ltp: 726.10, pnl: 152.20, pnlPct: 11.71 },
  { id: 'p7', symbol: 'AMZN', qty: 15, avgPrice: 168.00, ltp: 175.20, pnl: 108.00, pnlPct: 4.29 },
  { id: 'p8', symbol: 'META', qty: 4, avgPrice: 450.00, ltp: 485.40, pnl: 141.60, pnlPct: 7.87 },
  { id: 'p9', symbol: 'V', qty: 10, avgPrice: 275.00, ltp: 282.15, pnl: 71.50, pnlPct: 2.60 },
  { id: 'p10', symbol: 'NFLX', qty: 3, avgPrice: 566.67, ltp: 590.20, pnl: 70.60, pnlPct: 4.15 },
  { id: 'p11', symbol: 'DIS', qty: 10, avgPrice: 115.00, ltp: 110.50, pnl: -45.00, pnlPct: -3.91 },
  { id: 'p12', symbol: 'ADBE', qty: 4, avgPrice: 520.00, ltp: 540.30, pnl: 81.20, pnlPct: 3.90 },
  { id: 'p13', symbol: 'PYPL', qty: 50, avgPrice: 58.00, ltp: 62.10, pnl: 205.00, pnlPct: 7.07 },
  { id: 'p14', symbol: 'BRK.B', qty: 5, avgPrice: 390.00, ltp: 408.20, pnl: 91.00, pnlPct: 4.67 },

];