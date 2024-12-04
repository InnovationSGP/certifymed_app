import Image from "next/image";
import React from "react";

const PatientListItem = ({ patient, isActive, onClick }) => {
  return (
    <li
      className={`flex items-center py-[15px] pl-[21px] pr-[29px] cursor-pointer transition-all
        ${
          isActive
            ? "bg-primary/5  border-primary"
            : "hover:bg-gray-50 border-transparent"
        }
      `}
      onClick={onClick}
    >
      <Image
        width={55}
        height={55}
        src={patient.imageUrl}
        alt={patient.name}
        className="w-[55px] h-[55px] rounded-full object-cover mr-[9px]"
      />
      <div>
        <h4
          className={`font-medium font-poppins ${
            isActive ? "text-primary" : ""
          }`}
        >
          {patient.name}
        </h4>
        <p className="text-[13px] text-shadesOn">{patient.ailment}</p>
      </div>
    </li>
  );
};

export default PatientListItem;
