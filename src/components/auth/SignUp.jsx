"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import SpinnerLoader from "../common/SpinnerLoader";
import { Eyeclose, EyeIcon } from "../common/Icons";
import { CertifyLogo } from "../common/AppIcons";
import CustomDatePicker from "../common/CustomDatePicker";
import CustomSelect from "../common/CustomSelect";
import GoogleButton from "../common/GoogleButton";
import PhoneNumberInput from "../common/PhoneNumberInput";
import PrimaryBtn from "../common/PrimaryBtn";
import { validatePassword, validateEmail, validatePhone } from "@/utils/inputFieldHelpers";
import axiosInstance from "@/utils/axios";

const SignUp = ({ role }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    phoneNumber: "",
    dateOfBirth: null,
    selectedValue: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const options = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const handleChange = useCallback((key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  }, [errors]);

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
      newErrors.password = `Include at least one uppercase letter, one lowercase letter, one number,
      and one special character with at least 8 characters.`;
    }
    if (!formData.passwordConfirmation) {
      newErrors.passwordConfirmation = "Please confirm your password";
    } else if (formData.password !== formData.passwordConfirmation) {
      newErrors.passwordConfirmation = "Passwords do not match";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number (10-15 digits)";
    }
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.selectedValue) newErrors.selectedValue = "Gender is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const userData = {
      ...formData,
      role: "USER",
      userType: role === "doctor" ? "CARE_COORDINATOR" : "CUSTOMER",
    };

    try {
      setLoading(true);
      const data = await axiosInstance.post("/auth/api/registration", userData);
      if (data) {
        toast.success("Sign up successful");
        if (role === 'doctor') {
          router.push("/dashboard/doctor");
        } else {
          router.push("/dashboard/patients");
        }
      }
    } catch (error) {
      toast.error("Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (label, name, type = "text", placeholder = "", customProps = {}) => (
    <div>
      <label className="font-medium text-dimGray" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={`input-style mt-[3px] ${errors[name] ? "border border-rose-500" : ""}`}
        type={type}
        placeholder={placeholder}
        value={formData[name]}
        onChange={(e) => handleChange(name, e.target.value)}
        {...customProps}
      />
      {errors[name] && <p className="text-rose-500 mt-1 text-sm">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="w-full md:max-w-[542px] mx-auto">
      <div className="flex items-center justify-center my-9 xl:mt-[110px] xl:mb-[50px]">
        <Link href="/">
          <CertifyLogo />
        </Link>
      </div>

      <GoogleButton />

      <form onSubmit={handleSubmit} className="gap-y-[23px] flex flex-col mb-8 sm:mb-[17px]">
        <div className="grid md:grid-cols-2 gap-[23px]">
          {renderInput("First Name", "firstName", "text", "First name")}
          {renderInput("Last Name", "lastName", "text", "Last name")}
          <div>
            <label className="font-medium text-dimGray">Gender</label>
            <CustomSelect
              options={options}
              value={formData.selectedValue}
              onChange={(value) => handleChange("selectedValue", value)}
              error={!!errors.selectedValue}
            />
            {errors.selectedValue && <p className="text-rose-500 mt-1 text-sm">{errors.selectedValue}</p>}
          </div>
          <div>
            <label className="font-medium text-dimGray">Date of Birth</label>
            <CustomDatePicker
              value={formData.dateOfBirth}
              onChange={(date) => handleChange("dateOfBirth", date)}
              error={!!errors.dateOfBirth}
            />
            {errors.dateOfBirth && <p className="text-rose-500 mt-1 text-sm">{errors.dateOfBirth}</p>}
          </div>
          {renderInput("Email", "email", "email", "example@gmail.com")}
          <div>
            <label className="font-medium text-dimGray">Phone Number</label>
            <PhoneNumberInput
              value={formData.phoneNumber}
              onChange={(value) => handleChange("phoneNumber", value)}
              error={!!errors.phoneNumber}
            />
            {errors.phoneNumber && <p className="text-rose-500 mt-1 text-sm">{errors.phoneNumber}</p>}
          </div>
        </div>

        <div>
          <label className="font-medium text-dimGray" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              className={`input-style mt-[3px] ${errors.password ? "border border-rose-500" : ""}`}
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
          {errors.password && <p className="text-rose-500 mt-1 text-sm">{errors.password}</p>}
        </div>

        <div>
          <label className="font-medium text-dimGray" htmlFor="passwordConfirmation">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="passwordConfirmation"
              className={`input-style mt-[3px] ${errors.passwordConfirmation ? "border border-rose-500" : ""}`}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.passwordConfirmation}
              onChange={(e) => handleChange("passwordConfirmation", e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <Eyeclose /> : <EyeIcon />}
            </button>
          </div>
          {errors.passwordConfirmation && <p className="text-rose-500 mt-1 text-sm">{errors.passwordConfirmation}</p>}
        </div>

        <PrimaryBtn
          disabled={loading}
          className="min-w-full col-span-2 !h-[55px] xl:!h-[60px] disabled:bg-gray-600"
        >
          {loading ? <SpinnerLoader /> : "Sign up"}
        </PrimaryBtn>
      </form>

      <p className="text-center font-medium mt-[105px] mb-12">
        Already have an account?{" "}
        <Link href="/login" className="text-spandexGreen">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
