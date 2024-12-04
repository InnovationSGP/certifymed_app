import React from "react";
import { generateTimeSlots, getThreeDayView } from "@/utlis/dateHelpers";
import Image from "next/image";

const TimeSlots = ({ appointments, currentDate }) => {
  return (
    <div
      className="overflow-auto hide-scrollbar"
      style={{ height: "calc(100vh - 240px)" }}
    >
      {generateTimeSlots().map((slot) => (
        <div key={slot.time} className="flex border-t border-gray-100 h-24">
          {/* Fixed time column */}

          {/* Scrollable day slots */}
          <div className="flex gap-4 w-full">
            <div className="w-20 pt-2 text-xs  sticky left-0 bg-lightOverlay">
              {slot.label}
            </div>
            <div className="grid grid-cols-3 w-full  gap-3">
              {getThreeDayView(currentDate).map(({ date }, dayIndex) => {
                const dayAppointments = appointments.filter((apt) => {
                  const [aptHours] = apt.startTime.split(":").map(Number);
                  const appointmentDate = date.toISOString().split("T")[0];
                  return aptHours === slot.time && apt.date === appointmentDate;
                });

                return (
                  <div key={dayIndex} className="relative">
                    {dayAppointments.map((apt) => (
                      <div
                        key={apt.id}
                        className="bg-pervenche text-white rounded-lg p-3"
                      >
                        <div className="flex justify-between items-start gap-2.5">
                          <span className="text-xs md:text-[13px] w-fit">
                            {apt.title}
                          </span>
                          <div className="flex -space-x-2">
                            <div className="rounded-full z-0 border-2 border-white">
                              <Image
                                className="rounded-full max-w-7 h-7 min-w-5 max-h-7 min-h-5"
                                src="/images/appoinmentperson.png"
                                width={28}
                                height={28}
                                alt="Person 1"
                              />
                            </div>
                            <div className="rounded-full z-10 border-2 border-white">
                              <Image
                                className="rounded-full max-w-7 h-7 min-w-5 max-h-7 min-h-5"
                                src="/images/appoinmentdoctor.png"
                                width={28}
                                height={28}
                                alt="Person 2"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-1 text-xs xl:text-sm">
                          {apt.startTime} - {apt.endTime}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimeSlots;
