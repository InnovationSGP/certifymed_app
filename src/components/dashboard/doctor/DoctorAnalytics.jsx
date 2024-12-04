"use client"
import AnalyticsCard from "@/components/common/AnalyticsCard";
import {
  MesSage,
  TotalAppointments,
  UpcomingAppointments,
} from "@/components/common/AppIcons";
import { useSelector } from "react-redux";

const DoctorAnalytics = () => {
  const upcomingAppointments = useSelector(
    (state) => state.doctorDashboard.upcomingAppointments
  );
  const completedAppointments = useSelector(
    (state) => state.doctorDashboard.completedAppointments
  );

  const unreadMessages = useSelector(
    (state) => state.doctorDashboard.unreadMessages
  );
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
          icon={<MesSage />}
          count={unreadMessages}
          description="Unread Messages"
        />
      </div>
    </>
  );
};

export default DoctorAnalytics;
