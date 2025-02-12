"use client";

import { TransitionLink } from "@/utils/TransitionLink";
import { useEffect, useState } from "react";
import { CertifyLogo, DownArrow, UserImage } from "./AppIcons";
import MenuDropdown from "./MenuDropdown";

const DashboardNav = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Fetch the user role from cookies
    const cookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userRole="));
    const role = cookies ? cookies.split("=")[1] : null;
    setUserRole(role);
  }, []);

  const isPatientView = userRole === "CUSTOMER";

  const userMenuLinks = isPatientView
    ? [
        { href: "/dashboard/patients/profile", label: "My Profile" },
        { href: "/settings", label: "Settings" },
        { href: "/help", label: "Help Center" },
        { href: "/logout", label: "Logout" },
      ]
    : [
        { href: "/dashboard/doctor/profile", label: "My Profile" },
        { href: "/settings", label: "Settings" },
        { href: "/help", label: "Help Center" },
        { href: "/logout", label: "Logout" },
      ];

  return (
    <>
      <nav className="bg-white shadow-top-inset-shadow w-full px-5 md:px-[35px] py-[17px] sm:py-[19px] flex justify-between items-center">
        <TransitionLink href="/">
          <CertifyLogo />
        </TransitionLink>
        <div className="flex items-center gap-x-[19px]">
          {isPatientView && (
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
