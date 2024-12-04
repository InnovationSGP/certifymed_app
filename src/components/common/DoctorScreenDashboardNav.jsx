import Link from "next/link";
import { CertifyLogo, DownArrow, UserImage } from "./AppIcons";

const DoctorScreenDashboardNav = () => {
  return (
    <>
      <nav className="bg-white w-full px-[35px] py-[19px] flex justify-between items-center">
        <Link href="/">
          <CertifyLogo />
        </Link>
        <div className="flex items-center gap-x-[19px]">
          <h5 className="text-sm font-poppins font-medium hidden sm:block">
            Balance: ₦20,000
          </h5>
          <div className="flex items-center gap-2">
            <UserImage />
            <DownArrow />
          </div>
        </div>
      </nav>
    </>
  );
};

export default DoctorScreenDashboardNav;
