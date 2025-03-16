'use client';
import { patientsdatalist } from '@/components/common/Helper';
import { useProfileData } from '@/hooks/useProfileData';
import { setPatients } from '@/redux/slices/allPatientsForDoctorSlice';
import { setDoctorAppointments } from '@/redux/slices/doctorRecentAppointmentsSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

const NotesWelcome = ({
    data,
    setState,
    description,
    emergencycall,
    buttontext
}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { user } = useProfileData();

    function handleRouteChange() {
        if (!user.isProfileCompleted) {
            return router.replace('/dashboard/doctor/profile');
        } else if (!user.isTimeScheduled) {
            return router.replace('/dashboard/doctor/appointments');
        }
    }
    useEffect(() => {
        dispatch(
            setDoctorAppointments({
                appointmentsHistory: data.data || [],
                upcomingAppointments: data.upcoming_appointment_count || '0',
                completedAppointments: data?.count || '0',
                unreadMessages: '0'
            })
        );

        dispatch(setPatients(patientsdatalist));

        if (
            user &&
            (user?.isProfileCompleted === false ||
                user?.isTimeScheduled === false)
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
    }, [dispatch, user]);
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
