// redux/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  email: "",
  firstName: "",
  lastName: "",
  isLoggedIn: false,
  roleType: "CUSTOMER",
  accessToken: "",
  refreshToken: "",
  countryCode: "+91",
  countryName: "India",
  phoneNumber: "",
  gender: "",
  dateOfBirth: null,
  createdAt: null,
  updatedAt: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    email: "",
    firstName: "",
    lastName: "",
    isLoggedIn: false,
    roleType: "CUSTOMER",
    userType: "CUSTOMER",
    accessToken: "",
    refreshToken: "",
    countryCode: "+91",
    countryName: "India",
    phoneNumber: "",
    gender: "",
    dateOfBirth: null,
    createdAt: null,
    updatedAt: null,
  },
  reducers: {
    setUser: (state, action) => {
      const userData = action.payload;
      return {
        ...state,
        id: userData._id,
        email: userData.email || "",
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        roleType: userData.roleType || "CUSTOMER",
        userType: userData.userType || "CUSTOMER",
        accessToken: userData.access_token || "",
        refreshToken: userData.refreshToken || "",
        countryCode: userData.countryCode || "+91",
        countryName: userData.countryName || "India",
        phoneNumber: userData.phoneNumber || "",
        gender: userData.gender || "",
        dateOfBirth: userData.dateOfBirth
          ? new Date(userData.dateOfBirth)
          : null,
        createdAt: userData.createdAt ? new Date(userData.createdAt) : null,
        updatedAt: userData.updatedAt ? new Date(userData.updatedAt) : null,
        isLoggedIn: true,
      };
    },
    updateUser: (state, action) => {
      const payload = { ...action.payload };
      // Handle date fields
      if (payload.dateOfBirth && !(payload.dateOfBirth instanceof Date)) {
        try {
          payload.dateOfBirth = new Date(payload.dateOfBirth);
        } catch (error) {
          console.error("Error parsing date:", error);
        }
      }
      return { ...state, ...payload };
    },
    clearUser: () => initialState,
  },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
