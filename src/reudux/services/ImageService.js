import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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