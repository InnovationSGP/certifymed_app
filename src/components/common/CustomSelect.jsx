import React, { useState } from "react";
import { CustomDownArrow } from "./Icons";

const CustomSelect = ({
  label,
  options,
  value,
  onChange,
  disabled = false,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      {label && (
        <label className="block font-medium text-dimGray mb-[3px]">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-3 py-[18px] bg-superSilver h-[55px] xl:h-[60px] text-dimGray outline-primary rounded-xl font-medium
            ${disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
          `}
          disabled={disabled}
        >
          <span className={`block truncate ${!value && "text-gray-500"}`}>
            {value || placeholder}
          </span>
          {!disabled && (
            <span className="pointer-events-none">
              <CustomDownArrow />
            </span>
          )}
        </button>

        {isOpen && !disabled && (
          <div className="absolute z-10 w-full mt-1 bg-white border shadow-2xl border-gray-200 rounded-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 h-[52px] !font-medium py-2 hover:bg-primary hover:text-white
                  ${value === option.value ? "text-dimGray" : "text-dimGray"}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
