import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getAxios from "./customAxios";

export const login = createAsyncThunk(
    "users/login",
    async (user) => {
      let res = await getAxios().post("/login", user)
  return res.data;
});

export const register = createAsyncThunk(
    "users/register",
    async (user) => {
    let res = await axios.post("http://localhost:8080/register", user);
  return res.data;
});

export const changePassword = createAsyncThunk(
  "users/changepassword",
  async (user) =>{
    let res = await getAxios().patch("users/change-password", user);
    return res;
  }
)