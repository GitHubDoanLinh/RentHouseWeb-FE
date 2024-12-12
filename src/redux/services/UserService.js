import { createAsyncThunk } from "@reduxjs/toolkit";
import getAxios from "./customAxios";

export const login = createAsyncThunk(
  "users/login",
  async (user, { rejectWithValue }) => {
    try {
      let res = await getAxios().post("auth/login", user);
      return res.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const register = createAsyncThunk(
  "users/register", 
  async (user) => {
    let res = await getAxios().post("auth/register", user)
  return res.data;
});

export const changePassword = createAsyncThunk(
  "users/changePassword",
  async (user) => {
    let res = await getAxios().patch(
      "users/change-password"
      , user);
    return res.data;
  }
);

export const editDetailUser = createAsyncThunk(
  "user/edit", 
  async (data) => {
  let res = await getAxios().patch("users/" + data.id, data);
  return res;
});

export const getUser = createAsyncThunk(
  "user/get", 
  async (id) => {
  let res = await getAxios().get("users/" + id);
  return res.data;
});

export const logout = createAsyncThunk(
  "users/logout", 
  async () => {
  try {
    let res = await getAxios().get("users/logout");
    return res.data;
  } catch (e) {
    console.log(e);
  }
});

