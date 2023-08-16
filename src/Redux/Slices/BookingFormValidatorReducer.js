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
    bookingSuccess:true
  },
  reducers: {
    validateBookingForm: (state, action) => {
      console.log("errors are:", action.payload);
      state.errors = action.payload;
    },
    clearErrors: (state) => {
      console.log("clearErrors");
      state.errors = {
        game_error: "",
        bookeddate_error: "",
        timeslot_error: "",
        hrs_error: 0,
        turf_error: "",
      };
      state.isAvailable = "";
      state.bookingSuccess = "";
    },
    turfbookedsuccessfully: (state, action) => {
      state.bookingSuccess = action.payload
    },
    closeSuccessMsg: (state, action) => {
      state.bookingSuccess = ""
    }

  },

  extraReducers: (builder) => {
    builder
      .addCase(checkTurfAvailability.pending, (state, action) => {
        state.isAvailable = false;
      })
      .addCase(checkTurfAvailability.fulfilled, (state, action) => { 
        state.isAvailable = action.payload.ValidationErrors === "turf is not available at this time" ? false : true        ;
      })
      .addCase(checkTurfAvailability.rejected, (state, action) => {
        state.isAvailable = false;
      });
  },
});

export const checkTurfAvailability = createAsyncThunk(
  "checkturfexist",
  async (data) => {
    const reqBody = data;
    console.log('requested body is:', reqBody)
    try {
      const resp = await fetch("http://192.168.0.111:8080/api/turf/exists", {
        method: "POST",
        body: JSON.stringify({
          ...reqBody,
          arena_id: "r434edd09765457698asd",
          
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

export const { validateBookingForm, clearErrors, turfbookedsuccessfully, closeSuccessMsg } = validateFormSlice.actions;
export default validateFormSlice.reducer;
