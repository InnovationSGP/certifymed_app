import MenuDropdown from "@/components/common/MenuDropdown";
import Image from "next/image";
import React from "react";
import { deleteAppointment } from "@/redux/slices/patientAppointments";
import { deleteDoctorAppointment } from "@/redux/slices/doctorRecentAppointmentsSlice";
import { useDispatch } from "react-redux";
import { deletePatientTest } from "@/redux/slices/patientsTestsSlice";

const RecentAppointmentsListItem = ({ appointment, type, listType }) => {
  const links = [
    { href: "/support", label: "Edit" },
    { href: "/license", label: "Delete" },
  ];
  const dispatch = useDispatch();
  const handleMenuClick = (action) => {
    if (action === "Delete" && type === "Patients") {
      if (listType === "tests") {
        dispatch(deletePatientTest(appointment.id));
      } else {
        dispatch(deleteAppointment(appointment.id));
      }
    } else {
      dispatch(deleteDoctorAppointment(appointment.id));
    }
  };

  return (
    <tr>
      <td className="table-heading !font-normal xl:!pr-0">{appointment.id}</td>
      <td className="pl-[22px] py-3 flex items-center space-x-2 text-sm text-mainblack">
        <Image
          width={24}
          height={24}
          src={appointment.imageUrl}
          alt={appointment.doctor}
          className="w-6 h-6 rounded-full object-cover"
        />
        <span>{appointment.doctor}</span>
      </td>
      <td className="table-heading !font-normal xl:!pr-0">
        {appointment.date}
      </td>
      <td className="table-heading !font-normal xl:!pr-0">
        {appointment.mode}
      </td>
      <td className="table-heading !font-normal xl:!pr-0">
        {appointment.status}
      </td>
      <td className="table-heading !font-normal xl:!pr-0">
        <MenuDropdown
          links={links}
          handleClick={handleMenuClick}
          heading={"Select Action"}
        />
      </td>
    </tr>
  );
};

export default RecentAppointmentsListItem;
