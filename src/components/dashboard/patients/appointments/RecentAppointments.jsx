'use client';
import { useEffect, useState } from 'react';
import ListHeading from '@/components/common/ListHeading';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import RecentAppointmentsCard from './RecentAppointmentsCard';
import RecentAppointmentsListItem from './RecentAppointmentsListItem';
import {
    AppointmentsTableSkeleton,
    AppointmentsCardSkeleton
} from '@/components/common/SkeletonLoader';
import { useSelector } from 'react-redux';

const RecentAppointments = ({ type, appointments = [] }) => {
    const [localLoading, setLocalLoading] = useState(true);

    // Get loading state from the appropriate Redux store based on type
    const reduxLoading = useSelector((state) => {
        if (type === 'Doctor') {
            return state.doctorDashboard?.isLoading !== undefined
                ? state.doctorDashboard.isLoading
                : true;
        } else {
            return state.patientDashboard?.isLoading !== undefined
                ? state.patientDashboard.isLoading
                : true;
        }
    });

    // Create a safe reference to appointments array
    const validAppointments = Array.isArray(appointments) ? appointments : [];

    useEffect(() => {
        // Set a reasonable timeout to prevent infinite loading
        const timer = setTimeout(() => {
            setLocalLoading(false);
        }, 2000);

        // If we have appointments data, show it faster
        if (validAppointments.length > 0) {
            setLocalLoading(false);
        }

        return () => clearTimeout(timer);
    }, [validAppointments]);

    // Use either Redux loading state or local loading state (whichever is faster)
    const isLoading = localLoading && reduxLoading;

    return (
        <>
            <div className="col-span-3 lg:col-span-2">
                <div>
                    <ListHeading
                        heading="Recent Appointments"
                        href={
                            type === 'Patients'
                                ? '/dashboard/patients/appointments'
                                : '/dashboard/doctor/appointments'
                        }
                    />

                    {isLoading ? (
                        <>
                            {/* Skeleton loaders */}
                            <AppointmentsTableSkeleton />
                            <AppointmentsCardSkeleton />
                        </>
                    ) : (
                        <>
                            {/* DESKTOP APPOINTMENTS */}
                            <div className="w-full overflow-y-auto custom-scrollbar hidden md:block">
                                <table className="min-w-full bg-white rounded-b-xl">
                                    <thead>
                                        <tr>
                                            <th className="table-heading">
                                                ID
                                            </th>
                                            <th className="table-heading">
                                                {type === 'Patients'
                                                    ? 'Doctor'
                                                    : 'Patient'}
                                            </th>
                                            <th className="table-heading">
                                                Date
                                            </th>
                                            <th className="table-heading">
                                                Mode
                                            </th>
                                            <th className="table-heading">
                                                Status
                                            </th>
                                            <th className="table-heading">
                                                View
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {validAppointments.length > 0 ? (
                                            validAppointments.map(
                                                (appointment, index) => (
                                                    <RecentAppointmentsListItem
                                                        type={type}
                                                        appointment={
                                                            appointment
                                                        }
                                                        key={index}
                                                    />
                                                )
                                            )
                                        ) : (
                                            <tr>
                                                <td colSpan={6}>
                                                    <span className="text-center block p-4">
                                                        No Appointments found
                                                    </span>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* MOBILE APPOINTMENTS */}
                            <div className="md:hidden recent-appointments-slider">
                                <Swiper
                                    spaceBetween={30}
                                    slidesPerView={1}
                                    pagination={{
                                        dynamicBullets: true
                                    }}
                                    modules={[Pagination]}
                                    breakpoints={{
                                        768: {
                                            slidesPerView: 1,
                                            spaceBetween: 20
                                        }
                                    }}
                                >
                                    {validAppointments.length > 0 ? (
                                        validAppointments.map(
                                            (appointment, index) => (
                                                <SwiperSlide key={index}>
                                                    <RecentAppointmentsCard
                                                        type={type}
                                                        appointment={
                                                            appointment
                                                        }
                                                    />
                                                </SwiperSlide>
                                            )
                                        )
                                    ) : (
                                        <span className="text-center block">
                                            No Appointments found
                                        </span>
                                    )}
                                </Swiper>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default RecentAppointments;
