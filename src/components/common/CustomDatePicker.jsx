import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import DatePicker with no SSR
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
  const [selectedDate, setSelectedDate] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (value) {
      const parsedDate = new Date(value);
      if (!isNaN(parsedDate.getTime())) {
        setSelectedDate(parsedDate);
      }
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  const handleDateChange = (date) => {
    if (!disabled) {
      setSelectedDate(date);
      if (onChange) {
        onChange(date);
      }
    }
  };

  if (!mounted) {
    // Return a placeholder during SSR and initial client render
    return (
      <input
        type="text"
        className={`input-style min-w-full ${
          disabled ? "opacity-70 cursor-not-allowed bg-superSilver" : ""
        } ${error ? "border-rose-500" : ""}`}
        placeholder="DD/MM/YYYY"
        disabled={disabled}
      />
    );
  }

  return (
    <div className="w-full">
      {mounted && (
        <>
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
                    disabled
                      ? "opacity-70 cursor-not-allowed bg-superSilver"
                      : ""
                  } ${error ? "border-rose-500" : ""}`}
                  placeholder="DD/MM/YYYY"
                  disabled={disabled}
                />
              }
              className="bg-white"
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
              calendarClassName="!bg-white !border !border-gray-200 !rounded-xl !font-sans"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CustomDatePicker;
