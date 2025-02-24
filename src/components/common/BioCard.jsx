'use client';
import {
    BadgeCheck,
    Calendar,
    Cross,
    Heart,
    MessageCircle
} from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { profileData } from './Helper';
import { CareIcon, CrossIcon, ExprienceIcon, MassageStartIcon } from './Icons';

export default function BioCard() {
    const [isBioShow, setIsBioShow] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    return (
        <div className="w-full md:w-11/12 mx-auto mb-24 ">
            <div className="bg-white shadow-tab p-4 md:p-6 rounded-xl">
                <h2 className="text-lg sm:text-xl font-poppins font-semibold text-secondary mb-3">
                    Complete your booking
                </h2>
                <div>
                    <p className="text-sm text-secondary">Select Provider</p>
                    <div className="flex flex-col lg:flex-row w-full items-start lg:items-center space-y-4 border border-gainsboro p-4 sm:p-5 rounded-xl">
                        <div className="flex flex-col md:flex-row w-full items-center">
                            <div className="overflow-hidden rounded-full bg-blue-300">
                                <img
                                    src={profileData.avatar}
                                    className="h-24 w-24 object-cover text-blue-700"
                                />
                            </div>
                            <div className="flex flex-col items-start px-4 gap-2">
                                <p className="text-lg sm:text-xl font-poppins font-medium text-secondary">
                                    {profileData.userName}
                                </p>
                                <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-start md:items-center">
                                    <p className="text-base text-secondary flex items-center gap-1">
                                        <CareIcon />
                                        {profileData.desc}
                                    </p>
                                    <p className="text-base text-secondary flex items-center gap-1">
                                        <ExprienceIcon />
                                        {profileData.exp}
                                    </p>
                                    <p className="text-base text-secondary flex items-center gap-1">
                                        <MassageStartIcon />
                                        {profileData.rating}
                                        <span className="text-gray-500">
                                            ({profileData.totalRating})
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                setIsBioShow(true);
                            }}
                            className="rounded-[28px] bg-[#4864FF29] text-bluetitmouse whitespace-nowrap p-3 h-[44px] flex justify-center items-center w-full md:w-min px-6"
                        >
                            <span>Bio</span>
                        </button>
                    </div>

                    <div>
                        <div>
                            <p className="text-base text-secondary mt-4">
                                Appointment Type
                            </p>
                            <p className="text-lg sm:text-xl font-poppins font-semibold text-secondary mt-2 capitalize">
                                {profileData.appointmentType}
                                {profileData.appointmentName}
                            </p>
                            <p className="mt-4 text-base text-secondary">
                                {profileData.appointmentDesc}
                            </p>
                            <button
                                onClick={() => {
                                    const newParams = new URLSearchParams(
                                        searchParams
                                    );
                                    newParams.set(
                                        'tab',
                                        'appointment'.toString()
                                    );
                                    router.push(`?${newParams.toString()}`, {
                                        scroll: false
                                    });
                                }}
                                className="mt-4 text-bluetitmouse text-base font-medium hover:underline"
                            >
                                Change Appointment Type
                            </button>
                        </div>
                        <div className="border border-dimGray opacity-[0.5] my-5 mx-2"></div>
                        <div>
                            <p className="text-base text-secondary mt-4">
                                Date & Time
                            </p>
                            <p className="text-lg sm:text-xl font-poppins font-semibold text-secondary mt-2 capitalize">
                                {profileData.selectedDate}
                                {' - '}
                                {profileData.timings}
                            </p>
                            <button
                                onClick={() => {
                                    const newParams = new URLSearchParams(
                                        searchParams
                                    );
                                    newParams.set('tab', 'datetime'.toString());
                                    router.push(`?${newParams.toString()}`, {
                                        scroll: false
                                    });
                                }}
                                className="mt-4 text-bluetitmouse text-base font-medium hover:underline"
                            >
                                Change Date & Time
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Overlay with fade-in effect */}
            <div
                className={`fixed inset-0 bg-gray-600 transition-opacity duration-300 ${
                    isBioShow ? 'opacity-40 visible' : 'opacity-0 invisible'
                }`}
                onClick={() => setIsBioShow(false)}
            />
            <div
                className={`${
                    isBioShow ? 'translate-x-0' : 'translate-x-full'
                } fixed right-0 opacity-100    transition-transform duration-300 transform z-50 overflow-auto  md:max-w-[549px] w-full h-screen xl:h-[88%] top-0 xl:top-12 p-4 sm:p-6 bg-white custom-tabs`}
            >
                <div className="flex flex-col w-full justify-center">
                    <div className="flex flex-row items-start justify-between">
                        <div className="overflow-hidden w-24 rounded-full bg-blue-300">
                            <img
                                src={profileData.avatar}
                                className="h-24 w-24 object-cover text-blue-700"
                            />
                        </div>
                        <button onClick={() => setIsBioShow(false)}>
                            <CrossIcon />
                        </button>
                    </div>
                    <div className="flex flex-col items-start space-y-4 mt-4">
                        <p className="text-lg sm:text-xl font-poppins font-semibold text-secondary">
                            {profileData.userName}
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-start md:items-center">
                            <p className="text-base text-secondary flex items-center gap-1">
                                <CareIcon />
                                {profileData.desc}
                            </p>
                            <p className="text-base text-secondary flex items-center gap-1">
                                <ExprienceIcon />
                                {profileData.exp}
                            </p>
                            <p className="text-base text-secondary flex items-center gap-1">
                                <MassageStartIcon />
                                {profileData.rating}{' '}
                                <span className="text-gray-500">
                                    ({profileData.totalRating})
                                </span>
                            </p>
                        </div>
                    </div>
                    <p className="mt-4 text-base text-secondary">
                        {profileData.moreDesc}
                    </p>
                    <button
                        onClick={() => setIsBioShow(false)}
                        className="flex items-center justify-center rounded-xl transition-all duration-200 ease-in-out bg-[#4864FF29] hover:bg-[#4863ff1c] text-bluetitmouse whitespace-nowrap p-4 h-[52px] md:h-[60px] px-8 mt-8 text-center"
                    >
                        <p className="flex items-center justify-center gap-4">
                            <BadgeCheck />
                            Provider Selected
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
}
