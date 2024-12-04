import CommonLayoutHoc from "@/components/common/CommonLayoutHoc";
import ResetPassword from "@/components/auth/ResetPassword";
import React from "react";

export const metadata = {
  title: " CertifyMed - Reset Passowrd",
  description:
    "Discover the future of healthcare through  CertifyMed: top-tier medical care at your fingertips. No more waiting—access qualified professionals instantly from home.",
};
const ResetPasswordPage = () => {
  return (
    <CommonLayoutHoc>
      <ResetPassword />
    </CommonLayoutHoc>
  );
};

export default ResetPasswordPage;
