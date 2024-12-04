import PatientSignUp from "@/components/auth/PatientSignUp";
import CommonLayoutHoc from "@/components/common/CommonLayoutHoc";
import React from "react";

export const metadata = {
  title: " CertifyMed - Patient Sign Up",
  description:
    "Discover the future of healthcare through  CertifyMed: top-tier medical care at your fingertips. No more waiting—access qualified professionals instantly from home.",
};

const PatientSignUpPage = () => {
  return (
    <>
      <CommonLayoutHoc>
        <PatientSignUp />
      </CommonLayoutHoc>
    </>
  );
};

export default PatientSignUpPage;
