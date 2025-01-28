import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/utils/axios";
import { setUser, selectUser } from "@/redux/slices/userSlice";

const useInitialAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInitialUserData = async () => {
    // If we already have user data in Redux, don't fetch again
    if (user.id) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get("/auth/api/users/user");

      if (response.data) {
        const userData = response.data;

        const profileData = {
          _id: userData._id,
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
        };

        dispatch(setUser(profileData));
      }
    } catch (error) {
      console.error("Error fetching initial user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialUserData();
  }, []);

  return { isLoading };
};

export default useInitialAuth;
