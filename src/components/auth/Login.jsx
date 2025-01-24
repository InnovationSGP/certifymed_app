"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import GoogleButton from "../common/GoogleButton";
import PrimaryBtn from "../common/PrimaryBtn";
import PasswordInput from "../homepage/PasswordInput";
import { CertifyLogo } from "../common/AppIcons";
import SpinnerLoader from "../common/SpinnerLoader";
import { Eyeclose, EyeIcon } from "../common/Icons";
import { setUser as setUserAction } from "@/redux/slices/userSlice";
import axiosInstance from "@/utils/axios";
import { validateEmail, validatePassword } from "@/utils/inputFieldHelpers";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.isLoggedIn || localStorage.getItem("accessToken")) {
      if (user.roleType === "CUSTOMER") {
        router.push("/dashboard/patients");
      } else {
        router.push("/dashboard/doctor");
      }
    }
  }, [user.isLoggedIn, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const { email, password } = formData;
    const newErrors = {};

    if (!email) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Invalid email address";

    if (!password) newErrors.password = "Password is required";
    else if (!validatePassword(password)) {
      newErrors.password = `Password must include at least 8 characters, with uppercase, lowercase, number, and special character.`;
    }

    return newErrors;
  };

  const handleLogin = async (e) => {
    // Prevent default form submission
    if (e) e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (isLoggingIn) return; // Prevent multiple submissions
    setIsLoggingIn(true);

    try {
      const response = await axiosInstance.post("/auth/api/users", formData);

      if (response.status === 200) {
        const data = response.data;

        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("refreshToken", data.refreshToken);

        dispatch(
          setUserAction({
            id: data._id,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            accessToken: data.access_token,
            refreshToken: data.refreshToken,
            isLoggedIn: true,
            roleType: data.roleType,
          })
        );
        toast.success("Logged in successfully");
        if (response.data.roleType === "CARE_COORDINATOR") {
          router.push("/dashboard/doctor");
        } else {
          router.push("/dashboard/patients");
        }
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred during login. Please try again."
      );
      console.error("Login error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <section className="h-full w-full max-w-[542px]">
      <form
        onSubmit={handleLogin}
        className="min-w-full mx-auto flex flex-col h-full"
      >
        <div className="grow h-full">
          <div className="flex items-center justify-center my-8 xl:my-[50px]">
            <Link href="/">
              <CertifyLogo />
            </Link>
          </div>
          <p className="text-center text-base md:text-xl font-semibold mb-10 xl:mb-[55px]">
            Welcome back! Login to continue
          </p>
          <GoogleButton />

          <div className="flex flex-col items-center gap-y-8 justify-center">
            {/* Email */}
            <div className="mt-[23px] w-full xl:mt-[30px]">
              <label htmlFor="email" className="font-medium text-dimGray">
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
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-rose-500 mt-1 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="w-full">
              <label htmlFor="password" className="font-medium text-dimGray">
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
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eyeclose /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && (
                <p className="text-rose-500 mt-1 text-sm">{errors.password}</p>
              )}
            </div>
          </div>

          <PrimaryBtn
            type="submit"
            className="w-full !h-[55px] xl:!h-[60px] mt-[23px] xl:mt-[30px]"
          >
            {isLoggingIn ? <SpinnerLoader /> : "Log in"}
          </PrimaryBtn>

          <Link
            href="/reset-password"
            className="text-primary tracking-[-0.32px] font-medium mt-3 block xl:mt-[18px]"
          >
            Forgot password?
          </Link>
        </div>
        <p className="text-center font-medium py-5">
          Don&apos;t have an account yet?
          <Link href="/sign-up" className="text-spandexGreen pl-1">
            Sign up
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
