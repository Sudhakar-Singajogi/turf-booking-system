import { configureStore } from "@reduxjs/toolkit";
import { bookingSlice } from "./Slices/BokingSliceReducer";
import {validateFormSlice} from "./Slices/BookingFormValidatorReducer";

const store = configureStore({
    reducer: {
        booking: bookingSlice.reducer,
        validateForm: validateFormSlice.reducer
    },

})

export default store;