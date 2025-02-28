import { AggregationType } from "../constants/enums";
import { Aggregates, StockTradeData } from "../constants/interfaces";

/**
 * I personally like to keep functions separate from components especially
 * if there is no state manipulation.
 */

export const groupDataByPeriod = (
  data: Array<StockTradeData>,
  aggregation: AggregationType
): Record<string, { prices: number[]; volumes: number[] }> => {
  const groupedData: Record<string, { prices: number[]; volumes: number[] }> =
    {};

  data.forEach((item) => {
    const date = new Date(item.timestamp);
    let periodKey: string;

    switch (aggregation) {
      case AggregationType.DAILY:
        periodKey = date.toISOString().split("T")[0];
        break;

      case AggregationType.WEEKLY:
        const startOfWeek = new Date(
          date.setDate(date.getDate() - date.getDay())
        );
        periodKey = startOfWeek.toISOString().split("T")[0];
        break;

      case AggregationType.MONTHLY:
        periodKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
        break;

      case AggregationType.QUARTERLY:
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        periodKey = `${date.getFullYear()}-Q${quarter}`;
        break;

      default:
        throw new Error("Invalid aggregation type");
    }

    if (!groupedData[periodKey]) {
      groupedData[periodKey] = { prices: [], volumes: [] };
    }

    groupedData[periodKey].prices.push(item.price);
    groupedData[periodKey].volumes.push(item.tradeSize);
  });

  return groupedData;
};

export const calculateTotalValueExchanged = (trades: Array<StockTradeData>) => {
  return trades.reduce((acc, trade) => {
    const totalValue = trade.tradeSize * trade.price;
    acc[trade.symbol] = (acc[trade.symbol] || 0) + totalValue;
    return acc;
  }, {} as Record<string, number>);
};

export const calculateAverages = (
  groupedData: Record<string, { prices: number[]; volumes: number[] }>
) => {
  const averages: Array<Aggregates> = [];

  for (const periodKey in groupedData) {
    const { prices, volumes } = groupedData[periodKey];
    const averagePrice =
      prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const totalVolume = volumes.reduce((sum, volume) => sum + volume, 0);
    averages.push({ period: periodKey, averagePrice, totalVolume });
  }

  return averages;
};
