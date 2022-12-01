import React from "react";

const StepsButton = ({ type = "button", onClick, text, number, isPassed }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex flex-col justify-center items-center text-[8px] lg:text-sm"
    >
      <div
        className={`w-4 h-4 lg:w-6 lg:h-6 text-[8px] lg:text-sm rounded-full border-[1px] lg:border-2 ${
          isPassed
            ? "border-my-primary text-my-primary"
            : "border-dark text-dark"
        }`}
      >
        {number}
      </div>
      {text}
    </button>
  );
};

export default StepsButton;
