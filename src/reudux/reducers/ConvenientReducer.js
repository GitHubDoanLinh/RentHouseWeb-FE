import { createSlice } from "@reduxjs/toolkit"
import { getAllConvenient } from "../services/ConvenientService"

const initialState = {
    listConvenient:[]
}
const convenientSlice = createSlice({
    name:'convenients',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllConvenient.fulfilled, (state, {payload}) =>{
            state.listConvenient = payload;
        })
    }
    
})

export default convenientSlice.reducer;