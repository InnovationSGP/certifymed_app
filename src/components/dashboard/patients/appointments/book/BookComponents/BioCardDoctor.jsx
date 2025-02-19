import { profileData } from '@/components/common/Helper';
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
        <div className="opacity-100 overflow-auto right-0 xl:w-6/12 xl:h-min rounded-l-xl mb-24 p-6 bg-white border">
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
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                        <p className="text-base flex items-center gap-1">
                            <Heart className="h-4 w-4 text-[#4864FF]" />
                            {profileData.desc}
                        </p>
                        <p className="text-base flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-[#4864FF]" />
                            {profileData.exp}
                        </p>
                        <p className="text-base flex items-center gap-1">
                            <MessageCircle className="h-4 w-4 text-[#4864FF]" />
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
                    className="flex items-center justify-center rounded-xl bg-[#4864FF29] text-[#4864FF] whitespace-nowrap p-4 px-8 mt-8 text-center"
                >
                    <p className="flex items-center justify-center gap-4">
                        BIO
                    </p>
                </button>
            </div>
            {isBioShow && (
                <div className="border absolute w-full h-screen top-0 left-0 bg-gray-600 opacity-35"></div>
            )}
            {isBioShow && (
                <div className="opacity-100 absolute top-12 mt-12 xl:top-24 overflow-auto right-0 xl:w-4/12 xl:h-max rounded-l-xl h-min p-6 bg-white border">
                    <div className="flex flex-col w-full justify-center">
                        <div className="flex flex-row items-start justify-between">
                            <div className="overflow-hidden w-24 rounded-full bg-blue-300">
                                <img
                                    src={profileData.avatar}
                                    className="h-24 w-24 object-cover text-blue-700"
                                />
                            </div>
                            <button onClick={() => setIsBioShow(false)}>
                                <Cross className="rotate-45" size={15} />
                            </button>
                        </div>
                        <div className="flex flex-col items-start space-y-4 mt-4">
                            <p className="font-medium text-xl">
                                {profileData.userName}
                            </p>
                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                <p className="text-base flex items-center gap-1">
                                    <Heart className="h-4 w-4 text-[#4864FF]" />
                                    {profileData.desc}
                                </p>
                                <p className="text-base flex items-center gap-1">
                                    <Calendar className="h-4 w-4 text-[#4864FF]" />
                                    {profileData.exp}
                                </p>
                                <p className="text-base flex items-center gap-1">
                                    <MessageCircle className="h-4 w-4 text-[#4864FF]" />
                                    {profileData.rating}{' '}
                                    <span className="text-gray-500">
                                        ({profileData.totalRating})
                                    </span>
                                </p>
                            </div>
                        </div>
                        <p className="mt-4">{profileData.moreDesc}</p>
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
    );
}
