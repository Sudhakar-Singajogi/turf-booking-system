import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearErrors } from "./BookingFormValidatorReducer";
import { checkIsWeekEnd } from "../../CustomLogics/customLogics";
import useFormatDateYmd from "../../CustomHooks/useFormatDateYmd";
import { setBlockedSlots } from "./VenueSliceReducer";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  PENDING: "pending",
  ERROR: "error",
});

const baseURL = process.env.REACT_APP_apibaseURL;

function getTurfCost(turf, bookeddate) {
  console.log("bookeddate: ", bookeddate);

  const isweekend = checkIsWeekEnd(bookeddate);
  console.log("isweekend: ", isweekend);

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
      turfcost: 0,
      hrs: 1,
      bookingamount: 0,
      turf: 0,
      turfs: [],
      sports: [],
      venuedetails: {},
      captain: {},
      isCaptainExists: "",
      bookedBy:"",
      coupon_amount: 0,
      coupon_code: "NA",
      isFullPayment:false
    },
    status: STATUSES.IDLE,
  },
  reducers: {
    changeGame: (state, action) => {
      state.data.game = action.payload;
    },
    changeTurf: (state, action) => {
      console.log("pay is: ", action.payload);
      state.data.turf = action.payload.turfId;
      state.data.turfcost = action.payload.turfCost;
    },
    setDate: (state, action) => {
      console.log("payload is:", action.payload);
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
    setBookedBy: (state, action) => {
      state.data.bookedBy = action.payload;
    },
    addCouponToBooking:(state, action) =>  {
      state.data.coupon_amount = action.payload.couponAmount;
      state.data.coupon_code = action.payload.couponCode;
    },
    setFullPayment:(state, action) => {
      state.data.isFullPayment = action.payload
    },

    clearTurf: (state, action) => {
      state.data = {
        game: 0,
        bookeddate: "",
        timeslot: "",
        hrs: 1,
        turf: 0,
        turfcost: 0,
        bookingamount: 0,
        turfs: state.data.turfs,
        sports: [],
        venuedetails: state.data.venuedetails,
        captain: state.data.captain,
        isCaptainExists: "",
        coupon_amount: 0,
        coupon_code: "NA",
        bookedBy:"",
        isFullPayment:false
      };
      state.isAvailable = "";
    },
    applyCouponCost: (state, action) => {
      state.data.bookingamount =
        state.data.hrs * state.data.turfcost -
        state.data.hrs * state.data.turfcost * action.payload.couponCost;
      state.data.coupon_amount =
        state.data.hrs * state.data.turfcost * action.payload.couponCost;
      state.data.coupon_code = action.payload.couponCode;
    },
    getBookingSliceInfo: (state, action) => {
      return state;
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
          turfcost: 0,
          bookingamount: 0,
          turfs: state.data.turfs,
          sports: state.data.sports,
          venuedetails: state.data.venuedetails,
          captain: state.data.captain,
          isCaptainExists: "",
        };
        state.isAvailable = "";
      })

      .addCase(getTurfs.pending, (state, action) => {
        state.data.turfs = [];
      })
      .addCase(getTurfs.fulfilled, (state, action) => {
        console.log("initially turfs are: ", action.payload.data);
        const turfs = action.payload.data.map((turf) => ({
          label: turf.turf_name,
          value: turf.turfId,
          hasIcon: true,
          turfcost: Number(getTurfCost(turf, state.data.bookeddate)).toFixed(2),
        }));

        console.log("turfs are:", turfs);

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
          return games;
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
        if (action.payload.resultTotal === 1) {
          console.log("venue details are: ", action.payload.data);

          const venue = action.payload.data[0];
          state.data.venuedetails = {
            arena_name: venue.arena_name,
            arena_location: venue.arena_location,
            arena_id: venue.arena_id,
          };
        }
      })
      .addCase(getVenuDetails.rejected, (state, action) => {
        state.data.venuedetails = {};
      })
      .addCase(changeDate.pending, (state, action) => {
        state.data.turfs = [];
      })
      .addCase(changeDate.fulfilled, (state, action) => {
        console.log("turfs are:", action.payload.data);
        const turfs = action.payload.data.map((turf) => ({
          label: turf.turf_name,
          value: turf.turfId,
          hasIcon: true,
          turfcost: Number(getTurfCost(turf, state.data.bookeddate)).toFixed(2),
        }));

        state.data.turfs = turfs;
        state.data.sports = [];
        state.data.bookingamount = 0;
        state.data.turfcost = 0;
        state.data.turf = 0;
        state.data.game = 0;
        state.data.timeslot = "";
      })
      .addCase(changeDate.rejected, (state, action) => {
        state.data.turfs = [];
      })
      .addCase(getUserInfo.pending, (state, action) => {
        state.data.captain = {};
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        console.log("turfs are:", action.payload.data);
        console.log("turfs are:", action.payload.totalRows);
        state.data.captain =
          action.payload.totalRows > 0
            ? action.payload.data
            : state.data.captain;
        state.data.isCaptainExists =
          action.payload.totalRows === 0 ? false : true;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.data.captain = {};
      })
      .addCase(createNewCaptain.pending, (state, action) => {
        state.data.captain = {};
      })
      .addCase(createNewCaptain.fulfilled, (state, action) => {
        console.log("turfs are:", action.payload.data);
        console.log("turfs are:", action.payload.totalRows);
        state.data.captain =
          action.payload.totalRows > 0
            ? action.payload.data
            : state.data.captain;
        state.data.isCaptainExists =
          action.payload.totalRows === 0 ? false : true;
      })
      .addCase(createNewCaptain.rejected, (state, action) => {
        state.data.captain = {};
      });
  },
});

export const getTurfs = createAsyncThunk(
  "booking/getTurfs",

  async ({ dispatch, getState }) => {
    console.log("calling turfs ");
    try {
      const state = getState(); // Get the current state
      const arena_id = state.booking.data.venuedetails.arena_id;

      const resp = await fetch(`${baseURL}turf/byareana`, {
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
  async (turfid, { dispatch, getState }) => {
    try {
      console.log("turfId: ", turfid);
      let state = getState();
      const { convertDateYmd } = useFormatDateYmd();

      const arenaId = state.booking.data.venuedetails.arena_id;
      let bookeddate = state.booking.data.bookeddate;

      const currentDate = new Date(convertDateYmd(bookeddate));
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1; // Month is 0-based, so add 1
      const year = currentDate.getFullYear();

      bookeddate = `${year}-${month}-${day}`;

      let obj = {
        arenaId: arenaId,
        turf_id: turfid,
        bookeddate: bookeddate,
      };

      const resp = await fetch(`${baseURL}turf/sports`, {
        method: "POST",
        body: JSON.stringify({
          arena_id: arenaId,
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

      console.log("req object is:: ", obj);
      await dispatch(setBlockedSlots(obj));

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const getVenuDetails = createAsyncThunk(
  "booking/venuedetails",
  async (arena_id, { dispatch }) => {
    try {
      const resp = await fetch(`${baseURL}venue/details`, {
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
      dispatch(getTurfs());
      return data;
    } catch (error) {
      console.log("Error got is:", error);
      return Promise.reject(error);
    }
  }
);

export const changeDate = createAsyncThunk(
  "booking/getTurfsbydate",
  async ({ date }, { dispatch, getState }) => {
    try {
      const state = getState(); // Get the current state

      const arenaId = state.booking.data.venuedetails.arena_id;

      console.log("hey iysdf", state);

      // const resp = await fetch("baseURLturf/byareana", {
      const resp = await fetch(`${baseURL}turf/byareana`, {
        method: "POST",
        body: JSON.stringify({
          arena_id: arenaId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!resp.result === "OK") {
        throw new Error("Failed to get response, contact admin");
      }
      const data = await resp.json();
      dispatch(setDate(date));

      const { convertDateYmd } = useFormatDateYmd();
      dispatch(getTurfs());

      let turfObj = { turfId: 0, turfCost: 0 };

      dispatch(changeTurf(turfObj));
      dispatch(calculateBookingCost());

      const currentDate = new Date(convertDateYmd(date));
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1; // Month is 0-based, so add 1
      const year = currentDate.getFullYear();

      let bookeddate = `${year}-${month}-${day}`;

      let obj = {
        bookeddate: bookeddate,
        arenaId: arenaId,
      };

      // Access the turf value from the state
      const turfValue = state.booking.data.turf;
      console.log("turfValue is: ", turfValue);

      if (turfValue > 0) {
        obj.turf_id = state.data.turf;
      }

      dispatch(setBlockedSlots(obj));

      console.log("resp data: ", resp);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "booking/get-user-info",
  async (captain_contact) => {
    console.log("captain_contact: ", captain_contact);
    try {
      // const resp = await fetch("baseURLturf/byareana", {
      captain_contact = captain_contact.slice(-10);
      const resp = await fetch(`${baseURL}captain/details`, {
        method: "POST",
        body: JSON.stringify({
          captain_contact: captain_contact,
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

export const createNewCaptain = createAsyncThunk(
  "booking/create-new-captain",
  async (captainObj, { dispatch }) => {
    console.log("new captain is: ", captainObj);
    try {
      // const resp = await fetch("baseURLturf/byareana", {
      const resp = await fetch(`${baseURL}captain/create`, {
        method: "POST",
        body: JSON.stringify(captainObj),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!resp.result === "OK") {
        throw new Error("Failed to get response, contact admin");
      }
      const data = await resp.json();
      dispatch(getUserInfo(captainObj.captain_contact));

      console.log("resp data: ", resp);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export default bookingSlice.reducer;

export const {
  setDate,
  changeTimeSlot,
  changeGame,
  changeTurf,
  changeHrs,
  calculateBookingCost,
  clearTurf,
  applyCouponCost,
  getBookingSliceInfo,
  setBookedBy,
  addCouponToBooking,
  setFullPayment
} = bookingSlice.actions;
