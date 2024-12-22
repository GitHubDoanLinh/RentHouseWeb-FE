import {createAsyncThunk} from "@reduxjs/toolkit";
import getAxios from "./customAxios";

export const getAllWishlist = createAsyncThunk(
    'wishlists/getAllWishlist',
    async (userId) => {
        let response = await getAxios().get(`/wishlist/${userId}`);
        return response.data;
    }
)
export const createHouseInWishlist = createAsyncThunk(
    'wishlists/createHouseWishlist',
    async (data) => {
        let response = await getAxios().post("/wishlist", data)
        return response.data
    }
)
export const removeHouseInWishlist = createAsyncThunk(
    'wishlists/removeHouseInWishlist',
    async (wishListId) => {
        let response = await getAxios().delete(`/wishlist/${wishListId}`)
        return response.data
    }
)