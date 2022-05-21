import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./App/appReducer";
import msgReducer from "./ModalMessage/modalMessageReducer";
import changeDetailsReducer from './ModalChangeDetails/modalChangeDetailsReducer';
import rowInformationReducer from './TableRow/tableRowReducer'
import modalPlusMinusReducer from "./ModalPlusMinus/modalPlusMinusReducer";
import themeButtonReducer from "./ThemeButton/themeButtonReducer";

const store = configureStore({
    reducer: {
        app: appReducer,
        modalMsg: msgReducer,
        changeDetails: changeDetailsReducer,
        rowInformation: rowInformationReducer,
        plusMinus: modalPlusMinusReducer,
        themeButton: themeButtonReducer
    }
})

export default store