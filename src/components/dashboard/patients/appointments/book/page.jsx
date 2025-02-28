'use client';
import Stepper from '@/components/common/Stepper';
import ChooseAppointment from '@/components/dashboard/patients/appointments/book/BookComponents/ChooseAppointment';
import ChooseDateTime from '@/components/dashboard/patients/appointments/book/BookComponents/ChooseDateTime';
import ChoosePay from '@/components/dashboard/patients/appointments/book/BookComponents/ChoosePay';
import ChooseProvider from '@/components/dashboard/patients/appointments/book/BookComponents/ChooseProvider';
import CompleteBooking from '@/components/dashboard/patients/appointments/book/BookComponents/CompleteBooking';
import { setSearchDoctors } from '@/redux/slices/AppointmentSlice';
import { searchDoctor } from '@/services/AppointmentService';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import BioCardDoctor from './BookComponents/BioCardDoctor';

const FindProvider = ({ setIsBookAppointment }) => {
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [city, setCity] = useState();
    const [doctors, setDoctors] = useState(false);

    // Define valid tabs
    const validTabs = [
        'provider',
        'appointment',
        'payment',
        'datetime',
        'final',
        'doctor-profile'
    ];

    // Get tab from query params, default to "provider"
    const tab = searchParams.get('tab') || 'provider';

    // Ensure valid tab
    const tabIndex = validTabs.indexOf(tab);
    const currentTab = tabIndex !== -1 ? validTabs[tabIndex] : 'provider';
    // Update URL when step is clicked
    const handleStepClick = (step) => {
        // if (!validTabs.includes(step) || step === currentTab) return; // Prevent invalid clicks
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('tab', validTabs[step - 1]);
        router.replace(`?${newParams.toString()}`);
    };

    // Search for doctors
    useEffect(() => {
        (async () => {
            if (city) {
                const data = await searchDoctor(city);
                if (data.count !== 0) {
                    console.log(data);
                    toast.success('Doctors found for this city');
                    setDoctors(true);
                    dispatch(setSearchDoctors(data));
                } else {
                    setDoctors(false);
                    toast.error('No doctors found for this city');
                }
            }
        })();
    }, [city]);
    return (
        <section className="w-full overflow-hidden">
            <div className="flex flex-col items-start justify-center mt-6">
                <Stepper
                    currentStep={tabIndex + 1}
                    onStepClick={handleStepClick}
                />
                <div className="flex items-center justify-center w-full h-full p-4 mt-4 xl:mt-12">
                    {currentTab === 'provider' && (
                        <ChooseProvider
                            city={city}
                            isDoctor={doctors}
                            setCity={setCity}
                            tabNumber={currentTab}
                            setTabNumber={handleStepClick}
                        />
                    )}
                    {currentTab === 'appointment' && (
                        <ChooseAppointment
                            tabNumber={currentTab}
                            setTabNumber={handleStepClick}
                        />
                    )}
                    {currentTab === 'payment' && (
                        <ChoosePay
                            tabNumber={currentTab}
                            setTabNumber={handleStepClick}
                        />
                    )}
                    {currentTab === 'datetime' && (
                        <ChooseDateTime
                            tabNumber={currentTab}
                            setTabNumber={handleStepClick}
                        />
                    )}
                    {currentTab === 'final' && (
                        <CompleteBooking
                            tabNumber={currentTab}
                            setTabNumber={handleStepClick}
                            setIsBookAppointment={setIsBookAppointment}
                        />
                    )}
                    {currentTab === 'doctor-profile' && <BioCardDoctor />}
                </div>
            </div>
        </section>
    );
};

export default FindProvider;
