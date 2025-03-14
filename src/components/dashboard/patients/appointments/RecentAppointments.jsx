'use client';
import { useState, useEffect } from 'react';
import ListHeading from '@/components/common/ListHeading';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import RecentAppointmentsCard from './RecentAppointmentsCard';
import RecentAppointmentsListItem from './RecentAppointmentsListItem';
import {
    AppointmentsCardSkeleton,
    AppointmentsTableSkeleton
} from '@/components/common/SkeletonLoader';

const RecentAppointments = ({ type, appointments = [] }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        if (appointments.length > 0) {
            // If we have appointments data, reduce loading time
            const timer = setTimeout(() => setLoading(false), 800);
            return () => clearTimeout(timer);
        } else {
            // If no appointments, still show loading for a bit
            const timer = setTimeout(() => setLoading(false), 1500);
            return () => clearTimeout(timer);
        }
    }, [appointments]);

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

                    {loading ? (
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
                                        {appointments.length > 0 ? (
                                            appointments.map(
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
                                    {appointments.length > 0 ? (
                                        appointments.map(
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
