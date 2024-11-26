import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "../services/UserService";

const initialState = {
  list: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {})
      .addCase(login.rejected, (state, action) => {})
      .addCase(register.fulfilled, (state, { payload }) => {});
  },
});
export default userSlice.reducer;
