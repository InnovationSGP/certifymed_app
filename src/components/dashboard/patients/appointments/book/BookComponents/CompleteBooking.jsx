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
        <div className="w-11/12 mx-auto space-y-12 mb-24">
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Complete your booking
                </h2>
                <div className="space-y-6">
                    <div className="flex flex-col lg:flex-row w-full items-start lg:items-end space-x-3 space-y-3 md:border md:p-4 rounded-xl">
                        <div className="flex flex-col md:flex-row w-full items-center">
                            <div className="overflow-hidden rounded-full bg-blue-300">
                                <img
                                    src={profileData.avatar}
                                    className="h-24 w-24 object-cover text-blue-700"
                                />
                            </div>
                            <div className="flex flex-col items-start px-4">
                                <p className="font-medium text-base md:text-xl">
                                    {profileData.userName}
                                </p>
                                <p className="text-base md:text-xl">
                                    {profileData?.selectedDate} -{' '}
                                    {profileData.timings}
                                </p>
                                <p className="font-medium text-base md:text-xl capitalize">
                                    {profileData.appointmentType}
                                    {' Appointment '}(
                                    {profileData.appointmentDuration} {'min'})
                                </p>
                                <button
                                    className="text-blue-500 underline whitespace-nowrap"
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
                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-12">
                            <div className="rounded-[28px] bg-[#4864FF29] text-[#4864FF] md:whitespace-nowrap text-xs md:text-lg p-4 px-8">
                                <button>
                                    Last Provider available at this time
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div>
                            <div className="flex flex-col my-6 mt-6 gap-4">
                                <div className="w-full">
                                    <label>Name</label>
                                    <Input
                                        placeholder="Enter your name"
                                        className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                    />
                                </div>
                                <button
                                    onClick={() => {
                                        setShowPreferred(!showPreferred);
                                    }}
                                    className="flex flex-row items-center gap-2 text-[#4864FF] text-xs md:text-lg"
                                >
                                    {showPreferred ? <Minus /> : <Plus />}
                                    Preferred Name
                                </button>
                                {showPreferred && (
                                    <div className="w-full">
                                        <label>Preferred Name</label>
                                        <Input
                                            placeholder="Enter your name"
                                            className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className="text-xl my-4">Date of Birth</p>
                            <div className="flex flex-col w-full justify-between gap-4">
                                <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-12">
                                    <div className="w-full flex justify-between gap-6">
                                        <div className="w-full">
                                            <label>Month</label>
                                            <Input
                                                placeholder="MM"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <label>Day</label>
                                            <Input
                                                placeholder="DD"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <label>YYYY</label>
                                            <Input
                                                placeholder="YYYY"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <p className="text-sm font-medium mb-1 pl-1">
                                            Sex assigned at birth
                                        </p>
                                        <Select
                                        // onValueChange={(value) =>
                                        //     setCity(value)
                                        // }
                                        >
                                            <SelectTrigger className="w-full bg-[#ffffff] h-[60px] rounded-xl">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#ffffff] z-20">
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
                                    className="flex flex-row items-center gap-2 text-[#4864FF] text-xs md:text-lg"
                                >
                                    {showGenderPronouns ? <Minus /> : <Plus />}
                                    Gender Identity / Prederred Pronouns
                                </button>
                                {showGenderPronouns && (
                                    <div className="w-full">
                                        <label>
                                            Gender Identity / Prederred Pronouns
                                        </label>
                                        <Input
                                            placeholder="Enter Gender Identity / Prederred Pronouns"
                                            className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className="text-2xl font-medium my-8">
                                01 - Address
                            </p>
                            <div className="flex flex-col w-full justify-between gap-4">
                                <div className="grid grid-cols-1 gap-8">
                                    <div className="w-full flex flex-col md:flex-row justify-between gap-6">
                                        <div className="w-full">
                                            <label>Address</label>
                                            <Input
                                                placeholder="Enter your address"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <label>Apartment, etc</label>
                                            <Input
                                                placeholder="Enter your apartment"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col md:flex-row justify-between gap-6">
                                        <div className="w-full">
                                            <label>City</label>
                                            <Input
                                                placeholder="Enter your city"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <label>Postal Code</label>
                                            <Input
                                                placeholder="Enter your postal code"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full flex flex-col md:flex-row justify-between gap-6">
                                        <div className="w-full">
                                            <label>State</label>
                                            <Input
                                                placeholder="Enter your state"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <label>Country / Region</label>
                                            <Input
                                                placeholder="Enter your country / region"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-2xl font-medium my-8">
                                02 - Contact Information
                            </p>
                            <div className="flex flex-col w-full justify-between gap-4">
                                <div className="grid grid-cols-1 gap-8">
                                    <div className="w-full flex flex-col md:flex-row justify-between gap-6">
                                        <div className="w-full">
                                            <label>Phone Number</label>
                                            <Input
                                                placeholder="1234567890"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <label className="text-nowrap">
                                                Emergency Contact Information
                                            </label>
                                            <Input
                                                placeholder="Enter emergency contact information"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col md:flex-row justify-between gap-6">
                                        <div className="w-full">
                                            <label>
                                                Emergency Contact Name
                                            </label>
                                            <Input
                                                placeholder="Enter your emergency contact name"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
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
                                                <SelectTrigger className="w-full bg-[#ffffff] h-[60px] rounded-xl">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#ffffff] z-20">
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

                                    <div className="w-full flex justify-between gap-6">
                                        <div className="w-full">
                                            <label>
                                                Emergency Contact Phone Number
                                            </label>
                                            <Input
                                                placeholder="Enter your emergency contact phone number"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full my-8">
                            <div className="flex items-center gap-4">
                                <div className="w-6 h-6 border-2 border-[#4864FF] rounded-md flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        className=" w-full h-full"
                                    />
                                </div>
                                <p className="text-lg">
                                    HIPAA / Privacy Policy
                                </p>
                            </div>
                            <p className="text-gray-700 ml-10 text-wrap">
                                I confirm that I have read and agree to the
                                [Privacy Policy] and [Terms of Service],
                                including all HIPAA (or applicable local health
                                privacy law) and confidentiality provisions. I
                                also understand and consent to receive medical
                                advice and treatment through this telehealth
                                platform.
                            </p>
                        </div>
                        <div className="w-full mb-4 flex items-center gap-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <div className="w-6 h-6 border-2 border-[#4864FF] rounded-md flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        className=" w-full h-full"
                                    />
                                </div>
                                <span className="text-lg">
                                    Consent for Treatment
                                </span>
                            </label>
                        </div>
                        <button
                            onClick={() => setShowBioCard(true)}
                            className="text-center bg-[#293991] h-[60px] w-full md:w-min md:px-40 md:whitespace-nowrap mt-4 rounded-[12px] text-white"
                        >
                            Confirm Patient Information
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
