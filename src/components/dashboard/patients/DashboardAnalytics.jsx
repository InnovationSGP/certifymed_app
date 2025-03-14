'use client';
import AnalyticsCard from '@/components/common/AnalyticsCard';
import { AnalyticsCardSkeleton } from '@/components/common/SkeletonLoader';
import {
    Prescriptions,
    TotalAppointments,
    UpcomingAppointments
} from '@/components/common/AppIcons';
import { useSelector } from 'react-redux';

const DashboardAnalytics = () => {
    // Get data and loading state from Redux
    const {
        upcomingAppointments,
        completedAppointments,
        cancelledAppointments,
        isLoading
    } = useSelector((state) => state.patientDashboard);

    // Show skeleton loaders while data is loading
    if (isLoading) {
        return (
            <div className="grid lg:grid-cols-3 gap-3.5 sm:gap-[22px] px-5 md:px-[35px] mt-[26px]">
                <AnalyticsCardSkeleton />
                <AnalyticsCardSkeleton />
                <AnalyticsCardSkeleton />
            </div>
        );
    }

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
