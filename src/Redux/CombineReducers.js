import { combineReducers } from "redux";

import { bookingSlice } from "./Slices/BokingSliceReducer";
import {validateFormSlice} from "./Slices/BookingFormValidatorReducer";
import {venueSlice} from "./Slices/VenueSliceReducer";

const rootReducer = combineReducers({
    booking: bookingSlice.reducer,
  venue: venueSlice.reducer,
  validateForm: validateFormSlice.reducer,
});

export default rootReducer;
