import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearErrors } from "./BookingFormValidatorReducer";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  PENDING: "pending",
  ERROR: "error",
});

function getTurfCost(turf) {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();

  const isweekend = dayOfWeek === 0 || dayOfWeek === 6;

  let turfCost = turf.weekdays_cost;
  if (isweekend) {
    turfCost = turf.weekends_cost;
  }

  return turfCost;
}

export const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    data: {
      game: 0,
      bookeddate: "",
      timeslot: "", 
      turfcost:0,
      hrs: 1,
      bookingamount:0,
      turf: 0,
      turfs: [],
      sports: [],
      venuedetails: {},
    },
    status: STATUSES.IDLE,
  },
  reducers: {
    changeGame: (state, action) => {
      state.data.game = action.payload;
    },
    changeTurf: (state, action) => {
      console.log('pay is: ', action.payload);
      state.data.turf = action.payload.turfId;
      state.data.turfcost = action.payload.turfCost;
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
    calculateBookingCost: (state, action) => { 
      state.data.bookingamount = state.data.hrs * state.data.turfcost;
      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(clearErrors, (state, action) => {
        state.data = {
          game: 0,
          bookeddate: "",
          timeslot: "",
          hrs: 1,
          turf: 0,
          turfcost:0,
          bookingamount:0,
          turfs: state.data.turfs,
          sports: state.data.sports,
          venuedetails: state.data.venuedetails,
        };
        state.isAvailable = "";
      })
      .addCase(getTurfs.pending, (state, action) => {
        state.data.turfs = [];
      })
      .addCase(getTurfs.fulfilled, (state, action) => {
        const turfs = action.payload.data.map((turf) => ({
          label: turf.turf_name,
          value: turf.turfId,
          hasIcon: true,
          turfcost:Number(getTurfCost(turf)).toFixed(2)
        }));

        state.data.turfs = turfs;
      })
      .addCase(getTurfs.rejected, (state, action) => {
        state.data.turfs = [];
      })
      .addCase(getSportsByTurf.pending, (state, action) => {
        state.data.sports = [];
      })
      .addCase(getSportsByTurf.fulfilled, (state, action) => {
        const games = [];

        action.payload.data.map((item) => {
          if (item.sport === "Cricket") {
            games.push({
              label: item.sport,
              value: item.sportsbyturfId,
              hasIcon: true,
            });
          } else if (item.sport === "Soccer") {
            games.push({
              label: item.sport,
              value: item.sportsbyturfId,
              hasIcon: true,
            });
          }
        });

        state.data.sports = games;
      })
      .addCase(getSportsByTurf.rejected, (state, action) => {
        state.data.sports = [];
      })
      .addCase(getVenuDetails.pending, (state, action) => {
        state.data.venuedetails = {};
      })
      .addCase(getVenuDetails.fulfilled, (state, action) => {
        console.log("venue details are: ", action.payload.data);
        const venue = action.payload.data[0];
        state.data.venuedetails = {
          arena_name: venue.arena_name,
          arena_location: venue.arena_location,
        };
      })
      .addCase(getVenuDetails.rejected, (state, action) => {
        state.data.venuedetails = {};
      });
  },
});

export const { changeDate, changeTimeSlot, changeGame, changeTurf, changeHrs, calculateBookingCost } =
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

export const getSportsByTurf = createAsyncThunk(
  "booking/getSportsByTurf",
  async (turfid) => {
    try {
      const resp = await fetch("http://127.0.0.1:8080/api/turf/sports", {
        method: "POST",
        body: JSON.stringify({
          arena_id: "r434edd09765457698asd",
          turfid: turfid,
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

export const getVenuDetails = createAsyncThunk(
  "booking/venuedetails",
  async (arena_id = "r434edd09765457698asd") => {
    try {
      const resp = await fetch("http://127.0.0.1:8080/api/venue/details", {
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
