import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../reducers/UserReducer";
export const store = configureStore ({
    reducer: {
        users: UserReducer,
        // houses : productReducer
    }
})
export default store;