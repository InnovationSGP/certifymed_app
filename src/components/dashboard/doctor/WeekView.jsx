import { isSameDay } from "date-fns";
import React from "react";
import AppointmentCard from "./AppointmentCard";
import { generateTimeSlots, getWeekDays } from "@/utils/dateHelpers";

const WeekView = ({ selectedDate, appointments }) => {
  const timeSlots = generateTimeSlots();
  const weekDays = getWeekDays(selectedDate);

  return (
    <div className="mt-6">
      <div className="grid grid-cols-[100px_1fr_1fr_1fr] gap-4">
        <div className="text-gray-500" />
        {weekDays.map((day) => (
          <div key={day.date} className="text-center">
            <div className="font-medium">{day.name}</div>
            <div className="text-sm text-gray-500">{day.date}</div>
          </div>
        ))}

        {timeSlots.map((time) => (
          <React.Fragment key={time}>
            <div className="text-sm text-gray-500 py-6">{time}</div>
            {weekDays.map((day) => (
              <div key={`${day.date}-${time}`} className="relative">
                {appointments
                  .filter(
                    (apt) =>
                      isSameDay(new Date(apt.date), day.fullDate) &&
                      apt.time === time
                  )
                  .map((apt) => (
                    <AppointmentCard key={apt.id} appointment={apt} />
                  ))}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
