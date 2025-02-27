'use client';
import { profileData } from '@/components/common/Helper';
import {
    ExprienceIcon,
    MassageStartIcon
} from '@/components/common/Icons';
import {
    ArrowLeft,
    BadgeCheck,
    Calendar,
    Cross,
    Heart,
    MessageCircle
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function BioCardDoctor() {
    const [isBioShow, setIsBioShow] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const data = sessionStorage.getItem('appointmentData');
    const selectedDoctor = JSON.parse(data);

    return (
        <div className="opacity-100 overflow-auto right-0 xl:w-6/12 xl:h-min rounded-l-xl mb-24 shadow-tab p-4 md:p-6 rounded-xl">
            <div className="flex flex-col w-full justify-center">
                <div className="right-0 p-6 mb-24 overflow-auto bg-white border opacity-100 xl:w-6/12 xl:h-min rounded-l-xl">
                    <div className="flex flex-col justify-center w-full">
                        <button
                            onClick={() => {
                                const newParams = new URLSearchParams(
                                    searchParams
                                );
                                newParams.set('tab', 'final'.toString());
                                router.push(`?${newParams.toString()}`, {
                                    scroll: false
                                });
                            }}
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <div className="flex flex-row justify-center gap-12">
                            <div className="w-24 overflow-hidden bg-blue-300 rounded-full">
                                <img
                                    src={profileData.avatar}
                                    className="object-cover w-24 h-24 text-blue-700"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-start mt-4 space-y-4">
                            <p className="text-xl font-medium">
                                {selectedDoctor.firstName} -{' '}
                                {selectedDoctor.lastName}
                            </p>
                            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                                <p className="flex items-center gap-1 text-base">
                                    <Heart className="h-4 w-4 text-[#4864FF]" />
                                    {selectedDoctor.specialization}
                                </p>
                                <p className="flex items-center gap-1 text-base">
                                    <Calendar className="h-4 w-4 text-[#4864FF]" />
                                </p>
                                <p className="text-base flex items-center gap-1">
                                    <ExprienceIcon />
                                    {profileData.exp}
                                </p>
                                <p className="flex items-center gap-1 text-base">
                                    <MessageCircle className="h-4 w-4 text-[#4864FF]" />
                                </p>

                                <p className="text-base flex items-center gap-1">
                                    <MassageStartIcon />
                                    {profileData.rating}{' '}
                                    <span className="text-gray-500">
                                        ({profileData.totalRating})
                                    </span>
                                </p>
                            </div>
                        </div>
                        <p className="mt-4">{selectedDoctor.email}</p>
                        <button
                            onClick={() => setIsBioShow(true)}
                            className="flex items-center justify-center rounded-xl bg-[#4864FF29] transition-all duration-200 ease-in-out hover:bg-[#4863ff1c] text-bluetitmouse whitespace-nowrap p-4 px-8 mt-8 text-center"
                        >
                            <p className="flex items-center justify-center gap-4">
                                BIO
                            </p>
                        </button>
                    </div>
                    {isBioShow && (
                        <div className="absolute top-0 left-0 w-full h-screen bg-gray-600 border opacity-35"></div>
                    )}
                    {isBioShow && (
                        <div className="absolute right-0 p-6 mt-12 overflow-auto bg-white border opacity-100 top-12 xl:top-24 xl:w-4/12 xl:h-max rounded-l-xl h-min">
                            <div className="flex flex-col justify-center w-full">
                                <div className="flex flex-row items-start justify-between">
                                    <div className="w-24 overflow-hidden bg-blue-300 rounded-full">
                                        <img
                                            src={profileData.avatar}
                                            className="object-cover w-24 h-24 text-blue-700"
                                        />
                                    </div>
                                    <button onClick={() => setIsBioShow(false)}>
                                        <Cross
                                            className="rotate-45"
                                            size={15}
                                        />
                                    </button>
                                </div>
                                <div className="flex flex-col items-start mt-4 space-y-4">
                                    <p className="text-xl font-medium">
                                        {selectedDoctor.firstName} -
                                        {selectedDoctor.lastName}
                                    </p>
                                    <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                                        <p className="flex items-center gap-1 text-base">
                                            <Heart className="h-4 w-4 text-[#4864FF]" />
                                            {selectedDoctor.specialization}
                                        </p>
                                        <p className="flex items-center gap-1 text-base">
                                            <Calendar className="h-4 w-4 text-[#4864FF]" />
                                            {profileData.exp}
                                        </p>
                                        <p className="flex items-center gap-1 text-base">
                                            <MessageCircle className="h-4 w-4 text-[#4864FF]" />
                                            {profileData.rating}{' '}
                                            <span className="text-gray-500">
                                                ({profileData.totalRating})
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-4">{selectedDoctor.email}</p>
                                <button
                                    onClick={() => setIsBioShow(false)}
                                    className="flex items-center justify-center rounded-xl bg-[#4864FF29] text-[#4864FF] whitespace-nowrap p-4 px-8 mt-8 text-center"
                                >
                                    <button className="flex items-center justify-center gap-4">
                                        <BadgeCheck />
                                        Provider Selected
                                    </button>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
     );
}
