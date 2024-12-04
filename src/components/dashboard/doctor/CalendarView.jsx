import React from "react";
import CalendarHeader from "./CalendarHeader";
import TimeSlots from "./TimeSlots";
import { getThreeDayView } from "@/utlis/dateHelpers";

const CalendarView = ({
  currentDate,
  appointments,
  onNavigate,
  setState,
  onToggleCalendar,
}) => {
  return (
    <div className="xl:flex-1  pt-11  flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="section-heading xl:!text-[34px] leading-[51px] ">
          Appointments
        </h3>
        <button
          onClick={setState ? setState : null}
          className="w-fit xl:hidden bg-primary !px-5 primary-btn !rounded-full !h-11 !text-sm"
        >
          Set Schedule
        </button>
      </div>
      <CalendarHeader
        onToggleCalendar={onToggleCalendar}
        currentDate={currentDate}
        onNavigate={onNavigate}
      />

      <div className="bg-lightOverlay overflow-auto w-full rounded-[10px] p-5">
        <div className="overflow-auto min-w-[640px] ">
          <div className="flex mb-4">
            {/* Fixed time column placeholder */}
            <div className="w-20"></div>

            {/* Scrollable day headers */}

            <div className="grid grid-cols-3  w-full gap-4">
              {getThreeDayView(currentDate).map(({ dayName, dayNumber }) => (
                <div key={dayName} className="text-center">
                  <div className="text-doverGrey mb-1">{dayName}</div>
                  <div className="text-[13px]">
                    {String(dayNumber).padStart(2, "0")}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <TimeSlots appointments={appointments} currentDate={currentDate} />
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
