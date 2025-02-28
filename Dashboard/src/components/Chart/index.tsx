import BarAndLine from "./BarAndLine";
import TreeMap from "./TreeMap";
import { ChartType } from "../../constants/enums";

interface ChartProps {
  chartType: string;
}

const Chart = ({ chartType }: ChartProps) => {
  if (chartType === ChartType.TREE) return <TreeMap />;

  if (chartType === ChartType.BAR) return <BarAndLine />;

  /**
   * Likely to never be reached given it is an enum of controlled values, but
   * could also put an Error component here
   */
  return null;
};

export default Chart;
