import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getFirstDayOfMonth } from "@/utils/dateHelpers";
import { getDaysInMonth } from "date-fns";

const MiniCalendar = ({
  setState,
  currentDate,
  selectedDate,
  onDateSelect,
  onMonthChange,
}) => {
  return (
    <div className="w-72 xl:block hidden  border-l pt-11 border-[#DFE5F1] px-7 bg-white  ">
      <button
        onClick={setState ? setState : null}
        className="w-full bg-primary xl:flex hidden primary-btn !rounded-full mb-[50px] !h-[47px] !text-sm"
      >
        Set Schedule
      </button>
      <div className="mt-[50px]">
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
                onClick={() => isCurrentMonth && onDateSelect(day)}
                className={`
                  h-8 w-8 flex items-center justify-center rounded-full text-xs
                  ${
                    isCurrentMonth
                      ? "hover:bg-slate-400 hover:text-white"
                      : "text-gray-300"
                  }
                  ${isSelected ? "bg-[#4864FF] text-white font-poppins" : ""}
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

export default MiniCalendar;
