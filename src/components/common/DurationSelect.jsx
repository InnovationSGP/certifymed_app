import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const DurationSelect = ({ value, onChange, options = [], className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelection = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative mt-3 max-w-[150px] ${className}`}>
      <button
        type="button"
        className="w-full bg-white rounded-lg text-left text-[13px] text-pantone font-medium focus:outline-none flex items-center justify-start gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value}
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 ml-3 w-[172px] mt-1 shadow-md-dark bg-white rounded-lg overflow-hidden  shadow-dark">
          {options.map((option) => (
            <button
              key={option.value}
              className="w-full px-4 py-2.5 text-left h-[42px] text-xs hover:bg-primary hover:text-white text-secondary transition-colors"
              onClick={() => handleSelection(option.label)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DurationSelect;
