import amazon from "../assets/amazon.png";
import apple from "../assets/apple.png";
import google from "../assets/google.png";
import meta from "../assets/meta.png";
import microsoft from "../assets/microsoft.png";

/**
 * In a real world environment, I would have this being sent by the backend,
 * but didn't want to modify the backend I was given so created here instead.
 */

export type StockSymbols = {
  AAPL: string;
  AMZN: string;
  GOOGL: string;
  META: string;
  MSFT: string;
};

export const image: StockSymbols = {
  AAPL: apple,
  AMZN: amazon,
  GOOGL: google,
  META: meta,
  MSFT: microsoft,
};
