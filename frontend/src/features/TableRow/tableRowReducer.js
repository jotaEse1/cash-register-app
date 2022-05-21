import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currency: '',
    amount: 0,
    op: ''  
}

const rowSlice = createSlice({
    name: 'rowInformation',
    initialState,
    reducers: {
        setRowInfo: (state, action) => {
            state.currency = action.payload.currency
            state.amount = action.payload.amount
            state.op = action.payload.op
        }
    }
})

export const {setRowInfo} = rowSlice.actions;
export default rowSlice.reducer;