"use client";

import { setUser } from "@/redux/slices/userSlice";
import { clearAuth, setAuth } from "@/utils/auth";
import axiosInstance from "@/utils/axios";
import { validateEmail, validatePassword } from "@/utils/inputFieldHelpers";
import { TransitionLink } from "@/utils/TransitionLink";
import { useTransitionRouteChange } from "@/utils/useTransitionRouteChange";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { CertifyLogo } from "../common/AppIcons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../common/Dialog";
import GoogleButton from "../common/GoogleButton";
import { Eyeclose, EyeIcon } from "../common/Icons";
import PrimaryBtn from "../common/PrimaryBtn";
import SpinnerLoader from "../common/SpinnerLoader";

const RoleSelectionModal = ({ isOpen, onClose, onRoleSelect, isLoading }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
  const { handleTransition } = useTransitionRouteChange();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [pendingGoogleData, setPendingGoogleData] = useState(null);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;
    if (isLoggingIn) return;

    setIsLoggingIn(true);

    try {
      const response = await axiosInstance.post("/auth/api/users", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        const userData = response.data;

        if (setAuth(userData)) {
          dispatch(setUser(userData));
          toast.success("Logged in successfully");

          // Add a small delay to ensure cookies are set
          await new Promise((resolve) => setTimeout(resolve, 100));

          const redirectPath =
            userData.roleType === "CARE_COORDINATOR"
              ? "/dashboard/doctor"
              : "/dashboard/patients";

          handleTransition(redirectPath);
        } else {
          toast.error("Failed to set authentication data");
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          "An error occurred during login. Please try again."
      );
      console.error("Login error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleRedirect = async () => {
    const hash = window.location.hash;
    if (hash && hash.includes("auth=")) {
      try {
        const encodedData = hash.split("auth=")[1];
        const decodedData = Buffer.from(encodedData, "base64").toString();
        const authData = JSON.parse(decodedData);

        if (!authData || !authData.access_token) {
          throw new Error("No auth token found");
        }

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${authData.access_token}`;

        try {
          const userResponse = await axiosInstance.get("/auth/api/users/user");
          const userData = userResponse.data;

          if (userData && userData.roleType) {
            const completeUserData = {
              ...userData,
              access_token: authData.access_token,
            };

            if (setAuth(completeUserData)) {
              dispatch(setUser(completeUserData));

              await new Promise((resolve) => setTimeout(resolve, 100));

              window.location.href =
                userData.roleType === "CARE_COORDINATOR"
                  ? "/dashboard/doctor"
                  : "/dashboard/patients";
              return;
            }
          } else {
            setPendingGoogleData({
              ...authData,
              access_token: authData.access_token,
            });
            setShowRoleModal(true);
          }
        } catch (error) {
          if (error.response?.status === 404) {
            setPendingGoogleData({
              ...authData,
              access_token: authData.access_token,
            });
            setShowRoleModal(true);
          } else {
            throw error;
          }
        }
      } catch (error) {
        console.error("Google auth error:", error);
        toast.error("Failed to complete Google authentication");
        clearAuth();
      }

      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  const handleRoleSelection = async (selectedRole) => {
    if (!pendingGoogleData) return;
    setIsLoggingIn(true);

    try {
      const registerResponse = await axiosInstance.post(
        "/auth/api/users/register",
        {
          ...pendingGoogleData,
          roleType: selectedRole,
          userType: selectedRole,
          access_token: pendingGoogleData.access_token,
        }
      );

      if (registerResponse.status === 200) {
        const userData = {
          ...registerResponse.data,
          access_token: pendingGoogleData.access_token,
        };

        if (setAuth(userData)) {
          dispatch(setUser(userData));
          toast.success("Account created successfully!");

          await new Promise((resolve) => setTimeout(resolve, 100));

          handleTransition(
            selectedRole === "CARE_COORDINATOR"
              ? "/dashboard/doctor"
              : "/dashboard/patients"
          );
        }
      }
    } catch (error) {
      console.error("Role selection error:", error);
      toast.error("Failed to complete registration");
      clearAuth();
    } finally {
      setIsLoggingIn(false);
      setShowRoleModal(false);
      setPendingGoogleData(null);
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

    clearAuth();
    window.location.href = `${baseUrl}?${params.toString()}`;
  };

  useEffect(() => {
    if (window.location.hash) {
      handleGoogleRedirect();
    }
  }, []);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <section className="h-full w-full max-w-[542px]">
      <div className="min-w-full mx-auto flex flex-col h-full">
        <div className="grow h-full">
          <div className="flex items-center justify-center my-8 xl:my-[50px]">
            <TransitionLink href="/">
              <CertifyLogo />
            </TransitionLink>
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
              <div className="w-full">
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
              disabled={isLoggingIn}
            >
              {isLoggingIn ? <SpinnerLoader /> : "Log in"}
            </PrimaryBtn>
          </form>
          <TransitionLink
            href="/reset-password"
            className="text-primary tracking-[-0.32px] font-medium mt-3 block xl:mt-[18px]"
          >
            Forgot password?
          </TransitionLink>
        </div>
        <p className="text-center font-medium py-5">
          Don&apos;t have an account yet?{" "}
          <TransitionLink href="/sign-up" className="text-spandexGreen pl-1">
            Sign up
          </TransitionLink>
        </p>
      </div>

      <RoleSelectionModal
        isOpen={showRoleModal}
        onClose={() => {
          if (!isLoggingIn) {
            setShowRoleModal(false);
            setPendingGoogleData(null);
            clearAuth();
          }
        }}
        onRoleSelect={handleRoleSelection}
        isLoading={isLoggingIn}
      />
    </section>
  );
};

export default Login;
