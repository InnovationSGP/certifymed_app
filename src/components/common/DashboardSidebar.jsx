"use client";
import { usePathname, useRouter } from "next/navigation";
import { sidebarlinksfordoctors, sidebarlinksforpatients } from "./Helper";
import { useTransitionRouteChange } from "@/utils/useTransitionRouteChange";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { handleTransition } = useTransitionRouteChange();
  const isDoctorDashboard = pathname.includes("/doctor");
  const sidebarLinks = isDoctorDashboard
    ? sidebarlinksfordoctors
    : sidebarlinksforpatients;

  return (
    <aside className="fixed bottom-0  z-40 flex xl:block xl:static xl:h-screen bg-primary w-full py-3 px-3 xl:pt-[85px] xl:space-y-[29px] xl:min-w-[228px] xl:max-w-[228px] transition-all duration-300 ease-in-out">
      {sidebarLinks &&
        sidebarLinks.map((obj, index) => (
          <button
            // onClick={() => router.push(obj.url)}
            onClick={() => handleTransition(obj.url)}
            key={index}
            className={`${
              obj.url === pathname ? "bg-bluetitmouse" : ""
            } flex items-center justify-center xl:justify-start space-x-1 sm:space-x-2 text-white font-medium text-[11px] sm:text-sm font-poppins w-full px-2 sm:px-3.5 py-2 sm:py-[13px] rounded-xl transition-all duration-300 ease-in-out`}
          >
            {obj.icon}

            {obj.url === pathname && (
              <span className="xl:hidden whitespace-nowrap transition-all duration-300 ease-in-out">
                {obj.name}
              </span>
            )}
            <span className="hidden xl:block transition-all duration-300 ease-in-out">
              {obj.name}
            </span>
          </button>
        ))}
    </aside>
  );
};

export default DashboardSidebar;
