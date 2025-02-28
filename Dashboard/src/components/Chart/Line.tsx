import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { image, StockSymbols } from "../../constants/images";
import { TrendData } from "../../constants/interfaces";
import { useTrades } from "../../context/TradesContext";

import "../../styles/extras.css";

interface LineProps {
  trend: TrendData;
}

const Line = ({ trend }: LineProps) => {
  const { trades } = useTrades();
  const [valueChange, setValueChange] = useState(0);

  const options: Highcharts.Options = {
    chart: {
      type: "area",
      height: 100,
      width: null,
      backgroundColor: undefined,
    },
    title: { text: undefined },
    yAxis: { visible: false },
    xAxis: { visible: false },
    legend: { enabled: false },
    tooltip: { enabled: false },
    plotOptions: {
      area: {
        marker: { enabled: false },
        enableMouseTracking: false,
        fillOpacity: 0.3,
      },
    },
    series: [
      {
        type: "area",
        data: trend.data.map(
          (item) => Math.round(Number(item.price) * 100) / 100
        ),
        color: "#c1ee00",
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, "#787a7a"],
            [1, "#c1ee0026"],
          ],
        },
      },
    ],
  };

  useEffect(() => {
    const newValue = trend.data[trend.data.length - 1].price;
    const oldValue = trend.data[0].price;
    const change = newValue - oldValue;
    setValueChange(change);
  }, [trades, trend]);

  return (
    <div className="center">
      <div className="stock-trend">
        <div className="stock-info-container">
          <div className="left-side">
            <img src={image[trend.symbol as keyof StockSymbols]} />
            <div className="stock-info">
              <div className="stock-symbol">{trend.symbol}</div>
              <div className="stock-price">
                ${trend.data[trend.data.length - 1].price}
              </div>
            </div>
          </div>
          <div>
            <div className="change-text">${valueChange.toFixed(2)}</div>
            <div className="change-subtitle">Change Since Date</div>
          </div>
        </div>
        <div className="trend-line-container">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Line;
