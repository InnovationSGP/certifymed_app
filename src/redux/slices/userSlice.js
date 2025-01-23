// slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  gender: "",
  image: false,
  accessToken: "",
  refreshToken: "",
  isLoggedIn: false,
  roleType: "CUSTOMER"
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.gender = action.payload.gender;
      state.image = action.payload.image;
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = action.payload.isLoggedIn
      state.refreshToken = action.payload.refreshToken;
      state.roleType = action.payload.roleType
    },
    updateUser: (state, action) => {
      const { username, email, firstName, lastName, gender, image } =
        action.payload;
      if (username !== undefined) state.username = username;
      if (email !== undefined) state.email = email;
      if (firstName !== undefined) state.firstName = firstName;
      if (lastName !== undefined) state.lastName = lastName;
      if (gender !== undefined) state.gender = gender;
      if (image !== undefined) state.image = image;
    },
    deleteUser: (state) => {
      state.id = null;
      state.username = "";
      state.email = "";
      state.firstName = "";
      state.lastName = "";
      state.gender = "";
      state.image = false;
      state.accessToken = "";
      state.refreshToken = "";
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
