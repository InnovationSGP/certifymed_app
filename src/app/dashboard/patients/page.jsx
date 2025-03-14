import DashboardLayout from '@/components/common/DashboardLayout';
import { PatientDashboardSkeleton } from '@/components/common/SkeletonLoader';
import DashboardWelcome from '@/components/common/DashboardWelcome';
import RecentAppointments from '@/components/dashboard/patients/appointments/RecentAppointments';
import DashboardAnalytics from '@/components/dashboard/patients/DashboardAnalytics';
import NotesSection from '@/components/dashboard/patients/notes/NotesSection';
import { getAppointments } from '@/services/AppointmentService';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

// Fallback component to use while loading
const LoadingFallback = () => (
    <DashboardLayout className="overflow-auto">
        <PatientDashboardSkeleton />
    </DashboardLayout>
);

const PatientsDashboardPage = async () => {
    let appointments = { data: [] }; // Initialize with default empty structure

    try {
        const cookiesStore = await cookies();
        const token = cookiesStore.get('jwt')?.value;

        if (token) {
            const fetchedAppointments = await getAppointments(token);
            if (fetchedAppointments) {
                appointments = fetchedAppointments;
            }
        }
    } catch (error) {
        console.error('Error fetching appointments:', error);
        // Continue rendering with empty data
    }

    return (
        <Suspense fallback={<LoadingFallback />}>
            <DashboardLayout className="overflow-auto">
                <DashboardWelcome
                    data={appointments || { data: [] }}
                    description="Welcome back!"
                    emergencycall={false}
                    buttontext="Book a Doctor"
                />
                <DashboardAnalytics />
                <div className="lg:grid lg:grid-cols-3 gap-[47px] sm:gap-[22px] mt-14 sm:mt-[30px] px-5 md:px-[35px] mb-20 xl:mb-[25px]">
                    <RecentAppointments
                        type="Patients"
                        appointments={appointments?.data || []}
                    />
                    <NotesSection />
                </div>
            </DashboardLayout>
        </Suspense>
    );
};

export default PatientsDashboardPage;
