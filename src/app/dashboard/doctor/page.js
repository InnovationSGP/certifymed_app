"use client";
import DoctorDashboard from "@/components/dashboard/doctor/DoctorDashboard";
import DashboardLayout from "@/components/common/DashboardLayout";
import NotesWelcome from "@/components/dashboard/patients/notes/NotesWelcome";
import React, { useEffect } from "react";
import DoctorAnalytics from "@/components/dashboard/doctor/DoctorAnalytics";
import { setDoctorAppointments } from "@/redux/slices/doctorRecentAppointmentsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  patientappointments,
  patientsdatalist,
} from "@/components/common/Helper";
import { setPatients } from "@/redux/slices/allPatientsForDoctorSlice";
import { useRouter } from "next/navigation";

const DoctorDashboardPage = () => {
  const router = useRouter();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user.isLoggedIn || localStorage.getItem("accessToken")) {
      if(user.roleType === "CUSTOMER"){
        router.push("/dashboard/patients");
      } else {
        router.push("/dashboard/doctor");
      }
    }
  }, [user.isLoggedIn, router]);

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
