'use client';
import BioCard from '@/components/common/BioCard';
import BookingConfirmation from '@/components/common/ConfirmCard';
import { Input } from '@/components/common/Input';
import PrimaryBtn from '@/components/common/PrimaryBtn';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/common/select';
import { useProfileData } from '@/hooks/useProfileData';
import { useProfileForm } from '@/hooks/useProfileForm';
import { createAppointment } from '@/services/AppointmentService';
import { checkFormData } from '@/utils/bookingHelper';
import { calculateEndTime } from '@/utils/dateHelpers';
import { LoaderCircle, Minus, Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
const DoctorInfo = dynamic(() => import('./DoctorInfo'), {
    ssr: false,
    loading: () => <div>Loading...</div>
});

export default function CompleteBooking({ tabNumber, setTabNumber }) {
    const userData = useSelector((state) => state.user);
    const formRef = useRef(null);
    const router = useRouter();
    const [showPreferred, setShowPreferred] = useState(false);
    const [selectedDoctor, setselectedDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [paymentData, setPaymentData] = useState(null);
    const [showGenderPronouns, setShowGenderPronouns] = useState(false);
    const [showBioCard, setShowBioCard] = useState(false);
    const [isShowConfirmCard, setIsShowConfirmCard] = useState(true);
    const [loading, setloading] = useState(false);
    const { saveProfile } = useProfileData();
    const [dateOfBirth, setDateOfBirth] = useState({
        day: '',
        month: '',
        year: ''
    });
    const { formData, updateFormField, resetForm } = useProfileForm();

    async function handleSubmit(e) {
        e.preventDefault();
        const result = checkFormData(formData, userData);
        if (result === true) {
            setloading(true);
            const bookingData = new FormData(formRef.current);
            // Convert FormData to a plain object
            const formValues = {};
            bookingData.forEach((value, key) => {
                if (value.trim() === '') return;
                formValues[key] = value;
            });
            try {
                const { paymentMethod, amount, currency } = paymentData;
                const parsedData = {
                    physician: `${selectedDoctor.firstName} ${selectedDoctor.lastName}`,
                    careCoordinator: `Dr Wilson`,
                    videoOn: true,
                    visitReason:
                        formValues.visitReason || 'Having pain in the chest',
                    visitCoordinates: '',
                    visitDescription: formValues.visitDescription || '',
                    doctorAssign: selectedDoctor._id,
                    visitDate: selectedDate,
                    startTime: selectedTime,
                    endTime: calculateEndTime(selectedTime),
                    payment: {
                        paymentMethod,
                        amount,
                        currency
                    }
                };
                const response = await createAppointment(parsedData);
                if (response.success) {
                    toast.success('Appointment created successfully!');
                    // setShowBioCard(true);
                } else {
                    toast.error('Something went wrong. Please try again.');
                }
            } catch (error) {
                toast.error('Something went wrong. Please try again.');
            } finally {
                setloading(false);
            }
        } else {
            setloading(true);
            try {
                const combinedDate = `${dateOfBirth.year}-${dateOfBirth.month}-${dateOfBirth.day}`;
                const updateUser = await saveProfile({
                    ...formData,
                    dateOfBirth: combinedDate
                });
                if (!updateUser) {
                    return toast.error(
                        'Something went wrong. Please try again.'
                    );
                }
                const inputData = new FormData(formRef.current);
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
                    videoOn: true,
                    visitReason:
                        formValues.visitReason || 'Having pain in the chest',
                    visitCoordinates: '',
                    visitDescription: formValues.visitDescription,
                    apartment: formValues.apartment,
                    doctorAssign: selectedDoctor._id,
                    visitDate: selectedDate,
                    startTime: selectedTime,
                    endTime: calculateEndTime(selectedTime),
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
                    setTimeout(() => {
                        router.replace('/dashboard/patients/appointments');
                    }, [3000]);
                } else {
                    toast.error('Something went wrong. Please try again.');
                }
            } catch (error) {
                toast.error('Something went wrong. Please try again.');
            } finally {
                setloading(false);
            }
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setselectedDoctor(
                JSON.parse(sessionStorage.getItem('appointmentData'))
            );
            setSelectedDate(sessionStorage.getItem('selectedDate'));
            setSelectedTime(sessionStorage.getItem('timing'));
            setPaymentData(JSON.parse(sessionStorage.getItem('paymentData')));
        }
    }, []);

    function initialDateAndTIme(date) {
        const dateOfBirth = new Date(date);
        const initialYear = dateOfBirth.getUTCFullYear();
        const initialMonth = String(dateOfBirth.getUTCMonth() + 1).padStart(
            2,
            '0'
        ); // Months are 0-indexed
        const initialDay = String(dateOfBirth.getUTCDate()).padStart(2, '0');

        setDateOfBirth({
            day: initialDay,
            month: initialMonth,
            year: initialYear
        });
    }

    useEffect(() => {
        if (userData) {
            resetForm(userData);
            initialDateAndTIme(userData.dateOfBirth);
        }
    }, [userData]);

    if (showBioCard && isShowConfirmCard) {
        return (
            <BookingConfirmation
                isOpen={isShowConfirmCard}
                setIsShowConfirmCard={setIsShowConfirmCard}
            />
        );
    }

    return showBioCard && !isShowConfirmCard ? (
        <BioCard tabNumber={tabNumber} setTabNumber={setTabNumber} />
    ) : (
        <div className="w-full md:max-w-[1129px] mx-auto space-y-12 mb-24">
            <div className="bg-white rounded-xl shadow-tab p-3 sm:p-4 md:p-6">
                <h2 className="text-lg sm:text-xl font-poppins font-semibold text-secondary mb-4">
                    Complete your booking
                </h2>
                <div className="space-y-6">
                    <DoctorInfo />
                    <form onSubmit={handleSubmit} ref={formRef}>
                        <div className="flex flex-col my-4 sm:my-6 mt-6 gap-3 sm:gap-4">
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
                                <div className="flex flex-col md:flex-row justify-between gap-3">
                                    <div className="w-full flex justify-start gap-2 sm:gap-5">
                                        <div className="w-full md:max-w-[157px]">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                Month
                                            </label>
                                            <Input
                                                placeholder="MM"
                                                type="number"
                                                defaultValue={dateOfBirth.month}
                                                onChange={(e) =>
                                                    setDateOfBirth({
                                                        ...dateOfBirth,
                                                        month: e.target.value
                                                    })
                                                }
                                                className="placeholder:!text-center text-center sm:!pl-0 sm:!pr-3"
                                            />
                                        </div>
                                        <div className="w-full md:max-w-[157px]">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                Day
                                            </label>
                                            <Input
                                                placeholder="DD"
                                                type="number"
                                                onChange={(e) =>
                                                    setDateOfBirth({
                                                        ...dateOfBirth,
                                                        day: e.target.value
                                                    })
                                                }
                                                defaultValue={dateOfBirth.day}
                                                className="placeholder:!text-center text-center sm:!pl-0 sm:!pr-3"
                                            />
                                        </div>
                                        <div className="w-full md:max-w-[157px]">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                YYYY
                                            </label>
                                            <Input
                                                placeholder="YYYY"
                                                type="number"
                                                onChange={(e) =>
                                                    setDateOfBirth({
                                                        ...dateOfBirth,
                                                        year: e.target.value
                                                    })
                                                }
                                                defaultValue={dateOfBirth.year}
                                                className="placeholder:!text-center text-center sm:!pl-0 sm:!pr-3"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <p className="text-base font-medium font-poppins text-dimGray">
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
                                            <SelectContent className="bg-superSilver z-20 cursor-pointer">
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
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                Apartment, etc
                                            </label>
                                            <Input
                                                name="apartment"
                                                onChange={(e) => {
                                                    updateFormField(
                                                        'apartment',
                                                        e.target.value
                                                    );
                                                }}
                                                placeholder="Enter your apartment"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col md:flex-row justify-between gap-4 sm:gap-6">
                                        <div className="w-full">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                City
                                            </label>
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
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                Postal Code
                                            </label>
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

                                    <div className="w-full flex flex-col md:flex-row justify-between gap-4 sm:gap-6">
                                        <div className="w-full">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                State
                                            </label>
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
                                        <div className="w-full">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                Country / Region
                                            </label>
                                            <Input
                                                name="country"
                                                defaultValue={
                                                    formData.countryName
                                                }
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
                        </div>
                        <div className="mb-5">
                            <p className="text-lg sm:text-xl font-medium mt-6 mb-4">
                                02 - Contact Information
                            </p>
                            <div className="flex flex-col w-full justify-between gap-4">
                                <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8">
                                    <div className="w-full flex flex-col md:flex-row justify-between gap-4 sm:gap-6">
                                        <div className="w-full">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                Phone Number
                                            </label>
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
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                Emergency Contact Information
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
                                    </div>
                                    <div className="w-full flex flex-col md:flex-row justify-between gap-4 sm:gap-6">
                                        <div className="w-full">
                                            <label className="text-base font-medium font-poppins text-dimGray">
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

                                        <div className="w-full">
                                            <p className="text-sm font-medium mb-1 pl-1">
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

                                    <div className="w-full flex justify-betweengap-4 sm:gap-6">
                                        <div className="w-full">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                Booking Reason
                                            </label>
                                            <Input
                                                name="visitReason"
                                                type="text"
                                                defaultValue={
                                                    formData.vistReason
                                                }
                                                onChange={(e) => {
                                                    updateFormField(
                                                        'visitReason',
                                                        e.target.value
                                                    );
                                                }}
                                                placeholder="Enter booking reason"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <label className="w-full cursor-pointer">
                            <div className="flex items-center  gap-2 sm:gap-4">
                                <div className="flex items-center justify-center agreecheckbox">
                                    <input
                                        required
                                        type="checkbox"
                                        className="w-full h-full rounded-[4px] border-bluetitmouse border-2 min-w-5 min-h-5 sm:min-w-6 sm:min-h-6"
                                    />
                                </div>
                                <p className="text-base font-poppins text-black">
                                    HIPAA / Privacy Policy
                                </p>
                            </div>
                            <p className="text-xs sm:text-sm md:text-base font-poppins text-black opacity-[0.8] ml-[33px] sm:ml-10 pt-1">
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
                                        required
                                        type="checkbox"
                                        className="w-full h-full rounded-[4px] border-bluetitmouse border-2 min-w-5 min-h-5 sm:min-w-6 sm:min-h-6"
                                    />
                                </div>
                                <p className="text-base font-poppins text-black">
                                    Consent for Treatment
                                </p>
                            </label>
                        </div>
                        <PrimaryBtn
                            disabled={loading}
                            onClick={handleSubmit}
                            className="!h-[55px] md:!h-[60px] w-full md:max-w-[389px] mt-6 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-primary"
                        >
                            {loading ? (
                                <LoaderCircle className="animate-spin" />
                            ) : (
                                'Confirm Patient Information'
                            )}
                        </PrimaryBtn>
                    </form>
                </div>
            </div>
        </div>
    );
}
