import React from "react";

const PrimaryBtn = ({
  children,
  className,
  href = "/",
  onClick,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${className} primary-btn`}
    >
      {children}
    </button>
  );
};

export default PrimaryBtn;
