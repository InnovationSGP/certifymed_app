"use client";
import DashboardLayout from "@/components/common/DashboardLayout";
import {
  patientappointments,
  patientsdatalist,
} from "@/components/common/Helper";
import DoctorAnalytics from "@/components/dashboard/doctor/DoctorAnalytics";
import DoctorDashboard from "@/components/dashboard/doctor/DoctorDashboard";
import NotesWelcome from "@/components/dashboard/patients/notes/NotesWelcome";
import { setPatients } from "@/redux/slices/allPatientsForDoctorSlice";
import { setDoctorAppointments } from "@/redux/slices/doctorRecentAppointmentsSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const DoctorDashboardPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setDoctorAppointments({
        appointmentsHistory: patientappointments,
        upcomingAppointments: "3",
        completedAppointments: "18",
        unreadMessages: "7",
      })
    );

    dispatch(setPatients(patientsdatalist));
  }, [dispatch]);

  return (
    <>
      <DashboardLayout className="overflow-auto">
        <NotesWelcome heading="Hi, Dr. John" description="Welcome back!" />
        <DoctorAnalytics />
        <DoctorDashboard />
      </DashboardLayout>
    </>
  );
};

export default DoctorDashboardPage;
