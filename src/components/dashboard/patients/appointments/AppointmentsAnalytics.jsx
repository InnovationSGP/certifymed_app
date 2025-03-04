'use client';
import Analytics from '@/components/common/AnalyticsCard';
import usePatientAnalytics from '@/hooks/usePatientAnalytics';
import {
    Cancelled,
    TotalAppointments,
    UpcomingAppointments
} from '@/components/common/AppIcons';

const AppointmentsAnalytics = () => {
    const {
        upcomingAppointments,
        cancelledAppointments,
        completedAppointments
    } = usePatientAnalytics();
    return (
        <div className="grid lg:grid-cols-3 gap-[22px] px-5 md:px-[35px] mt-[26px]">
            <Analytics
                icon={<UpcomingAppointments />}
                count={upcomingAppointments}
                description="Upcoming Appointments"
            />
            <Analytics
                icon={<TotalAppointments />}
                count={completedAppointments}
                description="Completed Appointments"
            />
            <Analytics
                icon={<Cancelled />}
                count={cancelledAppointments}
                description="Cancelled Appointments"
            />
        </div>
    );
};

export default AppointmentsAnalytics;
