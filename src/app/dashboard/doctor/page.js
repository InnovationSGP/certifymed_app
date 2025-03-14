import DashboardLayout from '@/components/common/DashboardLayout';
import DoctorAnalytics from '@/components/dashboard/doctor/DoctorAnalytics';
import DoctorDashboard from '@/components/dashboard/doctor/DoctorDashboard';
import NotesWelcome from '@/components/dashboard/patients/notes/NotesWelcome';
import { getAppointmentsDoctor } from '@/services/AppointmentService';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

const DoctorDashboardPage = async () => {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('jwt')?.value;
    const appointments = await getAppointmentsDoctor(token);

    return (
        <DashboardLayout className="overflow-auto">
            <NotesWelcome
                data={appointments || []}
                description="Welcome back!"
            />
            <DoctorAnalytics />
            <DoctorDashboard />
        </DashboardLayout>
    );
};

export default DoctorDashboardPage;
