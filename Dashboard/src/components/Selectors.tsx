import { Dispatch, SetStateAction } from "react";

import "../styles/selectors.css";

interface SelectorsProps {
  startDate: string;
  setStartDate: Dispatch<SetStateAction<string>>;
  minSize: number;
  setMinSize: Dispatch<SetStateAction<number>>;
}

const Selectors = ({
  startDate,
  setStartDate,
  minSize,
  setMinSize,
}: SelectorsProps) => {
  return (
    <div className="input-container">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <div className="divider" />
      <input
        className="number"
        type="number"
        value={minSize}
        onChange={(e) => setMinSize(Number(e.target.value))}
      />
    </div>
  );
};

export default Selectors;
