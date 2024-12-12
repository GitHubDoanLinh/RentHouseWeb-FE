import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCategories = createAsyncThunk(
    'category/getAll',
    async () => {
        let response = await axios.get("http://localhost:8080/categories");
        return response.data;
    }
)