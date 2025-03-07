import DashboardLayout from '@/components/common/DashboardLayout';
import DoctorAnalytics from '@/components/dashboard/doctor/DoctorAnalytics';
import DoctorDashboard from '@/components/dashboard/doctor/DoctorDashboard';
import { getAppointmentsDoctor } from '@/services/AppointmentService';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
const NotesWelcome = dynamic(() => import('@/components/dashboard/patients/notes/NotesWelcome'), {
    ssr: false
})
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
