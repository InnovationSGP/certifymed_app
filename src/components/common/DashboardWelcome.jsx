'use client';
import {
    setAppointmentsForPatients,
    setLoading
} from '@/redux/slices/patientAppointments';
import { selectUser } from '@/redux/slices/userSlice';
import { useTransitionRouteChange } from '@/utils/useTransitionRouteChange';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WelcomeHeaderSkeleton } from '@/components/common/SkeletonLoader';

const DashboardWelcome = ({
    data = [],
    description,
    emergencycall,
    buttontext
}) => {
    const [nameLoading, setNameLoading] = useState(true);
    const { handleTransition } = useTransitionRouteChange();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        // Set loading state to true while dispatching data
        dispatch(setLoading(true));

        try {
            dispatch(
                setAppointmentsForPatients({
                    appointmentsHistory: data?.data || [],
                    upcomingAppointments: data?.upcoming_appointment_count || 0,
                    completedAppointments: data?.data?.length || 0,
                    cancelledAppointments: data?.cancel_appointment_count || 0
                })
            );
        } catch (error) {
            console.error('Error setting appointments data:', error);
            // Set loading to false even if there's an error
            dispatch(setLoading(false));
        }

        // Handle user data loading
        if (user && (user.firstName || user.lastName)) {
            setNameLoading(false);
        } else {
            const timer = setTimeout(() => setNameLoading(false), 1500);
            return () => clearTimeout(timer);
        }
    }, [dispatch, data, user]);

    if (nameLoading) {
        return <WelcomeHeaderSkeleton />;
    }

    const userFullName = `${user?.firstName || ''} ${
        user?.lastName || ''
    }`.trim();

    return (
        <>
            <div className="flex items-center flex-wrap justify-between mt-[29px] sm:mt-10 md:mt-16 gap-[29px] px-5 md:px-[35px]">
                <div>
                    <h2 className="section-heading leading-[51px] mb-1.5 sm:mb-2.5 capitalize">
                        Hi , {userFullName ? userFullName : 'User'}
                    </h2>
                    {description && (
                        <p className="text-mainblack font-semibold font-poppins">
                            {description}
                        </p>
                    )}
                </div>
                <div className="sm:flex items-center gap-x-[15px] hidden">
                    {buttontext && (
                        <button
                            onClick={() =>
                                handleTransition(
                                    '/dashboard/patients/appointments/book'
                                )
                            }
                        >
                            <Link
                                href={'/dashboard/patients/appointments/book'}
                                className="bg-primary primary-btn"
                            >
                                Book an Appointment
                            </Link>
                        </button>
                    )}

                    {emergencycall && (
                        <button className="emergency-btn">
                            Emergency call
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default DashboardWelcome;
