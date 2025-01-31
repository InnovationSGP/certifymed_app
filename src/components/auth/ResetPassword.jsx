"use client";
import axiosInstance from "@/utils/axios";
import { validateEmail } from "@/utils/inputFieldHelpers";
import { TransitionLink } from "@/utils/TransitionLink";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { CertifyLogo } from "../common/AppIcons";
import PrimaryBtn from "../common/PrimaryBtn";
import SpinnerLoader from "../common/SpinnerLoader";

const ResetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      const response = await axiosInstance.post(
        "/auth/api/registration/password/forgot",
        { email }
      );

      if (response.status === 200) {
        toast.success("Password reset email sent successfully");
        // Redirect to authentication code page with email parameter
        router.push(
          `/reset-password/authentication-code?email=${encodeURIComponent(
            email
          )}`
        );
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-[542px] mx-auto flex flex-col h-full">
      <div className="grow h-full">
        <div className="flex items-center justify-center my-8 lg:mb-[50px] lg:mt-[110px]">
          <TransitionLink href="/">
            <CertifyLogo />
          </TransitionLink>
        </div>

        <p className="text-center text-base md:text-xl font-semibold mb-10 xl:mb-[55px]">
          Reset your Password
        </p>
        <p className="text-center paragraph font-medium tracking-[-0.32px] max-w-[491px] mx-auto">
          Please provide your email address to receive an authentication code
          for resetting your password.
        </p>

        <div className="mt-[23px] xl:mt-[30px]">
          <label className="font-medium text-dimGray" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            className={`input-style mt-[3px] ${
              error ? "border border-rose-500" : ""
            }`}
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
          />
        </div>

        {error && <p className="text-rose-500 mt-1 text-sm">{error}</p>}

        <PrimaryBtn
          onClick={handleRequestCode}
          className="w-full !tracking-[-0.32px] !h-[55px] xl:!h-[60px] mt-[23px] xl:mt-[30px]"
        >
          {loading ? <SpinnerLoader /> : "Request Code"}
        </PrimaryBtn>
      </div>
      <p className="text-center font-poppins font-medium py-5">
        Don&apos;t have an account yet?
        <TransitionLink className="text-spandexGreen pl-1" href="/sign-up">
          Sign up
        </TransitionLink>
      </p>
    </section>
  );
};

export default ResetPassword;
