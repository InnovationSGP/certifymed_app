import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  _id: null, // Add _id field for compatibility
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
      const token = userData.access_token || userData.accessToken || "";

      // Handle both id formats
      const userId = userData._id || userData.id || null;

      if (token) {
        localStorage.setItem("authToken", token);
        document.cookie = `authToken=${token}; path=/; secure; samesite=strict`;
      }

      return {
        ...state,
        id: userId,
        _id: userId,
        email: userData.email || "",
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        roleType: userData.roleType || "CUSTOMER",
        userType: userData.userType || "CUSTOMER",
        accessToken: token,
        refreshToken: userData.refreshToken || "",
        countryCode: userData.countryCode || "+91",
        countryName: userData.countryName || "India",
        phoneNumber: userData.phoneNumber || "",
        gender: userData.gender || "",
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
      const dateFields = ["dateOfBirth", "createdAt", "updatedAt"];

      Object.keys(updates).forEach((key) => {
        if (dateFields.includes(key) && updates[key]) {
          try {
            state[key] = new Date(updates[key]).toISOString();
          } catch (error) {
            console.error(`Error processing date for ${key}:`, error);
            state[key] = null;
          }
        } else {
          state[key] = updates[key];
        }
      });
    },
    clearUser: (state) => {
      localStorage.removeItem("authToken");
      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      return initialState;
    },
  },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;

// Enhanced selectors
export const selectUser = (state) => state.user;
export const selectUserId = (state) => state.user.id || state.user._id;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

export default userSlice.reducer;
