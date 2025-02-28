import PatientsHistory from '@/components/common/AppointmentHistoryMobileList';
import DashboardLayout from '@/components/common/DashboardLayout';
import DashboardWelcome from '@/components/common/DashboardWelcome';
import AppointmentList from '@/components/dashboard/patients/appointments/AppointmentList';
import AppointmentsAnalytics from '@/components/dashboard/patients/appointments/AppointmentsAnalytics';
import { getAppointments } from '@/services/AppointmentService';
import { cookies } from 'next/headers';

export const metadata = {
    title: 'CertifyMed - Appointment List',
    description:
        'Discover the future of healthcare through CertifyMed: top-tier medical care at your fingertips. No more waiting—access qualified professionals instantly from home.'
};

const AppoinmentPage = async () => {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('jwt')?.value;
    const appointments = await getAppointments(token);
    return (
        <DashboardLayout className="overflow-auto">
            <div>
                <DashboardWelcome
                    heading="Appointments Overview"
                    buttontext="Book an Appointment"
                />
                <AppointmentsAnalytics data={appointments.data || []} />
                <div className="hidden md:block">
                    <AppointmentList
                        type="Patients"
                        dataSet={appointments.data || []}
                    />
                </div>
                <PatientsHistory />
            </div>
        </DashboardLayout>
    );
};

export default AppoinmentPage;
