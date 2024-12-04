import PatientsInfo from "@/components/dashboard/doctor/PatientInfo";
import React from "react";

export const metadata = {
  title: " CertifyMed - Patient Info",
  description:
    "Discover the future of healthcare through  CertifyMed: top-tier medical care at your fingertips. No more waiting—access qualified professionals instantly from home.",
};

const PatientInfoPage = () => {
  return (
    <>
      <PatientsInfo />
    </>
  );
};

export default PatientInfoPage;
