'use client';
import { patientsdatalist } from '@/components/common/Helper';
import { setPatients } from '@/redux/slices/allPatientsForDoctorSlice';
import { setDoctorAppointments } from '@/redux/slices/doctorRecentAppointmentsSlice';
import { selectUser } from '@/redux/slices/userSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const NotesWelcome = ({
    data,
    setState,
    description,
    emergencycall,
    buttontext
}) => {
    const [nameLoading, setNameLoading] = useState(true);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

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

        // Check if user data is loaded
        if (user && (user.firstName || user.lastName)) {
            setNameLoading(false);
        } else {
            // If no user data yet, wait briefly then fallback to default
            const timer = setTimeout(() => setNameLoading(false), 1500);
            return () => clearTimeout(timer);
        }
    }, [dispatch, user]);

    const userFullName = `Dr. ${user?.firstName || ''} ${
        user?.lastName || ''
    }`.trim();

    return (
        <>
            <div className="flex items-center flex-wrap justify-between mt-[29px] md:mt-16 gap-[29px] px-[35px]">
                <div>
                    {nameLoading ? (
                        // Skeleton for loading doctor name
                        <div className="h-[51px] w-64 bg-gray-200 rounded mb-2.5 animate-pulse"></div>
                    ) : (
                        <h2 className="section-heading leading-[51px] mb-2.5 capitalize">
                            Hi ,{userFullName ? userFullName : 'Dr. John Doe'}
                        </h2>
                    )}
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
