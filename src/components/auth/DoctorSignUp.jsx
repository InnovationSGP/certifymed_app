"use client";
import Link from "next/link";
import SpinnerLoader from "../common/SpinnerLoader";
import { useRouter } from "next/navigation";
import { Eyeclose, EyeIcon } from "../common/Icons";
import React, { useState } from "react";
import { CertifyLogo, LeftIcon } from "../common/AppIcons";
import CustomDatePicker from "../common/CustomDatePicker";
import CustomSelect from "../common/CustomSelect";
import GoogleButton from "../common/GoogleButton";
import PhoneNumberInput from "../common/PhoneNumberInput";
import PrimaryBtn from "../common/PrimaryBtn";
import toast from "react-hot-toast";
import { validatePassword } from "@/utils/inputFieldHelpers";
import { validateEmail } from "@/utils/inputFieldHelpers";
import { validatePhone } from "@/utils/inputFieldHelpers";

const DoctorSignUp = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const options = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(password)) {
      newErrors.password = `Include at least one uppercase letter, one lowercase letter, one number,
 and one special character (e.g., !, @, #, $, %, ^, &) with at least 8 characters.`;
    }
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits)";
    }
    if (!dob) newErrors.dob = "Date of birth is required";
    if (!selectedValue) newErrors.selectedValue = "Gender is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      password,
      phone,
      dob,
      gender: selectedValue,
    };

    // Call API to register as a patient
    setLoading(true);
    console.log("User data submitted:", userData);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard/doctor");
      toast.success("Sign up successful");
    }, 1000);
  };

  return (
    <div className="w-full md:max-w-[542px] mx-auto">
      <div className="flex items-center justify-center my-9 xl:mt-[110px] xl:mb-[50px]">
        <Link href="/">
          <CertifyLogo />
        </Link>
      </div>

      <div className="flex items-center justify-center">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-x-[22px] text-base xl:text-xl font-semibold leading-[30px] mb-[41px] xl:mb-[56px]"
        >
          <LeftIcon />
          <p>
            Sign up as a doctor
            <span className="hidden sm:inline-block pl-1">
              and get ₦20,000 free credit.
            </span>
          </p>
        </button>
      </div>

      <GoogleButton />

      <form
        onSubmit={handleSubmit}
        className="gap-y-[23px] flex flex-col mb-8 sm:mb-[17px]"
      >
        <div className="grid md:grid-cols-2 gap-[23px]">
          {/* First Name */}
          <div>
            <label className="font-medium text-dimGray" htmlFor="fname">
              First name
            </label>
            <input
              id="fname"
              name="fname"
              className={`input-style mt-[3px] ${
                errors.firstName ? "border border-rose-500	" : ""
              }`}
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                if (errors.firstName)
                  setErrors((prev) => ({ ...prev, firstName: "" }));
              }}
            />
            {errors.firstName && (
              <p className="text-rose-500 mt-1	 text-sm">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="font-medium text-dimGray" htmlFor="lname">
              Last name
            </label>
            <input
              id="lname"
              name="lname"
              className={`input-style mt-[3px] ${
                errors.lastName ? "border border-rose-500" : ""
              }`}
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                if (errors.lastName)
                  setErrors((prev) => ({ ...prev, lastName: "" }));
              }}
            />
            {errors.lastName && (
              <p className="text-rose-500 mt-1 text-sm">{errors.lastName}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="font-medium text-dimGray">Gender</label>
            <CustomSelect
              options={options}
              value={selectedValue}
              onChange={(value) => {
                setSelectedValue(value);
                if (errors.selectedValue)
                  setErrors((prev) => ({ ...prev, selectedValue: "" }));
              }}
              error={!!errors.selectedValue}
            />
            {errors.selectedValue && (
              <p className="text-rose-500 mt-1 text-sm">
                {errors.selectedValue}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="font-medium text-dimGray">Date of Birth</label>
            <CustomDatePicker
              value={dob}
              onChange={(date) => {
                setDob(date);
                if (errors.dob) setErrors((prev) => ({ ...prev, dob: "" }));
              }}
              error={!!errors.dob}
            />
            {errors.dob && (
              <p className="text-rose-500 mt-1 text-sm">{errors.dob}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="font-medium text-dimGray" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              className={`input-style mt-[3px] ${
                errors.email ? "border border-rose-500" : ""
              }`}
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
              }}
            />
            {errors.email && (
              <p className="text-rose-500 mt-1 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="font-medium text-dimGray" htmlFor="phone">
              Phone Number
            </label>
            <PhoneNumberInput
              id="phone"
              value={phone}
              onChange={(value) => {
                setPhone(value);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
              }}
              error={!!errors.phone}
            />
            {errors.phone && (
              <p className="text-rose-500 mt-1 text-sm">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Password */}
        <div className="w-full">
          <label
            htmlFor="Password"
            className="block font-medium text-dimGray mb-[3px]"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              className={`input-style mt-[3px] ${
                errors.password ? "border border-rose-500" : ""
              }`}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password)
                  setErrors((prev) => ({ ...prev, password: "" }));
              }}
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

        <PrimaryBtn
          disabled={loading}
          onClick={handleSubmit}
          className="min-w-full  col-span-2  !h-[55px] xl:!h-[60px] disabled:bg-gray-600"
        >
          {" "}
          {loading ? <SpinnerLoader /> : "Sign up"}
        </PrimaryBtn>
      </form>

      <p className="text-center text-[13px] sm:text-sm w-full max-w-[470px] mx-auto">
        By clicking on “sign up”, it means you have read and accepted our{" "}
        <Link className="text-primary" href="">
          privacy policy
        </Link>{" "}
        and{" "}
        <Link className="text-primary" href="">
          terms of service.
        </Link>
      </p>

      <p className="text-center font-medium mt-[105px] mb-12">
        Already have an account?{" "}
        <Link className="text-spandexGreen" href="/login">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default DoctorSignUp;
