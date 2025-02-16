'use client';

import {
    BadgeCheck,
    Calendar,
    Heart,
    MessageCircle,
    Ticket
} from 'lucide-react';
import { useState } from 'react';

export default function BioCard({ tabNumber, setTabNumber }) {
    const [isBioShow, setIsBioShow] = useState(false);

    const profileData = {
        avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBvcnRyYWl0JTIwbWFufGVufDB8fDB8fHww',
        userName: 'Bhupinder Singh FNK-BN',
        timings: sessionStorage.getItem('timing') || 'No Timings Available',
        appointmentType: sessionStorage.getItem('appointmentData')
            ? sessionStorage.getItem('appointmentData').split(',')[0]
            : 'N/A',
        appointmentName: sessionStorage.getItem('appointmentData')
            ? sessionStorage.getItem('appointmentData').split(',')[1]
            : 'N/A',
        appointmentDesc: sessionStorage.getItem('appointmentData')
            ? sessionStorage.getItem('appointmentData').split(',')[2]
            : 'N/A',
        selectedDate: sessionStorage.getItem('selectedDate'),
        appointmentDuration: 30,
        desc: 'Acute Care',
        exp: '13 years of experience',
        rating: 4.96,
        totalRating: 1758,
        moreDesc:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores pariatur mollitia voluptas nesciunt? Non deleniti totam enim magnam pariatur officiis animi, quaerat, ea doloremque a placeat. Ratione, perferendis? Aut explicabo delectus quo officia molestias doloremque laboriosam, fugit consectetur rem voluptates velit ut facere minus non sit nemo. Blanditiis nesciunt modi pariatur, vero alias reiciendis numquam reprehenderit est commodi. Ipsa illo rerum eius aspernatur deleniti, veniam quas quisquam harum voluptatibus aliquid et ullam, dicta ad quaerat laudantium quam magnam corporis quae laborum nesciunt eaque, ducimus fuga? Quaerat ut blanditiis harum laborum animi tempora veritatis saepe quae qui, aut corporis tempore. Deleniti maxime, autem, vitae eligendi id eius suscipit optio atque officia dolores debitis aliquam eos. Impedit libero iure quas dolorem explicabo consectetur fugiat nulla voluptatibus qui reprehenderit alias maiores placeat velit at vitae atque doloribus, repellendus veniam eum iusto cumque officiis similique ipsam. Deserunt nostrum dicta illum veniam facere reiciendis adipisci accusantium modi. Itaque exercitationem, tempore animi architecto nostrum blanditiis ad eius excepturi officiis vero accusamus, possimus odit totam inventore.'
    };

    return (
        <div className="w-11/12 mx-auto space-y-12 mb-24">
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Complete your booking
                </h2>
                <div>
                    <p className="text-sm">Select Provider</p>
                    <div className="flex flex-col lg:flex-row w-full items-start lg:items-center space-x-3 space-y-3 border p-4 rounded-xl">
                        <div className="flex w-full items-center">
                            <div className="overflow-hidden rounded-full bg-blue-300">
                                <img
                                    src={profileData.avatar}
                                    className="h-24 w-24 object-cover text-blue-700"
                                />
                            </div>
                            <div className="flex flex-col items-start px-4">
                                <p className="font-medium text-xl">
                                    {profileData.userName}
                                </p>
                                <div className="flex flex-row gap-6 items-center">
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
                        </div>
                        <button
                            onClick={() => {
                                setIsBioShow(true);
                            }}
                            className="rounded-[28px] bg-[#4864FF29] text-[#4864FF] whitespace-nowrap p-4 px-8"
                        >
                            <button>Bio</button>
                        </button>
                    </div>

                    <div>
                        <div>
                            <p className="text-xl mt-4">Appointment Type</p>
                            <p className="text-xl font-semibold mt-2 capitalize">
                                {profileData.appointmentType}{' '}
                                {profileData.appointmentName}
                            </p>
                            <p className="mt-4">
                                {profileData.appointmentDesc}
                            </p>
                            <button
                                onClick={() => {
                                    setTabNumber(2);
                                }}
                                className="mt-4 text-[#4864FF] underline"
                            >
                                Change Appointment Type
                            </button>
                        </div>
                        <div className="border my-8 mx-2"></div>
                        <div>
                            <p className="text-xl mt-4">Date & Time</p>
                            <p className="text-xl font-semibold mt-2 capitalize">
                                {profileData.selectedDate}
                                {' - '}
                                {profileData.timings}
                            </p>
                            <button
                                onClick={() => {
                                    setTabNumber(4);
                                }}
                                className="mt-4 text-[#4864FF] underline"
                            >
                                Change Date & Time
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isBioShow && (
                <div className="border absolute w-full h-screen top-7 left-0 bg-gray-600 opacity-35"></div>
            )}
            {isBioShow && (
                <div className="opacity-100 absolute top-7 xl:top-24 overflow-auto right-0 xl:w-6/12 xl:h-min rounded-l-xl h-screen p-6 bg-white border">
                    <div className="flex flex-col w-full justify-center">
                        <div className="overflow-hidden w-24 rounded-full bg-blue-300">
                            <img
                                src={profileData.avatar}
                                className="h-24 w-24 object-cover text-blue-700"
                            />
                        </div>
                        <div className="flex flex-col items-start space-y-4 mt-4">
                            <p className="font-medium text-xl">
                                {profileData.userName}
                            </p>
                            <div className="flex flex-row gap-6 items-center">
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
