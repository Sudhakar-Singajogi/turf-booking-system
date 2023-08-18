import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./CombineReducers";

const store = configureStore({
    reducer: rootReducer,
})


export default store;