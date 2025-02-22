import { useState, useEffect } from 'react';
import HorizontalDatePicker from '@/components/common/DateTimePicker';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { TimingProviders } from '@/components/common/Helper';
import PrimaryBtn from '@/components/common/PrimaryBtn';

const ChooseDateTime = () => {
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

    const handleTimeSelect = (time) => {
        sessionStorage.setItem('timing', time);
        setSelectedTime(time);
    };

    return (
        <div className="w-full md:w-11/12 mb-14 md:mb-24">
            <HorizontalDatePicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />
            <div className="gap-4 p-3 sm:p-5 md:p-7 my-10 rounded-xl bg-white shadow-tab">
                {TimingProviders.map((provider, index) => (
                    <div key={index} className="flex flex-col sm:py-2">
                        <p className="font-semibold text-secondary text-lg sm:text-xl lg:text-2xl">
                            {provider.shift}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-5 py-3">
                            {provider.data.map(({ time, count }, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleTimeSelect(time)}
                                    className={`border rounded-[5px] p-3 sm:p-4 flex items-center justify-between w-full cursor-pointer transition-all
                                        ${
                                            selectedTime === time
                                                ? 'bg-bluetitmouse text-white border-bluetitmouse'
                                                : 'text-bluetitmouse border-bluetitmouse'
                                        }`}
                                >
                                    <span className={`font-semibold`}>
                                        {time}
                                    </span>
                                    <span className="sm:p-1 sm:px-3 justify-center items-center shadow-tab rounded-full border min-w-8 min-h-8 flex text-sm font-medium">
                                        {count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
                <div>
                    <PrimaryBtn
                        className="h-[52px] md:h-[60px] mt-3 md:mt-0"
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
                    </PrimaryBtn>
                </div>
            </div>
        </div>
    );
};

export default ChooseDateTime;
