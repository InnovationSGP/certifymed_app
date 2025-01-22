"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { CertifyLogo } from "../common/AppIcons";
import PrimaryBtn from "../common/PrimaryBtn";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/utils/inputFieldHelpers";
import toast from "react-hot-toast";
import SpinnerLoader from "../common/SpinnerLoader";
import axiosInstance from "@/utils/axios";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let interval;
    if (showOtpField && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    if (timer === 0) {
      setIsResendEnabled(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [showOtpField, timer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleRequestCode = async () => {
    setLoading(true);
    setError(""); 

    if (!email) {
      setError("Email is required");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/api/registration/password/forgot", { email });

      if (response.status === 200) {
        toast.success("Password reset email sent successfully");
        setShowOtpField(true);
        setTimer(300); // Reset the timer
        setIsResendEnabled(false); // Disable resend until timer ends
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError("");

    if (!otp) {
      setError("OTP is required");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/api/registration/verify/otp", { email, otp });

      if (response.status === 200) {
        toast.success("OTP verified successfully");
        router.push(`/reset-password/authentication-code?email=${encodeURIComponent(email)}`);
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
      setError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/auth/api/registration/password/resend/otp", { email });

      if (response.status === 200) {
        toast.success("OTP resent successfully");
        setTimer(300); // Restart the timer
        setIsResendEnabled(false); // Disable resend
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
      setError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-[542px] mx-auto flex flex-col h-full">
      <div className="grow h-full">
        <div className="flex  items-center justify-center my-8 lg:mb-[50px] lg:mt-[110px]">
          <Link href="/">
            <CertifyLogo />
          </Link>
        </div>

        <p className="text-center text-base md:text-xl font-semibold mb-10 xl:mb-[55px]">
          Reset your Password
        </p>
        <p className="text-center paragraph font-medium tracking-[-0.32px] max-w-[491px] mx-auto">
          {showOtpField
            ? "Enter the OTP sent to your email address to verify your identity."
            : "Please provide your email address to receive an authentication code for resetting your password."}
        </p>

        <div className="mt-[23px] xl:mt-[30px]">
          <label className="font-medium text-dimGray" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            className={`input-style mt-[3px] ${
              error && !showOtpField ? "border border-rose-500" : ""
            }`}
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            disabled={showOtpField}
          />
        </div>

        {showOtpField && (
          <div className="mt-[23px] xl:mt-[30px]">
            <label className="font-medium text-dimGray" htmlFor="otp">
              OTP
            </label>
            <input
              id="otp"
              name="otp"
              className={`input-style mt-[3px] ${
                error && otp ? "border border-rose-500" : ""
              }`}
              type="text"
              placeholder="Enter your OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">{`Time remaining: ${formatTime(timer)}`}</span>
              <button
                onClick={handleResendOtp}
                disabled={!isResendEnabled}
                className={`text-sm font-medium ${
                  isResendEnabled ? "text-spandexGreen" : "text-gray-400"
                }`}
              >
                Resend OTP
              </button>
            </div>
          </div>
        )}
            {error && <p className="text-rose-500 mt-1 text-sm">{error}</p>}

        <PrimaryBtn
          onClick={showOtpField ? handleVerifyOtp : handleRequestCode}
          className="w-full !tracking-[-0.32px] !h-[55px] xl:!h-[60px] mt-[23px] xl:mt-[30px]"
        >
          {loading ? <SpinnerLoader /> : showOtpField ? "Verify OTP" : "Request Code"}
        </PrimaryBtn>
      </div>
      <p className="text-center font-poppins font-medium py-5">
        Don’t have an account yet?
        <Link className="text-spandexGreen pl-1" href="/sign-up">
          Sign up
        </Link>
      </p>
    </section>
  );
};

export default ResetPassword;
