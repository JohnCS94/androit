import { useState, useEffect } from "react";

/**
 * Used for the chart widths auto resizing. Was going to create a debouncer
 * but seems Highcharts already has debouncing functionality.
 */

const useWindowResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

export default useWindowResize;
