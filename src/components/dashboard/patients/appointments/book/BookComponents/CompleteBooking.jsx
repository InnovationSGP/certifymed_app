'use client';
import BioCard from '@/components/common/BioCard';
import BookingConfirmation from '@/components/common/ConfirmCard';
import { profileData } from '@/components/common/Helper';
import { Input } from '@/components/common/Input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/common/select';
import { getSessionStorageItem } from '@/lib/sessionStorage';
import { createAppointment } from '@/services/AppointmentService';
import { calculateEndTime } from '@/utils/dateHelpers';
import { Minus, Plus } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import DateOfBirthInput from './DateOfBirthInput';
import { useProfileData } from '@/hooks/useProfileData';

export default function CompleteBooking({
    tabNumber,
    setTabNumber,
    setIsBookAppointment
}) {
    const userData = useSelector((state) => state.user);
    const [showPreferred, setShowPreferred] = useState(false);
    const [loading, setloading] = useState(false);
    const [showGenderPronouns, setShowGenderPronouns] = useState(false);
    const [showBioCard, setShowBioCard] = useState(false);
    const [isShowConfirmCard, setIsShowConfirmCard] = useState(true);
    const searchParams = useSearchParams();
    const router = useRouter();
    const selectedDate = getSessionStorageItem('selectedDate');
    const timing = getSessionStorageItem('timing');
    const appointmentType = getSessionStorageItem('appointmentType');
    const data = getSessionStorageItem('appointmentData');
    const pocketPayDetails = getSessionStorageItem('paymentData');
    const paymentData = JSON.parse(pocketPayDetails);
    const selectedDoctor = JSON.parse(data);
    const { saveProfile } = useProfileData();

    const initialFormState = {
        firstName: '',
        lastName: '',
        email: '',
        city: '',
        gender: '',
        dateOfBirth: '',
        countryCode: '+91',
        countryName: 'India',
        address: '',
        zipcode: '',
        city: '',
        state: '',
        countryName: '',
        phoneNumber: '',
        emergencyContactName: '',
        emergencyContactPhoneNumber: '',
        emergencyContactRelationship: ''
    };

    useEffect(() => {
        if (userData) {
            resetForm(userData);
            setDateOfBirth(userData.dateOfBirth);
        }
    }, [userData]);

    const [formData, setFormData] = useState(initialFormState);
    const [dateOfBirth, setDateOfBirth] = useState('');

    const updateFormField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };
    const resetForm = (data = null) => {
        if (data) {
            // Make sure to preserve all fields when resetting with new data
            setFormData({
                ...initialFormState,
                ...data,
                countryName: data.countryName || initialFormState.countryName
            });
        } else {
            setFormData(initialFormState);
        }
    };

    if (showBioCard && isShowConfirmCard) {
        return (
            <BookingConfirmation
                isOpen={isShowConfirmCard}
                setIsShowConfirmCard={setIsShowConfirmCard}
                setIsBookAppointment={setIsBookAppointment}
            />
        );
    }
    const excludeFields = [
        '_id',
        '__v',
        'isLoggedIn',
        'createdAt',
        'updatedAt'
    ];

    function checkFormData(initialFormState, providedData, excludeFields) {
        const errors = [];

        for (const key in initialFormState) {
            if (excludeFields.includes(key)) continue; // Skip non-mandatory fields

            if (!(key in providedData)) {
                errors.push(`Missing field: ${key}`);
            } else if (
                providedData[key] === '' ||
                providedData[key] === null ||
                providedData[key] === undefined
            ) {
                errors.push(`Empty or invalid value for field: ${key}`);
            }
        }

        return errors.length === 0 ? true : errors;
    }

    // Check the provided data

    async function handleSubmit(e) {
        e.preventDefault();

        const result = checkFormData(initialFormState, userData, excludeFields);
        if (result === true) {
            setloading(true);
            const formData = new FormData(e.target);
            // Convert FormData to a plain object
            const formValues = {};
            formData.forEach((value, key) => {
                if (value.trim() === '') return;
                formValues[key] = value;
            });
            try {
                const formData = new FormData(e.target);
                // Convert FormData to a plain object
                const formValues = {};
                formData.forEach((value, key) => {
                    if (value.trim() === '') return;
                    formValues[key] = value;
                });
                const { paymentMethod, amount, currency } = paymentData;
                const parsedData = {
                    physician: `${selectedDoctor.firstName} ${selectedDoctor.lastName}`,
                    careCoordinator: `Dr Wilson`,
                    videoOn: true,
                    visitReason: formValues.visitReason,
                    visitCoordinates: '',
                    visitDescription: formValues.visitDescription,
                    doctorAssign: selectedDoctor._id,
                    visitDate: selectedDate,
                    startTime: timing,
                    endTime: calculateEndTime(timing),
                    payment: {
                        paymentMethod,
                        amount,
                        currency
                    }
                };
                const response = await createAppointment(parsedData);
                if (response.success) {
                    toast.success('Appointment created successfully!');
                    setShowBioCard(true);
                } else {
                    toast.error('Something went wrong. Please try again.');
                }
            } catch (error) {
                toast.error('Something went wrong. Please try again.');
            }
            setloading(false);
        } else {
            setloading(true);
            try {
                const updateUser = await saveProfile(formData);
                if (!updateUser) {
                    return toast.error(
                        'Something went wrong. Please try again.'
                    );
                }
                const inputData = new FormData(e.target);
                // Convert FormData to a plain object
                const formValues = {};
                inputData.forEach((value, key) => {
                    if (value.trim() === '') return;
                    formValues[key] = value;
                });
                const { paymentMethod, amount, currency } = paymentData;
                const parsedData = {
                    physician: `${selectedDoctor.firstName} ${selectedDoctor.lastName}`,
                    careCoordinator: `Dr Wilson`,
                    videoOn: appointmentType === 'video' ? true : false,
                    visitReason: formValues.visitReason,
                    visitCoordinates: '',
                    visitDescription: formValues.visitDescription,
                    doctorAssign: selectedDoctor._id,
                    visitDate: selectedDate,
                    startTime: timing,
                    endTime: calculateEndTime(timing),
                    payment: {
                        paymentMethod,
                        amount,
                        currency
                    }
                };
                const response = await createAppointment(parsedData);
                if (response.success) {
                    toast.success('Appointment created successfully!');
                    setShowBioCard(true);
                } else {
                    toast.error('Something went wrong. Please try again.');
                }
            } catch (error) {
                toast.error('Something went wrong. Please try again.');
            }
            setloading(false);
        }
    }

    return showBioCard && !isShowConfirmCard ? (
        <BioCard tabNumber={tabNumber} setTabNumber={setTabNumber} />
    ) : (
        <div className="mx-auto mb-24 space-y-12 w-11/12">
            <div className="p-6 bg-white rounded-lg border shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">
                    Complete your booking
                </h2>
                <div className="space-y-6">
                    <div className="flex flex-col items-start space-x-3 space-y-3 w-full rounded-xl lg:flex-row lg:items-end md:border md:p-4">
                        <div className="flex flex-col items-center w-full md:flex-row">
                            <div className="overflow-hidden bg-blue-300 rounded-full">
                                <img
                                    src={profileData.avatar}
                                    className="object-cover w-24 h-24 text-blue-700"
                                />
                            </div>
                            <div className="flex flex-col items-start px-4">
                                <p className="text-base font-medium capitalize md:text-xl">
                                    {selectedDoctor?.firstName}{' '}
                                    {selectedDoctor?.lastName}
                                </p>
                                <p className="text-base md:text-xl">
                                    {selectedDate} - {timing}
                                </p>
                                <p className="text-base font-medium capitalize md:text-xl">
                                    {appointmentType}
                                    {' Appointment '}({'30 min'})
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
                        <div className="flex flex-col gap-2 items-center md:flex-row md:gap-12">
                            <div className="rounded-[28px] bg-[#4864FF29] text-[#4864FF] md:whitespace-nowrap text-xs md:text-lg p-4 px-8">
                                <button>
                                    Last Provider available at this time
                                </button>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className="flex flex-col gap-4 my-6 mt-6">
                                <div className="flex flex-col gap-6 justify-between w-full md:flex-row">
                                    <div className="w-full">
                                        <label>First Name</label>
                                        <Input
                                            name="firstName"
                                            defaultValue={formData.firstName}
                                            onChange={(e) => {
                                                updateFormField(
                                                    'firstName',
                                                    e.target.value
                                                );
                                            }}
                                            placeholder="Enter your first name"
                                            className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label>Last Name</label>
                                        <Input
                                            name="lastName"
                                            onChange={(e) => {
                                                updateFormField(
                                                    'lastName',
                                                    e.target.value
                                                );
                                            }}
                                            defaultValue={formData.lastName}
                                            placeholder="Enter your last name"
                                            className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
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
                                            name="preferredName"
                                            placeholder="Enter your name"
                                            className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className="my-4 text-xl">Date of Birth</p>
                            <div className="flex flex-col gap-4 justify-between w-full">
                                <div className="flex flex-col gap-2 justify-between md:flex-row md:gap-12">
                                    <DateOfBirthInput
                                        defaultDate={dateOfBirth}
                                        setDateOfBirth={setDateOfBirth}
                                    />
                                    <div className="w-full">
                                        <p className="pl-1 mb-1 text-sm font-medium">
                                            Sex assigned at birth
                                        </p>
                                        <Select
                                            onValueChange={(e) => {
                                                updateFormField('gender', e);
                                            }}
                                            value={formData.gender}
                                            name="gender"
                                        >
                                            <SelectTrigger className="w-full bg-superSilver cursor-pointer border !outline-none !border-transparent">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#ffffff] z-20">
                                                <SelectItem value="Male">
                                                    Male
                                                </SelectItem>
                                                <SelectItem value="Female">
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
                                    type="button"
                                    onClick={() => {
                                        setShowGenderPronouns(
                                            !showGenderPronouns
                                        );
                                    }}
                                    className="flex flex-row items-center gap-2 text-bluetitmouse text-xs sm:text-sm md:text-base"
                                >
                                    {showGenderPronouns ? <Minus /> : <Plus />}
                                    Gender Identity / Prederred Pronouns
                                </button>
                                {showGenderPronouns && (
                                    <div className="w-full">
                                        <label className="text-base font-medium font-poppins text-dimGray">
                                            Gender Identity / Prederred Pronouns
                                        </label>
                                        <Input
                                            name="genderPronouns"
                                            placeholder="Enter Gender Identity / Prederred Pronouns"
                                            className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className="my-8 text-2xl font-medium">
                                01 - Address
                            </p>
                            <div className="flex flex-col gap-4 justify-between w-full">
                                <div className="grid grid-cols-1 gap-8">
                                    <div className="flex flex-col gap-6 justify-between w-full md:flex-row">
                                        <div className="w-full">
                                            <label>Address</label>
                                            <Input
                                                name="address"
                                                defaultValue={formData.address}
                                                onChange={(e) => {
                                                    updateFormField(
                                                        'address',
                                                        e.target.value
                                                    );
                                                }}
                                                placeholder="Enter your address"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <label>State</label>
                                            <Input
                                                name="state"
                                                defaultValue={formData.state}
                                                onChange={(e) => {
                                                    updateFormField(
                                                        'state',
                                                        e.target.value
                                                    );
                                                }}
                                                placeholder="Enter your state"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-6 justify-between w-full md:flex-row">
                                        <div className="w-full">
                                            <label>City</label>
                                            <Input
                                                name="city"
                                                defaultValue={formData.city}
                                                onChange={(e) => {
                                                    updateFormField(
                                                        'city',
                                                        e.target.value
                                                    );
                                                }}
                                                placeholder="Enter your city"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <label>Zip Code</label>
                                            <Input
                                                name="zipCode"
                                                defaultValue={formData.zipcode}
                                                onChange={(e) => {
                                                    updateFormField(
                                                        'zipcode',
                                                        e.target.value
                                                    );
                                                }}
                                                placeholder="Enter your zip code"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                        </div>
                                    </div>

                                    <div className="w-1/2">
                                        <label>Country / Region</label>
                                        <Input
                                            name="country"
                                            defaultValue={formData.countryName}
                                            onChange={(e) => {
                                                updateFormField(
                                                    'countryName',
                                                    e.target.value
                                                );
                                            }}
                                            placeholder="Enter your country / region"
                                            className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="my-8 text-2xl font-medium">
                                02 - Contact Information
                            </p>
                            <div className="flex flex-col gap-4 justify-between w-full">
                                <div className="grid grid-cols-1 gap-8">
                                    <div className="flex flex-col gap-6 justify-between w-full md:flex-row">
                                        <div className="w-full">
                                            <label>Phone Number</label>
                                            <Input
                                                name="phoneNumber"
                                                defaultValue={
                                                    formData.phoneNumber
                                                }
                                                onChange={(e) => {
                                                    updateFormField(
                                                        'phoneNumber',
                                                        e.target.value
                                                    );
                                                }}
                                                placeholder="1234567890"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <label className="text-nowrap">
                                                Emergency Contact Name
                                            </label>
                                            <Input
                                                name="emergencyContactName"
                                                defaultValue={
                                                    formData.emergencyContactName
                                                }
                                                onChange={(e) => {
                                                    updateFormField(
                                                        'emergencyContactName',
                                                        e.target.value
                                                    );
                                                }}
                                                placeholder="Enter emergency contact name"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-6 justify-between w-full md:flex-row">
                                        <div className="w-full">
                                            <label>
                                                Emergency Contact Phone
                                            </label>
                                            <Input
                                                name="emergencyContactPhoneNumber"
                                                defaultValue={
                                                    formData.emergencyContactPhoneNumber
                                                }
                                                onChange={(e) => {
                                                    updateFormField(
                                                        'emergencyContactPhoneNumber',
                                                        e.target.value
                                                    );
                                                }}
                                                placeholder="Enter your emergency contact phone"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                        </div>

                                        <div className="w-full">
                                            <p className="pl-1 mb-1 text-sm font-medium">
                                                Emergency Contact Relationship
                                            </p>
                                            <Select
                                                value={
                                                    formData.emergencyContactRelationship
                                                }
                                                onValueChange={(value) =>
                                                    updateFormField(
                                                        'emergencyContactRelationship',
                                                        value
                                                    )
                                                }
                                                name="relationship"
                                            >
                                                <SelectTrigger className="w-full bg-superSilver cursor-pointer border !outline-none !border-transparent">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#ffffff] z-20">
                                                    <SelectItem value="Father">
                                                        Father
                                                    </SelectItem>
                                                    <SelectItem value="Mother">
                                                        Mother
                                                    </SelectItem>
                                                    <SelectItem value="Sister">
                                                        Sister
                                                    </SelectItem>
                                                    <SelectItem value="Brother">
                                                        Brother
                                                    </SelectItem>
                                                    <SelectItem value="Friend">
                                                        Friend
                                                    </SelectItem>
                                                    <SelectItem value="Girlfriend">
                                                        Girlfriend
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="my-8 text-2xl font-medium">
                                03 - Reason
                            </p>
                            <div className="w-full">
                                <label>Reason</label>
                                <textarea
                                    name="visitReason"
                                    placeholder="Enter your Reason"
                                    className="h-[60px] rounded-[12px] bg-[#F1F1F1] w-full p-4 mt-2"
                                />
                            </div>
                            <div className="w-full">
                                <label>Booking Description</label>
                                <textarea
                                    name="visitDescription"
                                    placeholder="Enter your Booking Description"
                                    className="h-[60px] rounded-[12px] bg-[#F1F1F1] w-full p-4 mt-2"
                                />
                            </div>
                        </div>
                        <div className="my-8 w-full">
                            <div className="flex gap-4 items-center">
                                <div className="w-6 h-6 border-2 border-[#4864FF] rounded-md flex items-center justify-center">
                                    <input
                                        required
                                        type="checkbox"
                                        className="w-full h-full"
                                    />
                                </div>
                                <label className="text-lg">
                                    HIPAA / Privacy Policy
                                </label>
                            </div>
                            <p className="ml-10 text-gray-700 text-wrap">
                                I confirm that I have read and agree to the
                                [Privacy Policy] and [Terms of Service],
                                including all HIPAA (or applicable local health
                                privacy law) and confidentiality provisions. I
                                also understand and consent to receive medical
                                advice and treatment through this telehealth
                                platform.
                            </p>
                        </div>
                        <div className="flex gap-3 items-center mb-4 w-full">
                            <label className="flex gap-2 items-center cursor-pointer">
                                <div className="w-6 h-6 border-2 border-[#4864FF] rounded-md flex items-center justify-center">
                                    <input
                                        required
                                        type="checkbox"
                                        className="w-full h-full"
                                    />
                                </div>
                                <p className="text-base font-poppins text-black">
                                    Consent for Treatment
                                </p>
                            </label>
                        </div>
                        <button
                            disabled={loading}
                            type="submit"
                            className="text-center bg-[#293991] h-[60px] w-full md:w-min md:px-40 md:whitespace-nowrap mt-4 rounded-[12px] text-white disabled:opacity-65"
                        >
                            Confirm Patient Information
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
