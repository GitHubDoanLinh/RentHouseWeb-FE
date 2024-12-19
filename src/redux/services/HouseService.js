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
        console.log(response)
        return response.data;
    }
)
export const getById = createAsyncThunk(
    "houses/getById",
    async (id) => {
        let response = await getAxios().get('houses/' +id);
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
    async (newHouse) => {
        console.log(newHouse)
        let response = await getAxios().patch('houses/update/' + newHouse.id, newHouse);
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