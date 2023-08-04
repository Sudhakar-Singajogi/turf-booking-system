import { createSlice } from "@reduxjs/toolkit";
import { clearErrors } from "./BookingFormValidatorReducer";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  PENDING: "pending",
  ERROR: "error",
});

export const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    data: {
      game: "",
      bookeddate: "",
      timeslot: "",
      hrs: 0,
      turf: "",
    },
    status: STATUSES.IDLE,
  },
  reducers: {
    changeGame: (state, action) => {
      state.data.game = action.payload;
    },
    changeTurf: (state, action) => {
      state.data.turf = action.payload;
    },
    changeDate: (state, action) => {
      state.data.bookeddate = action.payload;
    },
    changeTimeSlot: (state, action) => {
      state.data.timeslot = action.payload;
    },
    changeHrs: (state, action) => {
      state.data.hrs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearErrors, (state, action) => {
      state.data = {
        game: "",
        bookeddate: "",
        timeslot: "",
        hrs: 0,
        turf: "",
      };
      state.isAvailable = "";
    });
  },
});

export const {
  changeDate,
  changeTimeSlot,
  changeGame,
  changeTurf,
  changeHrs, 
} = bookingSlice.actions;

export default bookingSlice.reducer;
