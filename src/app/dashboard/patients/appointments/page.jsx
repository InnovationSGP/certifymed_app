import PatientsHistory from '@/components/common/AppointmentHistoryMobileList';
import DashboardLayout from '@/components/common/DashboardLayout';
import DashboardWelcome from '@/components/common/DashboardWelcome';
import AppointmentList from '@/components/dashboard/patients/appointments/AppointmentList';
import AppointmentsAnalytics from '@/components/dashboard/patients/appointments/AppointmentsAnalytics';
import { getAppointments } from '@/services/AppointmentService';
import { cookies } from 'next/headers';

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
                <AppointmentsAnalytics data={appointments || []} />
                {/* <button
                    onClick={() =>
                        handleTransition(
                            '/dashboard/patients/appointments/book'
                        )
                    }
                    className="flex mx-auto"
                >
                    <Link
                        href={'/dashboard/patients/appointments/book'}
                        className="bg-primary primary-btn mx-auto mt-[39px] sm:hidden"
                    >
                        Book an Appointment
                    </Link>
                </button> */}
                <div className="hidden md:block">
                    <AppointmentList type="Patients" />
                </div>
                <PatientsHistory />
            </div>
        </DashboardLayout>
    );
};

export default AppoinmentPage;
