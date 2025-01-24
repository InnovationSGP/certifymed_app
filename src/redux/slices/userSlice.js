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
  countryCode: "",
  countryName: "",
  phoneNumber: "",
  gender: "",
  dateOfBirth: null,
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
        isLoggedIn = true,
      } = action.payload;

      state.id = _id;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
      state.roleType = roleType;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.countryCode = countryCode;
      state.countryName = countryName;
      state.phoneNumber = phoneNumber;
      state.gender = gender;
      state.dateOfBirth = dateOfBirth;
      state.isLoggedIn = isLoggedIn;
    },
    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUser: (state) => {
      return initialState;
    },
  },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
