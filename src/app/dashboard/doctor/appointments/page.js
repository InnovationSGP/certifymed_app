"use client";
import DashboardLayout from "@/components/common/DashboardLayout";
import AppointmentSystem from "@/components/dashboard/doctor/AppointmentSystem";
import { useDispatch } from "react-redux";
import { setDoctorUpcomingAppointments } from "@/redux/slices/doctorUpcomingAppointmentsSlice";
import { patientsapoinmenthistory } from "@/components/common/Helper";
import { useEffect } from "react";

const AppointmentsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDoctorUpcomingAppointments(patientsapoinmenthistory));
  }, [dispatch]);

  return (
    <>
      <DashboardLayout className="overflow-auto xl:overflow-hidden">
        <AppointmentSystem />
      </DashboardLayout>
    </>
  );
};

export default AppointmentsPage;
