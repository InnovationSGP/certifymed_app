"use client";

import { useEffect } from "react";
import CustomDatePicker from "@/components/common/CustomDatePicker";
import CustomSelect from "@/components/common/CustomSelect";
import PhoneNumberInput from "@/components/common/PhoneNumberInput";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import { useProfileData, useProfileForm } from "@/hooks/useProfileForm";

const UserProfile = () => {
  const {
    formData,
    isEditing,
    setIsEditing,
    updateFormField,
    updatePhoneData,
    resetForm,
  } = useProfileForm();

  const { isLoading, fetchProfile, saveProfile } = useProfileData();

  useEffect(() => {
    const initializeProfile = async () => {
      const profileData = await fetchProfile();
      if (profileData) {
        resetForm(profileData);
      }
    };

    initializeProfile();
  }, []);

  const handleSave = async () => {
    const success = await saveProfile(formData);
    if (success) {
      setIsEditing(false);
    }
  };

  if (isLoading) {
    return <div className="p-6 lg:p-10">Loading...</div>;
  }

  return (
    <div className="p-6 lg:p-10 min-h-[calc(100vh-72px)]">
      <div className="lg:px-[35px] px-6 pt-6 bg-white rounded-xl">
        <h1 className="section-heading leading-[51px] mb-2">
          Profile Information
        </h1>

        <div className="pb-14 lg:pb-6">
          <div className="grid md:grid-cols-2 gap-6 sm:mt-8">
            <div>
              <label className="block text-[15px] font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                className="mt-1 input-style disabled:opacity-70"
                value={formData.firstName}
                disabled={!isEditing}
                onChange={(e) => updateFormField("firstName", e.target.value)}
              />
            </div>

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
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
