"use client";

import Link from "next/link";
import { CertifyLogo, DownArrow, UserImage } from "./AppIcons";
import MenuDropdown from "./MenuDropdown";

const DashboardNav = () => {
  const ispatientview = true;

  const userMenuLinks = [
    { href: "/dashboard/doctor/profile", label: "My Profile" },
    { href: "/settings", label: "Settings" },
    { href: "/help", label: "Help Center" },
    { href: "/logout", label: "Logout" },
  ];

  return (
    <>
      <nav className="bg-white shadow-top-inset-shadow w-full px-5 md:px-[35px] py-[17px] sm:py-[19px] flex justify-between items-center">
        <Link href="/">
          <CertifyLogo />
        </Link>
        <div className="flex items-center gap-x-[19px]">
          {ispatientview && (
            <h5 className="text-sm font-poppins font-medium hidden sm:block">
              Balance: ₦20,000
            </h5>
          )}

          <MenuDropdown
            links={userMenuLinks}
            heading="Account"
            buttonContent={
              <div className="flex items-center gap-2">
                <UserImage />
                <DownArrow />
              </div>
            }
          />
        </div>
      </nav>
    </>
  );
};

export default DashboardNav;
