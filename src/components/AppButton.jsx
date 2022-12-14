import React from "react";

const AppButton = ({
  Icon,
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full transition duration-100 w-11/12 h-8 lg:h-11 mt-8 mb-1 bg-inherit text-my-primary hover:bg-my-primary hover:text-white text-xs lg:text-sm border-my-primary ${className}`}
    >
      {Icon && <Icon />}
      {children}
    </button>
  );
};

export default AppButton;
