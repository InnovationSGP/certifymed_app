'use client';

import { useState } from 'react';
import { ChevronRight, Smartphone, Building2 } from 'lucide-react';
import { Card } from '@/components/common/Card';
import AppointmentTypes from '@/components/common/AppointmentType';

export default function ChooseAppointment({tabNumber, setTabNumber}) {
    const [selected, setSelected] = useState('video');
    const handleToggle = (type) => {
        setSelected(selected === type ? null : type);
    };
    return selected !== null ? (
        <AppointmentTypes
            selectedIdType={selected}
            setSelectedIdType={setSelected}
            tabNumber={tabNumber}
            setTabNumber={setTabNumber}
        />
    ) : (
        <div className="w-11/12 p-0 md:p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                How do you want to be seen?
            </h1>
            <h2 className="text-gray-500 mb-6">Appointments</h2>

            <div className="space-y-4">
                <Card
                    className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleToggle('video')}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center mr-4">
                                <Smartphone className="h-6 w-6 text-blue-500" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-900">
                                    Video appointment
                                </h3>
                                <p className="text-sm text-gray-500">
                                    See a provider through the app
                                </p>
                            </div>
                        </div>
                        {selected === 'video' ? (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                        ) : (
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                        )}
                    </div>
                </Card>

                <Card
                    className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleToggle('in-person')}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center mr-4">
                                <Building2 className="h-6 w-6 text-blue-500" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-900">
                                    In person appointment
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Come to one of our clinics
                                </p>
                            </div>
                        </div>
                        {selected === 'in-person' ? (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                        ) : (
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
