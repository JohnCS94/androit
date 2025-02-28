import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import TreemapModule from "highcharts/modules/treemap";

import useWindowResize from "../../hooks/useWindowResize";
import { calculateTotalValueExchanged } from "../../util/functions";
import { useTrades } from "../../context/TradesContext";

if (typeof TreemapModule === "function") {
  TreemapModule(Highcharts);
}

const TreeMap = () => {
  const width = useWindowResize();
  const { trades } = useTrades();
  const CHART_PADDING = 100;

  const [treeMapData, setTreeMapData] = useState({});

  useEffect(() => {
    setTreeMapData(calculateTotalValueExchanged(trades));
  }, [trades]);

  const options: Highcharts.Options = {
    chart: {
      type: "treemap",
      width: width - CHART_PADDING,
      backgroundColor: undefined,
    },
    title: { text: "Treemap", style: { color: "white" } },
    colorAxis: { minColor: "white", maxColor: "red" },
    series: [
      {
        type: "treemap",
        layoutAlgorithm: "squarified",
        data: Object.entries(treeMapData).map(([key, value]) => {
          return {
            name: key,
            value: Math.round(Number(value) * 100) / 100,
            color: "#627432",
          };
        }),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default TreeMap;
