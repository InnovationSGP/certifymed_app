"use client";

import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { setUser } from "@/redux/slices/userSlice";
import { setAuth, clearAuth } from "@/utils/auth";
import axiosInstance from "@/utils/axios";
import {
  validateEmail,
  validatePassword,
  validatePhone,
} from "@/utils/inputFieldHelpers";
import { CertifyLogo } from "../common/AppIcons";
import CustomDatePicker from "../common/CustomDatePicker";
import CustomSelect from "../common/CustomSelect";
import GoogleButton from "../common/GoogleButton";
import { Eyeclose, EyeIcon } from "../common/Icons";
import PhoneNumberInput from "../common/PhoneNumberInput";
import PrimaryBtn from "../common/PrimaryBtn";
import SpinnerLoader from "../common/SpinnerLoader";
import { TransitionLink } from "@/utils/TransitionLink";

const SignUp = ({ role }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    phoneNumber: "",
    countryCode: "+234",
    countryName: "Nigeria",
    dateOfBirth: null,
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const handleChange = useCallback(
    (key, value) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
      if (errors[key]) {
        setErrors((prev) => ({ ...prev, [key]: "" }));
      }
    },
    [errors]
  );

  const handlePhoneChange = useCallback(
    (phoneData) => {
      setFormData((prev) => ({
        ...prev,
        phoneNumber: phoneData.phoneNumber,
        countryCode: phoneData.countryCode,
        countryName: phoneData.countryName,
      }));

      if (errors.phoneNumber) {
        setErrors((prev) => ({ ...prev, phoneNumber: "" }));
      }
    },
    [errors]
  );

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must include uppercase, lowercase, number, and special character (8+ chars)";
    }

    if (!formData.passwordConfirmation) {
      newErrors.passwordConfirmation = "Please confirm your password";
    } else if (formData.password !== formData.passwordConfirmation) {
      newErrors.passwordConfirmation = "Passwords do not match";
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "Please enter a valid phone number (10-15 digits)";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }
    if (!formData.gender) newErrors.gender = "Gender is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const userType = role === "doctor" ? "CARE_COORDINATOR" : "CUSTOMER";

      const response = await axiosInstance.post("/auth/api/registration", {
        ...formData,
        dateOfBirth:
          formData.dateOfBirth instanceof Date
            ? formData.dateOfBirth.toISOString()
            : null,
        role: "USER",
        userType,
      });

      if (response.status === 200 || response.status === 201) {
        const responseData = response.data;

        // Transform response data
        const userData = {
          ...responseData,
          access_token: responseData.user?.access_token,
          roleType:
            responseData.role?.role || responseData.roleType || userType,
          userType:
            responseData.role?.userType || responseData.userType || userType,
          id: responseData.user?._id,
          firstName: responseData.user?.firstName || responseData.firstName,
          lastName: responseData.user?.lastName || responseData.lastName,
          email: responseData.role?.email || responseData.email,
          phoneNumber:
            responseData.user?.phoneNumber || responseData.phoneNumber,
          countryCode: responseData.user?.countryCode || formData.countryCode,
          countryName: responseData.user?.countryName || formData.countryName,
          gender: responseData.user?.gender || formData.gender,
          dateOfBirth: responseData.user?.dateOfBirth || formData.dateOfBirth,
          createdAt: responseData.user?.createdAt || responseData.createdAt,
          updatedAt: responseData.user?.updatedAt || responseData.updatedAt,
        };

        if (setAuth(userData)) {
          dispatch(setUser(userData));
          toast.success("Sign up successful!");

          // Add a small delay to ensure cookies are set
          await new Promise((resolve) => setTimeout(resolve, 100));

          window.location.href =
            userData.userType === "CARE_COORDINATOR"
              ? "/dashboard/doctor"
              : "/dashboard/patients";
        } else {
          toast.error("Failed to set authentication data");
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(
        error.response?.data?.message || "Failed to sign up. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = useCallback(() => {
    try {
      const userType = role === "doctor" ? "CARE_COORDINATOR" : "CUSTOMER";
      const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`;
      const stateParam = {
        role: "USER",
        userType,
        redirectUrl: window.location.origin + "/auth/callback",
      };

      // Clear existing auth data
      clearAuth();

      window.location.href = `${baseUrl}?${new URLSearchParams({
        state: JSON.stringify(stateParam),
      }).toString()}`;
    } catch (error) {
      console.error("Error initiating Google Sign Up:", error);
      toast.error("Failed to initiate Google sign up");
    }
  }, [role]);

  const handleGoogleRedirect = useCallback(async () => {
    const hash = window.location.hash;
    if (hash && hash.includes("auth=")) {
      try {
        const encodedData = hash.split("auth=")[1];
        const decodedData = Buffer.from(encodedData, "base64").toString();
        const authData = JSON.parse(decodedData);

        if (!authData) {
          throw new Error("No auth data found");
        }

        // Clear any existing auth data
        clearAuth();

        // Set new auth data
        const authSuccess = setAuth(authData);

        if (authSuccess) {
          // Update Redux state
          dispatch(setUser({ ...authData, isLoggedIn: true }));

          // Update axios headers
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${authData.access_token}`;

          toast.success("Google sign in successful!");

          // Clean up URL
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );

          // Add a small delay to ensure all state updates are processed
          await new Promise((resolve) => setTimeout(resolve, 100));

          const redirectPath =
            authData.roleType === "CARE_COORDINATOR"
              ? "/dashboard/doctor"
              : "/dashboard/patients";

          window.location.href = redirectPath;
        } else {
          toast.error("Failed to set authentication data");
        }
      } catch (error) {
        console.error("Error processing Google auth data:", error);
        toast.error("Failed to complete Google authentication");
        clearAuth();
      }
    }
  }, [dispatch]);

  useEffect(() => {
    const handleInitialRedirect = async () => {
      if (window.location.hash) {
        await handleGoogleRedirect();
      }
    };
    handleInitialRedirect();
  }, [handleGoogleRedirect]);

  return (
    <div className="w-full md:max-w-[542px] mx-auto">
      <div className="flex items-center justify-center my-9 xl:mt-[110px] xl:mb-[50px]">
        <TransitionLink href="/">
          <CertifyLogo />
        </TransitionLink>
      </div>

      <GoogleButton onClick={handleGoogleSignUp} />

      <form
        onSubmit={handleSubmit}
        className="gap-y-[23px] flex flex-col mb-8 sm:mb-[17px]"
      >
        <div className="grid md:grid-cols-2 gap-[23px]">
          {/* First Name */}
          <div>
            <label className="font-medium text-dimGray">First Name</label>
            <input
              type="text"
              className={`input-style mt-[3px] ${
                errors.firstName ? "border-rose-500" : ""
              }`}
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
            {errors.firstName && (
              <p className="text-rose-500 mt-1 text-sm">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="font-medium text-dimGray">Last Name</label>
            <input
              type="text"
              className={`input-style mt-[3px] ${
                errors.lastName ? "border-rose-500" : ""
              }`}
              placeholder="Last name"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
            {errors.lastName && (
              <p className="text-rose-500 mt-1 text-sm">{errors.lastName}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="font-medium text-dimGray">Gender</label>
            <CustomSelect
              options={genderOptions}
              value={formData.gender}
              onChange={(value) => handleChange("gender", value)}
              error={!!errors.gender}
            />
            {errors.gender && (
              <p className="text-rose-500 mt-1 text-sm">{errors.gender}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="font-medium text-dimGray">Date of Birth</label>
            <CustomDatePicker
              value={formData.dateOfBirth}
              onChange={(date) => handleChange("dateOfBirth", date)}
              error={!!errors.dateOfBirth}
            />
            {errors.dateOfBirth && (
              <p className="text-rose-500 mt-1 text-sm">{errors.dateOfBirth}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="font-medium text-dimGray">Email</label>
            <input
              type="email"
              className={`input-style mt-[3px] ${
                errors.email ? "border-rose-500" : ""
              }`}
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && (
              <p className="text-rose-500 mt-1 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="font-medium text-dimGray">Phone Number</label>
            <PhoneNumberInput
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              error={!!errors.phoneNumber}
            />
            {errors.phoneNumber && (
              <p className="text-rose-500 mt-1 text-sm">{errors.phoneNumber}</p>
            )}
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="font-medium text-dimGray">Password</label>
          <div className="relative">
            <input
              className={`input-style mt-[3px] ${
                errors.password ? "border-rose-500" : ""
              }`}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <Eyeclose /> : <EyeIcon />}
            </button>
          </div>
          {errors.password && (
            <p className="text-rose-500 mt-1 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="font-medium text-dimGray">Confirm Password</label>
          <div className="relative">
            <input
              className={`input-style mt-[3px] ${
                errors.passwordConfirmation ? "border-rose-500" : ""
              }`}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.passwordConfirmation}
              onChange={(e) =>
                handleChange("passwordConfirmation", e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <Eyeclose /> : <EyeIcon />}
            </button>
          </div>
          {errors.passwordConfirmation && (
            <p className="text-rose-500 mt-1 text-sm">
              {errors.passwordConfirmation}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <PrimaryBtn
          type="submit"
          disabled={loading}
          className="min-w-full col-span-2 !h-[55px] xl:!h-[60px] disabled:bg-gray-600"
        >
          {loading ? <SpinnerLoader /> : "Sign up"}
        </PrimaryBtn>
      </form>

      {/* Sign In Link */}
      <p className="text-center font-medium mt-[105px] mb-12">
        Already have an account?{" "}
        <TransitionLink href="/login" className="text-spandexGreen">
          Sign in
        </TransitionLink>
      </p>
    </div>
  );
};

export default SignUp;
