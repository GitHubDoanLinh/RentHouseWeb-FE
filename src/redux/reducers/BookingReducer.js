import {createSlice} from "@reduxjs/toolkit";
import {getAllCategories} from "../services/CategoryService.js";
import {
    addBooking,
    getAllBookingByHostId,
    getAllBookingByHouseId,
    getHistoryBooking, getMoney,
    removeBooking, setCheckInStatus
} from "../services/BookingService";

const initialState = {
    bookingInfo: {
        startDate: "",
        endDate: "",
        numberOfGuests: "",
        userId: "",
        houseId: "",
        price: ""
    },
    list: []
    ,
    money :[]
}

const categorySlice = createSlice({
    name: 'bookings',
    initialState,
    extraReducers: builder => {
        builder.addCase(addBooking.fulfilled, (state, {payload}) => {
        })
        builder.addCase(getHistoryBooking.fulfilled, (state, {payload}) => {
            state.list = payload
        })
        builder.addCase(removeBooking.fulfilled, (state, action) => {
        })
        builder.addCase(getAllBookingByHouseId.fulfilled, (state, {payload}) => {
            state.list = payload
        })
        builder.addCase(getAllBookingByHostId.fulfilled, (state, {payload}) => {
            state.list = payload
        })
        builder.addCase(setCheckInStatus.fulfilled, (state, action) => {

        })
        builder.addCase(getMoney.fulfilled, (state, {payload}) => {
            state.money = payload;
        })
    }

})
export default categorySlice.reducer;