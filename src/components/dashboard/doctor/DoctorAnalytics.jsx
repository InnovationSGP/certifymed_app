'use client';
import { useState, useEffect } from 'react';
import AnalyticsCard from '@/components/common/AnalyticsCard';
import {
    MesSage,
    TotalAppointments,
    UpcomingAppointments
} from '@/components/common/AppIcons';
import { useSelector } from 'react-redux';
import { AnalyticsCardSkeleton } from '@/components/common/SkeletonLoader';

const DoctorAnalytics = () => {
    const [loading, setLoading] = useState(true);
    const upcomingAppointments = useSelector(
        (state) => state.doctorDashboard.upcomingAppointments
    );
    const completedAppointments = useSelector(
        (state) => state.doctorDashboard.completedAppointments
    );
    const unreadMessages = useSelector(
        (state) => state.doctorDashboard.unreadMessages
    );

    useEffect(() => {
        // Simulate API loading time
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className="grid lg:grid-cols-3 gap-3.5 sm:gap-[22px] px-5 md:px-[35px] mt-[26px]">
                {loading ? (
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
