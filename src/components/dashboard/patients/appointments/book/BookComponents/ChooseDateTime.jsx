import HorizontalDatePicker from '@/components/common/DateTimePicker';
import { TimingProviders } from '@/components/common/Helper';
import { getAllDoctorSchedules } from '@/services/ScheduleService';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const ChooseDateTime = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [doctorSchedules, setDoctorSchedules] = useState([]);
    const [availableDays, setAvailableDays] = useState([]);

    useEffect(() => {
        router.prefetch('/dashboard/patients/appointments/book');
    }, [router]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const selectedDoctor = JSON.parse(
                sessionStorage.getItem('appointmentData')
            );
            if (!selectedDoctor) {
                alert('Please select a doctor first');
                router.push('/dashboard/patients/appointments/book');
            } else {
                const { _id } = selectedDoctor;
                setSelectedDoctor(_id);

                // Clear any previously selected date and time
                sessionStorage.removeItem('selectedDate');
                sessionStorage.removeItem('timing');
            }
        }
    }, []);

    async function fetchDoctorSchedules() {
        try {
            const response = await getAllDoctorSchedules(selectedDoctor);
            setDoctorSchedules(response.data);

            // Extract available days
            const days = response.data.map((schedule) => schedule.day);
            setAvailableDays(days);
        } catch (error) {
            console.error('Error fetching doctor schedules:', error);
        }
    }

    useEffect(() => {
        if (selectedDoctor) {
            fetchDoctorSchedules();
        }
    }, [selectedDoctor]);

    // Reset selected time when date changes
    useEffect(() => {
        setSelectedTime('');
        if (selectedDate) {
            sessionStorage.setItem(
                'selectedDate',
                selectedDate.format('YYYY-MM-DD')
            );
        }
    }, [selectedDate]);

    const isTimeAvailable = (time) => {
        if (!doctorSchedules.length || !selectedDate) return false;

        const dayName = selectedDate.format('dddd');
        const daySchedule = doctorSchedules.find(
            (schedule) => schedule.day === dayName
        );

        if (!daySchedule) return false;

        // Check if the time falls within any of the available slots
        return daySchedule.slots.some((slot) => {
            const startTime = convertTimeToMinutes(slot.startTime);
            const endTime = convertTimeToMinutes(slot.endTime);
            const currentTime = convertTimeToMinutes(time);

            return (
                currentTime >= startTime &&
                currentTime < endTime &&
                !slot.isBooked
            );
        });
    };

    const convertTimeToMinutes = (timeStr) => {
        const [time, modifier] = timeStr.split(/([ap]m)/i);
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours);
        minutes = parseInt(minutes || 0);

        if (modifier.toLowerCase() === 'pm' && hours < 12) {
            hours += 12;
        }
        if (modifier.toLowerCase() === 'am' && hours === 12) {
            hours = 0;
        }

        return hours * 60 + minutes;
    };

    const handleTimeSelect = (time) => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('timing', time);
            setSelectedTime(time);
        }
    };

    const isDayAvailable = (date) => {
        // Check if date is in the past
        if (date.isBefore(dayjs().startOf('day'))) {
            return false;
        }

        const dayName = date.format('dddd');
        return availableDays.includes(dayName);
    };

    return (
        <div className="w-full md:w-11/12 mb-14 md:mb-24">
            <HorizontalDatePicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                isDayAvailable={isDayAvailable}
            />

            {selectedDate ? (
                <div className="gap-4 p-3 sm:p-5 md:p-7 my-10 rounded-xl bg-white shadow-tab">
                    {TimingProviders.map((provider, index) => (
                        <div
                            key={index}
                            className={`${
                                index === 0 ? 'sm:pt-0 pb-2' : 'sm:py-2'
                            } flex flex-col `}
                        >
                            <div className="flex justify-between items-center gap-3">
                                <h3 className="font-semibold text-secondary text-lg sm:text-xl lg:text-2xl">
                                    {provider.shift}
                                </h3>
                                <p className="text-sm font-medium text-industrialAge">
                                    {provider.shiftTime}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-5 py-3">
                                {provider.data.map(({ time, count }, idx) => {
                                    const available = isTimeAvailable(time);

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() =>
                                                available &&
                                                handleTimeSelect(time)
                                            }
                                            disabled={!available}
                                            className={`border rounded-[5px] p-3 sm:p-4 flex items-center justify-between w-full transition-all
                                                ${
                                                    selectedTime === time
                                                        ? 'bg-bluetitmouse text-white border-bluetitmouse cursor-pointer'
                                                        : available
                                                        ? 'text-bluetitmouse border-bluetitmouse cursor-pointer'
                                                        : 'text-gray-400 border-gray-300 bg-gray-100 cursor-not-allowed'
                                                }`}
                                        >
                                            <span
                                                className={`text-sm sm:text-base font-semibold`}
                                            >
                                                {time}
                                            </span>
                                            {available && (
                                                <span className="text-xs bg-green-100 text-green-700 px-1 rounded">
                                                    Available
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                    <div>
                        <button
                            disabled={!selectedTime || !selectedDate}
                            className="rounded-xl w-full sm:w-fit text-sm sm:text-base bg-primary font-medium text-white py-5 px-5 sm:px-8 hover:bg-[#2b923b] duration-300 ease-in-out transition-colors h-full md:h-[60px] flex justify-center items-center mt-3 md:mt-10 disabled:opacity-60 lg:mt-20 disabled:hover:bg-primary disabled:cursor-not-allowed"
                            onClick={() => {
                                const newParams = new URLSearchParams(
                                    searchParams
                                );
                                newParams.set('tab', 'final'.toString());
                                router.push(`?${newParams.toString()}`, {
                                    scroll: false
                                });
                            }}
                        >
                            {selectedDate
                                ? selectedDate.format('dddd MMMM D, YYYY')
                                : ''}{' '}
                            {selectedTime ? `- ${selectedTime}` : ''}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center p-16 text-center my-10 rounded-xl bg-white shadow-tab">
                    <p className="text-lg text-gray-600">
                        Please select a date to view available time slots
                    </p>
                </div>
            )}
        </div>
    );
};

export default ChooseDateTime;
