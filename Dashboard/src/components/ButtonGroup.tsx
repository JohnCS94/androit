import { Dispatch, SetStateAction } from "react";

import { AggregationType } from "../constants/enums";
import useWindowResize from "../hooks/useWindowResize";

import "../styles/buttonGroup.css";

interface ButtonGroupProps {
  aggregation: AggregationType;
  setAggregation: Dispatch<SetStateAction<AggregationType>>;
}

const ButtonGroup = ({ aggregation, setAggregation }: ButtonGroupProps) => {
  const aggregate = Object.values(AggregationType);

  const width = useWindowResize();

  const handleClick = (agr: AggregationType) => {
    setAggregation(agr);
  };

  return (
    <div className="buttons">
      {aggregate.map((a, i) => {
        return (
          <button
            key={i}
            className={`toggle-button ${aggregation === a ? "active" : ""}`}
            onClick={() => handleClick(a)}
          >
            {width < 650 ? a.charAt(0) : a}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonGroup;
