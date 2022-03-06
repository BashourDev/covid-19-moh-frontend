import React from "react";

const AppButton = ({
  Icon,
  children,
  className,
  type = "button",
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full transition duration-100 w-11/12 h-11 mt-8 mb-1 bg-inherit text-primary hover:bg-primary hover:text-white text-xl border-8 border-primary ${className}`}
    >
      {Icon && <Icon />}
      {children}
    </button>
  );
};

export default AppButton;
