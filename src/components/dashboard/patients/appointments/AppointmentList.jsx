'use client';
import React from 'react';
import RecentAppointmentsListItem from './RecentAppointmentsListItem';
import ListHeading from '@/components/common/ListHeading';

const AppointmentList = ({ type, dataSet = [], listType }) => {
    return (
        <>
            <div className="px-5 md:px-[35px] mt-[35px] mb-20 xl:mb-[30px]">
                <ListHeading heading="Appointment History" showLink={false} />
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
                            {dataSet.length > 0 ? (
                                dataSet.map((appointment, index) => (
                                    <RecentAppointmentsListItem
                                        type={type}
                                        appointment={appointment}
                                        key={index}
                                        listType={listType}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="text-center py-4 text-sm"
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
