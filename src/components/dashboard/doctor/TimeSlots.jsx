'use client';
import React, { useEffect, useState } from 'react';
import AppointmentModel from './appointmentModel/AppointmentModel';
import Image from 'next/image';
import {
    generateTimeSlots,
    getThreeDayView,
    removeAmPm
} from '@/utils/dateHelpers';
import dayjs from 'dayjs';

const TimeSlots = ({ data, currentDate }) => {
    const [showModel, setShowModel] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const handleCardClick = (id) => {
        const apt = data.find((item) => item._id === id);
        setShowModel(true);
        setSelectedAppointment(apt);
    };

    function closeModal() {
        setShowModel(false);
        setSelectedAppointment(null);
    }

    useEffect(() => {
        const array = data.map((item) => {
            const visitDate = dayjs(item.visitDate, [
                'dddd, MMM D, YYYY',
                'YYYY-MM-DD'
            ]).format('YYYY-MM-DD');
            return {
                id: item._id,
                title: 'Medical Consultation',
                startTime: removeAmPm(item.startTime),
                endTime: removeAmPm(item.endTime),
                date: visitDate,
                participants: 1
            };
        });
        setAppointments(array);
    }, [data]);

    return (
        <div
            className="overflow-auto hide-scrollbar"
            style={{ height: 'calc(100vh - 240px)' }}
        >
            {generateTimeSlots().map((slot) => (
                <div
                    key={slot.time}
                    className="flex border-t border-gray-100 h-24"
                >
                    {/* Fixed time column */}
                    <div className="w-20 pt-2 text-xs sticky left-0 bg-lightOverlay">
                        {slot.label}
                    </div>

                    {/* Scrollable day slots */}
                    <div className="flex gap-4 w-full">
                        <div className="grid grid-cols-3 w-full gap-3">
                            {getThreeDayView(currentDate).map(
                                ({ date }, dayIndex) => {
                                    const dayAppointments = appointments.filter(
                                        (apt) => {
                                            const [aptHours] = apt.startTime
                                                .split(':')
                                                .map(Number);
                                            const appointmentDate = date
                                                .toISOString()
                                                .split('T')[0];
                                            return (
                                                aptHours === slot.time &&
                                                apt.date === appointmentDate
                                            );
                                        }
                                    );

                                    return (
                                        <div
                                            key={dayIndex}
                                            className="relative"
                                        >
                                            {dayAppointments.map((apt) => (
                                                <div
                                                    key={apt.id}
                                                    onClick={() =>
                                                        handleCardClick(apt.id)
                                                    }
                                                    className="bg-pervenche text-white w-full rounded-lg p-3 cursor-pointer"
                                                >
                                                    <div className="flex justify-between items-start gap-2.5">
                                                        <span className="text-xs md:text-[13px] w-fit">
                                                            {apt.title}
                                                        </span>
                                                        <div className="flex -space-x-2">
                                                            <div className="rounded-full z-0 border-2 border-white">
                                                                <Image
                                                                    className="rounded-full max-w-7 h-7 min-w-5 max-h-7 min-h-5"
                                                                    src="/images/appoinmentperson.png"
                                                                    width={28}
                                                                    height={28}
                                                                    alt="Person 1"
                                                                />
                                                            </div>
                                                            <div className="rounded-full z-10 border-2 border-white">
                                                                <Image
                                                                    className="rounded-full max-w-7 h-7 min-w-5 max-h-7 min-h-5"
                                                                    src="/images/appoinmentdoctor.png"
                                                                    width={28}
                                                                    height={28}
                                                                    alt="Person 2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-1 text-start text-xs xl:text-sm">
                                                        {apt.startTime} -{' '}
                                                        {apt.endTime}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {showModel && selectedAppointment && (
                <AppointmentModel
                    data={selectedAppointment}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};

export default TimeSlots;
