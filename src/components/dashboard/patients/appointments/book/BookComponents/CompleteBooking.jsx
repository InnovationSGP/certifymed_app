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
import { useBookingForm } from '@/hooks/useBookingForm';
import { useProfileData } from '@/hooks/useProfileData';
import { createAppointment } from '@/services/AppointmentService';
import { calculateEndTime } from '@/utils/dateHelpers';
import { LoaderCircle, Minus, Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
const DoctorInfo = dynamic(() => import('./DoctorInfo'), {
    ssr: false,
    loading: () => <div>Loading...</div>
});

export default function CompleteBooking({ tabNumber, setTabNumber }) {
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
    const [errors, setErrors] = useState({});
    const [dateOfBirth, setDateOfBirth] = useState({
        day: '',
        month: '',
        year: ''
    });
    const [isPrivacyPolicyChecked, setIsPrivacyPolicyChecked] = useState(false);
    const [isConsentForTreatmentChecked, setIsConsentForTreatmentChecked] =
        useState(false);
    const { user, saveProfileBooking } = useProfileData();
    const { formData, updateFormField, resetForm } = useBookingForm();

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = [
            'firstName',
            'lastName',
            'email',
            'city',
            'gender',
            'address',
            'zipcode',
            'state',
            'countryName',
            'phoneNumber',
            'emergencyContactName',
            'emergencyContactPhoneNumber',
            'emergencyContactRelationship',
            'visitReason',
            'apartment'
        ];

        requiredFields.forEach((field) => {
            if (!formData[field]) {
                newErrors[field] = '*This field is required';
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function onSubmit(e) {
        e.preventDefault();
        if (!isPrivacyPolicyChecked || !isConsentForTreatmentChecked) {
            return alert(
                'Please accept privacy policy and consent for treatment.'
            );
        } else if (!validateForm()) {
            return toast.error('Please fill all the required fields.');
        }
        setloading(true);
        try {
            const combinedDate = `${dateOfBirth.year}-${dateOfBirth.month}-${dateOfBirth.day}`;
            const { visitReason, ...rest } = formData;

            const updateUser = await saveProfileBooking({
                ...rest,
                dateOfBirth: combinedDate
            });
            if (!updateUser) {
                return toast.error('Something went wrong. Please try again.');
            }
            const { paymentMethod, amount, currency } = paymentData;
            const parsedData = {
                physician: `${selectedDoctor.firstName} ${selectedDoctor.lastName}`,
                careCoordinator: `Dr Wilson`,
                videoOn: true,
                visitReason: visitReason || 'Having pain in the chest',
                visitCoordinates: '',
                visitDescription: '',
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
                    setShowBioCard(false);
                    router.push('/dashboard/patients/appointments');
                }, [2000]);
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setloading(false);
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
        if (user) {
            resetForm(user);
            initialDateAndTIme(user.dateOfBirth);
        }
    }, [user]);

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
                    <form onSubmit={onSubmit} ref={formRef}>
                        <div className="flex flex-col my-4 sm:my-6 mt-6 gap-3 sm:gap-4">
                            <div className="flex flex-col gap-6 justify-between w-full md:flex-row">
                                <div className="w-full">
                                    <label>First Name</label>
                                    <Input
                                        type="text"
                                        value={formData.firstName}
                                        name="firstName"
                                        onChange={(e) => {
                                            updateFormField(
                                                'firstName',
                                                e.target.value
                                            );
                                        }}
                                        onFocus={() => {
                                            setErrors((prev) => {
                                                const updatedErrors = {
                                                    ...prev
                                                };
                                                delete updatedErrors.firstName;
                                                return updatedErrors;
                                            });
                                        }}
                                        error={errors.firstName}
                                        placeholder="Enter your first name"
                                        className={`h-[60px] rounded-[12px] bg-[#F1F1F1]`}
                                    />
                                    {errors.firstName && (
                                        <span className="text-red text-sm">
                                            {errors.firstName}
                                        </span>
                                    )}
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
                                        value={formData.lastName}
                                        onFocus={() => {
                                            setErrors((prev) => {
                                                const updatedErrors = {
                                                    ...prev
                                                };
                                                delete updatedErrors.lastName;
                                                return updatedErrors;
                                            });
                                        }}
                                        error={errors.lastName}
                                        placeholder="Enter your last name"
                                        className="h-[60px] rounded-[12px] bg-[#F1F1F1] "
                                    />
                                    {errors.lastName && (
                                        <span className="text-red text-sm">
                                            {errors.lastName}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <button
                                type="button"
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
                                                value={dateOfBirth.month}
                                                onFocus={() => {
                                                    setErrors((prev) => {
                                                        const updatedErrors = {
                                                            ...prev
                                                        };
                                                        delete updatedErrors.month;
                                                        return updatedErrors;
                                                    });
                                                }}
                                                errors={errors.month}
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
                                                onFocus={() => {
                                                    setErrors((prev) => {
                                                        const updatedErrors = {
                                                            ...prev
                                                        };
                                                        delete updatedErrors.day;
                                                        return updatedErrors;
                                                    });
                                                }}
                                                errors={errors.day}
                                                onChange={(e) =>
                                                    setDateOfBirth({
                                                        ...dateOfBirth,
                                                        day: e.target.value
                                                    })
                                                }
                                                value={dateOfBirth.day}
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
                                                onFocus={() => {
                                                    setErrors((prev) => {
                                                        const updatedErrors = {
                                                            ...prev
                                                        };
                                                        delete updatedErrors.year;
                                                        return updatedErrors;
                                                    });
                                                }}
                                                errors={errors.year}
                                                onChange={(e) =>
                                                    setDateOfBirth({
                                                        ...dateOfBirth,
                                                        year: e.target.value
                                                    })
                                                }
                                                value={dateOfBirth.year}
                                                className="placeholder:!text-center text-center sm:!pl-0 sm:!pr-3"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <p className="text-base font-medium font-poppins text-dimGray">
                                            Sex assigned at birth
                                        </p>
                                        <Select
                                            className={
                                                errors.gender
                                                    ? 'border-2 border-red'
                                                    : ''
                                            }
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
                                        {errors.gender && (
                                            <span className="text-red text-sm">
                                                {errors.gender}
                                            </span>
                                        )}
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
                                                onFocus={() => {
                                                    setErrors((prev) => {
                                                        const updatedErrors = {
                                                            ...prev
                                                        };
                                                        delete updatedErrors.address;
                                                        return updatedErrors;
                                                    });
                                                }}
                                                error={errors.address}
                                                value={formData.address}
                                                onChange={(e) => {
                                                    updateFormField(
                                                        'address',
                                                        e.target.value
                                                    );
                                                }}
                                                placeholder="Enter your address"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                            {errors.address && (
                                                <span className="text-red text-sm">
                                                    {errors.address}
                                                </span>
                                            )}
                                        </div>
                                        <div className="w-full">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                Apartment, etc
                                            </label>
                                            <Input
                                                name="apartment"
                                                onFocus={() => {
                                                    setErrors((prev) => {
                                                        const updatedErrors = {
                                                            ...prev
                                                        };
                                                        delete updatedErrors.apartment;
                                                        return updatedErrors;
                                                    });
                                                }}
                                                error={errors.apartment}
                                                value={formData.apartment}
                                                onChange={(e) => {
                                                    updateFormField(
                                                        'apartment',
                                                        e.target.value
                                                    );
                                                }}
                                                placeholder="Enter your apartment"
                                            />
                                            {errors.apartment && (
                                                <span className="text-red text-sm">
                                                    {errors.apartment}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col md:flex-row justify-between gap-4 sm:gap-6">
                                        <div className="w-full">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                City
                                            </label>
                                            <Input
                                                name="city"
                                                value={formData.city}
                                                onFocus={() => {
                                                    setErrors((prev) => {
                                                        const updatedErrors = {
                                                            ...prev
                                                        };
                                                        delete updatedErrors.city;
                                                        return updatedErrors;
                                                    });
                                                }}
                                                error={errors.city}
                                                onChange={(e) => {
                                                    updateFormField(
                                                        'city',
                                                        e.target.value
                                                    );
                                                }}
                                                placeholder="Enter your city"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                            {errors.city && (
                                                <span className="text-red text-sm">
                                                    {errors.city}
                                                </span>
                                            )}
                                        </div>
                                        <div className="w-full">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                Postal Code
                                            </label>
                                            <Input
                                                name="zipCode"
                                                value={formData.zipcode}
                                                onFocus={() => {
                                                    setErrors((prev) => {
                                                        const updatedErrors = {
                                                            ...prev
                                                        };
                                                        delete updatedErrors.zipcode;
                                                        return updatedErrors;
                                                    });
                                                }}
                                                error={errors.zipcode}
                                                onChange={(e) => {
                                                    updateFormField(
                                                        'zipcode',
                                                        e.target.value
                                                    );
                                                }}
                                                placeholder="Enter your zip code"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                            {errors.zipcode && (
                                                <span className="text-red text-sm">
                                                    {errors.zipcode}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="w-full flex flex-col md:flex-row justify-between gap-4 sm:gap-6">
                                        <div className="w-full">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                State
                                            </label>
                                            <Input
                                                name="state"
                                                value={formData.state}
                                                onFocus={() => {
                                                    setErrors((prev) => {
                                                        const updatedErrors = {
                                                            ...prev
                                                        };
                                                        delete updatedErrors.state;
                                                        return updatedErrors;
                                                    });
                                                }}
                                                error={errors.state}
                                                onChange={(e) => {
                                                    updateFormField(
                                                        'state',
                                                        e.target.value
                                                    );
                                                }}
                                                placeholder="Enter your state"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                            {errors.state && (
                                                <span className="text-red text-sm">
                                                    {errors.state}
                                                </span>
                                            )}
                                        </div>
                                        <div className="w-full">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                Country / Region
                                            </label>
                                            <Input
                                                name="country"
                                                value={formData.countryName}
                                                onFocus={() => {
                                                    setErrors((prev) => {
                                                        const updatedErrors = {
                                                            ...prev
                                                        };
                                                        delete updatedErrors.countryName;
                                                        return updatedErrors;
                                                    });
                                                }}
                                                error={errors.countryName}
                                                onChange={(e) => {
                                                    updateFormField(
                                                        'countryName',
                                                        e.target.value
                                                    );
                                                }}
                                                placeholder="Enter your country / region"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                            {errors.countryName && (
                                                <span className="text-red text-sm">
                                                    {errors.countryName}
                                                </span>
                                            )}
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
                                                type="number"
                                                error={errors.phoneNumber}
                                                onFocus={() => {
                                                    setErrors((prev) => {
                                                        const updatedErrors = {
                                                            ...prev
                                                        };
                                                        delete updatedErrors.phoneNumber;
                                                        return updatedErrors;
                                                    });
                                                }}
                                                value={formData.phoneNumber}
                                                onChange={(e) => {
                                                    updateFormField(
                                                        'phoneNumber',
                                                        e.target.value
                                                    );
                                                }}
                                                placeholder="1234567890"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                            {errors.phoneNumber && (
                                                <span className="text-red text-sm">
                                                    {errors.phoneNumber}
                                                </span>
                                            )}
                                        </div>
                                        <div className="w-full">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                Emergency Contact Information
                                            </label>
                                            <Input
                                                name="emergencyContactPhoneNumber"
                                                type="number"
                                                error={
                                                    errors.emergencyContactPhoneNumber
                                                }
                                                onFocus={() => {
                                                    setErrors((prev) => {
                                                        const updatedErrors = {
                                                            ...prev
                                                        };
                                                        delete updatedErrors.emergencyContactPhoneNumber;
                                                        return updatedErrors;
                                                    });
                                                }}
                                                value={
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
                                            {errors.emergencyContactPhoneNumber && (
                                                <span className="text-red text-sm">
                                                    {
                                                        errors.emergencyContactPhoneNumber
                                                    }
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col md:flex-row justify-between gap-4 sm:gap-6">
                                        <div className="w-full">
                                            <label className="text-base font-medium font-poppins text-dimGray">
                                                Emergency Contact Name
                                            </label>
                                            <Input
                                                name="emergencyContactName"
                                                type="text"
                                                error={
                                                    errors.emergencyContactName
                                                }
                                                onFocus={() => {
                                                    setErrors((prev) => {
                                                        const updatedErrors = {
                                                            ...prev
                                                        };
                                                        delete updatedErrors.emergencyContactName;
                                                        return updatedErrors;
                                                    });
                                                }}
                                                value={
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
                                            {errors.emergencyContactName && (
                                                <span className="text-red text-sm">
                                                    {
                                                        errors.emergencyContactName
                                                    }
                                                </span>
                                            )}
                                        </div>

                                        <div className="w-full">
                                            <p className="text-sm font-medium mb-1 pl-1">
                                                Emergency Contact Relationship
                                            </p>
                                            <Select
                                                className={`${
                                                    errors.emergencyContactRelationship &&
                                                    'border-red border-2'
                                                }`}
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
                                                error={errors.visitReason}
                                                onFocus={() => {
                                                    setErrors((prev) => {
                                                        const updatedErrors = {
                                                            ...prev
                                                        };
                                                        delete updatedErrors.visitReason;
                                                        return updatedErrors;
                                                    });
                                                }}
                                                type="text"
                                                required
                                                onChange={(e) => {
                                                    updateFormField(
                                                        'visitReason',
                                                        e.target.value
                                                    );
                                                }}
                                                placeholder="Enter booking reason"
                                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                            />
                                            {errors.visitReason && (
                                                <span className="text-red text-sm">
                                                    {errors.visitReason}
                                                </span>
                                            )}
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
                                        checked={isPrivacyPolicyChecked}
                                        onChange={(e) =>
                                            setIsPrivacyPolicyChecked(
                                                e.target.checked
                                            )
                                        }
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
                                        checked={isConsentForTreatmentChecked}
                                        onChange={(e) =>
                                            setIsConsentForTreatmentChecked(
                                                e.target.checked
                                            )
                                        }
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
                            onClick={onSubmit}
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
