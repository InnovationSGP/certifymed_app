"use client";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Hero from "@/components/homepage/Hero";
import OurPartners from "@/components/homepage/OurPartners";
import StartYourHealthJourney from "@/components/homepage/StartYourHealthJourney";
import TalkToDoctor from "@/components/homepage/TalkToDoctor";
import Testimonials from "@/components/homepage/Testimonials";
import WhychooseCeftifyMed from "@/components/homepage/WhychooseCeftifyMed";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPatients } from "@/redux/slices/allPatientsForDoctorSlice";
import { setDoctorUpcomingAppointments } from "@/redux/slices/doctorUpcomingAppointmentsSlice";
import { setPatientTests } from "@/redux/slices/patientsTestsSlice";
import { setAppointmentsForPatients } from "@/redux/slices/patientAppointments";
import {
  appointments,
  patients,
  patientsapoinmenthistory,
  testsandresults,
  patientappointments,
} from "@/components/common/Helper";

const Homepage = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(
  //     setDoctorAppointments({
  //       appointmentsHistory: appointments,
  //       upcomingAppointments: "3",
  //       completedAppointments: "18",
  //       unreadMessages: "7",
  //     })
  //   );
  //   dispatch(
  //     setAppointmentsForPatients({
  //       appointmentsHistory: patientappointments,
  //       upcomingAppointments: "2",
  //       completedAppointments: "7",
  //       cancelledAppointments: "3",
  //     })
  //   );
  //   dispatch(setPatients(patients));
  //   dispatch(setDoctorUpcomingAppointments(patientsapoinmenthistory));
  //   dispatch(setPatientTests(testsandresults));
  // }, [dispatch]);

  useEffect(() => {
    AOS.init({
      duration: 3000,
    });
  }, []);
  return (
    <>
      <div className="bg-[url('/images/hero-bg.png')] bg-cover ">
        <Header />
        <Hero />
      </div>
      <WhychooseCeftifyMed />
      <TalkToDoctor />
      <Testimonials />
      <OurPartners />
      <StartYourHealthJourney />
      <Footer />
    </>
  );
};

export default Homepage;
