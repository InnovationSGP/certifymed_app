import DashboardLayout from '@/components/common/DashboardLayout';
import AppointmentSystem from '@/components/dashboard/doctor/AppointmentSystem';
import { getAppointmentsDoctor } from '@/services/AppointmentService';
import { getAllDoctorTiming } from '@/services/ScheduleService';
import { cookies } from 'next/headers';
export const dynamic = 'force-dynamic';

const AppointmentsPage = async () => {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('jwt')?.value;
    const appointments = await getAppointmentsDoctor(token);
    const ScheduleTimings = await getAllDoctorTiming(token)
    return (
        <DashboardLayout className="overflow-auto xl:overflow-hidden">
            <AppointmentSystem data={appointments.data || []} scheduleTimings={ScheduleTimings.data || []} />
        </DashboardLayout>
    );
};

export default AppointmentsPage;
