'use client';
import Analytics from '@/components/common/AnalyticsCard';
import {
    Cancelled,
    TotalAppointments,
    UpcomingAppointments
} from '@/components/common/AppIcons';
import { setAppointmentsForPatients } from '@/redux/slices/patientAppointments';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AppointmentsAnalytics = ({ appointments }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            setAppointmentsForPatients({
                appointmentsHistory: appointments,
                upcomingAppointments: '3',
                completedAppointments: '1',
                cancelledAppointments: '1'
            })
        );
    }, [dispatch]);

    const upcomingAppointments = useSelector(
        (state) => state.patientDashboard.upcomingAppointments
    );
    const completedAppointments = useSelector(
        (state) => state.patientDashboard.completedAppointments
    );
    const cancelledAppointments = useSelector(
        (state) => state.patientDashboard.cancelledAppointments
    );
    return (
        <>
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
        </>
    );
};

export default AppointmentsAnalytics;
