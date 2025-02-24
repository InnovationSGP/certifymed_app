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
                        <div className="flex justify-between items-center gap-3">
                            <h3 className="font-semibold text-secondary text-lg sm:text-xl lg:text-2xl">
                                {provider.shift}
                            </h3>
                            <p className="text-sm font-medium text-industrialAge">
                                {provider.shiftTime}
                            </p>
                        </div>
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
                    <button
                        className="rounded-xl w-full sm:w-fit text-[15px] sm:text-base bg-primary font-medium text-white py-3 px-5 sm:px-8 hover:bg-[#2b923b] duration-300 ease-in-out transition-colors h-full md:h-[60px] flex justify-center items-center mt-3 md:mt-10 lg:mt-14"
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
