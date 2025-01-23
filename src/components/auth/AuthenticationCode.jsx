"use client";
import { Eyeclose, EyeIcon } from "@/components/common/Icons";
import { useState, useEffect } from 'react';
import { CertifyLogo } from "../common/AppIcons";
import Link from "next/link";
import PrimaryBtn from "../common/PrimaryBtn";
import toast from "react-hot-toast";
import { validatePassword } from "@/utils/inputFieldHelpers";
import SpinnerLoader from "../common/SpinnerLoader";
import axiosInstance from "@/utils/axios";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";

const AuthenticationCode = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [authCode, setAuthCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);


  // Getting the user state from Redux
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user.isLoggedIn || localStorage.getItem("accessToken")) {
      if(user.roleType === "CUSTOMER"){
        router.push("/dashboard/patients");
      } else {
        router.push("/dashboard/doctor");
      }
    }
  }, [user.isLoggedIn, router]);

  const handleSubmit =  async (e) => {
    setLoading(true);
    e.preventDefault();
    const newErrors = {};
    let valid = true;
      if (!newPassword) {
        newErrors.newPassword = "Password is required";
      } else if (!validatePassword(newPassword)) {
        newErrors.newPassword = `Include at least one uppercase letter, one lowercase letter, one number,
  and one special character (e.g., !, @, #, $, %, ^, &) with at least 8 characters.`;
      }

      if (!confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (confirmPassword !== newPassword) {
        newErrors.confirmPassword = "Password doesn’t match";
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      try {
      const response =  await axiosInstance.post("/auth/api/registration/password/reset", {
          email,
          password: newPassword,
          passwordConfirmation: confirmPassword,
        });
        toast.success("Password reset successfully");
        if(response.data.user.roleType == "CARE_COORDINATOR"){
          router.push("/dashboard/doctor");
        }else {
          router.push("/dashboard/patients");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Error resetting password.");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="w-full max-w-[542px] mx-auto">
      {/* Logo */}
      <div className="flex items-center justify-center my-8 lg:mb-[50px] xl:mt-24">
        <Link href="/">
          <CertifyLogo />
        </Link>
      </div>

      {/* Title and Description */}
      <p className="text-center text-base md:text-xl font-semibold mb-10 xl:mb-[55px]">
        Reset your Password
      </p>
      <p className="text-center paragraph font-medium tracking-[-0.32px] max-w-[491px] mx-auto">
        Please fill the form below to reset your password.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-[23px] xl:space-y-6 mt-10"
      >
        {/* Authentication Code */}
        {/* <div>
          <label
            htmlFor="authCode"
            className="block font-medium text-dimGray mb-[3px]"
          >
            Authentication Code
          </label>
          <input
            type="text"
            id="authCode"
            name="authCode"
            value={authCode}
            onChange={(e) => {
              setAuthCode(e.target.value);
              if (errors.authCode) {
                setErrors((prev) => ({ ...prev, authCode: "" }));
              }
            }}
            placeholder="1234"
            className={`input-style mt-[3px] ${
              errors.authCode ? "border border-rose-500" : ""
            }`}
          />
          {errors.authCode && (
            <p className="text-rose-500 mt-1 text-sm">{errors.authCode}</p>
          )}
        </div> */}

        {/* New Password */}
        <div>
          <label
            htmlFor="newPassword"
            className="block font-medium text-dimGray mb-[3px]"
          >
            New Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              className={`input-style mt-[3px] ${
                errors.newPassword ? "border border-rose-500" : ""
              }`}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (errors.newPassword)
                  setErrors((prev) => ({ ...prev, newPassword: "" }));
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
          {errors.newPassword && (
            <p className="text-rose-500 mt-1 text-sm">{errors.newPassword}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block font-medium text-dimGray mb-[3px]"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }}
              className={`input-style ${
                errors.confirmPassword ? "border border-rose-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <Eyeclose /> : <EyeIcon />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-rose-500 mt-1 text-sm">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <PrimaryBtn
          type="submit"
          className="w-full !tracking-[-0.32px] !h-[55px] xl:!h-[60px]"
        >
          {loading ? <SpinnerLoader /> : "Reset Password"}
        </PrimaryBtn>
      </form>
    </div>
  );
};

export default AuthenticationCode;
