'use client';
import { useState } from 'react';

const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    gender: '',
    dateOfBirth: null,
    countryCode: '+91',
    countryName: 'India',
    roleType: '',
    address: '',
    zipcode: '',
    state: '',
    countryName: '',
    phoneNumber: '',
    emergencyContactName: '',
    emergencyContactPhoneNumber: '',
    emergencyContactRelationship: '',
    apartment: '',
    visitReason: ''
};

export function useBookingForm() {
    const [formData, setFormData] = useState(initialFormState);
    const [isEditing, setIsEditing] = useState(false);

    const updateFormField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const updatePhoneData = (phoneData) => {
        setFormData((prev) => ({
            ...prev,
            phoneNumber: phoneData.phoneNumber,
            countryCode: phoneData.countryCode
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
                updatedAt: data.updatedAt || initialFormState.updatedAt
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
        resetForm
    };
}
