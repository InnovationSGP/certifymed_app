"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import GoogleButton from "../common/GoogleButton";
import PrimaryBtn from "../common/PrimaryBtn";
import PasswordInput from "../homepage/PasswordInput";
import { CertifyLogo } from "../common/AppIcons";
import { setUser as setUserAction } from "@/redux/slices/userSlice";
import SpinnerLoader from "../common/SpinnerLoader";
import { useRouter } from "next/navigation";
import { Eyeclose, EyeIcon } from "../common/Icons";
import { validateEmail } from "@/utils/inputFieldHelpers";
import { validatePassword } from "@/utils/inputFieldHelpers";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const newErrors = {};

    // Validate email
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate password
    if (!password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(password)) {
      newErrors.password = `Include at least one uppercase letter, one lowercase letter, one number,
 and one special character (e.g., !, @, #, $, %, ^, &) with at least 8 characters.`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); // Clear errors
    setIsLoggingIn(true);

    try {
      const response = await fetch(
        "https://mocki.io/v1/4fb9f4a5-7737-49bd-bca4-32fcf288eae3",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();

      if (response.ok) {
        // Dispatch the user details to Redux store
        dispatch(
          setUserAction({
            id: data.id,
            username: data.username,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            image: data.image,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            isLoggedIn: true,
          })
        );
        console.log("User logged in successfully", data);
        setIsLoggingIn(false);
        router.push("/");
        toast.success("Logged in successfully");
      } else {
        console.error("Login failed", data.message);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <section className="h-full w-full  max-w-[542px]">
      <div
        onKeyDown={handleKeyDown}
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
              <label className="font-medium text-dimGray" htmlFor="email">
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email)
                    setErrors((prev) => ({ ...prev, email: "" }));
                }}
              />
              {errors.email && (
                <p className="text-rose-500 mt-1 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="w-full">
              <label
                htmlFor="Password"
                className="block font-medium text-dimGray mb-[3px]"
              >
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
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors((prev) => ({ ...prev, password: "" }));
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
              {errors.password && (
                <p className="text-rose-500 mt-1 text-sm">{errors.password}</p>
              )}
            </div>
          </div>

          <PrimaryBtn
            onClick={handleLogin}
            className="w-full !h-[55px] xl:!h-[60px] mt-[23px] xl:mt-[30px]"
          >
            {isLoggingIn ? <SpinnerLoader /> : <p>Log in</p>}
          </PrimaryBtn>

          <Link
            className="text-primary tracking-[-0.32px] font-medium mt-3 block xl:mt-[18px]"
            href="/reset-password"
          >
            Forgot password?
          </Link>
        </div>
        <p className="text-center font-poppins font-medium py-5">
          Don’t have an account yet?
          <Link className="text-spandexGreen pl-1" href="/sign-up">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
