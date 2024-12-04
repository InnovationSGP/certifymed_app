"use client";
import Link from "next/link";
import { useState } from "react";
import { CertifyLogo } from "../common/AppIcons";
import PrimaryBtn from "../common/PrimaryBtn";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/utils/inputFieldHelpers";
import toast from "react-hot-toast";
import SpinnerLoader from "../common/SpinnerLoader";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleResetPassword = () => {
    setLoading(true);
    // Clear previous error
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Call API to request password reset
    toast.success("Password reset email sent successfully");
    router.push("/reset-password/authentication-code");
    setLoading(false);
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
          {error && <p className="text-rose-500 mt-1 text-sm">{error}</p>}
        </div>

        <PrimaryBtn
          onClick={handleResetPassword}
          className="w-full !tracking-[-0.32px] !h-[55px] xl:!h-[60px] mt-[23px] xl:mt-[30px]"
        >
          {loading ? <SpinnerLoader /> : "Request code"}
        </PrimaryBtn>
      </div>
      <p className="text-center font-poppins font-medium  py-5">
        Don’t have an account yet?
        <Link className="text-spandexGreen pl-1" href="/sign-up">
          Sign up
        </Link>
      </p>
    </section>
  );
};

export default ResetPassword;
