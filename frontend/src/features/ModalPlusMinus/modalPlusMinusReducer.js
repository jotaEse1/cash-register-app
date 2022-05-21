import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalUpdate: false
}

const modalUpdateSlice = createSlice({
    name: 'plusMinus',
    initialState,
    reducers: {
        openModalUpdate: (state) => {state.isModalUpdate = true},
        closeModalUpdate: (state) => {state.isModalUpdate = false}
    }
})

export const {openModalUpdate, closeModalUpdate} = modalUpdateSlice.actions;
export default modalUpdateSlice.reducer;