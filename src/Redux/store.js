import { configureStore } from "@reduxjs/toolkit";
import { bookingSlice } from "./Slices/BokingSliceReducer";

const store = configureStore({
    reducer: {
        booking: bookingSlice.reducer,
    },

})

export default store;