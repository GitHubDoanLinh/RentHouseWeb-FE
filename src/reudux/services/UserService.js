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
  "users/changePassword",
  async (user) =>{
    let res = await getAxios().patch("users/change-password", user);
    return res.data;
  }
)
export const editDetailUser = createAsyncThunk(
  'user/edit',
  async (data) => {
      let res = await getAxios().patch('users/' + data.id, data);
      return res;
  }
)
export const getUser = createAsyncThunk(
  'user/get',
  async (id)=>{
    let res = await getAxios().get('users/'+id);
    return res.data;
  }
)