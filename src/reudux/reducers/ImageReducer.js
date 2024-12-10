import { createSlice } from "@reduxjs/toolkit"
import { addImages, getAllImage, getImageByHouseId } from "../services/ImageService"

const initialState = {
    list: [],
    listImage: []
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
        builder.addCase(getImageByHouseId.fulfilled, (state, {payload}) => {
            state.listImage = payload;
        })
    }
})
export default imageSlice.reducer;