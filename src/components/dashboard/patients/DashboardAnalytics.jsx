"use client"
import AnalyticsCard from "@/components/common/AnalyticsCard";
import {
  Prescriptions,
  TotalAppointments,
  UpcomingAppointments,
} from "@/components/common/AppIcons";
import { useSelector } from "react-redux";

const DashboardAnalytics = () => {
  const upcomingAppointments = useSelector((state) => state.patientDashboard.upcomingAppointments)
  const completedAppointments = useSelector((state) => state.patientDashboard.completedAppointments)
  const cancelledAppointments = useSelector((state) => state.patientDashboard.cancelledAppointments)
  return (
    <>
      <div className="grid lg:grid-cols-3 gap-3.5 sm:gap-[22px] px-5 md:px-[35px] mt-[26px]">
        <AnalyticsCard
          icon={<UpcomingAppointments />}
          count={upcomingAppointments}
          description="Upcoming Appointments"
        />
        <AnalyticsCard
          icon={<TotalAppointments />}
          count={completedAppointments}
          description="Total Appointments"
        />
        <AnalyticsCard
          icon={<Prescriptions />}
          count={cancelledAppointments}
          description="Prescriptions"
        />
      </div>
    </>
  );
};

export default DashboardAnalytics;
