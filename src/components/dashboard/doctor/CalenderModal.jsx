import { ChevronLeft, ChevronRight, X } from "lucide-react";
import React from "react";
import { getDaysInMonth, getFirstDayOfMonth } from "@/utlis/dateHelpers";

const CalendarModal = ({
  isOpen,
  onClose,
  currentDate,
  selectedDate,
  onDateSelect,
  onMonthChange,
}) => {
  if (!isOpen) return null;

  const handleDateSelect = (day) => {
    onDateSelect(day); // Call the provided date select function
    onClose(); // Close the modal after selecting a date
  };

  const handleOverlayClick = (e) => {
    // Close the modal when clicking outside the modal content
    onClose();
  };

  const handleModalContentClick = (e) => {
    // Prevent the modal from closing when clicking inside the modal content
    e.stopPropagation();
  };
  return (
    <div
      onClick={handleOverlayClick}
      className="fixed xl:hidden inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
    >
      <div
        className="bg-white w-full max-w-md p-6 rounded-lg relative"
        onClick={handleModalContentClick}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-200 rounded-full"
        ></button>

        <div className="flex justify-between items-center mb-4">
          <span className="text-cabaretCharm font-poppins">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onMonthChange("prev")}
              className="p-1 hover:bg-slate-400 rounded group"
            >
              <ChevronLeft
                className="stroke-cabaretCharm group-hover:stroke-black"
                size={16}
              />
            </button>
            <button
              onClick={() => onMonthChange("next")}
              className="p-1 hover:bg-slate-400 rounded group"
            >
              <ChevronRight
                className="stroke-cabaretCharm group-hover:stroke-black"
                size={16}
              />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
            <div key={day} className="text-center text-xs font-poppins py-1">
              {day}
            </div>
          ))}

          {Array.from({ length: 42 }, (_, i) => {
            const day = i - getFirstDayOfMonth(currentDate) + 1;
            const isCurrentMonth =
              day > 0 && day <= getDaysInMonth(currentDate);
            const isSelected =
              isCurrentMonth &&
              day === selectedDate.getDate() &&
              currentDate.getMonth() === selectedDate.getMonth();

            return (
              <button
                key={i}
                onClick={() => isCurrentMonth && handleDateSelect(day)}
                className={`
                  h-8 w-8 flex items-center justify-center rounded-full text-xs
                  ${
                    isCurrentMonth
                      ? "hover:bg-slate-400 hover:text-white"
                      : "text-gray-300"
                  }
                  ${isSelected ? "bg-bluetitmouse text-white font-poppins" : ""}
                `}
                disabled={!isCurrentMonth}
              >
                {isCurrentMonth ? day : ""}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
