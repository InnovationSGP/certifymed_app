"use client";

import CustomDatePicker from "@/components/common/CustomDatePicker";
import CustomSelect from "@/components/common/CustomSelect";
import PhoneNumberInput from "@/components/common/PhoneNumberInput";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import { Camera, UserCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    bloodGroup: "",
    allergies: "",
    address: "",
  });
  const  [userId, setUserId] = useState('');
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/auth/api/users/user");
        if (response.data) {
          const profileData = response.data;
          setUserId(profileData._id)
          setFormData({
            firstName: profileData?.firstName || "",
            lastName: profileData?.lastName || "",
            email: profileData?.email || "",
            phone: profileData?.phoneNumber || "",
            gender: profileData?.gender || "",
            dob: new Date(profileData?.dateOfBirth), // Convert to Date object
            countryCode: profileData?.countryCode
          });
        }       
      } catch (error) {
        toast.error(error || "Error fetching profile");
      } 
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
        await axiosInstance.put(`/auth/api/users/${userId}`, formData);
         setIsEditing(false);
         toast.success("Updated in successfully");
    } catch (error) {
      toast.error(error || "Update profile failed");
    
    }
  };

  return (
    <>
      <div className="p-6 lg:p-10">
        <div className="lg:px-[35px] px-6 pt-6 bg-white rounded-xl">
          <h1 className="section-heading leading-[51px] mb-2">
            Profile Information
          </h1>

          <div className="pb-14 lg:pb-6">
            {/* Form */}
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
                  className="mt-1 input-style"
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
                  defaultCountryCode = {formData.countryCode}
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
                  onChange={(date) => setFormData({ ...formData, dob: date })}
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
    </>
  );
};

export default ProfilePage;
