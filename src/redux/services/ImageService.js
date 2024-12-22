import {createAsyncThunk} from "@reduxjs/toolkit";
import getAxios from "./customAxios";

export const getAllImage = createAsyncThunk(
    'images/getAll',
    async () => {
        let response = await getAxios().get('/images');
        return response.data;
    }
)
export const addImages = createAsyncThunk(
    'images/add',
    async (data) => {
        let response = await getAxios().post('/images/create/' + data[0], data[1]);
        return response.data;
    }
)
export const removeImageById = createAsyncThunk(
    'images/remove',
    async (id) => {
        let response = await getAxios().delete('/images/delete/' + id);
        return response.data;
    })
export const getImageByHouseId = createAsyncThunk(
    "images/getImageByHouseId",
    async (idHouse) => {
        let res = await getAxios().get("/images/" + idHouse);
        return res.data
    }

)
export const showImage = async (id)=>{
    return await getAxios().get("/images/" + id)
}