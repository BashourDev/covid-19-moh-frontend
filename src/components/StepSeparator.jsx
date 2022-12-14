import React from "react";

const StepSeparator = ({ isPassed }) => {
  return (
    <div
      className={`w-full h-[1px] lg:h-[2px] flex ${
        isPassed ? "bg-my-primary text-my-primary" : "bg-dark text-dark"
      }`}
    ></div>
  );
};

export default StepSeparator;
