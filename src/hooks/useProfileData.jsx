'use client';
import { setUser, updateUser } from "@/redux/slices/userSlice";
import axiosInstance from "@/utils/axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export function useProfileData() {
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
      countryName: profileData?.countryName || "India",
      roleType: profileData?.roleType || "CUSTOMER",
      userType: profileData?.userType || "CUSTOMER",
      createdAt: profileData?.createdAt
        ? new Date(profileData.createdAt)
        : null,
      updatedAt: profileData?.updatedAt
        ? new Date(profileData.updatedAt)
        : null,
    };
  };

  const fetchProfile = async () => {
    // If we already have user data in Redux with valid ID, use that
    const userId = user?.id || user?._id;
    if (userId) {
      const parsedData = parseProfileData(user);
      return parsedData;
    }

    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/auth/api/users/user");

      if (response.data) {
        const profileData = response.data;
        const parsedData = parseProfileData(profileData);

        // Store complete user data in Redux
        dispatch(
          setUser({
            id: profileData._id || profileData.id,
            _id: profileData._id || profileData.id,
            ...parsedData,
            countryName: profileData.countryName,
            createdAt: profileData.createdAt,
            updatedAt: profileData.updatedAt,
            roleType: profileData.roleType || "CUSTOMER",
            userType: profileData.userType || "CUSTOMER",
            isLoggedIn: true,
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
    const userId = user?.id || user?._id;
    if (!userId) {
      toast.error("User ID not found. Please try refreshing the page.");
      return false;
    }

    try {
      // Include all required fields in the request
      const dataToSend = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        countryCode: formData.countryCode,
        gender: formData.gender,
        dob:
          formData.dob instanceof Date
            ? formData.dob.toISOString()
            : formData.dob,
      };

      const response = await axiosInstance.put(
        `/auth/api/users/${userId}`,
        dataToSend
      );

      if (response.data) {
        // Update Redux store with new data
        dispatch(
          updateUser({
            ...dataToSend,
            updatedAt: new Date().toISOString(),
          })
        );

        toast.success("Profile updated successfully");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Profile update error:", error);
      if (error.response?.status === 404) {
        await fetchProfile();
        toast.error("Please try updating your profile again");
      } else {
        toast.error(error?.response?.data?.message || "Update profile failed");
      }
      return false;
    }
  };

  return {
    isLoading,
    fetchProfile,
    saveProfile,
  };
}
