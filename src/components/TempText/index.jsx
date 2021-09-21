import { useState, useEffect } from "react";

const TempText = ({ temp, className }) => {
  const [celsius, setCelsius] = useState(0);

  useEffect(() => {
    const result = (temp - 32) * (5 / 9);
    setCelsius(parseInt(result));
  }, [temp]);

  return (
    <div>
      <h3 className={className}>
        {celsius}
        <sup>o</sup>C
      </h3>
    </div>
  );
};

export default TempText;
