import { deleteDoctorAppointment } from '@/redux/slices/doctorRecentAppointmentsSlice';
import { deleteAppointment } from '@/redux/slices/patientAppointments';
import { deletePatientTest } from '@/redux/slices/patientsTestsSlice';
import { EyeIcon } from 'lucide-react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import AppointmentModel from '../../doctor/appointmentModel/AppointmentModel';
import { useState } from 'react';
const RecentAppointmentsListItem = ({ appointment, type, listType }) => {
    const { doctor, userDetails } = appointment;
    const links = [
        { href: '/support', label: 'Edit' },
        { href: '/license', label: 'Delete' }
    ];
    const dispatch = useDispatch();

    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showModel, setShowModel] = useState(false);
    const handleCardClick = (apt) => {
        setSelectedAppointment(apt);
        setShowModel(true);
    };

    function closeModal() {
        setShowModel(false);
        setSelectedAppointment(null);
    }
    const handleMenuClick = (action) => {
        if (action === 'Delete' && type === 'Patients') {
            if (listType === 'tests') {
                dispatch(deletePatientTest(appointment.id));
            } else {
                dispatch(deleteAppointment(appointment.id));
            }
        } else {
            dispatch(deleteDoctorAppointment(appointment.id));
        }
    };
    function handleFullName() {
        if (type === 'Doctor' && doctor) {
            return `${userDetails?.firstName} ${userDetails?.lastName}`;
        } else if (type === 'Patients' && userDetails) {
            return `${doctor?.firstName} ${doctor?.lastName}`;
        }
    }
    return (
        <>
            <tr>
                <td className="table-heading !font-normal xl:!pr-0">
                    {appointment?._id?.slice(3, 10) || 'N/A'}
                </td>
                {type === 'Patients' ? (
                    <td className="pl-[22px] py-3 flex items-center space-x-2 text-sm text-mainblack">
                        <Image
                            width={24}
                            height={24}
                            src={doctor?.imageUrl || '/images/user-image.png'}
                            alt={doctor.name}
                            className="w-6 h-6 rounded-full object-cover"
                        />
                        <span>{handleFullName()}</span>
                    </td>
                ) : (
                    <td className="pl-[22px] py-3 flex items-center space-x-2 text-sm text-mainblack">
                        <Image
                            width={24}
                            height={24}
                            src={userDetails?.imageUrl || '/images/user-1.png'}
                            alt={appointment?.careCoordinator || 'User image'}
                            className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="capitalize">
                            {handleFullName() || 'N/A'}
                        </span>
                    </td>
                )}
                <td className="table-heading !font-normal xl:!pr-0">
                    {appointment?.visitDate}
                </td>
                <td className="table-heading !font-normal xl:!pr-0">
                    {'Video'}
                </td>
                <td className="table-heading !font-normal xl:!pr-0">
                    {appointment?.visitStatus}
                </td>
                <td className="table-heading !font-normal xl:!pr-0">
                    <button onClick={() => handleCardClick(appointment)}>
                        <EyeIcon size={20} />
                    </button>
                    {/* <MenuDropdown
                    links={links}
                    handleClick={handleMenuClick}
                    heading={'Select Action'}
                /> */}
                </td>
            </tr>

            {showModel && selectedAppointment && (
                <AppointmentModel
                    data={selectedAppointment}
                    closeModal={closeModal}
                />
            )}
        </>
    );
};

export default RecentAppointmentsListItem;
