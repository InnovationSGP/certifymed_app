import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import dayjs from 'dayjs';
import { HorizontalDatePickerArrow } from './Icons';

const HorizontalDatePicker = ({ selectedDate, setSelectedDate }) => {
    const [startDate, setStartDate] = useState(dayjs().startOf('day'));
    const [dates, setDates] = useState(generateDates(startDate));
    const dateRefs = useRef({});

    function generateDates(start) {
        return Array.from({ length: 7 }, (_, i) => start.add(i, 'day'));
    }

    // Load saved date from sessionStorage on mount
    useEffect(() => {
        const savedDate = sessionStorage.getItem('selectedDate');
        if (savedDate) {
            const parsedDate = dayjs(savedDate, 'dddd, MMM D, YYYY');
            setSelectedDate(parsedDate);
            setStartDate(parsedDate);
            setDates(generateDates(parsedDate));
        }
    }, []);

    const saveDateToSession = (date) => {
        const formattedDate = date.format('dddd, MMM D, YYYY');
        sessionStorage.setItem('selectedDate', formattedDate);
    };

    const handleNext = () => {
        const newStartDate = startDate.add(1, 'day');
        setStartDate(newStartDate);
        setDates(generateDates(newStartDate));
    };

    const handlePrevious = () => {
        const newStartDate = startDate.subtract(1, 'day');
        setStartDate(newStartDate);
        setDates(generateDates(newStartDate));
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        saveDateToSession(date);

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
            <button className="p-1 group rotate-180" onClick={handlePrevious}>
                <HorizontalDatePickerArrow />
            </button>

            {/* Date List */}
            <div className="flex md:space-x-4 gap-3 overflow-auto hide-scrollbar">
                {dates.map((date) => {
                    const isSelected = date.isSame(selectedDate, 'day');

                    return (
                        <motion.button
                            key={date.format('YYYY-MM-DD')}
                            ref={(el) =>
                                (dateRefs.current[date.format('YYYY-MM-DD')] =
                                    el)
                            }
                            onClick={() => handleDateChange(date)}
                            className={`flex flex-col items-center py-4 sm:py-5 px-3 sm:px-4 h-full min-w-16 sm:min-w-20 rounded-[12px] border ${
                                isSelected
                                    ? 'bg-bluetitmouse text-white border-bluetitmouse'
                                    : 'bg-white border-gainsboro'
                            } transition`}
                        >
                            <span className="text-sm font-medium">
                                {date.format('ddd')}
                            </span>
                            <span
                                className={`text-lg md:text-2xl font-bold ${
                                    isSelected
                                        ? 'text-white'
                                        : 'text-bluetitmouse'
                                }`}
                            >
                                {date.format('DD')}
                            </span>
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
