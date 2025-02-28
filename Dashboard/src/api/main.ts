import { StockTradeData } from "../constants/interfaces";

export const fetchTrades = async (
  startTimestamp: string,
  minQuoteSize: number
): Promise<StockTradeData[]> => {
  /**
   * Would make this an env variable that would change domain based on if
   * in development or production, but for the purposes of this exercise I
   * left it as a constant string
   */
  const baseUrl = "http://localhost:5072/api/trades";

  const url = new URL(baseUrl);

  const params = new URLSearchParams({
    startTimestamp,
    minQuoteSize: minQuoteSize.toString(),
  });

  url.search = params.toString();

  const res = await fetch(url);

  if (!res.ok) throw new Error(`Failed to fetch trades ${res.statusText}`);

  return res.json();
};
