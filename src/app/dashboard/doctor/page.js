import DashboardLayout from '@/components/common/DashboardLayout';
import DoctorAnalytics from '@/components/dashboard/doctor/DoctorAnalytics';
import DoctorDashboard from '@/components/dashboard/doctor/DoctorDashboard';
import NotesWelcome from '@/components/dashboard/patients/notes/NotesWelcome';
import { getAppointmentsDoctor } from '@/services/AppointmentService';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { PatientDashboardSkeleton } from '@/components/common/SkeletonLoader';

export const dynamic = 'force-dynamic';

// Fallback component to use while loading
const LoadingFallback = () => (
    <DashboardLayout className="overflow-auto">
        <PatientDashboardSkeleton />
    </DashboardLayout>
);

const DoctorDashboardPage = async () => {
    let appointments = { data: [] }; // Initialize with default empty structure

    try {
        const cookiesStore = await cookies();
        const token = cookiesStore.get('jwt')?.value;

        if (token) {
            const fetchedAppointments = await getAppointmentsDoctor(token);
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
                <NotesWelcome
                    data={appointments || { data: [] }}
                    description="Welcome back!"
                />
                <DoctorAnalytics />
                <DoctorDashboard />
            </DashboardLayout>
        </Suspense>
    );
};

export default DoctorDashboardPage;
