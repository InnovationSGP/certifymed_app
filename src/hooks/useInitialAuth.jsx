import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/utils/axios";
import { setUser, selectUser } from "@/redux/slices/userSlice";

const useInitialAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(true);
  const initializationComplete = useRef(false);

  const fetchInitialUserData = async () => {
    // Prevent double initialization
    if (initializationComplete.current) return;

    // If we already have valid user data in Redux, don't fetch again
    if (user?.id && user?.accessToken) {
      setIsLoading(false);
      return;
    }

    // Try to get token from both localStorage and cookies
    const localStorageToken = localStorage.getItem("authToken");
    const cookieToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];
    const token = localStorageToken || cookieToken;

    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      // Set token in axios instance
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      const response = await axiosInstance.get("/auth/api/users/user");

      if (response.data) {
        const userData = response.data;

        const profileData = {
          accessToken: token,
          id: userData._id,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phoneNumber: userData.phoneNumber,
          countryCode: userData.countryCode || "+91",
          countryName: userData.countryName,
          gender: userData.gender,
          dateOfBirth: userData.dateOfBirth,
          createdAt: userData.createdAt,
          updatedAt: userData.updatedAt,
          roleType: userData.roleType || "CUSTOMER",
          userType: userData.userType || "CUSTOMER",
          isLoggedIn: true,
        };

        // Store token consistently
        localStorage.setItem("authToken", token);
        document.cookie = `authToken=${token}; path=/; secure; samesite=strict`;

        dispatch(
          setUser({
            ...profileData,
            access_token: token,
          })
        );
      }
    } catch (error) {
      console.error("Error fetching initial user data:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        document.cookie =
          "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    } finally {
      setIsLoading(false);
      initializationComplete.current = true;
    }
  };

  useEffect(() => {
    fetchInitialUserData();
  }, []);

  return { isLoading };
};

export default useInitialAuth;
