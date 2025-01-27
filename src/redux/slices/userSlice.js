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
  initialState,
  reducers: {
    setUser: (state, action) => {
      const {
        _id,
        email,
        firstName,
        lastName,
        roleType,
        accessToken,
        refreshToken,
        countryCode,
        countryName,
        phoneNumber,
        gender,
        dateOfBirth,
        createdAt,
        updatedAt,
        isLoggedIn = true,
      } = action.payload;

      state.id = _id;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
      state.roleType = roleType;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.countryCode = countryCode || "+91";
      state.countryName = countryName || "India";
      state.phoneNumber = phoneNumber;
      state.gender = gender;
      state.dateOfBirth = dateOfBirth;
      state.createdAt = createdAt;
      state.updatedAt = updatedAt;
      state.isLoggedIn = isLoggedIn;
    },
    updateUser: (state, action) => {
      // Handle date conversion for dateOfBirth if needed
      const payload = { ...action.payload };
      if (payload.dateOfBirth && !(payload.dateOfBirth instanceof Date)) {
        try {
          payload.dateOfBirth = new Date(payload.dateOfBirth);
        } catch (error) {
          console.error("Error parsing date:", error);
        }
      }
      return { ...state, ...payload };
    },
    clearUser: () => {
      return initialState;
    },
  },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
