'use client';
import React, { useEffect, useState } from 'react';
import AppointmentList from '@/components/dashboard/patients/appointments/AppointmentList';
import AppointmentsAnalytics from '@/components/dashboard/patients/appointments/AppointmentsAnalytics';
import DashboardLayout from '@/components/common/DashboardLayout';
import DashboardWelcome from '@/components/common/DashboardWelcome';
import PatientsHistory from '@/components/common/AppointmentHistoryMobileList';
import { setAppointmentsForPatients } from '@/redux/slices/patientAppointments';
import { patientappointments } from '@/components/common/Helper';
import { useDispatch, useSelector } from 'react-redux';
import FindProvider from '@/components/dashboard/patients/appointments/book/page';
import Link from 'next/link';

const AppoinmentPage = () => {
    const [isBookAppointment, setIsBookAppointment] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            setAppointmentsForPatients({
                appointmentsHistory: patientappointments,
                upcomingAppointments: '2',
                completedAppointments: '7',
                cancelledAppointments: '3'
            })
        );
    }, [dispatch]);

    const recentAppointments = useSelector(
        (state) => state.patientDashboard.appointmentsHistory
    );

    return (
        <DashboardLayout className="overflow-auto">
                <div>
                    <DashboardWelcome
                        heading="Appointments Overview"
                        buttontext="Book an Appointment"
                    />
                    <AppointmentsAnalytics />
                    <Link href={"/dashboard/patients/appointments/book"} className="bg-primary primary-btn mx-auto mt-[39px] sm:hidden">
                        Book an Appointment
                    </Link>
                    <div className="hidden md:block">
                        <AppointmentList
                            type="Patients"
                            dataSet={recentAppointments}
                        />
                    </div>
                    <PatientsHistory />
                </div>
        </DashboardLayout>
    );
};

export default AppoinmentPage;
