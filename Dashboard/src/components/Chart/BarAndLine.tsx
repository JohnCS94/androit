import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import ButtonGroup from "../ButtonGroup";
import { AggregationType } from "../../constants/enums";
import { useTrades } from "../../context/TradesContext";
import useWindowResize from "../../hooks/useWindowResize";
import { calculateAverages, groupDataByPeriod } from "../../util/functions";

interface AveragePrice {
  period: string;
  averagePrice: number;
  totalVolume: number;
}

const BarAndLine = () => {
  const width = useWindowResize();
  const { trades } = useTrades();

  const [aggregates, setAggregates] = useState<Array<AveragePrice>>([]);
  const [aggregation, setAggregation] = useState<AggregationType>(
    AggregationType.MONTHLY
  );

  useEffect(() => {
    setAggregates(calculateAverages(groupDataByPeriod(trades, aggregation)));
  }, [trades, aggregation]);

  const options: Highcharts.Options = {
    chart: { type: "line", width: width, backgroundColor: undefined },
    title: { text: "Total Market Share vs. Price", style: { color: "white" } },
    yAxis: [
      {
        title: { text: "Volume", style: { color: "white" } },
        labels: { style: { color: "white" } },
        opposite: false,
      },
      {
        title: { text: "Price", style: { color: "white" } },
        labels: { style: { color: "white" } },
        opposite: true,
      },
    ],
    xAxis: {
      categories: aggregates.map((item) => item.period),
      labels: {
        style: {
          color: "white",
        },
      },
    },
    legend: { itemStyle: { color: "white" } },
    series: [
      {
        name: "Shares Traded",
        type: "column",
        yAxis: 0,
        data: aggregates.map((item) => item.totalVolume),
        color: "#a3a7a1",
      },
      {
        name: "Price",
        type: "line",
        yAxis: 1,
        data: aggregates.map(
          (item) => Math.round(Number(item.averagePrice) * 100) / 100
        ),
        color: "#c1ee00",
        tooltip: { valuePrefix: "$" },
      },
    ],
  };

  return (
    <div className="bar-and-line-container">
      <HighchartsReact highcharts={Highcharts} options={options} />
      <ButtonGroup aggregation={aggregation} setAggregation={setAggregation} />
    </div>
  );
};

export default BarAndLine;
