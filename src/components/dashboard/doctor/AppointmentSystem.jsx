'use client';
import { patientsapoinmenthistory } from '@/components/common/Helper';
import { setDoctorUpcomingAppointments } from '@/redux/slices/doctorUpcomingAppointmentsSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CalendarView from './CalendarView';
import CalendarModal from './CalenderModal';
import MiniCalendar from './MiniCalendar';
import ScheduleModal from './ScheduleModal';
import { removeAmPm } from '@/utils/dateHelpers';

const AppointmentSystem = ({ data = [] }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCalendarModal, setShowCalendarModal] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const array = data.map((item) => {
        return {
            id: item._id,
            title: 'Medical Consultation',
            startTime: removeAmPm(item.startTime),
            endTime: removeAmPm(item.endTime),
            date: new Date(item.visitDate).toISOString().split('T')[0],
            participants: 1,
            ...item
        };
    });
    const [appointments, setAppointments] = useState(array || []);

    // const [appointments, setAppointments] = useState([
    //     {
    //         id: 1,
    //         title: 'Medical Consultation',
    //         startTime: '11:00',
    //         endTime: '11:30',
    //         date: '2024-11-26',
    //         participants: 2
    //     },
    //     {
    //         id: 2,
    //         title: 'Medical Consultation',
    //         startTime: '11:00',
    //         endTime: '11:30',
    //         date: '2024-10-31',
    //         participants: 4
    //     },
    //     {
    //         id: 3,
    //         title: 'Test Consultation',
    //         startTime: '11:00',
    //         endTime: '11:30',
    //         date: '2024-11-01',
    //         participants: 4
    //     },
    //     {
    //         id: 4,
    //         title: 'Test Consultation',
    //         startTime: '12:00',
    //         endTime: '1:30',
    //         date: '2024-11-02',
    //         participants: 2
    //     },
    //     {
    //         id: 5,
    //         title: 'Test Consultation',
    //         startTime: '12:00',
    //         endTime: '1:30',
    //         date: '2024-11-03',
    //         participants: 2
    //     },
    //     {
    //         id: 6,
    //         title: 'Test Consultation',
    //         startTime: '9:00',
    //         endTime: '10:00',
    //         date: '2024-11-04',
    //         participants: 2
    //     }
    // ]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setDoctorUpcomingAppointments(patientsapoinmenthistory));
    }, [dispatch]);

    const upcomingAppointments = useSelector(
        (state) => state.doctorUpcomingAppointments.upcomingAppointments
    );

    // Function to toggle CalendarModal visibility
    const toggleCalendarModal = () => setShowCalendarModal((prev) => !prev);
    // Date selection handlers
    const handleDateSelect = (day) => {
        const newDate = new Date(
            currentDate.getUTCFullYear(),
            currentDate.getUTCMonth(),
            day
        );
        setSelectedDate(newDate);
        setCurrentDate(newDate);
    };

    const handleMonthChange = (direction) => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
            return newDate;
        });
    };

    const handleDayNavigation = (direction) => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            newDate.setDate(prev.getDate() + (direction === 'next' ? 1 : -1));
            return newDate;
        });
    };

    // Appointment handlers
    const handleSaveAppointment = (appointmentData) => {
        setAppointments((prev) => [
            ...prev,
            { id: Date.now(), ...appointmentData }
        ]);
        setShowScheduleModal(false);
    };

    return (
        <>
            <div className="xl:flex gap-5 h-full  bg-white px-4 xl:pl-7">
                {/* Calendar View */}
                <CalendarView
                    setState={() => setShowScheduleModal(true)}
                    currentDate={currentDate}
                    appointments={appointments}
                    onNavigate={handleDayNavigation}
                    onToggleCalendar={toggleCalendarModal}
                />

                {/* Mini Calendar */}
                <MiniCalendar
                    setState={() => setShowScheduleModal(true)}
                    currentDate={currentDate}
                    selectedDate={selectedDate}
                    onDateSelect={handleDateSelect}
                    onMonthChange={handleMonthChange}
                />
            </div>

            {/* Schedule Modal */}
            {showScheduleModal && (
                <ScheduleModal
                    selectedDate={selectedDate}
                    onClose={() => setShowScheduleModal(false)}
                    onSave={handleSaveAppointment}
                />
            )}

            {/* Calendar Modal */}
            {showCalendarModal && (
                <CalendarModal
                    isOpen={showCalendarModal}
                    onClose={() => setShowCalendarModal(false)}
                    currentDate={currentDate}
                    selectedDate={selectedDate}
                    onDateSelect={handleDateSelect}
                    onMonthChange={handleMonthChange}
                />
            )}
        </>
    );
};

export default AppointmentSystem;
