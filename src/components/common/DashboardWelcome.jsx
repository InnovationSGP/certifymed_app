'use client';
import { setAppointmentsForPatients } from '@/redux/slices/patientAppointments';
import { selectUser } from '@/redux/slices/userSlice';
import { useTransitionRouteChange } from '@/utils/useTransitionRouteChange';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DashboardWelcome = ({ data, description, emergencycall, buttontext }) => {
    const { handleTransition } = useTransitionRouteChange();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        dispatch(
            setAppointmentsForPatients({
                appointmentsHistory: data,
                upcomingAppointments: '1',
                completedAppointments: '3',
                cancelledAppointments: '1'
            })
        );
    }, [dispatch]);
    const userFullName = `${user.firstName || ''} ${
        user.lastName || ''
    }`.trim();
    return (
        <>
            <div className="flex items-center flex-wrap justify-between mt-[29px] sm:mt-10 md:mt-16 gap-[29px] px-5 md:px-[35px]">
                <div>
                    <h2 className="section-heading leading-[51px] mb-1.5 sm:mb-2.5 capitalize">
                        Hi , {userFullName}
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
