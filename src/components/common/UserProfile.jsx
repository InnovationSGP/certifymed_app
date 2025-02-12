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
  const [selectedState, setSelectedState] = useState(formData.state || "");
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    const initializeProfile = async () => {
      const profileData = await fetchProfile();
      if (profileData) {
        resetForm(profileData);
      }
    };
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
                onChange={(e) => updateFormField("firstName", e.target.value)}
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
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
