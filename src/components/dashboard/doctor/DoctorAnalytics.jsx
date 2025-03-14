'use client';
import AnalyticsCard from '@/components/common/AnalyticsCard';
import {
    MesSage,
    TotalAppointments,
    UpcomingAppointments
} from '@/components/common/AppIcons';
import { useSelector } from 'react-redux';
import { AnalyticsCardSkeleton } from '@/components/common/SkeletonLoader';

const DoctorAnalytics = () => {
    // Get data and loading state from Redux
    const {
        upcomingAppointments,
        completedAppointments,
        unreadMessages,
        isLoading
    } = useSelector((state) => state.doctorDashboard);

    return (
        <>
            <div className="grid lg:grid-cols-3 gap-3.5 sm:gap-[22px] px-5 md:px-[35px] mt-[26px]">
                {isLoading ? (
                    <>
                        <AnalyticsCardSkeleton />
                        <AnalyticsCardSkeleton />
                        <AnalyticsCardSkeleton />
                    </>
                ) : (
                    <>
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
                    </>
                )}
            </div>
        </>
    );
};

export default DoctorAnalytics;
