import DashboardLayout from '@/components/common/DashboardLayout';
import AppointmentSystem from '@/components/dashboard/doctor/AppointmentSystem';
import { getAppointments } from '@/services/AppointmentService';
import { cookies } from 'next/headers';
export const dynamic = 'force-dynamic';

const AppointmentsPage = async () => {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('jwt')?.value;
    const appointments = await getAppointments(token);
    return (
        <DashboardLayout className="overflow-auto xl:overflow-hidden">
            <AppointmentSystem appointments={appointments.data || []} />
        </DashboardLayout>
    );
};

export default AppointmentsPage;
