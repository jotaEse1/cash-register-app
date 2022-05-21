import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: 'dark'
}

const themeSlice = createSlice({
    name: 'themeButton',
    initialState,
    reducers: {
        changeTheme: (state) => {
            switch (state.theme) {
                case 'dark': state.theme = 'ligth'
                    break;
                
                case 'ligth': state.theme = 'dark'
                    break;
            
                default:
                    break;
            }
        }
    }
})

export const {changeTheme} = themeSlice.actions;
export default themeSlice.reducer;