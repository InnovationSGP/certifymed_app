'use client';

import {
    BadgeCheck,
    Calendar,
    Heart,
    Mail,
    MessageCircle,
    Phone,
    Ticket
} from 'lucide-react';
import { useState } from 'react';

export default function AppointmentModel({ setShowModal }) {
    const profileData = {
        avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBvcnRyYWl0JTIwbWFufGVufDB8fDB8fHww',
        userName: 'Bhupinder Singh FNK-BN',
        phoneNumber: '+62 837 4839 3882',
        email: 'jeanmaxniiolio@mail.com',
        appointmentDuration: 30,
        dob: '12/01/2000',
        gender: 'Male',
        desc: 'Acute Care',
        exp: '13 years of experience',
        rating: 4.96,
        totalRating: 1758,
        moreDesc:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores pariatur mollitia voluptas nesciunt? Non deleniti totam enim magnam pariatur officiis animi, quaerat, ea doloremque a placeat. Ratione, perferendis? Aut explicabo delectus quo officia molestias doloremque laboriosam, fugit consectetur rem voluptates velit ut facere minus non sit nemo. Blanditiis nesciunt modi pariatur, vero alias reiciendis numquam reprehenderit est commodi. Ipsa illo rerum eius aspernatur deleniti, veniam quas quisquam harum voluptatibus aliquid et ullam, dicta ad quaerat laudantium quam magnam corporis quae laborum nesciunt eaque, ducimus fuga? Quaerat ut blanditiis harum laborum animi tempora veritatis saepe quae qui, aut corporis tempore. Deleniti maxime, autem, vitae eligendi id eius suscipit optio atque officia dolores debitis aliquam eos. Impedit libero iure quas dolorem explicabo consectetur fugiat nulla voluptatibus qui reprehenderit alias maiores placeat velit at vitae atque doloribus, repellendus veniam eum iusto cumque officiis similique ipsam. Deserunt nostrum dicta illum veniam facere reiciendis adipisci accusantium modi. Itaque exercitationem, tempore animi architecto nostrum blanditiis ad eius excepturi officiis vero accusamus, possimus odit totam inventore.',
        reason: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores pariatur mollitia voluptas nesciunt? Non deleniti totam enim magnam pariatur officiis animi, quaerat, ea doloremque a placeat. Ratione, perferendis? Aut explicabo delectus quo officia molestias doloremque laboriosam, fugit consectetur rem voluptates velit ut facere minus non sit nemo. Blanditiis nesciunt modi pariatur, vero alias reiciendis numquam reprehenderit est commodi.'
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm z-50"
            onClick={() => setShowModal(false)}
        >
            <div
                className="w-8/12 mx-auto space-y-12 mb-24 bg-white rounded-lg shadow-lg border p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold">
                    Application Information
                </h2>
                <div>
                    <div className="flex flex-col lg:flex-row w-full items-start lg:items-center space-x-3 space-y-3 rounded-xl">
                        <div className="flex w-full items-center">
                            <div className="overflow-hidden rounded-full bg-blue-300">
                                <img
                                    src={profileData.avatar}
                                    className="h-24 w-24 object-cover text-blue-700"
                                />
                            </div>
                            <div className="flex flex-col items-start px-4 gap-3">
                                <p className="font-medium text-xl">
                                    {profileData.userName}
                                </p>
                                <div className="flex flex-row gap-6 items-center">
                                    <p className="text-base flex items-center gap-2">
                                        <div className="px-[5px] py-[5px] rounded-full bg-gray-600">
                                            <Phone className="h-4 w-4 text-white" />
                                        </div>
                                        {profileData.phoneNumber}
                                    </p>
                                    <p className="text-base flex items-center gap-2">
                                        <div className="px-[5px] py-[5px] rounded-full bg-gray-600">
                                            <Mail className="h-4 w-4 text-white" />
                                        </div>
                                        {profileData.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex whitespace-nowrap gap-8">
                            <div className="flex flex-col gap-3">
                                <p>Date of birth</p>
                                <p className="text-lg text-left font-[500]">
                                    {profileData.dob}
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <p>Gender</p>
                                <p className="text-lg text-left font-[500]">
                                    {profileData.gender}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5">
                        <div className="bg-gray-100/90 px-4 py-3 rounded-xl">
                            <p className="text-sm">Reason</p>
                            <p className="text-sm mt-3 capitalize">
                                {profileData.reason}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm mt-4">Booking Information</p>
                            <div className="flex justify-between my-4">
                                <div>
                                    <p>Appointment Type</p>
                                    <p>Video (30 Min)</p>
                                </div>
                                <div>
                                    <p>Appointment Date</p>
                                    <p>10/02/2025</p>
                                </div>
                                <div>
                                    <p>Appointment ID</p>
                                    <p>#0029324828</p>
                                </div>
                            </div>
                            <div className='flex gap-5'>
                                <button className="min-w-[60px] px-8 py-3 border border-gray-300 text-gray-600 rounded-xl">
                                    Cancel Appointment
                                </button>
                                <button className="px-16 py-3 border border-[#4864FF] text-[#4864FF] rounded-xl">
                                    re-schedule
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
