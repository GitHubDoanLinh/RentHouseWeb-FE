import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../reducers/UserReducer";
import houseReducer from "../reducers/HouseReducer";
import categoryReducer from "../reducers/CategoryReducer";
import imageReducer from "../reducers/ImageReducer";
import bookingReducer from "../reducers/BookingReducer";

export const store = configureStore ({
    reducer: {
        users: UserReducer,
        houses : houseReducer,
        categories: categoryReducer,
        images : imageReducer,
        bookings: bookingReducer
    }
})
export default store;