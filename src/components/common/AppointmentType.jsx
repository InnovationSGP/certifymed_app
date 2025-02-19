import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './badge';
import { useSearchParams, useRouter } from 'next/navigation';
import { appointmentsDrop } from './Helper';

export default function AppointmentTypes({
    selectedIdType,
}) {
    const [selectedId, setSelectedId] = useState(selectedIdType);
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleToggle = (id) => {
        setSelectedId(selectedId === id ? null : id);
    };

    return (
        <div className="w-11/12 mx-auto h-screen p-0 md:p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                How do you want to be seen?
            </h1>

            <div className="flex items-center gap-2 text-sm mb-6">
                <button
                    className="text-[#4864FF] hover:underline"
                >
                    Appointment
                </button>
                <span className="text-gray-400">/</span>
                <span className="text-gray-600 capitalize">
                    {selectedIdType}
                </span>
            </div>

            <div className="space-y-4">
                {appointmentsDrop.map((appointment) => (
                    <Card
                        key={appointment.id}
                        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleToggle(appointment.id)}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-medium text-gray-900">
                                        {appointment.title}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            variant="secondary"
                                            className="bg-[#4864FF33] text-[#4864FF] hover:bg-purple-100"
                                        >
                                            Appointment
                                        </Badge>
                                        {selectedId === appointment.id ? (
                                            <ChevronDown className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <ChevronRight className="h-5 w-5 text-gray-400" />
                                        )}
                                    </div>
                                </div>
                                {selectedId === appointment.id && (
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-600 mb-4">
                                            {appointment.description}
                                        </p>
                                        <button
                                            className="bg-[#293991] hover:bg-[#1d2c7e] text-white px-10 rounded-[12px] py-4"
                                            onClick={() => {
                                                sessionStorage.setItem(
                                                    'appointmentData',
                                                    `
                                                    ${selectedIdType},
                                                    ${appointment.title},
                                                    ${appointment.description}
                                                    `
                                                );
                                                const newParams =
                                                    new URLSearchParams(
                                                        searchParams
                                                    );
                                                newParams.set(
                                                    'tab',
                                                    'payment'.toString()
                                                );
                                                router.push(
                                                    `?${newParams.toString()}`,
                                                    { scroll: false }
                                                );
                                            }}
                                        >
                                            View Availabilities
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
