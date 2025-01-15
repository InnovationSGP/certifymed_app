"use client";
import CustomDatePicker from "@/components/common/CustomDatePicker";
import CustomSelect from "@/components/common/CustomSelect";
import PhoneNumberInput from "@/components/common/PhoneNumberInput";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import { Camera, UserCircle2 } from "lucide-react";
import { useState } from "react";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Mark",
    email: "john.mark@example.com",
    phone: "1234567890",
    gender: "Male",
    dob: new Date("1990-01-01"),
    bloodGroup: "O+",
    allergies: "None",
    address: "123 Main Street",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="p-6 lg:p-10">
        <div className="max-w-5xl mx-auto bg-white rounded-xl">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-medium">Profile Information</h1>
          </div>

          <div className="px-6 pb-6">
            {/* Profile Image */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-50">
                      <UserCircle2
                        size={45}
                        className="text-gray-400"
                        strokeWidth={1}
                      />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <label
                    htmlFor="profile-upload"
                    className="absolute -bottom-1 -right-1 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary/90 shadow-sm"
                  >
                    <Camera className="w-4 h-4" />
                    <input
                      id="profile-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Form */}
            <div className="grid md:grid-cols-2 gap-6">
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

              <div className="relative group">
                <label className="block text-[15px] font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 input-style cursor-not-allowed opacity-70"
                  value={formData.email}
                  disabled={true}
                />
                {isEditing && (
                  <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-sm rounded px-2 py-1 bottom-[70%] left-1/2 transform -translate-x-1/2 mb-1 whitespace-nowrap">
                    Email cannot be edited
                  </div>
                )}
              </div>

              <div className="relative group">
                <label className="block text-[15px] font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <PhoneNumberInput
                  value={formData.phone}
                  disabled={true}
                  className="opacity-70 cursor-not-allowed"
                />
                {isEditing && (
                  <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-sm rounded px-2 py-1 bottom-[70%] left-1/2 transform -translate-x-1/2 mb-1 whitespace-nowrap">
                    Phone number cannot be edited
                  </div>
                )}
              </div>

              <div>
                <label className="mb-1 block text-[15px] font-medium text-gray-700">
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
                <label className="mb-1 block text-[15px] font-medium text-gray-700">
                  Date of Birth
                </label>
                <CustomDatePicker
                  value={formData.dob}
                  disabled={!isEditing}
                  onChange={(date) => setFormData({ ...formData, dob: date })}
                />
              </div>

              <div>
                <label className="mb-1 block text-[15px] font-medium text-gray-700">
                  Blood Group
                </label>
                <CustomSelect
                  options={[
                    { value: "A+", label: "A+" },
                    { value: "A-", label: "A-" },
                    { value: "B+", label: "B+" },
                    { value: "B-", label: "B-" },
                    { value: "O+", label: "O+" },
                    { value: "O-", label: "O-" },
                    { value: "AB+", label: "AB+" },
                    { value: "AB-", label: "AB-" },
                  ]}
                  value={formData.bloodGroup}
                  disabled={!isEditing}
                  onChange={(value) =>
                    setFormData({ ...formData, bloodGroup: value })
                  }
                />
              </div>

              <div className="md:col-span-1">
                <label className="mb-1 block text-[15px] font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  className="input-style disabled:opacity-70"
                  value={formData.address}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
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
                  <PrimaryBtn onClick={() => setIsEditing(false)}>
                    Save Changes
                  </PrimaryBtn>
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
