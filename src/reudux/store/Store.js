import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../reducers/UserReducer";
import houseReducer from "../reducers/HouseReducer";

export const store = configureStore ({
    reducer: {
        users: UserReducer,
        houses : houseReducer,
    }
})
export default store;