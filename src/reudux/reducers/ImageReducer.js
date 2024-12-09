import { createSlice } from "@reduxjs/toolkit"
import { addImages, getAllImage } from "../services/ImageService"

const initialState = {
    list:[]
}
const imageSlice = createSlice({
    name: 'images',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllImage.fulfilled, (state, {payload}) => {
            state.list = payload;
        })
        builder.addCase(addImages.fulfilled,(state,{payload}) => {
            state.list.push(payload);
        })
    }
})
export default imageSlice.reducer;