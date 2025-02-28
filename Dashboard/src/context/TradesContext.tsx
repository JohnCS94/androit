import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { StockTradeData } from "../constants/interfaces";

type TradesContextType = {
  trades: Array<StockTradeData>;
  setTrades: Dispatch<SetStateAction<Array<StockTradeData>>>;
};

/**
 * The 'trades' were being sent and use at various parts of the DOM hierarchy.
 * Instead of continually passing down and lifting state up I decided to create
 * context instead. Decided not to use redux becaues of scale of project and
 * number of state needed.
 */

const TradesContext = createContext<TradesContextType | undefined>(undefined);

export const TradesProvider = ({ children }: any) => {
  const [trades, setTrades] = useState<Array<StockTradeData>>([]);

  return (
    <TradesContext.Provider
      value={{
        trades,
        setTrades,
      }}
    >
      {children}
    </TradesContext.Provider>
  );
};

export default TradesContext;

export const useTrades = () => {
  const context = useContext(TradesContext);
  if (!context) {
    throw new Error("useTrades must be used within a TradesProvider");
  }
  return context;
};
