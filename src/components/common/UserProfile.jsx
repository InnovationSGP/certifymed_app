<<<<<<< Updated upstream
"use client";

import { useEffect,useState } from "react";
import CustomDatePicker from "@/components/common/CustomDatePicker";
import CustomSelect from "@/components/common/CustomSelect";
import PhoneNumberInput from "@/components/common/PhoneNumberInput";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import { useProfileData } from "@/hooks/useProfileData";
import { useProfileForm } from "@/hooks/useProfileForm";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
=======
'use client';
import { useEffect } from 'react';
import CustomDatePicker from '@/components/common/CustomDatePicker';
import CustomSelect from '@/components/common/CustomSelect';
import PhoneNumberInput from '@/components/common/PhoneNumberInput';
import PrimaryBtn from '@/components/common/PrimaryBtn';
import { useProfileData } from '@/hooks/useProfileData';
import { useProfileForm } from '@/hooks/useProfileForm';
import { usePathname } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from './select';
import { Input } from './Input';
import { useSelector } from 'react-redux';
>>>>>>> Stashed changes

const UserProfile = () => {
    const userData = useSelector((state) => state.user);
    const pathname = usePathname();
    const isDoctor = pathname.includes('/doctor/profile');
    const {
        formData,
        isEditing,
        setIsEditing,
        updateFormField,
        updatePhoneData,
        resetForm
    } = useProfileForm();

<<<<<<< Updated upstream
  const { isLoading, fetchProfile, saveProfile } = useProfileData();
  const [selectedState, setSelectedState] = useState(formData.state || "");
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
=======
    console.log(formData);
    const { isLoading, saveProfile } = useProfileData();
>>>>>>> Stashed changes

    useEffect(() => {
        if (userData) {
            resetForm(userData);
        }
    }, [userData]);

    const handleSave = async () => {
        const success = await saveProfile(formData);
        if (success) {
            setIsEditing(false);
        }
    };
<<<<<<< Updated upstream
    initializeProfile();
    setStateOptions(State.getStatesOfCountry("US").map((state) => ({ value: state.isoCode, label: state.name })));
  }, []);

  useEffect(() => {
    if (selectedState) {
      setCityOptions(City.getCitiesOfState("US", selectedState).map((city) => ({ value: city.name, label: city.name })));
    } else {
      setCityOptions([]);
    }
  }, [selectedState]);

  const handleSave = async () => {
    const success = await saveProfile(formData);
    if (success) {
      setIsEditing(false);
=======

    if (isLoading) {
        return <div className="p-6 lg:p-10">Loading...</div>;
>>>>>>> Stashed changes
    }

    return (
        <div className="p-6 lg:p-10 min-h-[calc(100vh-72px)]">
            <div className="lg:px-[35px] px-6 pt-6 bg-white rounded-xl">
                <h1 className="section-heading leading-[51px] mb-2">
                    Profile Information
                </h1>
                <div className="pb-14 lg:pb-6">
                    <div className="grid gap-6 md:grid-cols-2 sm:mt-8">
                        {/* First Name */}
                        <div>
                            <label className="block text-[15px] font-medium text-gray-700">
                                First Name
                            </label>
                            <input
                                type="text"
                                className="mt-1 input-style disabled:opacity-70"
                                value={formData.firstName}
                                disabled={!isEditing}
                                onChange={(e) =>
                                    updateFormField('firstName', e.target.value)
                                }
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-[15px] font-medium text-gray-700">
                                Last Name
                            </label>
                            <input
                                type="text"
                                className="mt-1 input-style disabled:opacity-70"
                                value={formData.lastName}
                                disabled={!isEditing}
                                onChange={(e) =>
                                    updateFormField('lastName', e.target.value)
                                }
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-[15px] font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                className="mt-1 cursor-not-allowed input-style opacity-70"
                                value={formData.email}
                                disabled={true}
                            />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-[15px] font-medium text-gray-700">
                                Phone Number
                            </label>
                            <PhoneNumberInput
                                value={formData.phoneNumber}
                                defaultCountryCode={formData.countryCode}
                                disabled={!isEditing}
                                onChange={updatePhoneData}
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-[15px] font-medium text-gray-700">
                                Gender
                            </label>
                            <CustomSelect
                                options={[
                                    { value: 'Male', label: 'Male' },
                                    { value: 'Female', label: 'Female' }
                                ]}
                                value={formData.gender}
                                disabled={!isEditing}
                                onChange={(value) =>
                                    updateFormField('gender', value)
                                }
                            />
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="block text-[15px] font-medium text-gray-700">
                                Date of Birth
                            </label>
                            <CustomDatePicker
                                value={formData.dateOfBirth}
                                disabled={!isEditing}
                                onChange={(date) =>
                                    updateFormField('dateOfBirth', date)
                                }
                            />
                        </div>
                        {/* Speciality  */}
                        {isDoctor && (
                            <div>
                                <label className="block text-[15px] font-medium text-gray-700">
                                    Speciality
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 input-style disabled:opacity-70"
                                    value={formData.specialization}
                                    disabled={!isEditing}
                                    onChange={(e) =>
                                        updateFormField(
                                            'specialization',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        )}
                    </div>
                    <div>
                        <p className="my-8 text-2xl font-medium">
                            Address Information
                        </p>
                        <div className="flex flex-col justify-between w-full gap-4">
                            <div className="grid grid-cols-1 gap-8">
                                <div className="flex flex-col justify-between w-full gap-6 md:flex-row">
                                    <div className="w-full">
                                        <label>Address</label>
                                        <Input
                                            name="address"
                                            value={formData.address}
                                            disabled={!isEditing}
                                            onChange={(e) =>
                                                updateFormField(
                                                    'address',
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter your address"
                                            className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label>Postal Code</label>
                                        <Input
                                            name="zipcode"
                                            value={formData.zipcode}
                                            disabled={!isEditing}
                                            onChange={(e) => {
                                                updateFormField(
                                                    'zipcode',
                                                    e.target.value
                                                );
                                            }}
                                            placeholder="Enter your postal code"
                                            className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between w-full gap-6 md:flex-row">
                                    <div className="w-full">
                                        <label>City</label>
                                        <Input
                                            name="city"
                                            value={formData.city}
                                            disabled={!isEditing}
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
                                        <label>State</label>
                                        <Input
                                            name="state"
                                            value={formData.state}
                                            disabled={!isEditing}
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
                                <div className="w-1/2">
                                    <label>Country / Region</label>
                                    <Input
                                        name="countryName"
                                        value={formData.countryName}
                                        disabled={!isEditing}
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
                            Contact Information
                        </p>
                        <div className="flex flex-col justify-between w-full gap-4">
                            <div className="grid grid-cols-1 gap-8">
                                <div className="flex flex-col justify-between w-full gap-6 md:flex-row">
                                    <div className="w-full">
                                        <label>Phone Number</label>
                                        <Input
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            disabled={!isEditing}
                                            placeholder="1234567890"
                                            onChange={(e) => {
                                                updateFormField(
                                                    'phoneNumber',
                                                    e.target.value
                                                );
                                            }}
                                            className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="text-nowrap">
                                            Emergency Contact Name
                                        </label>
                                        <Input
                                            name="emergencyContactName"
                                            value={
                                                formData.emergencyContactName
                                            }
                                            disabled={!isEditing}
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
                                <div className="flex flex-col justify-between w-full gap-6 md:flex-row">
                                    <div className="w-full">
                                        <label>Emergency Contact Phone</label>
                                        <Input
                                            name="emergencyContactPhoneNumber"
                                            disabled={!isEditing}
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
                                    </div>

                                    <div className="w-full">
                                        <p className="pl-1 mb-1 text-sm font-medium">
                                            Emergency Contact Relationship
                                        </p>
                                        <Select
                                            name="emergencyContactRelationship"
                                            disabled={!isEditing}
                                            value={
                                                formData.emergencyContactRelationship
                                            }
                                            onValueChange={(e) => {
                                                updateFormField(
                                                    'emergencyContactRelationship',
                                                    e
                                                );
                                            }}
                                        >
                                            <SelectTrigger className="w-full bg-[#ffffff] h-[60px] rounded-xl">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#ffffff] z-20">
                                                <SelectItem value="father">
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
                    {/* Action Buttons */}
                    <div className="flex justify-end mt-8 space-x-4">
                        {!isEditing ? (
                            <PrimaryBtn onClick={() => setIsEditing(true)}>
                                Edit Profile
                            </PrimaryBtn>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                                    onClick={() => {
                                        setIsEditing(false);
                                    }}
                                >
                                    Cancel
                                </button>
                                <PrimaryBtn onClick={handleSave}>
                                    Save Changes
                                </PrimaryBtn>
                            </>
                        )}
                    </div>
                </div>
            </div>
<<<<<<< Updated upstream

            {/* Last Name */}
            <div>
              <label className="block text-[15px] font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                className="mt-1 input-style disabled:opacity-70"
                value={formData.lastName}
                disabled={!isEditing}
                onChange={(e) => updateFormField("lastName", e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[15px] font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 input-style opacity-70 cursor-not-allowed"
                value={formData.email}
                disabled={true}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-[15px] font-medium text-gray-700">
                Phone Number
              </label>
              <PhoneNumberInput
                value={formData.phone}
                defaultCountryCode={formData.countryCode}
                disabled={!isEditing}
                onChange={updatePhoneData}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-[15px] font-medium text-gray-700">
                Gender
              </label>
              <CustomSelect
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                ]}
                value={formData.gender}
                disabled={!isEditing}
                onChange={(value) => updateFormField("gender", value)}
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-[15px] font-medium text-gray-700">
                Date of Birth
              </label>
              <CustomDatePicker
                value={formData.dob}
                disabled={!isEditing}
                onChange={(date) => updateFormField("dob", date)}
              />
            </div>
          </div>
           {/* State */}
           <div className="flex gap-6 mt-6">
             <div className="w-full">
                <label className="block text-[15px] font-medium text-gray-700">State</label>
                <Select
                className="w-full flex items-center justify-between px-3 py-[18px] bg-superSilver h-[55px] xl:h-[60px] text-dimGray outline-primary rounded-xl font-medium"
                  options={stateOptions}
                  value={stateOptions.find((option) => option.value === formData.state)}
                  isDisabled={!isEditing}
                  onChange={(option) => {
                    setSelectedState(option.value);
                    updateFormField("state", option.value);
                    updateFormField("city", ""); // Reset city when state changes
                  }}
                />
              </div>
              {/* City */}
              <div className="w-full">
                <label className="block text-[15px] font-medium text-gray-700">City</label>
                <Select
                className="w-full flex items-center justify-between px-3 py-[18px] bg-superSilver h-[55px] xl:h-[60px] text-dimGray outline-primary rounded-xl font-medium"
                  options={cityOptions}
                  value={cityOptions.find((option) => option.value === formData.city)}
                  isDisabled={!isEditing || !selectedState}
                  onChange={(option) => updateFormField("city", option.value)}
                />
              </div>
           </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            {!isEditing ? (
              <PrimaryBtn onClick={() => setIsEditing(true)}>
                Edit Profile
              </PrimaryBtn>
            ) : (
              <>
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setIsEditing(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <PrimaryBtn onClick={handleSave}>Save Changes</PrimaryBtn>
              </>
            )}
          </div>
=======
>>>>>>> Stashed changes
        </div>
    );
};

export default UserProfile;
