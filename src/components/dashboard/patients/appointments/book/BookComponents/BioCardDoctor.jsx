'use client';
import { profileData } from '@/components/common/Helper';
import {
    CareIcon,
    CrossIcon,
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

    return (
        <div className="opacity-100 overflow-auto right-0 xl:w-6/12 xl:h-min rounded-l-xl mb-24 shadow-tab p-4 md:p-6 rounded-xl">
            <div className="flex flex-col w-full justify-center">
                <button
                    onClick={() => {
                        const newParams = new URLSearchParams(searchParams);
                        newParams.set('tab', 'final'.toString());
                        router.push(`?${newParams.toString()}`, {
                            scroll: false
                        });
                    }}
                >
                    <ArrowLeft size={15} />
                </button>
                <div className="flex flex-row justify-center gap-12">
                    <div className="overflow-hidden w-24 rounded-full bg-blue-300">
                        <img
                            src={profileData.avatar}
                            className="h-24 w-24 object-cover text-blue-700"
                        />
                    </div>
                </div>
                <div className="flex flex-col items-start space-y-4 mt-4">
                    <p className="font-medium text-xl">
                        {profileData.userName}
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center">
                        <p className="text-base flex items-center gap-1">
                            <CareIcon />
                            {profileData.desc}
                        </p>
                        <p className="text-base flex items-center gap-1">
                            <ExprienceIcon />
                            {profileData.exp}
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
                <p className="mt-4">{profileData.moreDesc}</p>
                <button
                    onClick={() => setIsBioShow(true)}
                    className="flex items-center justify-center rounded-xl bg-[#4864FF29] transition-all duration-200 ease-in-out hover:bg-[#4863ff1c] text-[#4864FF] whitespace-nowrap p-4 px-8 mt-8 text-center"
                >
                    <p className="flex items-center justify-center gap-4">
                        BIO
                    </p>
                </button>
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
                } fixed right-0 opacity-100    transition-transform duration-300 transform z-50 overflow-auto  xl:max-w-[549px] w-full h-screen xl:h-[88%] top-0 xl:top-12 p-4 sm:p-6 bg-white custom-tabs`}
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
                        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
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
