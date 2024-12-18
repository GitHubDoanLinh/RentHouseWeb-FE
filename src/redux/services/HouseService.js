import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getAxios from "./customAxios";

export const getAllHouse = createAsyncThunk(
    "houses/getAllHouse", 
    async() => {
        let response = await getAxios().get('houses');
        return response.data;
    });
export const add = createAsyncThunk(
    'houses/add',
    async (newHouse) => {
        let response = await getAxios().post('houses/create',newHouse);
        return response.data;
    }
)
export const getById = createAsyncThunk(
    "houses/getById",
    async (id) => {
        let response = await getAxios().get('houses/' +id);
        console.log("IDDD",id)
        console.log("id",response)
        return response.data;
    }
)
export const removeById = createAsyncThunk(
    'houses/remove',
    async (id  ) => {
        let response = await getAxios().delete('houses/delete/' + id);
        return response.data;
    }
)
export const update = createAsyncThunk(
    'houses/update',
    async (newProduct) => {
        console.log(newProduct)
        let response = await axios.put('http://localhost:8080/houses/update/' + newProduct.id, newProduct);
        return response.data;
    }
)
export const getHouseByUser = createAsyncThunk(
    "houses/getHouseByUser",
    async (userId) => {
        let response = await getAxios().get('houses/user/' + userId);
        return response.data;
    }
)