import React from "react";

const StepSeparator = ({ isPassed }) => {
  return (
    <div
      className={`w-full h-[2px] flex ${
        isPassed ? "bg-primary text-primary" : "bg-dark text-dark"
      }`}
    ></div>
  );
};

export default StepSeparator;
