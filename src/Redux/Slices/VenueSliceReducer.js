import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bookedSlots } from "../../CustomLogics/customLogics";
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
  admin: {
    info: {},
    invalidcredentals: "",
    turfs: [],
    games: [],
    selectedTurf:{}
  },
};

export const venueSlice = createSlice({
  name: "venue",
  initialState,
  reducers: {
    adminLogout: (state, action) => {
      state.admin = {
        info: {},
        invalidcredentals: "",
        turfs: [],
        games: [],
        selectedTurf:{}
      };
    },
  },
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
          state.bookedSlots = bookedSlots(slots, bookeddate);
        }
      })
      .addCase(setBlockedSlots.rejected, (state, action) => {
        state.bookedSlots = {
          disabledIntervals: [],
          disabledTimes: [],
          bookedSlots: [],
        };
      })
      .addCase(doAdminLogin.pending, (state, action) => {
        state.admin = {
          info: {},
          invalidcredentals: "",
          turfs: [],
        };
      })
      .addCase(doAdminLogin.fulfilled, (state, action) => {
        console.log("action payload is: ", action.payload.totalRows);

        if (action.payload.totalRows === 0) {
          state.admin = {
            info: {},
            invalidcredentals: true,
            turfs: [],
          };
        } else {
          state.admin = {
            info: action.payload.data,
            invalidcredentals: false,
            turfs: [],
          };
        }
      })
      .addCase(doAdminLogin.rejected, (state, action) => {
        state.admin = {
          info: action.payload.data,
          invalidcredentals: "",
          turfs: [],
        };
      })
      .addCase(getTuyfsByArena.pending, (state, action) => {
        
        state.admin = {
          ...state.admin,
          turfs: [],
          selectedTurf:{},
        };
      })
      .addCase(getTuyfsByArena.fulfilled, (state, action) => {
        console.log("action payload is: ", action.payload?.resultTotal);
        

        if (action.payload?.resultTotal === 0) {
          state.admin = { ...state.admin, turfs: [], selectedTurf:{}, };
        } else { 
          state.admin = { ...state.admin, turfs: action.payload.data, selectedTurf:{}, };
        }
      })
      .addCase(getTuyfsByArena.rejected, (state, action) => {
        
        state.admin = {
          ...state.admin,
          turfs: [],
          selectedTurf:{},
        };
      })
      .addCase(getATurf.pending, (state, action) => {
        
        state.admin = {
          ...state.admin, 
          selectedTurf:{},
        };
      })
      .addCase(getATurf.fulfilled, (state, action) => { 
        const apiResp = action.payload;
        
        if (apiResp.hasOwnProperty('resultTotal') && apiResp.resultTotal === 0 ) {
          state.admin = { ...state.admin, selectedTurf:{}, };
        } else { 
          state.admin = { ...state.admin, selectedTurf:apiResp.data, };
        }
      })
      .addCase(getATurf.rejected, (state, action) => {
        
        state.admin = {
          ...state.admin,
          turfs: [],
          selectedTurf:{},
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

export const doAdminLogin = createAsyncThunk(
  "venue/do-admin-login",
  async (loginCredentails, { dispatch }) => {
    // console.log('bookeddate:', bookeddate)

    try {
      // const resp = await fetch("baseURLturf/byareana", {
      const resp = await fetch(`${baseURL}venue/login`, {
        method: "POST",
        body: JSON.stringify(loginCredentails),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!resp.result === "OK") {
        throw new Error("Failed to get response, contact admin");
      }
      const data = await resp.json();
      dispatch(getTuyfsByArena(data.data.arena_id))
      console.log("login resp: ", data);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const getTuyfsByArena = createAsyncThunk(
  "venue/get-tuyfs-by-arena",
  async (arena_id, { dispatch }) => { 
    try { 
      const resp = await fetch(`${baseURL}turf/byareana`, {
        method: "POST",
        body: JSON.stringify({ arena_id: arena_id }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!resp.result === "OK") {
        throw new Error("Failed to get response, contact admin");
      }
      const data = await resp.json();
      console.log("turfs data is: ", data);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const getATurf = createAsyncThunk(
  "venue/get-a-turf",
  async (turfId, { dispatch, getState }) => { 
    if(turfId === 0) {
      return {resultTotal:0};
    }
    try { 
      let state = getState();
      const arena_id = state.venue.admin.info.arena_id;

      const resp = await fetch(`${baseURL}turf/getdetails`, {
        method: "POST",
        body: JSON.stringify({turfId:turfId, arena_id: arena_id }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!resp.result === "OK") {
        throw new Error("Failed to get response, contact admin");
      }
      const response = await resp.json();
      console.log("turf detail is: ", response);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const { adminLogout } = venueSlice.actions;
export default venueSlice.reducer;
