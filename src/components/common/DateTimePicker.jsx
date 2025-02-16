import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import dayjs from 'dayjs';

const HorizontalDatePicker = () => {
    const [startDate, setStartDate] = useState(dayjs().startOf('day'));
    const [selectedDate, setSelectedDate] = useState(dayjs().startOf('day'));
    const [dates, setDates] = useState(generateDates(startDate));
    const dateRefs = useRef({});

    function generateDates(start) {
        return Array.from({ length: 7 }, (_, i) => start.add(i, 'day'));
    }

    // Load saved date from sessionStorage on mount
    useEffect(() => {
        const savedDate = sessionStorage.getItem("selectedDate");
        if (savedDate) {
            const parsedDate = dayjs(savedDate, "dddd, MMM D, YYYY");
            setSelectedDate(parsedDate);
            setStartDate(parsedDate);
            setDates(generateDates(parsedDate));
        }
    }, []);

    const saveDateToSession = (date) => {
        const formattedDate = date.format("dddd, MMM D, YYYY");
        sessionStorage.setItem("selectedDate", formattedDate);
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
                block: 'nearest',
            });
        }
    };

    return (
        <div className="flex items-center space-x-4 p-4 justify-center">
            {/* Left Arrow */}
            <button
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                onClick={handlePrevious}
            >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            {/* Date List */}
            <div className="flex space-x-4 gap-3 overflow-hidden">
                {dates.map((date) => {
                    const isSelected = date.isSame(selectedDate, 'day');

                    return (
                        <motion.button
                            key={date.format('YYYY-MM-DD')}
                            ref={(el) => (dateRefs.current[date.format('YYYY-MM-DD')] = el)}
                            onClick={() => handleDateChange(date)}
                            className={`flex flex-col items-center py-4 px-4 h-full w-16 rounded-lg border ${
                                isSelected
                                    ? 'bg-[#4864FF] text-white border-[#4864FF]'
                                    : 'bg-white border-gray-300'
                            } transition`}
                        >
                            <span className="text-sm font-medium">
                                {date.format('ddd')}
                            </span>
                            <span className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-[#4864FF]'}`}>
                                {date.format('DD')}
                            </span>
                        </motion.button>
                    );
                })}
            </div>

            {/* Right Arrow */}
            <button
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                onClick={handleNext}
            >
                <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
        </div>
    );
};

export default HorizontalDatePicker;
