'use client';
import React, { useEffect, useState } from 'react';
import ListHeading from '@/components/common/ListHeading';
import { useSelector } from 'react-redux';
import RecentAppointments from '../patients/appointments/RecentAppointments';
import PatientsList from '@/components/common/PatientsList';
import DashboardSkeleton from '@/components/common/SkeletonLoader';

const DoctorDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [activePatient, setActivePatient] = useState('');

    // Get data from Redux store
    const doctorDashboardData = useSelector(
        (state) => state.doctorDashboard.appointmentsHistory
    );
    const patientsdata = useSelector(
        (state) => state.allConcernedPatients.patients
    );

    useEffect(() => {
        // Simulate data loading
        const timer = setTimeout(() => {
            setLoading(false);
            if (patientsdata && patientsdata.length > 0) {
                setActivePatient(patientsdata[0]?.name || '');
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [patientsdata]);

    if (loading) {
        return <DashboardSkeleton />;
    }

    return (
        <>
            <div className="lg:grid lg:grid-cols-3 gap-[22px] px-5 md:px-[35px] mt-[35px] mb-[103px]">
                <RecentAppointments
                    type="Doctor"
                    appointments={doctorDashboardData}
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
                            patientsdatalist={patientsdata}
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
