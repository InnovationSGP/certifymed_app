"use client";
import { useState } from "react";
import { CertifyLogo } from "../common/AppIcons";
import PrimaryBtn from "../common/PrimaryBtn";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SpinnerLoader from "../common/SpinnerLoader";
import axiosInstance from "@/utils/axios";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState(""); // Optional: Fetch from state or query params
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError(""); // Clear errors

    if (!otp) {
      setError("OTP is required");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/auth/api/registration/verify/otp",
        { email, otp }
      );

      if (response.status === 200) {
        toast.success("OTP verified successfully");
        router.push("/reset-password/authentication-code");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
        setError(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-[542px] mx-auto flex flex-col h-full">
      <div className="grow h-full">
        <div className="flex items-center justify-center my-8 lg:mb-[50px] lg:mt-[110px]">
          <CertifyLogo />
        </div>

        <p className="text-center text-base md:text-xl font-semibold mb-10 xl:mb-[55px]">
          Verify OTP
        </p>
        <p className="text-center paragraph font-medium tracking-[-0.32px] max-w-[491px] mx-auto">
          Enter the OTP sent to your email address to verify your identity.
        </p>
        <div className="mt-[23px] xl:mt-[30px]">
          <label className="font-medium text-dimGray" htmlFor="otp">
            OTP
          </label>
          <input
            id="otp"
            name="otp"
            className={`input-style mt-[3px] ${
              error ? "border border-rose-500" : ""
            }`}
            type="text"
            placeholder="Enter your OTP"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
              if (error) setError("");
            }}
          />
          {error && <p className="text-rose-500 mt-1 text-sm">{error}</p>}
        </div>

        <PrimaryBtn
          onClick={handleVerifyOtp}
          className="w-full !tracking-[-0.32px] !h-[55px] xl:!h-[60px] mt-[23px] xl:mt-[30px]"
        >
          {loading ? <SpinnerLoader /> : "Verify OTP"}
        </PrimaryBtn>
      </div>
    </section>
  );
};

export default OtpVerification;
