import { useState, useEffect } from 'react';
import HorizontalDatePicker from '@/components/common/DateTimePicker';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';

const ChooseDateTime = ({ tabNumber, setTabNumber }) => {
    const storedDate = sessionStorage.getItem('selectedDate');
    const storedTime = sessionStorage.getItem('timing');
    const searchParams = useSearchParams();
    const router = useRouter();

    const [selectedTime, setSelectedTime] = useState(
        storedTime || 'Select Time'
    );
    const [selectedDate, setSelectedDate] = useState(
        storedDate ? dayjs(storedDate) : dayjs().startOf('day')
    );

    useEffect(() => {
        sessionStorage.setItem(
            'selectedDate',
            selectedDate.format('YYYY-MM-DD')
        );
    }, [selectedDate]);

    const insuranceProviders = [
        {
            shift: 'Morning',
            data: [
                { time: '8:30 am', count: 4 },
                { time: '9:30 am', count: 2 },
                { time: '10:30 am', count: 1 },
                { time: '11:30 am', count: 5 },
                { time: '12:00 pm', count: 8 }
            ]
        },
        {
            shift: 'Afternoon',
            data: [
                { time: '12:30 pm', count: 2 },
                { time: '01:30 pm', count: 3 },
                { time: '02:30 pm', count: 5 },
                { time: '03:30 pm', count: 1 },
                { time: '04:30 pm', count: 6 }
            ]
        },
        {
            shift: 'Evening',
            data: [
                { time: '06:30 pm', count: 2 },
                { time: '07:30 pm', count: 4 },
                { time: '08:30 pm', count: 5 },
                { time: '09:30 pm', count: 9 },
                { time: '10:30 pm', count: 4 },
                { time: '11:30 pm', count: 1 }
            ]
        }
    ];

    const handleTimeSelect = (time) => {
        sessionStorage.setItem('timing', time);
        setSelectedTime(time);
    };

    return (
        <div className="w-11/12 mb-24">
            <HorizontalDatePicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />
            <div className="gap-4 p-7 my-10 rounded-xl bg-white shadow-lg">
                {insuranceProviders.map((provider, index) => (
                    <div key={index} className="flex flex-col py-2">
                        <p className="font-medium text-2xl">{provider.shift}</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 py-3">
                            {provider.data.map(({ time, count }, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleTimeSelect(time)}
                                    className={`border rounded-lg p-4 flex items-center justify-between w-full cursor-pointer transition-all
                                        ${
                                            selectedTime === time
                                                ? 'bg-[#4864FF] text-white border-[#4864FF]'
                                                : 'text-[#4864FF] border-[#4864FF]'
                                        }`}
                                >
                                    <span
                                        className={`font-semibold`}
                                    >
                                        {time}
                                    </span>
                                    <span className="p-1 px-3 shadow-md rounded-full border">
                                        {count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
                <div>
                    <button
                        className="bg-[#293991] hover:bg-[#1d2c7e] text-white px-10 rounded-[12px] h-[60px]"
                        onClick={() => {
                            const newParams = new URLSearchParams(searchParams);
                            newParams.set('tab', 'final'.toString());
                            router.push(`?${newParams.toString()}`, {
                                scroll: false
                            });
                        }}
                    >
                        {selectedDate.format('dddd MMMM D, YYYY')} -{' '}
                        {selectedTime}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChooseDateTime;
