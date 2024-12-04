import React from "react";
import { CrossIcon, LogoIcon } from "./Icons";
import PrimaryBtn from "./PrimaryBtn";
import Link from "next/link";
import { navLinks } from "./Helper";
import { useRouter } from "next/navigation";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const router = useRouter();

  return (
    <>
      <aside
        className={`fixed bg-white md:hidden overflow-auto z-50 h-screen w-full top-0 p-4 flex flex-col duration-300 transition-transform ease-in-out  justify-between items-center ${
          isSidebarOpen ? "-translate-x-full" : " translate-x-0"
        }`}
      >
        <div className="w-full flex items-center flex-col flex-grow">
          <div className="flex justify-between items-center w-full">
            <span>
              <LogoIcon />
            </span>
            <button onClick={toggleSidebar}>
              <CrossIcon />
            </button>
          </div>
          <div className="flex w-fit  items-center mt-16 gap-5 flex-col">
            {navLinks.map((link, index) => (
              <Link key={index} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
            <Link href="" className="nav-link">
              Log in
            </Link>
          </div>
        </div>
        <PrimaryBtn className="w-full" onClick={() => router.push("/sign-up")}>
          Sign up
        </PrimaryBtn>
      </aside>
    </>
  );
};

export default Sidebar;
