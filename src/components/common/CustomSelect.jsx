import React, { useState } from "react";
import { CustomDownArrow } from "./Icons";

const CustomSelect = ({
  label,
  options,
  value,
  onChange,
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
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3 py-[18px] bg-superSilver h-[55px] xl:h-[60px] text-dimGray outline-primary rounded-xl font-medium"
        >
          <span className={`block truncate ${!value && "text-gray-500"}`}>
            {value || placeholder}
          </span>
          <span className="pointer-events-none">
            <CustomDownArrow />
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white  border shadow-2xl border-gray-200 rounded-lg  max-h-60 overflow-auto">
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
