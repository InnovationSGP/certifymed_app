import CommonLayoutHoc from "@/components/common/CommonLayoutHoc";
import Login from "@/components/auth/Login";

export const metadata = {
  title: " CertifyMed - Login",
  description:
    "Discover the future of healthcare through  CertifyMed: top-tier medical care at your fingertips. No more waiting—access qualified professionals instantly from home.",
};

const LoginPage = () => {
  return (
    <CommonLayoutHoc>
      <Login />
    </CommonLayoutHoc>
  );
};

export default LoginPage;
