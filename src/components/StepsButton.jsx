import React from "react";

const StepsButton = ({ type = "button", onClick, text, number, isPassed }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex flex-col justify-center items-center"
    >
      <div
        className={`w-7 h-7 rounded-full border-2 ${
          isPassed ? "border-primary text-primary" : "border-dark text-dark"
        }`}
      >
        {number}
      </div>
      {text}
    </button>
  );
};

export default StepsButton;
