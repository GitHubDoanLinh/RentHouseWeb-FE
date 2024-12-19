import {createSlice} from "@reduxjs/toolkit";
import {getAllCategories} from "../services/CategoryService.js";
import {addBooking} from "../services/BookingService";
const initialState = {
    bookingInfo: {
        startDate: "",
        endDate: "",
        numberOfGuests: "",
        userId: "",
        houseId: "",
        price: ""
    }
}
const categorySlice = createSlice({
    name: 'bookings',
    initialState,
    extraReducers: builder => {
        builder.addCase(addBooking.fulfilled, (state, {payload}) => {
        })
    }
})
export default categorySlice.reducer;