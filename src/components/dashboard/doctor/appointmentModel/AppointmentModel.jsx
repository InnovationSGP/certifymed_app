'use client';

import {
    BadgeCheck,
    Calendar,
    Heart,
    Mail,
    MessageCircle,
    Phone,
    Ticket,
    X
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
            className="fixed inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm z-50 h-screen overflow-auto hide-scrollbar"
            onClick={() => setShowModal(false)}
        >
            <div
                className="max-w-[98%] xl:max-w-[1129px] mx-auto h-[95vh] sm:h-fit overflow-auto hide-scrollbar space-y-5 sm:space-y-12 bg-white rounded-xl shadow-[0px_0px_38.1px_0px_rgba(0,0,0,0.12)] p-3 md:p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center gap-2">
                    <h2 className="text-xl font-semibold">
                        Application Information
                    </h2>
                    <button
                        onClick={() => setShowModal(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div>
                    <div className="flex flex-col lg:flex-row w-full items-start lg:items-center sm:space-x-3  sm:space-y-3 rounded-xl">
                        <div className="flex flex-col gap-3 lg:flex-row w-full items-center">
                            <div className="overflow-hidden rounded-full bg-blue-300">
                                <img
                                    src={profileData.avatar}
                                    className="h-24 w-24 object-cover text-blue-700"
                                />
                            </div>
                            <div className="flex flex-col items-start md:px-4 gap-3">
                                <p className="font-medium text-xl">
                                    {profileData.userName}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 sm:items-center">
                                    <a
                                        href="tel:+62 837 4839 4882"
                                        className="text-base text-steel flex items-center gap-2"
                                    >
                                        <img
                                            className="max-w-[24px] w-full opacity-60"
                                            src="/images/svg/email-icon.svg"
                                            alt="email icon"
                                        />
                                        {profileData.phoneNumber}
                                    </a>
                                    <a
                                        href="mailto:jeamaxniioio28@mail.com"
                                        className="text-base text-steel flex items-center gap-2"
                                    >
                                        <img
                                            className="max-w-[24px] w-full opacity-60"
                                            src="/images/svg/phone-icon.svg"
                                            alt="phone icon"
                                        />

                                        {profileData.email}
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center md:justify-start w-full md:w-fit whitespace-nowrap gap-8 mt-4 sm:mt-0">
                            <div className="flex flex-col gap-2 sm:gap-3">
                                <p className="text-base text-secondary">
                                    Date of birth
                                </p>
                                <p className="text-base sm:text-lg text-left font-medium text-secondary">
                                    {profileData.dob}
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 sm:gap-3">
                                <p className="text-base text-secondary">
                                    Gender
                                </p>
                                <p className="text-base sm:text-lg text-left font-medium text-secondary">
                                    {profileData.gender}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5">
                        <div className="bg-gray-100/90 px-4 py-3 rounded-xl">
                            <p className="text-sm sm:text-base text-secondary">
                                Reason
                            </p>
                            <p className="text-base sm:text-lg text-secondary mt-3 capitalize">
                                {profileData.reason}
                            </p>
                        </div>
                        <div>
                            <p className="text-base text-secondary mt-4">
                                Booking Information
                            </p>
                            <div className="flex flex-wrap gap-3 justify-between my-4">
                                <div>
                                    <p className="text-base text-secondary">
                                        Appointment Type
                                    </p>
                                    <p className="text-base md:text-lg text-secondary font-medium sm:pt-2">
                                        Video (30 Min)
                                    </p>
                                </div>
                                <div>
                                    <p className="text-base text-secondary">
                                        Appointment Date
                                    </p>
                                    <p className="text-base md:text-lg text-secondary font-medium sm:pt-2">
                                        10/02/2025
                                    </p>
                                </div>
                                <div>
                                    <p className="text-base text-secondary">
                                        Appointment ID
                                    </p>
                                    <p className="text-base md:text-lg text-secondary font-medium sm:pt-2">
                                        #0029324828
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-3 md:gap-5">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="sm:max-w-[295px] w-full px-8 py-3 border border-dimGray text-dimGray hover:bg-dimGray hover:text-white transition-all duration-200 ease-in-out rounded-xl text-base font-medium"
                                >
                                    Cancel Appointment
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-16 py-3 sm:max-w-[295px] w-ful border border-bluetitmouse text-bluetitmouse hover:bg-bluetitmouse hover:text-white rounded-xl transition-all duration-200 ease-in-out"
                                >
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
