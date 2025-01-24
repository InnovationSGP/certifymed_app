"use client";
import { Eyeclose, EyeIcon } from "@/components/common/Icons";
import { useState, useEffect } from "react";
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

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [isResendEnabled, setIsResendEnabled] = useState(false);

  // Getting the user state from Redux
  const user = useSelector((state) => state.user);

  // Redirect if no email in URL
  useEffect(() => {
    if (!email) {
      router.push("/reset-password");
    }
  }, [email, router]);

  // Check for logged in user
  useEffect(() => {
    if (user.isLoggedIn || localStorage.getItem("accessToken")) {
      if (user.roleType === "CUSTOMER") {
        router.push("/dashboard/patients");
      } else {
        router.push("/dashboard/doctor");
      }
    }
  }, [user.isLoggedIn, router, user.roleType]);

  // Timer management
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    if (timer === 0) {
      setIsResendEnabled(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Format timer display
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Handle OTP resend
  const handleResendOtp = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        "/auth/api/registration/password/resend/otp",
        { email }
      );

      if (response.status === 200) {
        toast.success("OTP resent successfully");
        setTimer(300); // Reset timer to 5 minutes
        setIsResendEnabled(false);
        setErrors((prev) => ({ ...prev, otp: "" }));
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!otp) {
      newErrors.otp = "OTP is required";
    }

    if (!newPassword) {
      newErrors.newPassword = "Password is required";
    } else if (!validatePassword(newPassword)) {
      newErrors.newPassword =
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character with at least 8 characters.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      // First verify OTP
      const otpResponse = await axiosInstance.post(
        "/auth/api/registration/verify/otp",
        { email, otp }
      );

      if (otpResponse.status === 200) {
        // Then reset password
        const resetResponse = await axiosInstance.post(
          "/auth/api/registration/password/reset",
          {
            email,
            password: newPassword,
            passwordConfirmation: confirmPassword,
          }
        );

        toast.success("Password reset successfully");

        // Redirect based on user role
        if (resetResponse.data.user.roleType === "CARE_COORDINATOR") {
          router.push("/dashboard/doctor");
        } else {
          router.push("/dashboard/patients");
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error resetting password.");
      if (err.response?.data?.message?.includes("OTP")) {
        setErrors((prev) => ({ ...prev, otp: err.response.data.message }));
      }
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

      {/* Header */}
      <p className="text-center text-base md:text-xl font-semibold mb-10 xl:mb-[55px]">
        Reset your Password
      </p>
      <p className="text-center paragraph font-medium tracking-[-0.32px] max-w-[491px] mx-auto">
        Please enter the OTP sent to your email and set your new password.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-[23px] xl:space-y-6 mt-10"
      >
        {/* OTP Field */}
        <div>
          <label
            className="block font-medium text-dimGray mb-[3px]"
            htmlFor="otp"
          >
            OTP
          </label>
          <input
            id="otp"
            name="otp"
            className={`input-style ${
              errors.otp ? "border border-rose-500" : ""
            }`}
            type="text"
            placeholder="Enter your OTP"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
              if (errors.otp) setErrors((prev) => ({ ...prev, otp: "" }));
            }}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              {`Time remaining: ${formatTime(timer)}`}
            </span>
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={!isResendEnabled || loading}
              className={`text-sm font-medium ${
                isResendEnabled && !loading
                  ? "text-spandexGreen"
                  : "text-gray-400"
              }`}
            >
              Resend OTP
            </button>
          </div>
          {errors.otp && (
            <p className="text-rose-500 mt-1 text-sm">{errors.otp}</p>
          )}
        </div>

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
              id="newPassword"
              name="newPassword"
              className={`input-style ${
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
              name="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword)
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
          disabled={loading}
        >
          {loading ? <SpinnerLoader /> : "Reset Password"}
        </PrimaryBtn>
      </form>

      {/* Footer Link */}
      <p className="text-center font-poppins font-medium py-5 mt-4">
        Remember your password?
        <Link className="text-spandexGreen pl-1" href="/sign-in">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default AuthenticationCode;
