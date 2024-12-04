import CommonLayoutHoc from "@/components/common/CommonLayoutHoc";
import SignUpOptions from "@/components/auth/SignUpOptions";

export const metadata = {
  title: "CertifyMed -  Sign Up",
  description:
    "Discover the future of healthcare through  CertifyMed: top-tier medical care at your fingertips. No more waiting—access qualified professionals instantly from home.",
};

const SignUpOptionPage = () => {
  return (
    <CommonLayoutHoc className="py-6 px-5 md:p-10">
      <SignUpOptions />
    </CommonLayoutHoc>
  );
};

export default SignUpOptionPage;
