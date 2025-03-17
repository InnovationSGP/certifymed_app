'use client';
import { patientsdatalist } from '@/components/common/Helper';
import { useProfileData } from '@/hooks/useProfileData';
import { setPatients } from '@/redux/slices/allPatientsForDoctorSlice';
import {
    setDoctorAppointments,
    setLoading
} from '@/redux/slices/doctorRecentAppointmentsSlice';
import { selectUser } from '@/redux/slices/userSlice';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WelcomeHeaderSkeleton } from '@/components/common/SkeletonLoader';
import toast from 'react-hot-toast';

const NotesWelcome = ({
    data,
    setState,
    description,
    emergencycall,
    buttontext
}) => {
    const [nameLoading, setNameLoading] = useState(true);
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const { user: profileUser } = useProfileData();

    function handleRouteChange() {
        if (!profileUser.isProfileCompleted) {
            return router.replace('/dashboard/doctor/profile');
        } else if (!profileUser.isTimeScheduled) {
            return router.replace('/dashboard/doctor/appointments');
        }
    }

    useEffect(() => {
        // Set loading state to true while dispatching data
        dispatch(setLoading(true));

        // Safely handle the data dispatch
        const safeData = {
            data: data?.data || [],
            upcoming_appointment_count: data?.upcoming_appointment_count || '0',
            count: data?.count || '0'
        };

        try {
            dispatch(
                setDoctorAppointments({
                    appointmentsHistory: safeData.data,
                    upcomingAppointments: safeData.upcoming_appointment_count,
                    completedAppointments: safeData.count,
                    unreadMessages: '0'
                })
            );

            dispatch(setPatients(patientsdatalist));
        } catch (error) {
            console.error('Error setting appointments data:', error);
        } finally {
            // Set loading to false when done
            dispatch(setLoading(false));
        }

        // Check if user data is loaded
        if (user && (user.firstName || user.lastName)) {
            setNameLoading(false);
        } else {
            // If no user data yet, wait briefly then fallback to default
            const timer = setTimeout(() => setNameLoading(false), 1500);
            return () => clearTimeout(timer);
        }
    }, [dispatch, data, user]);

    // Handle profile completion notifications in a separate effect
    useEffect(() => {
        // Show profile completion toast
        if (
            profileUser &&
            (profileUser?.isProfileCompleted === false ||
                profileUser?.isTimeScheduled === false)
        ) {
            const hasShownProfileToast = sessionStorage.getItem(
                'profile_toast_shown'
            );

            if (!hasShownProfileToast) {
                toast.custom(
                    <div className="flex items-center gap-x-2 p-2.5 shadow-xl rounded-xl bg-white">
                        <span>
                            Please complete your profile and schedule timing to
                            get appointments.
                        </span>
                        <button
                            onClick={handleRouteChange}
                            className="bg-primary text-white py-1 px-2 rounded text-sm"
                        >
                            Complete Now
                        </button>
                    </div>,
                    {
                        duration: 2000
                    }
                );
                sessionStorage.setItem('profile_toast_shown', 'true');
            }
        }
    }, [profileUser]);

    if (nameLoading) {
        return <WelcomeHeaderSkeleton />;
    }

    const userFullName = `Dr. ${user?.firstName || ''} ${
        user?.lastName || ''
    }`.trim();

    return (
        <>
            <div className="flex items-center flex-wrap justify-between mt-[29px] md:mt-16 gap-[29px] px-[35px]">
                <div>
                    <h2 className="section-heading leading-[51px] mb-2.5 capitalize">
                        Hi ,{userFullName ? userFullName : 'Dr. John Doe'}
                    </h2>
                    {description && (
                        <p className="text-mainblack font-semibold">
                            {description}
                        </p>
                    )}
                </div>
                <div className="flex items-center gap-x-[15px]">
                    {buttontext && (
                        <button
                            onClick={setState ? setState : null}
                            className="bg-primary primary-btn"
                        >
                            {buttontext}
                        </button>
                    )}

                    {emergencycall && (
                        <button className="bg-red primary-btn">
                            Emergency call
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default NotesWelcome;
