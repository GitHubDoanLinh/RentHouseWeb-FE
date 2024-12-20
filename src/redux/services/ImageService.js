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
        let response = await axios.post('http://localhost:8080/images/create/' + data[0], data[1]);
        return response.data;
    }
)

export const getImageByHouseId = createAsyncThunk(
    "images/getImageByHouseId",
    async (idHouse) => {    
        let res = await getAxios().get("images/" + idHouse);
        return res.data
    }
)

export const removeImageById = createAsyncThunk(
    'images/remove',
    async (id) => {
        let response = await axios.delete('http://localhost:8080/images/delete/' + id);
        return response.data;
    })

    export const showImage = async (id)=>{
        return await getAxios().get("images/" + id)
    }