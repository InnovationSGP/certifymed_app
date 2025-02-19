'use client';
import { useState } from "react";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "",
  dob: null,
  countryCode: "+91",
  countryName: "India",
  roleType: "CUSTOMER",
  userType: "CUSTOMER",
  createdAt: null,
  updatedAt: null,
};

export function useProfileForm() {
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
      countryName: phoneData.countryName || prev.countryName,
    }));
  };

  const resetForm = (data = null) => {
    if (data) {
      // Make sure to preserve all fields when resetting with new data
      setFormData({
        ...initialFormState,
        ...data,
        roleType: data.roleType || initialFormState.roleType,
        userType: data.userType || initialFormState.userType,
        countryName: data.countryName || initialFormState.countryName,
        createdAt: data.createdAt || initialFormState.createdAt,
        updatedAt: data.updatedAt || initialFormState.updatedAt,
      });
    } else {
      setFormData(initialFormState);
    }
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
}
