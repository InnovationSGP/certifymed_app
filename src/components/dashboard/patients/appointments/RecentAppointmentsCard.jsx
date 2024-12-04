import React from "react";
import MenuDropdown from "@/components/common/MenuDropdown";
import Image from "next/image";

const RecentAppointmentsCard = ({ appointment }) => {
  const links = [
    { href: "/settings", label: "Settings" },
    { href: "/support", label: "Support" },
    { href: "/license", label: "License" },
  ];
  return (
    <>
      <ul className="bg-white  rounded-lg divide-y divide">
        <li className="flex items-center justify-between text-sm  text-mainblack py-3.5 px-3.5">
          {appointment.id}
          <MenuDropdown links={links} heading={"Select Action"} />
        </li>
        <li className="flex items-center justify-between text-sm  text-mainblack py-3.5 px-3.5">
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
        <li className="flex items-center justify-between text-sm  text-mainblack py-3.5 px-3.5">
          Date
          <span>{appointment.date}</span>
        </li>
        <li className="flex items-center justify-between text-sm  text-mainblack py-3.5 px-3.5">
          Mode
          <span>{appointment.mode}</span>
        </li>
        <li className="flex items-center justify-between text-sm  text-mainblack py-3.5 px-3.5">
          Status
          <span>{appointment.status}</span>
        </li>
      </ul>
    </>
  );
};

export default RecentAppointmentsCard;
