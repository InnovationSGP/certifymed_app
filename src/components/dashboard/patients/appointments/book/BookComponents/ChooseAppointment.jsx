'use client';
import AppointmentTypes from '@/components/common/AppointmentType';
import { Card } from '@/components/common/Card';
import { Building2, ChevronDown, ChevronRight, Smartphone } from 'lucide-react';
import { useState } from 'react';

export default function ChooseAppointment({ tabNumber, setTabNumber }) {
    const [selected, setSelected] = useState(null);
    const handleToggle = (type) => {
        setSelected(type);
        sessionStorage.setItem('appointmentType', type);
    };
    return selected ? (
        <AppointmentTypes
            selectedIdType={selected}
            setSelectedIdType={setSelected}
            tabNumber={tabNumber}
            setTabNumber={setTabNumber}
        />
    ) : (
        <div className="w-full p-0 sm:w-11/12 md:p-6">
            <h1 className="mb-2 text-lg font-semibold sm:text-xl font-poppins text-secondary">
                How do you want to be seen?
            </h1>
            <h2 className="mb-6 text-gray-500">Appointments</h2>
            <div className="space-y-4">
                <Card
                    className="p-4 transition-colors cursor-pointer hover:bg-gray-50"
                    onClick={() => handleToggle('video')}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-lg bg-blue-50">
                                <Smartphone className="w-6 h-6 text-blue-500" />
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
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                        ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                    </div>
                </Card>

                <Card
                    className="p-4 transition-colors cursor-pointer hover:bg-gray-50"
                    onClick={() => handleToggle('in-person')}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-lg bg-blue-50">
                                <Building2 className="w-6 h-6 text-blue-500" />
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
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                        ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
