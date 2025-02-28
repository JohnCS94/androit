import { useCallback, useEffect, useState } from "react";

import Chart from "./Chart";
import Selectors from "./Selectors";
import ChartToggle from "./Chart/ChartToggle";
import { fetchTrades } from "../api/main";
import { ChartType } from "../constants/enums";
import { useTrades } from "../context/TradesContext";

const Container = () => {
  const { setTrades } = useTrades();

  const [startDate, setStartDate] = useState(
    new Date(
      new Date().getFullYear() - 1,
      new Date().getMonth(),
      new Date().getDay()
    )
      .toISOString()
      .split("T")[0]
  );
  const [minSize, setMinSize] = useState<number>(150);
  const [chart, setChart] = useState<ChartType>(ChartType.TREE);

  const handleFetchTrades = useCallback(async () => {
    var trades = await fetchTrades(new Date(startDate).toISOString(), minSize);

    setTrades(trades);
  }, [startDate, minSize, chart]);

  useEffect(() => {
    handleFetchTrades();
  }, [handleFetchTrades]);

  return (
    <div className="main-container">
      <Selectors
        startDate={startDate}
        setStartDate={setStartDate}
        minSize={minSize}
        setMinSize={setMinSize}
      />
      <div className="container-wrapper">
        <Chart chartType={chart} />
        <div className="chart-select-container">
          <ChartToggle
            chart={chart}
            setChart={setChart}
            text="Tree Map"
            value={ChartType.TREE}
          />
          <ChartToggle
            chart={chart}
            setChart={setChart}
            text="Bar Chart"
            value={ChartType.BAR}
          />
        </div>
      </div>
    </div>
  );
};

export default Container;
