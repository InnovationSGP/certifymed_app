'use client';
import React, { useState } from 'react';
import ListHeading from '@/components/common/ListHeading';
import { useSelector } from 'react-redux';
import RecentAppointments from '../patients/appointments/RecentAppointments';
import PatientsList from '@/components/common/PatientsList';
import DashboardSkeleton from '@/components/common/SkeletonLoader';

const DoctorDashboard = () => {
    const [activePatient, setActivePatient] = useState('');

    // Get data and loading states from Redux store
    const { appointmentsHistory, isLoading: appointmentsLoading } = useSelector(
        (state) => ({
            appointmentsHistory:
                state.doctorDashboard.appointmentsHistory || [],
            isLoading:
                state.doctorDashboard.isLoading !== undefined
                    ? state.doctorDashboard.isLoading
                    : false
        })
    );

    const { patients, isLoading: patientsLoading } = useSelector((state) => ({
        patients: state.allConcernedPatients.patients || [],
        isLoading:
            state.allConcernedPatients.isLoading !== undefined
                ? state.allConcernedPatients.isLoading
                : false
    }));

    // Show skeleton only if both data sources are still loading and don't have any data
    const showSkeleton =
        appointmentsLoading &&
        (!appointmentsHistory || appointmentsHistory.length === 0) &&
        patientsLoading &&
        (!patients || patients.length === 0);

    if (showSkeleton) {
        return <DashboardSkeleton />;
    }

    return (
        <>
            <div className="lg:grid lg:grid-cols-3 gap-[22px] px-5 md:px-[35px] mt-[35px] mb-[103px]">
                <RecentAppointments
                    type="Doctor"
                    appointments={appointmentsHistory}
                />
                <div className="mt-[47px] lg:mt-0 rounded-t-xl lg:rounded-none bg-white lg:bg-transparent">
                    <div className="px-4 lg:px-0">
                        <ListHeading
                            heading="Patients"
                            href="/dashboard/doctor/patients-info"
                        />
                    </div>
                    <hr />
                    <div className="w-full bg-white lg:h-[531px] rounded-b-xl overflow-y-auto custom-scrollbar">
                        <PatientsList
                            patientsdatalist={patients}
                            activePatient={activePatient}
                            setActivePatient={setActivePatient}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DoctorDashboard;
