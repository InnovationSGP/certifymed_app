'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { TabDownArrowIcon } from './AppIcons';
import { Badge } from './badge';
import { Card } from './Card';
import PrimaryBtn from './PrimaryBtn';

export default function AppointmentTypes({
    selectedIdType,
    setSelectedIdType
}) {
    const [selectedId, setSelectedId] = useState(selectedIdType);
    const searchParams = useSearchParams();
    const router = useRouter();
    const doctors = useSelector((state) => state.patientsDoctor.data);
    const handleToggle = (id) => {
        setSelectedId(selectedId === id ? null : id);
    };

    function handleAppointment(data) {
        sessionStorage.setItem('appointmentData', JSON.stringify(data));
        const newParams = new URLSearchParams(searchParams);
        newParams.set('tab', 'payment'.toString());
        router.push(`?${newParams.toString()}`, { scroll: false });
    }
    return (
        <div className="bg-white pr-2 w-full sm:w-11/12 mx-auto shadow-tab py-3 rounded-[12px]">
            <div className="h-[calc(100vh-255px)] sm:h-[calc(100vh-268px)] xl:h-[calc(100vh-238px)] p-3 sm:px-6 sm:py-3 overflow-auto custom-tabs">
                <h1 className="text-lg sm:text-xl font-poppins font-semibold text-secondary mb-2">
                    How do you want to be seen?
                </h1>

                <div className="flex items-center gap-2 mb-6 text-sm">
                    <button
                        onClick={() => setSelectedIdType(null)}
                        className="text-base text-bluetitmouse hover:underline font-poppins"
                    >
                        Appointment
                    </button>
                    <span className="text-secondary">/</span>
                    <span className="text-base capitalize text-secondary font-poppins">
                        {selectedIdType}
                    </span>
                </div>

                <div className="space-y-4">
                    {doctors.map((appointment) => (
                        <Card
                            key={appointment._id}
                            className="p-3 transition-colors cursor-pointer sm:p-4 hover:bg-gray-50"
                            onClick={() => handleToggle(appointment._id)}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between gap-2 sm:gap-0 sm:mb-2">
                                        <h3 className="text-base font-medium text-gray-900">
                                            {appointment.specialization}
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
                                                    selectedId ===
                                                    appointment._id
                                                        ? 'rotate-0'
                                                        : 'rotate-[272deg]'
                                                } transition-all duration-300 ease-in-out`}
                                            >
                                                <TabDownArrowIcon />
                                            </span>
                                        </div>
                                    </div>

                                    {/* Transition Effect for Content */}
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                            selectedId === appointment._id
                                                ? 'max-h-[500px] opacity-100'
                                                : 'max-h-0 opacity-0'
                                        }`}
                                    >
                                        <p className="!text-sm sm:!text-base paragraph leading-[120%] mb-4">
                                            {appointment.email}
                                        </p>
                                        <PrimaryBtn
                                            className="h-[52px] md:h-[60px]"
                                            onClick={() =>
                                                handleAppointment(appointment)
                                            }
                                        >
                                            View Availabilities
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
}
