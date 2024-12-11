import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getAxios from "./customAxios";

export const getAllImage = createAsyncThunk(
    'images/getAll',
    async () => {
        let response = await axios.get('http://localhost:8080/images');
        return response.data;
    }
)

export const addImages = createAsyncThunk(
    'images/add',
    async (data) => {
        console.log(data);
        let response = await axios.get('http://localhost:8080/images/create/' +data.idHouse, data.imageList);
        return response.data;
    }
)

export const getImageByHouseId = createAsyncThunk(
    "images/getImageByHouseId",
    async (houseId) => {
        let res = await getAxios().get("images/" + houseId);
        return res.data
    }
)

export const removeImageById = createAsyncThunk(
    'images/remove',
    async (id) => {
        let response = await axios.delete('http://localhost:8080/images/delete/' + id);
        return response.data;
    })