import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = dynamic(() => import("react-datepicker"), {
  ssr: false,
});

const CustomDatePicker = ({
  onChange,
  value,
  label = "Date of birth",
  disabled = false,
  error = false,
}) => {
  // Initialize selectedDate state with proper date object
  const [selectedDate, setSelectedDate] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Update selected date when value prop changes
  useEffect(() => {
    if (value) {
      const parsedDate = new Date(value);
      if (!isNaN(parsedDate.getTime())) {
        setSelectedDate(parsedDate);
      }
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDateChange = (date) => {
    if (!disabled) {
      setSelectedDate(date);
      if (onChange) {
        onChange(date);
      }
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full">
      <style>{/* Your existing styles */}</style>
      <div className="relative w-full">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="DD/MM/YYYY"
          minDate={new Date(1900, 0, 1)}
          maxDate={new Date()}
          isClearable={false}
          disabled={disabled}
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100}
          customInput={
            <input
              className={`input-style min-w-full ${
                disabled ? "date-input-disabled" : ""
              } ${error ? "border-rose-500" : ""}`}
              placeholder="DD/MM/YYYY"
              disabled={disabled}
            />
          }
          calendarClassName="bg-white shadow-lg border border-gray-200 rounded-lg"
          wrapperClassName="w-full"
          showPopperArrow={false}
          popperModifiers={[
            {
              name: "preventOverflow",
              options: {
                padding: 10,
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default CustomDatePicker;
