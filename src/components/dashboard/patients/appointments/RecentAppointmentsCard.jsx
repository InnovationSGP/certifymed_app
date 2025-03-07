import React from 'react';
import MenuDropdown from '@/components/common/MenuDropdown';
import Image from 'next/image';

const RecentAppointmentsCard = ({ appointment, type = 'Patients' }) => {
    const { doctor, userDetails } = appointment;
    const links = [
        { href: '/settings', label: 'Settings' },
        { href: '/support', label: 'Support' },
        { href: '/license', label: 'License' }
    ];

    function handleFullName() {
        if (type === 'Patients') {
            return `${doctor?.firstName} ${doctor?.lastName}`;
        } else {
            return `${userDetails?.firstName} ${userDetails?.lastName}`;
        }
    }
    return (
        <>
            <ul className="bg-white  rounded-lg divide-y divide">
                <li className="flex items-center justify-between text-sm  text-mainblack py-3.5 px-3.5">
                    {appointment?.id}
                    <MenuDropdown links={links} heading={'Select Action'} />
                </li>
                <li className="flex items-center justify-between text-sm  text-mainblack py-3.5 px-3.5">
                    {type === 'Patients' ? 'Doctor' : 'Patient'}
                    <span className="flex gap-x-1.5 capitalize">
                        {type === 'Patients' ? (
                            <Image
                                width={24}
                                height={24}
                                src={
                                    doctor?.imageUrl || '/images/user-image.png'
                                }
                                alt={doctor?.firstName}
                                className="w-6 h-6 rounded-full object-cover"
                            />
                        ) : (
                            <Image
                                width={24}
                                height={24}
                                src={
                                    userDetails?.imageUrl ||
                                    '/images/user-1.png'
                                }
                                alt={userDetails?.firstName}
                                className="w-6 h-6 rounded-full object-cover"
                            />
                        )}
                        {handleFullName() || 'N/a'}
                    </span>
                </li>
                <li className="flex items-center justify-between text-sm  text-mainblack py-3.5 px-3.5">
                    Date
                    <span>
                        {' '}
                        {new Date(
                            appointment?.visitDate +
                                ' ' +
                                appointment?.startTime
                        ).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        })}
                    </span>
                </li>
                <li className="flex items-center justify-between text-sm  text-mainblack py-3.5 px-3.5">
                    Mode
                    <span>{'Video'}</span>
                </li>
                <li className="flex items-center justify-between text-sm  text-mainblack py-3.5 px-3.5">
                    Status
                    <span>{appointment?.visitStatus}</span>
                </li>
            </ul>
        </>
    );
};

export default RecentAppointmentsCard;
