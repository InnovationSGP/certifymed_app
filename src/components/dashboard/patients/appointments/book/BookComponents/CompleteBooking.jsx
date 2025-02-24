'use client';
import { Minus, Plus } from 'lucide-react';
import { Input } from '@/components/common/Input';
import { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/common/select';
import BioCard from '@/components/common/BioCard';
import BookingConfirmation from '@/components/common/ConfirmCard';
import { useRouter, useSearchParams } from 'next/navigation';
import { profileData } from '@/components/common/Helper';
import PrimaryBtn from '@/components/common/PrimaryBtn';

export default function CompleteBooking({
    tabNumber,
    setTabNumber,
    setIsBookAppointment
}) {
    const [showPreferred, setShowPreferred] = useState(false);
    const [showGenderPronouns, setShowGenderPronouns] = useState(false);
    const [showBioCard, setShowBioCard] = useState(false);
    const [isShowConfirmCard, setIsShowConfirmCard] = useState(true);
    const searchParams = useSearchParams();
    const router = useRouter();

    if (showBioCard && isShowConfirmCard) {
        return (
            <BookingConfirmation
                isOpen={isShowConfirmCard}
                setIsShowConfirmCard={setIsShowConfirmCard}
                setIsBookAppointment={setIsBookAppointment}
            />
        );
    }

    return showBioCard && !isShowConfirmCard ? (
        <BioCard tabNumber={tabNumber} setTabNumber={setTabNumber} />
    ) : (
        <div className="w-full md:w-11/12 mx-auto space-y-12 mb-24">
            <div className="bg-white rounded-xl shadow-tab p-3 sm:p-4 md:p-6">
                <h2 className="text-lg sm:text-xl font-poppins font-semibold text-secondary mb-4">
                    Complete your booking
                </h2>
                <div className="space-y-6">
                    <div className="flex flex-col lg:flex-row w-full items-start lg:items-end sm:space-x-3 space-y-3 md:border border-gainsboro md:p-4 rounded-xl">
                        <div className="flex flex-col md:flex-row w-full items-center">
                            <div className="overflow-hidden rounded-full bg-blue-300 mb-3 sm:mb-0">
                                <img
                                    src={profileData.avatar}
                                    className="h-24 w-24 object-cover text-blue-700"
                                />
                            </div>
                            <div className="flex flex-col items-start px-4">
                                <p className="text-lg sm:text-xl font-poppins font-medium text-secondary text-center sm:text-start w-full">
                                    {profileData.userName}
                                </p>
                                <p className="text-base text-secondary py-1 text-center sm:text-start w-full">
                                    {profileData?.selectedDate} -{' '}
                                    {profileData.timings}
                                </p>
                                <p className="font-medium text-base md:text-lg text-secondary capitalize text-center sm:text-start w-full">
                                    {profileData.appointmentType}
                                    {' Appointment '}(
                                    {profileData.appointmentDuration} {'min'})
                                </p>
                                <button
                                    className="text-bluetitmouse underline hover:no-underline whitespace-nowrap w-full sm:w-fit"
                                    onClick={() => {
                                        const newParams = new URLSearchParams(
                                            searchParams
                                        );
                                        newParams.set(
                                            'tab',
                                            'doctor-profile'.toString()
                                        );
                                        router.push(
                                            `?${newParams.toString()}`,
                                            {
                                                scroll: false
                                            }
                                        );
                                    }}
                                >
                                    See Profile
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-12 w-full sm:w-fit">
                            <button className="w-full sm:w-fit rounded-[28px] bg-[#4864FF29] hover:bg-[#4863ff18] transition-all duration-200 ease-in-out text-bluetitmouse md:whitespace-nowrap text-xs md:text-base p-4 px-8">
                                Last Provider available at this time
                            </button>
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-col my-4 sm:my-6 mt-6 gap-3 sm:gap-4">
                            <div className="w-full">
                                <label className="text-base font-poppins text-dimGray font-medium">
                                    Name
                                </label>
                                <Input placeholder="Enter your name" />
                            </div>
                            <button
                                onClick={() => {
                                    setShowPreferred(!showPreferred);
                                }}
                                className="flex flex-row items-center gap-2 text-bluetitmouse text-sm md:text-base"
                            >
                                {showPreferred ? <Minus /> : <Plus />}
                                Preferred Name
                            </button>
                            {showPreferred && (
                                <div className="w-full">
                                    <label className="text-base font-poppins text-secondary">
                                        Preferred Name
                                    </label>
                                    <Input placeholder="Enter your name" />
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="text-lg font-poppins md:text-xl text-secondary my-3 sm:my-4">
                                Date of Birth
                            </p>
                            <div className="flex flex-col w-full justify-between gap-4">
                                <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-9">
                                    <div className="w-full flex justify-between gap-2 sm:gap-5">
                                        <div className="w-full">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                Month
                                            </label>
                                            <Input
                                                placeholder="MM"
                                                className="placeholder:!text-center text-center"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                Day
                                            </label>
                                            <Input
                                                placeholder="DD"
                                                className="placeholder:!text-center text-center"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                YYYY
                                            </label>
                                            <Input
                                                placeholder="YYYY"
                                                className="placeholder:!text-center text-center"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <p className="text-base font-medium font-poppins text-dimGray">
                                            Sex assigned at birth
                                        </p>
                                        <Select
                                        // onValueChange={(value) =>
                                        //     setCity(value)
                                        // }
                                        >
                                            <SelectTrigger className="w-full bg-superSilver cursor-pointer border !outline-none !border-transparent">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-superSilver z-20 cursor-pointer">
                                                <SelectItem value="male">
                                                    Male
                                                </SelectItem>
                                                <SelectItem value="female">
                                                    female
                                                </SelectItem>
                                                <SelectItem value="not-applicable">
                                                    Not Applicable
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setShowGenderPronouns(
                                            !showGenderPronouns
                                        );
                                    }}
                                    className="flex flex-row items-center gap-2 text-bluetitmouse text-sm md:text-base"
                                >
                                    {showGenderPronouns ? <Minus /> : <Plus />}
                                    Gender Identity / Prederred Pronouns
                                </button>
                                {showGenderPronouns && (
                                    <div className="w-full">
                                        <label className="text-base font-medium font-poppins text-dimGray">
                                            Gender Identity / Prederred Pronouns
                                        </label>
                                        <Input placeholder="Enter Gender Identity / Prederred Pronouns" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className="text-lg sm:text-xl font-poppins font-semibold text-secondary mt-6 mb-4">
                                01 - Address
                            </p>
                            <div className="flex flex-col w-full justify-between gap-4">
                                <div className="grid grid-cols-1 gap-4 md:gap-8">
                                    <div className="w-full flex flex-col md:flex-row justify-between gap-4 sm:gap-6">
                                        <div className="w-full">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                Address
                                            </label>
                                            <Input placeholder="Enter your address" />
                                        </div>
                                        <div className="w-full">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                Apartment, etc
                                            </label>
                                            <Input placeholder="Enter your apartment" />
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col md:flex-row justify-between gap-4 sm:gap-6">
                                        <div className="w-full">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                City
                                            </label>
                                            <Input placeholder="Enter your city" />
                                        </div>
                                        <div className="w-full">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                Postal Code
                                            </label>
                                            <Input placeholder="Enter your postal code" />
                                        </div>
                                    </div>

                                    <div className="w-full flex flex-col md:flex-row justify-between gap-4 sm:gap-6">
                                        <div className="w-full">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                State
                                            </label>
                                            <Input placeholder="Enter your state" />
                                        </div>
                                        <div className="w-full">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                Country / Region
                                            </label>
                                            <Input placeholder="Enter your country / region" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <p className="text-2xl font-medium mt-6 mb-4">
                                02 - Contact Information
                            </p>
                            <div className="flex flex-col w-full justify-between gap-4">
                                <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8">
                                    <div className="w-full flex flex-col md:flex-row justify-between gap-4 sm:gap-6">
                                        <div className="w-full">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                Phone Number
                                            </label>
                                            <Input placeholder="1234567890" />
                                        </div>
                                        <div className="w-full">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                Emergency Contact Information
                                            </label>
                                            <Input placeholder="Enter emergency contact information" />
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col md:flex-row justify-between gap-4 sm:gap-6">
                                        <div className="w-full">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                Emergency Contact Name
                                            </label>
                                            <Input placeholder="Enter your emergency contact name" />
                                        </div>

                                        <div className="w-full">
                                            <p className="text-sm font-medium mb-1 pl-1">
                                                Emergency Contact Relationship
                                            </p>
                                            <Select
                                            // onValueChange={(value) =>
                                            //     setCity(value)
                                            // }
                                            >
                                                <SelectTrigger className="w-full bg-superSilver cursor-pointer border !outline-none !border-transparent">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-superSilver z-20 cursor-pointer">
                                                    <SelectItem value="father">
                                                        Father
                                                    </SelectItem>
                                                    <SelectItem value="mother">
                                                        Mother
                                                    </SelectItem>
                                                    <SelectItem value="sister">
                                                        Sister
                                                    </SelectItem>
                                                    <SelectItem value="brother">
                                                        Brother
                                                    </SelectItem>
                                                    <SelectItem value="friend">
                                                        Friend
                                                    </SelectItem>
                                                    <SelectItem value="Girlfriend">
                                                        Girlfriend
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="w-full flex justify-betweengap-4 sm:gap-6">
                                        <div className="w-full">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                Emergency Contact Phone Number
                                            </label>
                                            <Input placeholder="Enter your emergency contact phone number" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <label className="w-full cursor-pointer">
                            <div className="flex items-center  gap-2 sm:gap-4">
                                <div className="flex items-center justify-center agreecheckbox">
                                    <input
                                        type="checkbox"
                                        className="w-full h-full rounded-[4px] border-bluetitmouse border-2 min-w-6 min-h-6"
                                    />
                                </div>
                                <p className="text-base font-poppins text-black">
                                    HIPAA / Privacy Policy
                                </p>
                            </div>
                            <p className="text-sm sm:ext-base font-poppins text-black opacity-[0.8] ml-[33px] sm:ml-10 pt-1">
                                I confirm that I have read and agree to the
                                [Privacy Policy] and [Terms of Service],
                                including all HIPAA (or applicable local health
                                privacy law) and confidentiality provisions. I
                                also understand and consent to receive medical
                                advice and treatment through this telehealth
                                platform.
                            </p>
                        </label>
                        <div className="w-full mt-3 flex items-center">
                            <label className="flex items-center gap-2 sm:gap-4 cursor-pointer">
                                <div className="agreecheckbox flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        className="w-full h-full rounded-[4px] border-bluetitmouse border-2 min-w-6 min-h-6"
                                    />
                                </div>
                                <p className="text-base font-poppins text-black">
                                    Consent for Treatment
                                </p>
                            </label>
                        </div>
                        <PrimaryBtn
                            onClick={() => setShowBioCard(true)}
                            className="h-[52px] md:h-[60px] w-full md:max-w-[389px] mt-6"
                        >
                            Confirm Patient Information
                        </PrimaryBtn>
                    </div>
                </div>
            </div>
        </div>
    );
}
