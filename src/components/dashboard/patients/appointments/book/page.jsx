'use client';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Stepper from '@/components/common/Stepper';
import ChooseProvider from '@/components/dashboard/patients/appointments/book/BookComponents/ChooseProvider';
import ChooseAppointment from '@/components/dashboard/patients/appointments/book/BookComponents/ChooseAppointment';
import ChoosePay from '@/components/dashboard/patients/appointments/book/BookComponents/ChoosePay';
import ChooseDateTime from '@/components/dashboard/patients/appointments/book/BookComponents/ChooseDateTime';
import CompleteBooking from '@/components/dashboard/patients/appointments/book/BookComponents/CompleteBooking';
import BioCardDoctor from './BookComponents/BioCardDoctor';

const FindProvider = ({ setIsBookAppointment }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

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

    console.log(tab, currentTab);

    // Update URL when step is clicked
    const handleStepClick = (step) => {
        // if (!validTabs.includes(step) || step === currentTab) return; // Prevent invalid clicks

        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('tab', validTabs[step - 1]);
        router.replace(`?${newParams.toString()}`);
    };

    return (
        <section className="w-full overflow-hidden">
            <div className="mt-6 justify-center items-start flex flex-col overflow-hidden ">
                <Stepper
                    currentStep={tabIndex + 1}
                    onStepClick={handleStepClick}
                />
                <div className="w-full p-4 h-full mt-4 xl:mt-12 flex items-center justify-center">
                    {currentTab === 'provider' && (
                        <ChooseProvider
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
