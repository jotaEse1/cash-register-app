import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalMsg: false,
    msg: ''
}

const modalMsgSlice = createSlice({
    name: 'modalMsg',
    initialState,
    reducers: {
        openModalMsg: (state, action) => {
            const {payload} = action;
            state.msg = payload
            state.isModalMsg = true
        },
        closeModalMsg: (state) => {
            state.msg = ''
            state.isModalMsg = false
        }
    }
})

export const {openModalMsg, closeModalMsg} = modalMsgSlice.actions;
export default modalMsgSlice.reducer;