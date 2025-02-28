export interface StockTradeData {
  id: string;
  timestamp: string;
  tradeSize: number;
  price: number;
  symbol: string;
}

export interface Aggregates {
  period: string;
  averagePrice: number;
  totalVolume: number;
}

interface Series {
  timestamp: string;
  price: number;
}

export interface TrendData {
  symbol: string;
  data: Array<Series>;
}
