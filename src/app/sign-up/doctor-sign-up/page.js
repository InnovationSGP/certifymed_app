import DoctorSignUp from "@/components/auth/DoctorSignUp";
import CommonLayoutHoc from "@/components/common/CommonLayoutHoc";

export const metadata = {
  title: " CertifyMed - Doctor Sign Up",
  description:
    "Discover the future of healthcare through  CertifyMed: top-tier medical care at your fingertips. No more waiting—access qualified professionals instantly from home.",
};

const PatientSignUpPage = () => {
  return (
    <>
      <CommonLayoutHoc>
        <DoctorSignUp />
      </CommonLayoutHoc>
    </>
  );
};

export default PatientSignUpPage;
