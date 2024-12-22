import {createAsyncThunk} from "@reduxjs/toolkit";
import getAxios from "./customAxios";

export const addBooking = createAsyncThunk(
    'booking/addBooking',
    async (data) => {
        let response = await getAxios().post('/booking', data);
        return response.data;
    }
)
export const getHistoryBooking = createAsyncThunk(
    'booking/getHistoryBooking',
    async (idUser) => {
        let response = await getAxios().get(`/booking/histories/${idUser}`);
        return response.data;
    }
)
export const removeBooking = createAsyncThunk(
    'booking/removeBooking',
    async (idBooking) => {
        let response = await getAxios().delete(`/booking/${idBooking}`)
        return response.data;
    }
)
export const getAllBookingByHouseId = createAsyncThunk(
    'booking/getAllBookingByHouseId',
    async (idHouse) => {
        let response = await getAxios().get(`booking/house/${idHouse}`)
        return response.data
    }
)
export const getAllBookingByHostId = createAsyncThunk(
    'booking/getAllBookingByHostId',
    async (idHost) => {
        let response = await getAxios().get(`booking/list/${idHost}`)
        return response.data
    }
)
export const setCheckInStatus = createAsyncThunk(
    'booking/setCheckInStatus',
    async (idBooking) => {
        let response = await getAxios().patch(`/booking/status/${idBooking}`)
        return response.data;
    }
)

export const getMoney = createAsyncThunk(
    'booking/getMoney',
    async ({ month, userId }) => {
        try {
            let response = await getAxios().get(`/booking/moneyWeek/${userId}?month=${month}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
)