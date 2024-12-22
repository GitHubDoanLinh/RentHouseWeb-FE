import {createSlice} from "@reduxjs/toolkit";
import {getAllCategories} from "../services/CategoryService.js";
import {createHouseInWishlist, getAllWishlist, removeHouseInWishlist} from "../services/WishlistService";

const initialState = {
    listWishlist: [],
}

const wishlistSlice = createSlice({
    name: 'wishlists',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllWishlist.fulfilled, (state, {payload}) => {
            state.listWishlist = payload;
        })
        builder.addCase(createHouseInWishlist.fulfilled,(state, {payload}) => {

        })
        builder.addCase(removeHouseInWishlist.fulfilled,(state, {payload}) => {

        })
    }

})
export default wishlistSlice.reducer;