'use client';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card } from './Card';
import { Badge } from './badge';
import { appointmentsDrop } from './Helper';
import { TabDownArrowIcon } from './AppIcons';
import PrimaryBtn from './PrimaryBtn';

export default function AppointmentTypes({ selectedIdType }) {
    const [selectedId, setSelectedId] = useState(selectedIdType);
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleToggle = (id) => {
        setSelectedId(selectedId === id ? null : id);
    };

    return (
        <div className="bg-white pr-2 w-full sm:w-11/12 mx-auto shadow-tab py-3 rounded-[12px]">
            <div className="h-[calc(100vh-255px)] sm:h-[calc(100vh-268px)] xl:h-[calc(100vh-230px)] p-3 sm:p-4 overflow-auto custom-tabs">
                <h1 className="text-lg sm:text-xl font-poppins font-semibold text-secondary mb-2">
                    How do you want to be seen?
                </h1>

                <div className="flex items-center gap-2 text-sm mb-6">
                    <button className="text-bluetitmouse hover:underline text-base font-poppins">
                        Appointment
                    </button>
                    <span className="text-secondary">/</span>
                    <span className="text-secondary capitalize text-base font-poppins">
                        {selectedIdType}
                    </span>
                </div>

                <div className="space-y-4">
                    {appointmentsDrop.map((appointment) => (
                        <Card
                            key={appointment.id}
                            className="p-3 sm:p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => handleToggle(appointment.id)}
                        >
                            <div className="flex items-center gap-3 justify-between">
                                <div className="flex-1">
                                    <div className="flex gap-2 sm:gap-0 items-center justify-between sm:mb-2">
                                        <h3 className="text-base font-medium text-gray-900">
                                            {appointment.title}
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
                                                    appointment.id
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
                                            selectedId === appointment.id
                                                ? 'max-h-[500px] opacity-100'
                                                : 'max-h-0 opacity-0'
                                        }`}
                                    >
                                        <p className="!text-sm sm:!text-base paragraph leading-[120%] mb-4">
                                            {appointment.description}
                                        </p>
                                        <PrimaryBtn
                                            className="h-[52px] md:h-[60px]"
                                            onClick={() => {
                                                sessionStorage.setItem(
                                                    'appointmentData',
                                                    `${selectedIdType}, ${appointment.title}, ${appointment.description}`
                                                );
                                                const newParams =
                                                    new URLSearchParams(
                                                        searchParams
                                                    );
                                                newParams.set(
                                                    'tab',
                                                    'payment'.toString()
                                                );
                                                router.push(
                                                    `?${newParams.toString()}`,
                                                    { scroll: false }
                                                );
                                            }}
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
