import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: '624eea21618d8a1c606bf937',
    money: [],
    forceRender: 1,
    modalUpdateMoney: false,
    theme: 'dark'
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setMoney: (state, action) => {
            state.money = action.payload
        },
        changeTheme: (state, action) => {
            state.theme = action.payload
        },
        setForceRender: (state) => {
            state.forceRender++
        }
    }
})

export const {setMoney, changeTheme, setForceRender} = appSlice.actions;
export default appSlice.reducer;