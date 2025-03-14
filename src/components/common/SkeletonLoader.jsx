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

// Notes Card Skeleton
export const NotesCardSkeleton = () => {
    return (
        <article className="notes-card border border-superSilver animate-pulse">
            <div className="h-6 w-32 bg-gray-200 rounded mb-[11px]"></div>
            <div className="space-y-2 mb-[27px]">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
            </div>
            <div className="w-full flex items-center justify-between">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
            </div>
        </article>
    );
};

// Notes Section Skeleton
export const NotesSectionSkeleton = () => {
    return (
        <div className="bg-white rounded-xl mt-5 lg:mt-0">
            <div className="px-3 sm:px-0">
                <div className="flex justify-between items-center py-3 px-3">
                    <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>
            <hr className="border-superSilver"></hr>
            <div className="px-[19px] py-5 sm:pt-[15px] space-y-[15px] sm:h-[529px] sm:overflow-y-auto custom-scrollbar">
                <NotesCardSkeleton />
                <NotesCardSkeleton />
                <NotesCardSkeleton />
            </div>
        </div>
    );
};

// Welcome Header Skeleton
export const WelcomeHeaderSkeleton = () => {
    return (
        <div className="flex items-center flex-wrap justify-between mt-[29px] sm:mt-10 md:mt-16 gap-[29px] px-5 md:px-[35px]">
            <div className="animate-pulse">
                <div className="h-[51px] w-64 bg-gray-200 rounded mb-1.5 sm:mb-2.5"></div>
                <div className="h-5 w-48 bg-gray-200 rounded"></div>
            </div>
            <div className="sm:flex items-center gap-x-[15px] hidden animate-pulse">
                <div className="h-10 w-40 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
};

// Patient Dashboard Skeleton
export const PatientDashboardSkeleton = () => {
    return (
        <>
            <WelcomeHeaderSkeleton />
            <div className="grid lg:grid-cols-3 gap-3.5 sm:gap-[22px] px-5 md:px-[35px] mt-[26px]">
                <AnalyticsCardSkeleton />
                <AnalyticsCardSkeleton />
                <AnalyticsCardSkeleton />
            </div>
            <div className="lg:grid lg:grid-cols-3 gap-[47px] sm:gap-[22px] mt-14 sm:mt-[30px] px-5 md:px-[35px] mb-20 xl:mb-[25px]">
                <div className="col-span-3 lg:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <AppointmentsTableSkeleton />
                    <AppointmentsCardSkeleton />
                </div>
                <NotesSectionSkeleton />
            </div>
        </>
    );
};
