import Image from "next/image";
import MenuDropdown from "./MenuDropdown";

const AppointmentHistoryMobileList = ({ testHistory }) => {
  const links = [
    { href: "/settings", label: "Settings" },
    { href: "/support", label: "Support" },
    { href: "/license", label: "License" },
  ];
  return (
    <>
      <div className="md:hidden mb-20">
        <h3 className="px-5 text-lg font-semibold mb-6 mt-[84px]">
          Appointment History
        </h3>
        <div className="px-5">
          {testHistory?.map((appointment, index) => (
            <AppointmentHistoryMobileCard
              links={links}
              appointment={appointment}
              key={index}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AppointmentHistoryMobileList;

import React from "react";

export function AppointmentHistoryMobileCard({ appointment, links }) {
  return (
    <>
      <article>
        <ul className="bg-white mb-5 rounded-lg divide-y divide">
          <li className="flex items-center justify-between text-sm  text-mainblack py-3 sm:py-3.5 px-3.5">
            {appointment.id}
            <MenuDropdown links={links} heading={"Select Action"} />
          </li>
          <li className="flex items-center justify-between text-sm  text-mainblack py-3 sm:py-3.5 px-3.5">
            Doctor
            <span className="flex gap-x-1.5">
              <Image
                width={24}
                height={24}
                src={appointment.imageUrl}
                alt={appointment.doctor}
                className="w-6 h-6 rounded-full object-cover"
              />

              {appointment.doctor}
            </span>
          </li>
          <li className="flex items-center justify-between text-sm  text-mainblack py-3 sm:py-3.5 px-3.5">
            Date
            <span>{appointment.date}</span>
          </li>
          <li className="flex items-center justify-between text-sm  text-mainblack py-3 sm:py-3.5 px-3.5">
            Mode
            <span>{appointment.mode}</span>
          </li>
          <li className="flex items-center justify-between text-sm  text-mainblack py-3 sm:py-3.5 px-3.5">
            Status
            <span>{appointment.status}</span>
          </li>
        </ul>
      </article>
    </>
  );
}
