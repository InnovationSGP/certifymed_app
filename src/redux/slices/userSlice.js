// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const userData = action.payload;
      console.log(userData.access_token);

      return {
        ...state,
        id: userData._id || null,
        email: userData.email || "",
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        roleType: userData.roleType || "CUSTOMER",
        userType: userData.userType || "CUSTOMER",
        accessToken: userData.access_token,
        refreshToken: userData.refreshToken || "",
        countryCode: userData.countryCode || "+91",
        countryName: userData.countryName || "India",
        phoneNumber: userData.phoneNumber || "",
        gender: userData.gender || "",
        // Store dates as strings to avoid serialization issues
        dateOfBirth: userData.dateOfBirth
          ? new Date(userData.dateOfBirth).toISOString()
          : null,
        createdAt: userData.createdAt
          ? new Date(userData.createdAt).toISOString()
          : null,
        updatedAt: userData.updatedAt
          ? new Date(userData.updatedAt).toISOString()
          : null,
        isLoggedIn: true,
      };
    },
    updateUser: (state, action) => {
      const updates = action.payload;
      Object.keys(updates).forEach((key) => {
        if (
          ["dateOfBirth", "createdAt", "updatedAt"].includes(key) &&
          updates[key]
        ) {
          try {
            state[key] = new Date(updates[key]).toISOString();
          } catch (error) {
            console.error(`Error processing date for ${key}:`, error);
          }
        } else {
          state[key] = updates[key];
        }
      });
    },
    clearUser: () => initialState,
  },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUserWithDates = (state) => ({
  ...state.user,
  dateOfBirth: state.user.dateOfBirth ? new Date(state.user.dateOfBirth) : null,
  createdAt: state.user.createdAt ? new Date(state.user.createdAt) : null,
  updatedAt: state.user.updatedAt ? new Date(state.user.updatedAt) : null,
});

export default userSlice.reducer;
