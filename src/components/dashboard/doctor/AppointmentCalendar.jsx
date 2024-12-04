"use client";
import { useState } from "react";
import Image from "next/image";
import { CalendarHeader } from "./CalendarHeader";
import Sidebar from "./Sidebar";
import WeekView from "./WeekView";

const AppointmentCalendar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Image
              src="/certifymed-logo.svg"
              alt="CertifyMed"
              className="h-8"
            />
            <h1 className="text-2xl font-semibold">Appointments</h1>
          </div>
          <button
            onClick={() => setShowSidebar(true)}
            className="bg-indigo-700 text-white px-4 py-2 rounded-md "
          >
            Set Schedule
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <CalendarHeader
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
          <WeekView
            selectedDate={selectedDate}
            appointments={mockAppointments}
          />
        </div>
      </div>

      {showSidebar && <Sidebar onClose={() => setShowSidebar(false)} />}
    </div>
  );
};

export default AppointmentCalendar;
