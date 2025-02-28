import { useEffect, useState } from "react";

import Line from "./Chart/Line";
import { StockTradeData, TrendData } from "../constants/interfaces";
import { useTrades } from "../context/TradesContext";

const Extras = () => {
  const { trades } = useTrades();

  const [stockCharts, setStockCharts] = useState<Array<TrendData>>([]);

  const transformData = (data: Array<StockTradeData>) => {
    const symbols = [...new Set(data.map((item) => item.symbol))];

    const series = symbols.map((symbol) => ({
      symbol,
      data: data
        .filter((item) => item.symbol === symbol)
        .map((d) => ({
          timestamp: d.timestamp,
          price: d.price,
        })),
    }));

    return series;
  };

  useEffect(() => {
    const test = transformData(trades);
    setStockCharts(test);
  }, [trades]);

  return (
    <div className="scrollable-content">
      {stockCharts.map((a, i) => {
        return <Line key={i} trend={a} />;
      })}
    </div>
  );
};

export default Extras;
