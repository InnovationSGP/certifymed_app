'use client';
import { Minus, Plus } from 'lucide-react';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/button';
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

export default function CompleteBooking({ tabNumber, setTabNumber, setIsBookAppointment }) {
    const [showPreferred, setShowPreferred] = useState(false);
    const [showGenderPronouns, setShowGenderPronouns] = useState(false);
    const [showBioCard, setShowBioCard] = useState(false);
    const [isShowConfirmCard, setIsShowConfirmCard] = useState(true);

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
        totalRating: 1758
    };

    if(showBioCard && isShowConfirmCard){
        return(<BookingConfirmation isOpen={isShowConfirmCard} setIsShowConfirmCard={setIsShowConfirmCard} setIsBookAppointment={setIsBookAppointment}/> )
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
                    <div className="flex flex-col lg:flex-row w-full items-start lg:items-end space-x-3 space-y-3 border p-4 rounded-xl">
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
                                <p className="text-xl">
                                    {profileData?.selectedDate} -{' '}
                                    {profileData.timings}
                                </p>
                                <p className="font-medium text-xl capitalize">
                                    {profileData.appointmentType}
                                    {' Appointment '}(
                                    {profileData.appointmentDuration} {'min'})
                                </p>
                            </div>
                        </div>
                        <div className="rounded-[28px] bg-[#4864FF29] text-[#4864FF] whitespace-nowrap p-4 px-8">
                            <button>
                                Last Provider available at this time
                            </button>
                        </div>
                    </div>

                    <div>
                        <div>
                            <p className="text-2xl font-medium mt-4">
                                01 - Patient Information
                            </p>
                            <p>
                                Use the legal name that appears on your photo ID
                                and your insurance card. Have an account?
                                <br></br>
                                <span className="text-[#4864FF] underline">
                                    Sign in now
                                </span>{' '}
                                to save time.
                            </p>
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
                                    className="flex flex-row items-center gap-2 text-[#4864FF] text-lg"
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
                                <div className="flex justify-between gap-12">
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
                                    className="flex flex-row items-center gap-2 text-[#4864FF] text-lg"
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
                                02 - Address
                            </p>
                            <div className="flex flex-col w-full justify-between gap-4">
                                <div className="grid grid-cols-1 gap-8">
                                    <div className="w-full flex justify-between gap-6">
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
                                    <div className="w-full flex justify-between gap-6">
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

                                    <div className="w-full flex justify-between gap-6">
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
                                03 - Contact Information
                            </p>
                            <div className="flex flex-col w-full justify-between gap-4">
                                <div className="grid grid-cols-1 gap-8">
                                    <div className="w-full flex justify-between gap-6">
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
                                    <div className="w-full flex justify-between gap-6">
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
                                <div className="border-2 h-6 w-6 rounded-[4px] border-[#4864FF]">
                                    <Input
                                        type="checkbox"
                                        className="h-5 w-5 border-none rounded-xl bg-transparent outline-none"
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
                        <div className="w-full my-4 mb-6">
                            <div className="flex items-center gap-4">
                                <div className="border-2 h-6 w-6 rounded-[4px] border-[#4864FF]">
                                    <Input
                                        type="checkbox"
                                        className="h-5 w-5 border-none rounded-xl bg-transparent outline-none"
                                    />
                                </div>
                                <p className="text-lg">Consent for Treatment</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => setShowBioCard(true)}
                            className="text-center bg-[#293991] h-[60px] px-40 mt-4 rounded-[12px] text-white"
                        >
                            Confirm Patient Information
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
