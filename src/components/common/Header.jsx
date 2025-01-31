"use client";
import Link from "next/link";
import { useState } from "react";
import { navLinks } from "./Helper";
import { LogoIcon, MenuIcon } from "./Icons";
import PrimaryBtn from "./PrimaryBtn";
import Sidebar from "./SIdebar";
import { useRouter } from "next/navigation";
import { TransitionLink } from "@/utils/TransitionLink";
import { useTransitionRouteChange } from "@/utils/useTransitionRouteChange";

const Header = () => {
  const router = useRouter();
  const { handleTransition } = useTransitionRouteChange();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <header className="flex justify-between bg-transparent items-center custom-container py-[13px] sm:py-5 md:py-6 lg:py-7 xl:py-9">
        <LogoIcon />
        <ul className="hidden md:flex h-[52px] items-center gap-4 xl:gap-11">
          {navLinks.map((link, index) => (
            <li key={index}>
              {link.isOuter ? (
                <TransitionLink
                  href={link.href}
                  className="nav-link !text-sm lg:!text-base"
                >
                  {link.label}
                </TransitionLink>
              ) : (
                <Link
                  href={link.href}
                  className="nav-link !text-sm lg:!text-base"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <div className="flex  items-center  gap-4 xl:gap-11">
          <TransitionLink
            href="/login"
            className="nav-link av-link !text-sm lg:!text-base hidden md:block"
          >
            Log in
          </TransitionLink>

          <PrimaryBtn
            onClick={() => handleTransition("/sign-up")}
            className="bg-primary !px-4 sm:!px-6 lg:!px-8 py-2 lg:py-3 !h-[39px] lg:!h-[52px] !text-sm lg:!text-base"
          >
            Sign up
          </PrimaryBtn>
          <button onClick={toggleSidebar} className="md:hidden block">
            <MenuIcon />
          </button>
        </div>
      </header>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Header;
