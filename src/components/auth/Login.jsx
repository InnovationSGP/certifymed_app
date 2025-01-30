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

// Role Selection Modal Component
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
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [pendingGoogleData, setPendingGoogleData] = useState(null);

  const setCookiesAndStorage = (userData) => {
    try {
      // Set cookies with proper attributes
      const cookieExpiry = new Date();
      cookieExpiry.setDate(cookieExpiry.getDate() + 30);

      // Make sure path is set to root and include necessary attributes
      const cookieOptions = `expires=${cookieExpiry.toUTCString()}; path=/; SameSite=Lax`;

      // Set auth token cookies - ensure they are being set
      document.cookie = `accessToken=${userData.access_token}; ${cookieOptions}`;
      document.cookie = `jwt=${userData.access_token}; ${cookieOptions}`;
      document.cookie = `userRole=${userData.roleType}; ${cookieOptions}`;

      // Log cookie setting for debugging
      console.log("Setting cookies with roleType:", userData.roleType);

      // Set localStorage values
      const localStorageData = {
        authToken: userData.access_token,
        userRole: userData.roleType,
        userType: userData.roleType,
        isLoggedIn: "true",
        userId: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber || "",
      };

      // Set all localStorage items
      Object.entries(localStorageData).forEach(([key, value]) => {
        localStorage.setItem(key, value || "");
      });

      // Update axios headers
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.access_token}`;

      return true;
    } catch (error) {
      console.error("Error setting auth data:", error);
      return false;
    }
  };

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
        console.log(userData, "userData");

        if (setCookiesAndStorage(userData)) {
          setAuth(userData);
          dispatch(setUser(userData));
          toast.success("Logged in successfully");

          router.push(
            userData.roleType === "CARE_COORDINATOR"
              ? "/dashboard/doctor"
              : "/dashboard/patients"
          );
        }
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

        // Set the token in localStorage and axios headers
        localStorage.setItem("authToken", authData.access_token);
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

            // Make sure cookies are set before redirect
            const cookiesSet = setCookiesAndStorage(completeUserData);

            if (cookiesSet) {
              setAuth(completeUserData);
              dispatch(setUser(completeUserData));

              // Force a small delay to ensure cookies are set
              await new Promise((resolve) => setTimeout(resolve, 100));

              // Determine redirect path
              const redirectPath =
                userData.roleType === "CUSTOMER"
                  ? "/dashboard/patients"
                  : "/dashboard/doctor";

              console.log("Redirecting to:", redirectPath);

              // Use window.location for hard redirect
              window.location.href = redirectPath;
              return; // Exit after redirect
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
        localStorage.removeItem("authToken");
        delete axiosInstance.defaults.headers.common["Authorization"];
      }

      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  const handleRoleSelection = async (selectedRole) => {
    if (!pendingGoogleData) return;
    setIsLoggingIn(true);

    try {
      // Register new user with selected role
      const registerResponse = await axiosInstance.post(
        "/auth/api/users/register",
        {
          ...pendingGoogleData,
          roleType: selectedRole,
          userType: selectedRole,
          access_token: pendingGoogleData.access_token, // Ensure token is included
        }
      );

      if (registerResponse.status === 200) {
        const userData = {
          ...registerResponse.data,
          access_token: pendingGoogleData.access_token,
        };

        if (setCookiesAndStorage(userData)) {
          setAuth(userData);
          dispatch(setUser(userData));
          toast.success("Account created successfully!");

          router.push(
            selectedRole === "CARE_COORDINATOR"
              ? "/dashboard/doctor"
              : "/dashboard/patients"
          );
        }
      }
    } catch (error) {
      console.error("Role selection error:", error.response || error);
      toast.error("Failed to complete registration");
      // Clean up on error
      localStorage.removeItem("authToken");
      delete axiosInstance.defaults.headers.common["Authorization"];
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

    // Clear existing auth data
    localStorage.clear();
    const cookies = document.cookie.split(";");
    cookies.forEach((cookie) => {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });

    window.location.href = `${baseUrl}?${params.toString()}`;
  };

  useEffect(() => {
    if (window.location.hash) {
      handleGoogleRedirect();
    }
  }, []);

  // Form validation and input handling functions remain the same...
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
            {/* Form fields remain the same... */}
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

      {/* Role Selection Modal */}
      <RoleSelectionModal
        isOpen={showRoleModal}
        onClose={() => {
          if (!isLoggingIn) {
            setShowRoleModal(false);
            setPendingGoogleData(null);
            // Clean up stored data
            localStorage.removeItem("authToken");
            delete axiosInstance.defaults.headers.common["Authorization"];
          }
        }}
        onRoleSelect={handleRoleSelection}
        isLoading={isLoggingIn}
      />
    </section>
  );
};

export default Login;
