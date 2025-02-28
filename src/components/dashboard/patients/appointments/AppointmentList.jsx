'use client';
import React from 'react';
import RecentAppointmentsListItem from './RecentAppointmentsListItem';
import ListHeading from '@/components/common/ListHeading';
import { useSelector } from 'react-redux';

const AppointmentList = ({ type, listType }) => {
    const recentAppointments = useSelector(
        (state) => state.patientDashboard.appointmentsHistory
    );
    return (
        <>
            <div className="px-5 md:px-[35px] mt-[35px] mb-20 xl:mb-[30px]">
                <ListHeading heading="Appointment History" />
                <hr />
                <div className="w-full overflow-y-auto custom-scrollbar ">
                    <table className="min-w-full bg-graywhite rounded-b-xl ">
                        <thead>
                            <tr>
                                <th className="table-heading !font-semibold">
                                    ID
                                </th>
                                <th className="table-heading !font-semibold">
                                    Doctor
                                </th>
                                <th className="table-heading !font-semibold">
                                    Date
                                </th>
                                <th className="table-heading !font-semibold">
                                    Mode
                                </th>
                                <th className="table-heading !font-semibold">
                                    Status
                                </th>
                                <th className="table-heading !font-semibold">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {recentAppointments?.length > 0 ? (
                                recentAppointments?.map(
                                    (appointment, index) => (
                                        <RecentAppointmentsListItem
                                            type={type}
                                            appointment={appointment}
                                            key={index}
                                            listType={listType}
                                        />
                                    )
                                )
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center text-sm p-4"
                                    >
                                        No data found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AppointmentList;
