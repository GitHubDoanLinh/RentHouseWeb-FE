import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllHouse = createAsyncThunk(
    "houses/getAllHouse", 
    async() => {
        let response = await axios.get("http://localhost:8080/houses");
        return response.data;
    });
export const add = createAsyncThunk(
    'houses/add',
    async (newHouse) => {
        let response = await axios.post("http://localhost:8080/houses/create", newHouse);
        return response.data;
    }
)
export const getById = createAsyncThunk(
    "houses/getById",
    async (id) => {
        let response = await axios.get('http://localhost:8080/houses/' +id);
        return response.data;
    }
)
export const removeById = createAsyncThunk(
    'houses/remove',
    async (id  ) => {
        let response = await axios.delete('http://localhost:8080/houses/' + id);
        return response.data;
    }
)
export const update = createAsyncThunk(
    'houses/update',
    async (newProduct) => {
        console.log(newProduct)
        let response = await axios.put('http://localhost:8080/houses/'+newProduct.id,newProduct);
        return response.data;
    }
)