import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const validateFormSlice = createSlice({
  name: "validateForm",
  initialState: {
    errors: {
      game_error: "",
      bookeddate_error: "",
      timeslot_error: "",
      hrs_error: 0,
      turf_error: "",      
    },
    isAvailable: "",
  },
  reducers: {
    validateBookingForm: (state, action) => {
    console.log('errors are:', action.payload)
      state.errors =  action.payload;
    },
    clearErrors: (state) => {
        console.log('clearErrors');
        state.errors =  {
            game_error: "",
            bookeddate_error: "",
            timeslot_error: "",
            hrs_error: 0,
            turf_error: "",      
          };
          state.isAvailable = "";
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(checkTurfAvailability.pending, (state, action) => {
        state.isAvailable = false;

      })
      .addCase(checkTurfAvailability.fulfilled, (state, action) => {
        console.log("Is Avail: ", action.payload.isAvail)
        state.isAvailable = action.payload.isAvail;

      })
      .addCase(checkTurfAvailability.rejected, (state, action) => {
        state.isAvailable=false;
      });
  },
});

export const checkTurfAvailability = createAsyncThunk(
  "checkturfexist",
  async (data) => {
    try {
      const resp = await fetch("http://127.0.0.1:8080/api");
      if (!resp.result === "OK") {
        throw new Error("Failed to get response, contact admin");
      }
      const data = await resp.json();
      console.log('resp data: ', resp)
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const { validateBookingForm, clearErrors } = validateFormSlice.actions;
export default validateFormSlice.reducer;
