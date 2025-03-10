'use client';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const DoctorInfo = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [profileData, setprofileData] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const newParams = new URLSearchParams(searchParams);
    newParams.set('tab', 'doctor-profile'.toString());

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setprofileData(
                JSON.parse(sessionStorage.getItem('appointmentData'))
            );
            setSelectedDate(sessionStorage.getItem('selectedDate'));
            setSelectedTime(sessionStorage.getItem('timing'));
        }
    }, []);

    return (
        <div className="flex flex-col lg:flex-row w-full items-start lg:items-end sm:space-x-3 space-y-3 md:border border-gainsboro md:p-5 rounded-xl">
            <div className="flex flex-col md:flex-row w-full items-center">
                <div className="overflow-hidden rounded-full mb-3 sm:mb-0 relative w-24 aspect-square">
                    <Image
                        fill
                        src={
                            profileData?.avatar ||
                            'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBvcnRyYWl0JTIwbWFufGVufDB8fDB8fHww'
                        }
                    />
                </div>
                <div className="flex flex-col items-start px-4">
                    <p className="text-lg sm:text-xl font-poppins font-medium text-secondary text-center sm:text-start w-full capitalize">
                        {profileData?.firstName || 'sample'}{' '}
                        {profileData?.lastName || 'doctor'}
                    </p>
                    <p className="text-base text-secondary py-1 text-center sm:text-start w-full">
                        {selectedDate} - {selectedTime}
                    </p>
                    <p className="font-medium text-base md:text-lg text-secondary capitalize text-center sm:text-start w-full">
                        Video
                        {' Appointment '}(
                        {profileData?.appointmentDuration || 30} {'min'})
                    </p>
                    <button
                        className="text-bluetitmouse underline hover:no-underline whitespace-nowrap w-full sm:w-fit"
                        onClick={() => {
                            router.push(`?${newParams.toString()}`, {
                                scroll: false
                            });
                        }}
                    >
                        See Profile
                    </button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-12 w-full sm:w-fit">
                <button className="w-full sm:w-fit rounded-[28px] bg-[#4864FF29] hover:bg-[#4863ff18] transition-all duration-200 ease-in-out text-bluetitmouse md:whitespace-nowrap text-xs md:text-base p-4 px-4 sm:px-8">
                    Last Provider available at this time
                </button>
            </div>
        </div>
    );
};

export default DoctorInfo;
