import DurationSelect from '@/components/common/DurationSelect';
import { HiddenIcon } from '@/components/common/Icons';
import { getTimeOptions } from '@/utils/dateHelpers';
import { Clock, Plus, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const ScheduleModal = ({ selectedDate, onClose, onSave }) => {
    const [scheduleTitle, setScheduleTitle] = useState('');
    const [isClosing, setIsClosing] = useState(false);
    const [isEntering, setIsEntering] = useState(true);
    const sidebarRef = useRef(null);
    const [scheduleDuration, setScheduleDuration] = useState('30 minutes');
    const [availability, setAvailability] = useState({
        Sun: { isAvailable: false, slots: [] },
        Mon: { isAvailable: false, slots: [] },
        Tue: {
            isAvailable: true,
            slots: [{ id: 1, start: '9:00am', end: '9:00pm' }]
        },
        Wed: {
            isAvailable: true,
            slots: [{ id: 1, start: '9:00am', end: '9:00pm' }]
        },
        Thu: {
            isAvailable: true,
            slots: [{ id: 1, start: '9:00am', end: '9:00pm' }]
        },
        Fri: {
            isAvailable: true,
            slots: [{ id: 1, start: '9:00am', end: '9:00pm' }]
        },
        Sat: {
            isAvailable: true,
            slots: [{ id: 1, start: '9:00am', end: '9:00pm' }]
        }
    });

    useEffect(() => {
        setIsEntering(false);
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 500); // Match with the animation duration
    };
    const addTimeSlot = (day) => {
        setAvailability((prev) => {
            if (!prev[day].isAvailable) {
                return {
                    ...prev,
                    [day]: {
                        isAvailable: true,
                        slots: [
                            { id: Date.now(), start: '9:00am', end: '9:00pm' }
                        ]
                    }
                };
            }
            return {
                ...prev,
                [day]: {
                    ...prev[day],
                    slots: [
                        ...prev[day].slots,
                        { id: Date.now(), start: '9:00am', end: '9:00pm' }
                    ]
                }
            };
        });
    };

    const removeTimeSlot = (day, slotId) => {
        setAvailability((prev) => {
            const updatedSlots = prev[day].slots.filter(
                (slot) => slot.id !== slotId
            );
            return {
                ...prev,
                [day]: {
                    isAvailable: updatedSlots.length > 0,
                    slots: updatedSlots
                }
            };
        });
    };

    const updateTimeSlot = (day, slotId, field, value) => {
        setAvailability((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                slots: prev[day].slots.map((slot) =>
                    slot.id === slotId ? { ...slot, [field]: value } : slot
                )
            }
        }));
    };

    const handleSave = () => {
        onSave({
            title: scheduleTitle || 'Medical Consultation',
            startTime: '11:00',
            endTime: scheduleDuration === '30 minutes' ? '11:30' : '12:00',
            date: selectedDate.toISOString().split('T')[0],
            participants: 2
        });
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                handleClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed overflow-y-auto hide-scrollbar z-30 inset-0 bg-black/5 flex items-center justify-center">
            <div
                ref={sidebarRef}
                className={`absolute right-0 top-0  w-full sm:w-96 bg-white shadow-[-16px_0px_34px_0px_rgba(176,179,189,0.05)] transform transition-transform duration-500 ease-in-out ${
                    isClosing
                        ? 'translate-x-full'
                        : isEntering
                        ? 'translate-x-full'
                        : 'translate-x-0'
                }`}
            >
                {/* Modal Header */}
                <button
                    onClick={handleClose}
                    className="p-1 hover:bg-slate-200 rounded-full mb-[19.1px] ml-5 lg:ml-6 mt-6"
                >
                    <X size={20} className="" />
                </button>
                <hr />
                <div className="p-5 lg:p-[35px]">
                    {/* Title Input */}
                    <h2 className="text-base font-semibold mb-[15px]">
                        Appointment Schedule
                    </h2>

                    <input
                        type="text"
                        placeholder="Add title"
                        value={scheduleTitle}
                        onChange={(e) => setScheduleTitle(e.target.value)}
                        className="w-full p-4 bg-whiteSmoke h-[50px] outline-none rounded-[10px] placeholder:text-sm placeholder:text-pantone placeholder:font-medium mb-6"
                    />

                    {/* Duration Section */}
                    <div>
                        <div className="flex gap-2.5 mb-2">
                            <Clock
                                size={20}
                                className="text-pantone mt-[0.6px] w-4"
                            />
                            <span className="text-sm text-secondary font-medium ">
                                Appointment Duration
                            </span>
                        </div>
                        <p className="text-xs ml-6 text-doverGrey mt-1.5">
                            How long should each appointment last?
                        </p>
                        <div className="relative mt-3 ml-6">
                            <DurationSelect
                                value={scheduleDuration}
                                onChange={setScheduleDuration}
                                options={[
                                    {
                                        value: '30 minutes',
                                        label: '30 minutes'
                                    },
                                    { value: '1 hour', label: '1 hour' }
                                ]}
                                className="w-full"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2.5 mt-8 mb-3">
                        <Clock
                            size={20}
                            className="text-pantone mt-[0.6px] w-4"
                        />
                        <span className="text-sm font-medium ">
                            General Availability
                        </span>
                    </div>
                    <p className="text-xs ml-6 text-doverGrey mt-1.5">
                        Set when you&apos;re regularly available for
                        appointments
                    </p>
                    <div className="mt-3 ml-6">
                        <DurationSelect
                            value="Repeat weekly"
                            onChange={(newValue) =>
                                console.log('Selected:', newValue)
                            }
                            options={[
                                { value: 'daily', label: 'Repeat daily' },
                                { value: 'weekly', label: 'Repeat weekly' },
                                { value: 'monthly', label: 'Repeat monthly' }
                            ]}
                        />
                    </div>
                    {/* Schedule Grid */}
                    <div className="space-y-4 mb-6 mt-5 ml-6">
                        {Object.entries(availability).map(
                            ([day, { isAvailable, slots }]) => (
                                <div key={day} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="w-16 text-pantone text-[13px] font-medium">
                                            {day}
                                        </span>
                                        {!isAvailable ? (
                                            <div className="flex flex-1 items-center justify-between pl-4">
                                                <span className="text-pantone text-xs font-medium">
                                                    Unavailable
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        addTimeSlot(day)
                                                    }
                                                    className="hover:scale-110 transition-all duration-200 ease-out"
                                                >
                                                    <Plus
                                                        size={16}
                                                        className="text-pantone border-2 rounded-full border-pantone"
                                                    />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex-1 space-y-2">
                                                {slots.map((slot, index) => (
                                                    <div
                                                        key={slot.id}
                                                        className="w-full flex items-center justify-between pl-4 "
                                                    >
                                                        <div className="flex items-center gap-2 px-3 py-1 bg-whiteSmoke rounded-[7px] mr-2">
                                                            <select
                                                                value={
                                                                    slot.start
                                                                }
                                                                onChange={(e) =>
                                                                    updateTimeSlot(
                                                                        day,
                                                                        slot.id,
                                                                        'start',
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="select-custom relative focus:outline-none text-xs !bg-transparent text-pantone"
                                                            >
                                                                {getTimeOptions().map(
                                                                    (time) => (
                                                                        <option
                                                                            key={
                                                                                time
                                                                            }
                                                                            value={
                                                                                time
                                                                            }
                                                                        >
                                                                            {
                                                                                time
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                            <span className="text-pantone">
                                                                -
                                                            </span>
                                                            <select
                                                                value={slot.end}
                                                                onChange={(e) =>
                                                                    updateTimeSlot(
                                                                        day,
                                                                        slot.id,
                                                                        'end',
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="select-custom relative focus:outline-none text-xs !bg-transparent text-pantone"
                                                            >
                                                                {getTimeOptions().map(
                                                                    (time) => (
                                                                        <option
                                                                            key={
                                                                                time
                                                                            }
                                                                            value={
                                                                                time
                                                                            }
                                                                            className="text-gray-700"
                                                                        >
                                                                            {
                                                                                time
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() =>
                                                                    removeTimeSlot(
                                                                        day,
                                                                        slot.id
                                                                    )
                                                                }
                                                                className=""
                                                            >
                                                                <HiddenIcon />
                                                            </button>
                                                            {index ===
                                                                slots.length -
                                                                    1 && (
                                                                <button
                                                                    onClick={() =>
                                                                        addTimeSlot(
                                                                            day
                                                                        )
                                                                    }
                                                                    className="hover:scale-110 transition-all duration-200 ease-out"
                                                                >
                                                                    <Plus
                                                                        size={
                                                                            16
                                                                        }
                                                                        className="text-pantone border-2 rounded-full border-pantone"
                                                                    />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        className="w-full bg-primary primary-btn !rounded-full text-sm my-12 xl:mt-56"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScheduleModal;
