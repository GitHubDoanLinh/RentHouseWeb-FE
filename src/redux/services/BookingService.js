import {createAsyncThunk} from "@reduxjs/toolkit";
import getAxios from "./customAxios";
export const addBooking = createAsyncThunk(
    'booking/addBooking',
    async (data) => {
        let response = await getAxios().post('/booking',data);
        return response.data;
    }
)