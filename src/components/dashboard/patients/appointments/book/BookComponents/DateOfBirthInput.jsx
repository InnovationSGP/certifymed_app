import { Input } from '@/components/common/Input';
import { useEffect, useState } from 'react';

const DateOfBirthInput = ({ defaultDate, setDateOfBirth }) => {
    const parsedDate = new Date(defaultDate);
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');


    useEffect(() => {
        const defaultYear = parsedDate?.getUTCFullYear().toString();
        const defaultMonth = (parsedDate?.getUTCMonth() + 1)
            .toString()
            .padStart(2, '0');
        const defaultDay = parsedDate?.getUTCDate().toString().padStart(2, '0');

        setMonth(defaultMonth);
        setDay(defaultDay);
        setYear(defaultYear);
    }, [parsedDate]);

    const handleMonthChange = (e) => {
        const newMonth = e.target.value;
        setMonth(newMonth);
        updateDateOfBirth(month, day, year);
    };

    const handleDayChange = (e) => {
        const newDay = e.target.value;
        setDay(newDay);
        updateDateOfBirth(month, newDay, year);
    };

    const handleYearChange = (e) => {
        const newYear = e.target.value;
        setYear(newYear);
        updateDateOfBirth(month, day, newYear);
    };

    const updateDateOfBirth = (month, day, year) => {
        if (month && day && year) {
            const date = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
            setDateOfBirth(date.toISOString());
        } else {
            setDateOfBirth('');
        }
    };

    return (
        <div className="flex gap-6 justify-between w-full">
            <div className="w-full">
                <label>Month</label>
                <Input
                    type="text"
                    name="month"
                    value={month}
                    onChange={handleMonthChange}
                    disabled
                    placeholder="MM"
                    className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                />
            </div>
            <div className="w-full">
                <label>Day</label>
                <Input
                    type="text"
                    name="day"
                    placeholder="DD"
                    disabled
                    value={day}
                    onChange={handleDayChange}
                    className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                />
            </div>
            <div className="w-full">
                <label>YYYY</label>
                <Input
                    type="text"
                    name="year"
                    disabled
                    placeholder="YYYY"
                    value={year}
                    onChange={handleYearChange}
                    className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                />
            </div>
        </div>
    );
};

export default DateOfBirthInput;
