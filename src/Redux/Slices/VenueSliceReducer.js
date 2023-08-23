import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const baseURL = process.env.REACT_APP_apibaseURL;

export const STATUSES = Object.freeze({
  IDLE: "idle",
  PENDING: "pending",
  ERROR: "error",
});

const initialState = {
  details: {},
  bookedSlots: {
    disabledIntervals: [],
    disabledTimes: [],
    bookedSlots: [],
  },
};

export const venueSlice = createSlice({
  name: "venue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setBlockedSlots.pending, (state, action) => {
        state.bookedSlots = {
          disabledIntervals: [],
          disabledTimes: [],
          bookedSlots: [],
        };
      })
      .addCase(setBlockedSlots.fulfilled, (state, action) => {
        console.log("payload is:", action.payload);

        let slots = action.payload.slotsBooked;

        const bookeddate = action.payload.bookeddate;

        if (slots.length === 0) {
          state.bookedSlots = {
            disabledIntervals: [],
            disabledTimes: [],
            bookedSlots: [],
          };
        } else {
          const bookedSlots = slots.map((slot) => {
            let strt = slot.start.split(":");
            // strt = strt[1].split(":");

            let end = slot.end.split(":");
            // end = end[1].split(":");

            return {
              start: new Date(bookeddate).setHours(strt[0], strt[1], 0),
              end: new Date(bookeddate).setHours(end[0], end[1], 59),
            };
          });

          console.log("booked Slots: ", bookedSlots);

          const disabledTimes = bookedSlots.map((slot) => {
            return {
              start: new Date(slot.start),
              end: new Date(slot.end),
            };
          });

          console.log("disabledTimes: ", disabledTimes);

          const disabledIntervals = slots.map((slot) => {
            let strt = slot.start.split(":");
            // strt = strt[1].split(":");

            let end = slot.end.split(":");
            // end = end[1].split(":");

            return {
              start: new Date(bookeddate).setHours(strt[0], strt[1], 0),
              end: new Date(bookeddate).setHours(end[0], end[1], 59),
            };
          });

          state.bookedSlots = {
            disabledIntervals,
            disabledTimes,
            bookedSlots,
          };

          //   SetBlockedSlots(action.payload)
        }
      })
      .addCase(setBlockedSlots.rejected, (state, action) => {
        state.bookedSlots = {
          disabledIntervals: [],
          disabledTimes: [],
          bookedSlots: [],
        };
      });
  },
});

export const setBlockedSlots = createAsyncThunk(
  "venue/setBlockedSlots",
  async ({ bookeddate, arenaId, turf_id }, { dispatch }) => {
    // console.log('bookeddate:', bookeddate)

    try {
      // const resp = await fetch("baseURLturf/byareana", {
      const resp = await fetch(`${baseURL}booking/get-booked-slots`, {
        method: "POST",
        body: JSON.stringify({
          arena_id: arenaId,
          turf_id: turf_id,
          bookedDate: bookeddate,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!resp.result === "OK") {
        throw new Error("Failed to get response, contact admin");
      }
      const data = await resp.json();
      const slotsBooked = data.data;
      return { slotsBooked: slotsBooked.data, bookeddate: bookeddate };
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export default venueSlice.reducer;
