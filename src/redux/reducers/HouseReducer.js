import { createSlice } from "@reduxjs/toolkit";
import {
  add,
  getAllHouse,
  getById,
  removeById,
  update,
  getHouseByUser
} from "../services/HouseService";

const initialState = {
  list: [],
  houseUpdate: {
    name: "",
    description: "",
    price: 0.0,
    location: "",
    bedRoom: 0,
    bathRoom: 0,
    livingRoom: 0,
    kitchen: 0,
    category: {
      id: 0,
    },
    convenients: [],
  },
  listByUser: [],
  message:""
};

const houseSlice = createSlice({
  name: "houses",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllHouse.fulfilled, (state, { payload }) => {
      state.list = payload;
    });
    builder.addCase(add.fulfilled, (state, { payload }) => {
      console.log(payload)
      // state.list.push(payload);
      state.message=payload.message;
    });
    builder.addCase(getById.fulfilled, (state, { payload }) => {
      state.houseUpdate = (payload);
    });
    builder.addCase(removeById.fulfilled, (state, { payload }) => {
      state.list.splice(payload);
    });
    builder.addCase(update.fulfilled, (state, { payload }) => {
      const index = state.list.findIndex(
        (product) => product.id === payload.id
      );
      state.list[index] = payload;
    });
    builder.addCase(getHouseByUser.fulfilled, (state, {payload}) => {
      state.listByUser = payload;
  })
  },
});
export default houseSlice.reducer;
