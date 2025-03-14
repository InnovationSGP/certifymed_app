'use client';
import React from 'react';

// Analytics Card Skeleton Loader
export const AnalyticsCardSkeleton = () => {
    return (
        <article className="flex gap-x-[17px] rounded-xl bg-white px-[22px] py-[33px] animate-pulse">
            <span className="grid place-content-center">
                <div className="w-12 h-12 rounded-full bg-gray-200"></div>
            </span>
            <div className="w-full">
                <div className="h-8 w-12 bg-gray-200 rounded"></div>
                <div className="h-5 w-36 bg-gray-200 rounded mt-2"></div>
            </div>
        </article>
    );
};

// Appointments Table Skeleton Loader
export const AppointmentsTableSkeleton = () => {
    return (
        <div className="w-full overflow-y-auto custom-scrollbar hidden md:block">
            <table className="min-w-full bg-white rounded-b-xl">
                <thead>
                    <tr>
                        <th className="table-heading">ID</th>
                        <th className="table-heading">Patient</th>
                        <th className="table-heading">Date</th>
                        <th className="table-heading">Mode</th>
                        <th className="table-heading">Status</th>
                        <th className="table-heading">View</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {Array(4)
                        .fill()
                        .map((_, index) => (
                            <tr key={index} className="animate-pulse">
                                <td className="px-6 py-4">
                                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="h-4 w-28 bg-gray-200 rounded"></div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="h-6 w-20 bg-gray-200 rounded"></div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="h-6 w-6 bg-gray-200 rounded-full mx-auto"></div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

// Mobile Appointments Card Skeleton
export const AppointmentsCardSkeleton = () => {
    return (
        <div className="md:hidden recent-appointments-slider">
            <div className="swiper-slide animate-pulse">
                <div className="p-4 bg-white rounded-xl shadow-sm mb-4">
                    <div className="flex justify-between mb-3">
                        <div className="h-5 w-16 bg-gray-200 rounded"></div>
                        <div className="h-5 w-20 bg-gray-200 rounded"></div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                            <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        <div className="flex justify-between">
                            <div className="h-6 w-20 bg-gray-200 rounded"></div>
                            <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Patients List Skeleton
export const PatientsListSkeleton = () => {
    return (
        <ul className="divide-y divide-lightgray">
            {Array(5)
                .fill()
                .map((_, index) => (
                    <li
                        key={index}
                        className="flex items-center py-[15px] pl-[21px] pr-[29px] animate-pulse"
                    >
                        <div className="w-[55px] h-[55px] rounded-full bg-gray-200 mr-[9px]"></div>
                        <div>
                            <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        </div>
                    </li>
                ))}
        </ul>
    );
};

// Full Dashboard Skeleton
const DashboardSkeleton = () => {
    return (
        <>
            {/* Dashboard Content Skeleton */}
            <div className="lg:grid lg:grid-cols-3 gap-[22px] px-5 md:px-[35px] mt-[35px] mb-[103px]">
                <div className="col-span-3 lg:col-span-2">
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <AppointmentsTableSkeleton />
                        <AppointmentsCardSkeleton />
                    </div>
                </div>
                <div className="mt-[47px] lg:mt-0 rounded-t-xl lg:rounded-none bg-white lg:bg-transparent">
                    <div className="px-4 lg:px-0">
                        <div className="flex justify-between items-center mb-4">
                            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>
                    <hr />
                    <div className="w-full bg-white lg:h-[531px] rounded-b-xl overflow-y-auto custom-scrollbar">
                        <PatientsListSkeleton />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardSkeleton;
