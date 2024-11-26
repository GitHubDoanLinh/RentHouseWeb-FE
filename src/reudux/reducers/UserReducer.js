import { createSlice } from "@reduxjs/toolkit";
import { login } from "../services/UserService";

const initialState = {
  list: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
        
    });
  },
});
export default userSlice.reducer;
