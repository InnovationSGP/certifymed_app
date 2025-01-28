import { setUser, updateUser } from "@/redux/slices/userSlice";
import axiosInstance from "@/utils/axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "",
  dob: null,
  countryCode: "+91",
};

export const useProfileForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);

  const updateFormField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updatePhoneData = (phoneData) => {
    setFormData((prev) => ({
      ...prev,
      phone: phoneData.phoneNumber,
      countryCode: phoneData.countryCode,
    }));
  };

  const resetForm = (data) => {
    setFormData(data || initialFormState);
    setIsEditing(false);
  };

  return {
    formData,
    isEditing,
    setIsEditing,
    updateFormField,
    updatePhoneData,
    resetForm,
  };
};

export const useProfileData = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  const parseDateOfBirth = (dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? null : date;
    } catch (error) {
      console.error("Error parsing date:", error);
      return null;
    }
  };

  const parseProfileData = (profileData) => {
    const dateOfBirth = parseDateOfBirth(profileData?.dateOfBirth);
    const phoneNumber = profileData?.phoneNumber?.replace(/\D/g, "") || "";
    const countryCode = profileData?.countryCode || "+91";

    return {
      firstName: profileData?.firstName || "",
      lastName: profileData?.lastName || "",
      email: profileData?.email || "",
      phone: phoneNumber,
      gender: profileData?.gender || "",
      dob: dateOfBirth,
      countryCode: countryCode,
    };
  };

  const fetchProfile = async () => {
    // If we already have user data in Redux, use that instead of making another API call
    if (user.id) {
      const parsedData = parseProfileData(user);
      return parsedData;
    }

    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/auth/api/users/user");

      if (response.data) {
        const profileData = response.data;
        const parsedData = parseProfileData(profileData);

        dispatch(
          setUser({
            _id: profileData._id,
            ...parsedData,
            countryName: profileData.countryName,
            createdAt: profileData.createdAt,
            updatedAt: profileData.updatedAt,
            roleType: profileData.roleType || "CUSTOMER",
          })
        );

        return parsedData;
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
      toast.error(error?.response?.data?.message || "Error fetching profile");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const saveProfile = async (formData) => {
    try {
      const dataToSend = {
        ...formData,
        dateOfBirth:
          formData.dob instanceof Date ? formData.dob.toISOString() : null,
        phoneNumber: formData.phone,
      };

      await axiosInstance.put(`/auth/api/users/${user.id}`, dataToSend);

      dispatch(
        updateUser({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phone,
          countryCode: formData.countryCode,
          gender: formData.gender,
          dateOfBirth: formData.dob,
          updatedAt: new Date().toISOString(),
        })
      );

      toast.success("Profile updated successfully");
      return true;
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error?.response?.data?.message || "Update profile failed");
      return false;
    }
  };

  return {
    isLoading,
    fetchProfile,
    saveProfile,
  };
};
