import {configureStore} from "@reduxjs/toolkit";

import UserReducer from "../reducers/UserReducer";
import houseReducer from "../reducers/HouseReducer";
import imageReducer from "../reducers/ImageReducer";
import categoryReducer from "../reducers/CategoryReducer";
import convenientReducer from "../reducers/ConvenientReducer";
import bookingReducer from "../reducers/BookingReducer";
import commentReducer from "../reducers/CommentReducer";
import wishlistReducer from "../reducers/WishlistReducer";

export const store = configureStore ({
    reducer: {
        users: UserReducer,
        houses : houseReducer,
        categories: categoryReducer,
        images : imageReducer,
        convenients : convenientReducer,
        bookings: bookingReducer,
        comments:commentReducer,
        wishlists:wishlistReducer
    }
})
export default store;