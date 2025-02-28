import { Dispatch, SetStateAction } from "react";

import { ChartType } from "../../constants/enums";

interface ChartToggleProps {
  chart: string;
  setChart: Dispatch<SetStateAction<ChartType>>;
  text: string;
  value: ChartType;
}

const ChartToggle = ({ chart, setChart, text, value }: ChartToggleProps) => {
  const change = () => setChart(value);
  return (
    <div className="chart-select-container">
      <button
        className={`button ${chart === value && "selected"}`}
        onClick={change}
      >
        {text}
      </button>
    </div>
  );
};

export default ChartToggle;
