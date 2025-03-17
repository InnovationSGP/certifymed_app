'use client';
import { TabDownArrowIcon } from '@/components/common/AppIcons';
import { Badge } from '@/components/common/badge';
import { Card } from '@/components/common/Card';
import PrimaryBtn from '@/components/common/PrimaryBtn';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SelectDoctor = () => {
    const [doctorsData, setDoctorsData] = useState();
    const [selectedId, setSelectedId] = useState();
    const router = useRouter();
    const searchParams = useSearchParams();
    const handleToggle = (id) => {
        setSelectedId(selectedId === id ? null : id);
    };
    const newParams = new URLSearchParams(searchParams);
    newParams.set('tab', 'payment'.toString());

    function handleAppointment(data) {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('appointmentData', JSON.stringify(data));
            router.push(`?${newParams.toString()}`, { scroll: false });
        }
    }
    useEffect(() => {
        if (typeof window !== undefined) {
            const data = sessionStorage.getItem('selectedDoctors');
            setDoctorsData(JSON.parse(data));
        }
    }, []);

    return (
        <div className="bg-white pr-2 w-full sm:w-11/12 mx-auto shadow-tab py-3 rounded-[12px]">
            <div className="h-[calc(100vh-255px)] sm:h-[calc(100vh-268px)] xl:h-[calc(100vh-238px)] p-3 sm:px-6 sm:py-3 overflow-auto custom-tabs">
                <h1 className="text-lg sm:text-xl font-poppins font-semibold text-secondary mb-2 capitalize">
                    Select Doctor for {doctorsData?.diseaseName}
                </h1>

                <div className="space-y-4 mt-4">
                    {doctorsData?.doctors?.map((appointment, index) => (
                        <Card
                            key={index}
                            className="p-3 transition-colors cursor-pointer sm:p-4 hover:bg-gray-50"
                            onClick={() => handleToggle(index)}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between gap-2 sm:gap-0 sm:mb-2">
                                        <h3 className="text-base font-medium text-gray-900 capitalize">
                                            {appointment.firstName +
                                                appointment.lastName}
                                        </h3>
                                        <div className="flex items-center gap-1 sm:gap-2">
                                            <Badge
                                                variant="secondary"
                                                className="bg-transparentBlue text-bluetitmouse !text-xs !font-normal hover:bg-purple-100 rounded-[32px] px-3 py-1 h-[30px]"
                                            >
                                                Appointment
                                            </Badge>

                                            <span
                                                className={`${
                                                    selectedId === index
                                                        ? 'rotate-0'
                                                        : 'rotate-[272deg]'
                                                } transition-all duration-300 ease-in-out`}
                                            >
                                                <TabDownArrowIcon />
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                            selectedId === index
                                                ? 'max-h-[500px] opacity-100'
                                                : 'max-h-0 opacity-0'
                                        }`}
                                    >
                                        <p className="!text-sm sm:!text-base paragraph leading-[120%] mb-4 capitalize">
                                            {appointment.email}
                                        </p>
                                        <PrimaryBtn
                                            className="h-[52px] md:h-[60px]"
                                            onClick={() =>
                                                handleAppointment(appointment)
                                            }
                                        >
                                            View Availability
                                        </PrimaryBtn>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SelectDoctor;
