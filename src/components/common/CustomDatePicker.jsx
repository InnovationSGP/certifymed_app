import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-datepicker/dist/react-datepicker.css";

// Dynamic import of DatePicker with ssr disabled
const DatePicker = dynamic(() => import("react-datepicker"), {
  ssr: false,
});

const CustomDatePicker = ({
  onChange,
  value,
  label = "Date of birth",
  disabled = false,
}) => {
  const [selectedDate, setSelectedDate] = useState(value || null);
  const [mounted, setMounted] = useState(false);

  // Only render after component is mounted on client
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
    return null; // Return null on server-side
  }

  return (
    <div className="w-full">
      <style>
        {`
          .react-datepicker-popper {
            max-width: 100%;
            transform: none !important;
            top: 60px !important;
          }

          .react-datepicker {
            font-family: inherit;
            border: 1px solid #e5e7eb;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
            padding: 16px;
            width: 100%;
          }
          
          .react-datepicker__header {
            background-color: white;
            border-bottom: none;
            padding-top: 0;
            position: relative;
          }
          
          .react-datepicker__current-month {
            font-weight: 500;
            padding-bottom: 1.5rem;
            font-size: 16px;
            color: #7D8DA6 !important;
            text-align: left;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 3px !important;
          }

          .react-datepicker__navigation {
            top: 20px !important;
            height: 20px !important;
            width: 20px !important;
            padding: 0 !important;
            margin: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            position: absolute !important;
          }

          .react-datepicker__navigation-icon {
            position: relative !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
          }

          .react-datepicker__navigation-icon::before {
            content: '';
            border-color: #7D8DA6;
            border-style: solid;
            border-width: 2px 2px 0 0;
            height: 9px;
            width: 9px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%) rotate(45deg);
            transform-origin: center;
          }

          .react-datepicker__navigation--previous {
            right: 44px !important;
            left: auto !important;
          }

          .react-datepicker__navigation--previous .react-datepicker__navigation-icon::before {
            transform: translateY(-50%) rotate(-135deg);
            right: -2px;
          }

          .react-datepicker__navigation--next {
            right: 15px !important;
          }

          .react-datepicker__navigation--next .react-datepicker__navigation-icon::before {
            transform: translateY(-50%) rotate(45deg);
            left: -2px;
          }

          .react-datepicker__month {
            margin: 0;
          }

          .react-datepicker__month-container {
            float: none;
          }

          .react-datepicker__day-names {
            display: flex;
            justify-content: space-between;
            padding: 0;
          }
          
          .react-datepicker__day-name {
            color: #141736;
            font-size: 12px;
            font-weight: 500;
            margin: 0;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
          }

          .react-datepicker__week {
            display: flex;
            justify-content: space-between;
            margin-bottom: 2px;
          }
          
          .react-datepicker__day {
            margin: 0;
            padding: 0;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            font-size: 12px;
            color: #141736;
            transition: all 0.2s;
          }
          
          .react-datepicker__day:hover {
            border-radius: 50% !important;
            background-color: #4864ff !important;
            color: #fff;
          }
          
          .react-datepicker__day--selected {
            border-radius: 50% !important;
            background-color: #293991 !important;
            color: #fff;
          }
          
          .react-datepicker__day--keyboard-selected {
            border-radius: 50% !important;
            background-color: #293991 !important;
            color: #fff;
          }

          .react-datepicker__day--outside-month {
            color: #9CA3AF;
          }
          
          .react-datepicker__month-dropdown-container--select,
          .react-datepicker__month-year-dropdown-container--select,
          .react-datepicker__year-dropdown-container--select {
            display: none !important;
          }
          
          .react-datepicker__close-icon::after {
            display: none !important;
          }

          .date-input-disabled {
            opacity: 0.7;
            cursor: not-allowed;
            background-color: #f3f4f6;
          }
        `}
      </style>
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
          customInput={
            <input
              className={`input-style min-w-full ${
                disabled ? "date-input-disabled" : ""
              }`}
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
