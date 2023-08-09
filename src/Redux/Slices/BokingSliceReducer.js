import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearErrors } from "./BookingFormValidatorReducer";

import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";


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
      turfs: [],
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
    builder
      .addCase(clearErrors, (state, action) => {
        state.data = {
          game: "",
          bookeddate: "",
          timeslot: "",
          hrs: 0,
          turf: "",
          turfs:[]
        };
        state.isAvailable = "";
      })
      .addCase(getTurfs.pending, (state, action) => {
        state.data.turfs = [];
      })
      .addCase(getTurfs.fulfilled, (state, action) => { 
        const turfs = action.payload.data.map(turf => ({
          label: turf.turf_name,
          value: turf.turfId,
          hasIcon: true,
        }));
        
        state.data.turfs = turfs;

      })
      .addCase(getTurfs.rejected, (state, action) => {
        state.data.turfs = [];
      });
  },
});

export const { changeDate, changeTimeSlot, changeGame, changeTurf, changeHrs } =
  bookingSlice.actions;

export const getTurfs = createAsyncThunk(
  "booking/getTurfs",
  async (arena_id = "r434edd09765457698asd") => {
    try {
      const resp = await fetch("http://127.0.0.1:8080/api/turf/byareana", {
        method: "POST",
        body: JSON.stringify({
          arena_id: arena_id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!resp.result === "OK") {
        throw new Error("Failed to get response, contact admin");
      }
      const data = await resp.json();
      console.log("resp data: ", resp);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export default bookingSlice.reducer;
