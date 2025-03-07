import { useSelector } from 'react-redux';

export default function usePatientAnalytics() {
    const upcomingAppointments = useSelector(
        (state) => state.patientDashboard.upcomingAppointments
    );
    const completedAppointments = useSelector(
        (state) => state.patientDashboard.completedAppointments
    );
    const cancelledAppointments = useSelector(
        (state) => state.patientDashboard.cancelledAppointments
    );
    return {
        upcomingAppointments,
        completedAppointments,
        cancelledAppointments
    };
}
