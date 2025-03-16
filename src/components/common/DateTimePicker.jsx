import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { HorizontalDatePickerArrow } from './Icons';

const HorizontalDatePicker = ({
    selectedDate,
    setSelectedDate,
    isDayAvailable
}) => {
    const [startDate, setStartDate] = useState(dayjs().startOf('day'));
    const [dates, setDates] = useState(generateDates(startDate));
    const dateRefs = useRef({});

    function generateDates(start) {
        return Array.from({ length: 7 }, (_, i) => start.add(i, 'day'));
    }

    const handleNext = () => {
        const newStartDate = startDate.add(1, 'day');
        setStartDate(newStartDate);
        setDates(generateDates(newStartDate));
    };

    const handlePrevious = () => {
        const newStartDate = startDate.subtract(1, 'day');
        // Don't allow scrolling to dates before today
        if (newStartDate.isBefore(dayjs().startOf('day'))) {
            return;
        }
        setStartDate(newStartDate);
        setDates(generateDates(newStartDate));
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);

        // Since we're now managing the selected date state in the parent component,
        // we don't need to save it to sessionStorage here

        if (dateRefs.current[date.format('YYYY-MM-DD')]) {
            dateRefs.current[date.format('YYYY-MM-DD')].scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
            });
        }
    };

    return (
        <div className="flex items-center md:space-x-4 md:p-4 justify-center">
            {/* Left Arrow */}
            <button
                className="p-1 group rotate-180"
                onClick={handlePrevious}
                disabled={startDate.isSame(dayjs().startOf('day'))}
            >
                <HorizontalDatePickerArrow
                    className={
                        startDate.isSame(dayjs().startOf('day'))
                            ? 'opacity-50'
                            : ''
                    }
                />
            </button>

            {/* Date List */}
            <div className="flex md:space-x-4 gap-3 overflow-auto hide-scrollbar">
                {dates.map((date) => {
                    const isSelected =
                        selectedDate && date.isSame(selectedDate, 'day');
                    const isAvailable = isDayAvailable
                        ? isDayAvailable(date)
                        : true;
                    const isPast = date.isBefore(dayjs().startOf('day'));

                    return (
                        <motion.button
                            key={date.format('YYYY-MM-DD')}
                            ref={(el) =>
                                (dateRefs.current[date.format('YYYY-MM-DD')] =
                                    el)
                            }
                            onClick={() =>
                                isAvailable && !isPast && handleDateChange(date)
                            }
                            disabled={!isAvailable || isPast}
                            className={`flex flex-col items-center py-4 sm:py-5 px-3 sm:px-4 h-full min-w-16 sm:min-w-20 rounded-[12px] border ${
                                isSelected
                                    ? 'bg-bluetitmouse text-white border-bluetitmouse'
                                    : isAvailable && !isPast
                                    ? 'bg-white border-gainsboro'
                                    : 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-60'
                            } transition`}
                        >
                            <span
                                className={`text-sm font-medium ${
                                    (!isAvailable || isPast) && !isSelected
                                        ? 'text-gray-400'
                                        : ''
                                }`}
                            >
                                {date.format('ddd')}
                            </span>
                            <span
                                className={`text-lg md:text-2xl font-bold ${
                                    isSelected
                                        ? 'text-white'
                                        : isAvailable && !isPast
                                        ? 'text-bluetitmouse'
                                        : 'text-gray-400'
                                }`}
                            >
                                {date.format('DD')}
                            </span>
                            {isAvailable && !isPast && !isSelected && (
                                <span className="text-xs bg-green-100 text-green-700 px-1 rounded mt-1">
                                    Available
                                </span>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* Right Arrow */}
            <button className="p-1 group" onClick={handleNext}>
                <HorizontalDatePickerArrow />
            </button>
        </div>
    );
};

export default HorizontalDatePicker;
