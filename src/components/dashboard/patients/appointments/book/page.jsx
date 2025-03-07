'use client';
import Stepper from '@/components/common/Stepper';
import ChooseAppointment from '@/components/dashboard/patients/appointments/book/BookComponents/ChooseAppointment';
import ChooseDateTime from '@/components/dashboard/patients/appointments/book/BookComponents/ChooseDateTime';
import ChoosePay from '@/components/dashboard/patients/appointments/book/BookComponents/ChoosePay';
import ChooseProvider from '@/components/dashboard/patients/appointments/book/BookComponents/ChooseProvider';
import CompleteBooking from '@/components/dashboard/patients/appointments/book/BookComponents/CompleteBooking';
import { useRouter, useSearchParams } from 'next/navigation';
import BioCardDoctor from './BookComponents/BioCardDoctor';

const FindProvider = () => {
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
    // Update URL when step is clicked
    const handleStepClick = (step) => {
        // if (!validTabs.includes(step) || step === currentTab) return; // Prevent invalid clicks
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('tab', validTabs[step - 1]);
        router.replace(`?${newParams.toString()}`);
    };
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
                        />
                    )}
                    {currentTab === 'doctor-profile' && <BioCardDoctor />}
                </div>
            </div>
        </section>
    );
};

export default FindProvider;
