"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import { setAuth } from "@/utils/auth";
import axiosInstance from "@/utils/axios";
import { validateEmail, validatePassword } from "@/utils/inputFieldHelpers";
import { CertifyLogo } from "../common/AppIcons";
import GoogleButton from "../common/GoogleButton";
import { Eyeclose, EyeIcon } from "../common/Icons";
import PrimaryBtn from "../common/PrimaryBtn";
import SpinnerLoader from "../common/SpinnerLoader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../common/Dialog";

const RoleSelectionModal = ({ isOpen, onClose, onRoleSelect, isLoading }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center justify-center mb-8">
            <CertifyLogo />
          </div>
          <DialogTitle className="text-center">
            Please select your role to continue
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-8">
          <button
            onClick={() => onRoleSelect("CUSTOMER")}
            className="w-full h-[55px] xl:h-[60px] flex justify-center items-center text-white bg-primary rounded-xl hover:bg-primary/90 transition-colors duration-300 ease-in-out font-medium disabled:bg-gray-100"
            disabled={isLoading}
          >
            {isLoading ? <SpinnerLoader /> : "Continue as a Patient"}
          </button>

          <button
            onClick={() => onRoleSelect("CARE_COORDINATOR")}
            className="w-full h-[55px] xl:h-[60px] flex justify-center items-center text-primary bg-white border border-primary rounded-xl hover:bg-primary hover:text-white transition-colors duration-300 ease-in-out font-medium disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-500"
            disabled={isLoading}
          >
            {isLoading ? <SpinnerLoader /> : "Continue as a Doctor"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [pendingGoogleData, setPendingGoogleData] = useState(null);

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
      newErrors.password =
        "Password must include at least 8 characters, with uppercase, lowercase, number, and special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();

    if (!validateForm()) return;
    if (isLoggingIn) return;

    setIsLoggingIn(true);

    try {
      // Show role selection modal before proceeding with login
      setShowRoleModal(true);
      setPendingGoogleData({
        email: formData.email,
        password: formData.password,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred during login. Please try again."
      );
      console.error("Login error:", error);
      setIsLoggingIn(false);
    }
  };

  const processAuthData = async (authData) => {
    try {
      // If user already has a role, use it directly
      if (authData.roleType && authData.userType) {
        setAuth(authData);
        dispatch(setUser(authData));
        toast.success("Logged in successfully");

        router.push(
          authData.roleType === "CARE_COORDINATOR"
            ? "/dashboard/doctor"
            : "/dashboard/patients"
        );
      } else {
        // If no role is set, show the role selection modal
        setPendingGoogleData({ ...authData, googleAuth: true });
        setShowRoleModal(true);
      }
    } catch (error) {
      console.error("Error processing auth data:", error);
      toast.error("Failed to complete authentication");
    }
  };

  const handleRoleSelection = async (selectedRole) => {
    if (!pendingGoogleData) return;

    try {
      setIsLoggingIn(true);

      // For Google login
      if (pendingGoogleData.googleAuth) {
        const authData = {
          ...pendingGoogleData,
          roleType: selectedRole,
          userType: selectedRole,
        };

        setAuth(authData);
        dispatch(setUser(authData));
        toast.success("Google sign in successful!");
      }
      // For regular login
      else {
        const loginData = {
          ...pendingGoogleData, // contains email and password
          userType: selectedRole,
          roleType: selectedRole,
        };

        const response = await axiosInstance.post("/auth/api/users", loginData);

        if (response.status === 200) {
          const data = response.data;
          setAuth(data);
          dispatch(setUser(data));
          toast.success("Logged in successfully");
        }
      }

      setPendingGoogleData(null);
      setShowRoleModal(false);

      router.push(
        selectedRole === "CARE_COORDINATOR"
          ? "/dashboard/doctor"
          : "/dashboard/patients"
      );
    } catch (error) {
      console.error("Error processing role selection:", error);
      toast.error("Failed to complete authentication");
    } finally {
      setIsLoggingIn(false);
    }
  };
  const handleGoogleRedirect = () => {
    const hash = window.location.hash;
    if (hash && hash.includes("auth=")) {
      try {
        const encodedData = hash.split("auth=")[1];
        const decodedData = Buffer.from(encodedData, "base64").toString();
        const authData = JSON.parse(decodedData);

        if (!authData) {
          console.error("No auth data found");
          return;
        }

        // Process the auth data - this will check for existing role
        processAuthData(authData);

        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      } catch (error) {
        console.error("Error processing Google auth data:", error);
        toast.error("Failed to complete Google authentication");
      }
    }
  };

  const handleGoogleSignin = () => {
    const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`;
    const state = {
      role: "USER",
      redirectUrl: window.location.origin + "/auth/callback",
    };
    const params = new URLSearchParams({
      state: JSON.stringify(state),
    });

    localStorage.removeItem("isLoggedIn");
    window.location.href = `${baseUrl}?${params.toString()}`;
  };

  useEffect(() => {
    if (window.location.hash) {
      handleGoogleRedirect();
    }
  }, []);

  return (
    <section className="h-full w-full max-w-[542px]">
      <div className="min-w-full mx-auto flex flex-col h-full">
        <div className="grow h-full">
          <div className="flex items-center justify-center my-8 xl:my-[50px]">
            <Link href="/">
              <CertifyLogo />
            </Link>
          </div>
          <p className="text-center text-base md:text-xl font-semibold mb-10 xl:mb-[55px]">
            Welcome back! Login to continue
          </p>
          <GoogleButton
            text="Sign in with Google"
            onClick={handleGoogleSignin}
          />
          <form onSubmit={handleLogin}>
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
                  <p className="text-rose-500 mt-1 text-sm">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            <PrimaryBtn
              type="submit"
              className="w-full !h-[55px] xl:!h-[60px] mt-[23px] xl:mt-[30px]"
            >
              {isLoggingIn ? <SpinnerLoader /> : "Log in"}
            </PrimaryBtn>
          </form>
          <Link
            href="/reset-password"
            className="text-primary tracking-[-0.32px] font-medium mt-3 block xl:mt-[18px]"
          >
            Forgot password?
          </Link>
        </div>
        <p className="text-center font-medium py-5">
          Don&apos;t have an account yet?{" "}
          <Link href="/sign-up" className="text-spandexGreen pl-1">
            Sign up
          </Link>
        </p>
      </div>

      <RoleSelectionModal
        isOpen={showRoleModal}
        onClose={() => {
          if (!isLoggingIn) {
            setShowRoleModal(false);
            setPendingGoogleData(null);
          }
        }}
        onRoleSelect={handleRoleSelection}
        isLoading={isLoggingIn}
      />
    </section>
  );
};

export default Login;
