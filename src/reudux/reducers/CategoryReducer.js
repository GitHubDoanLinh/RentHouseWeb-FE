import { createSlice } from "@reduxjs/toolkit"
import { getAllCategories } from "../services/CategoryService"

const initialState = {
    listCategories: []
}

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.listCategories = action.payload;
        })
    }
})
export default categorySlice.reducer;
