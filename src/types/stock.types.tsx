export interface Stock{
    id : string,
    symbol:string,
    name :string,
    price : number,
    change : number,
    changePct : number,
    volume : number,
    marketCap : number,
    sector : string,
}

export interface Trade{
    id : string,
    stockId : string,
    symbol: string,
    type : 'BUY' | 'SELL',
    quantity : number,
    price : number,
    date : string,
}

export interface Portfolio{
    totalValue:number,
    totalCost:number,
    gainLoss:number,
    holdings:Stock[],
}

export interface Holding {
  id: string;
  symbol: string;
  qty: number;
  investedValue: number;  // = qty * avgPrice
  currentValue: number;   // = qty * ltp
  totalReturn: number;    // = currentValue - investedValue
}


export interface Position {
  id: string;
  symbol: string;
  qty: number;
  avgPrice: number;    // average buy price
  ltp: number;         // last traded price (current market price)
  pnl: number;         // profit & loss in dollars
  pnlPct: number;      // profit & loss as a percentage
}
