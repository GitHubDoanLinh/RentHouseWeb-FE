import { createSlice } from "@reduxjs/toolkit";
import {
  acceptToHost,
  changePassword,
  changepassword,
  deleteUser,
  editDetailUser,
  getAllUserByAdmin,
  getUser,
  login,
  logout,
  register,
  registerToHost,
} from "../services/UserService";

const initialState = {
  list: [],
  currentToken: JSON.parse(localStorage.getItem("currentToken")),
  currentUser: {
    username: "",
    email: "",
    fullName: "",
    address: "",
    phone: "",
    age: "",
    dateOfBirth: "",
    imageUser: "",
  },
};
const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        localStorage.setItem("currentToken", JSON.stringify(payload));
        state.currentToken = payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.currentToken = null;
      })
      .addCase(register.fulfilled, (state, { payload }) => {})
      .addCase(changePassword.fulfilled, (state, action) => {})
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.currentToken = null;
        localStorage.clear();
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
      })
      .addCase(editDetailUser.fulfilled, (state, action) => {})
      .addCase(getAllUserByAdmin.fulfilled, (state, { payload }) => {
        state.list = payload;
      })
      .addCase(registerToHost.fulfilled, (state, { payload }) => {})
      .addCase(acceptToHost.fulfilled, (state, { payload }) => {})
      .addCase(deleteUser.fulfilled, (state, { payload }) => {});
  },
});
export default userSlice.reducer;
