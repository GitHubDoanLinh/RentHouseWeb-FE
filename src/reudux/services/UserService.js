import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
    "users/login",
    async (user) => {
    let res = await axios.post("http://localhost:8080/login", user);
  return res.data;
});

export const register = createAsyncThunk(
    "users/register",
    async (user) => {
    let res = await axios.post("http://localhost:8080/register", user);
  return res.data;
});

export const changepassword = createAsyncThunk(
  "users/changepassword",
  async (user) =>{
    let res = await axios.patch("http://localhost:8080/users/change-password", user);
    return res;
  }
)