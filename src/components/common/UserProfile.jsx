"use client";

import CustomDatePicker from "@/components/common/CustomDatePicker";
import CustomSelect from "@/components/common/CustomSelect";
import PhoneNumberInput from "@/components/common/PhoneNumberInput";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: null,
    countryCode: "",
  });
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/auth/api/users/user");
        console.log("API Response:", response.data);

        if (response.data) {
          const profileData = response.data;
          let dateOfBirth = null;

          try {
            if (profileData?.dateOfBirth) {
              dateOfBirth = new Date(profileData.dateOfBirth);
              // Validate if the date is valid
              if (isNaN(dateOfBirth.getTime())) {
                dateOfBirth = null;
                console.error(
                  "Invalid date received:",
                  profileData.dateOfBirth
                );
              }
            }
          } catch (error) {
            console.error("Error parsing date:", error);
          }

          console.log("Original date from backend:", profileData?.dateOfBirth);
          console.log("Parsed date:", dateOfBirth);

          setUserId(profileData._id);
          setFormData({
            firstName: profileData?.firstName || "",
            lastName: profileData?.lastName || "",
            email: profileData?.email || "",
            phone: profileData?.phoneNumber || "",
            gender: profileData?.gender || "",
            dob: dateOfBirth,
            countryCode: profileData?.countryCode || "",
          });
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
        toast.error(error?.message || "Error fetching profile");
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const dataToSend = {
        ...formData,
        dateOfBirth:
          formData.dob instanceof Date ? formData.dob.toISOString() : null,
        phoneNumber: formData.phone,
      };

      console.log("Saving profile data:", dataToSend);

      await axiosInstance.put(`/auth/api/users/${userId}`, dataToSend);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error?.message || "Update profile failed");
    }
  };

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
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
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
                disabled={true}
                className="opacity-70 cursor-not-allowed"
                defaultCountryCode={formData.countryCode}
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
                onChange={(value) =>
                  setFormData({ ...formData, gender: value })
                }
              />
            </div>

            <div>
              <label className="block text-[15px] font-medium text-gray-700">
                Date of Birth
              </label>
              <CustomDatePicker
                value={formData.dob}
                disabled={!isEditing}
                onChange={(date) => {
                  console.log("Date selected:", date);
                  setFormData({ ...formData, dob: date });
                }}
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
                  onClick={() => setIsEditing(false)}
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

export default ProfilePage;
