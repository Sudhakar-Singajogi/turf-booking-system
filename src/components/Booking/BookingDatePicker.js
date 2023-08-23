import React, { useRef } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { InputAdornment, TextField } from "@mui/material";
import { convertDateDYM} from "../../Utils";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";
import { useLoaderContext } from "../../contexts/LoaderContextProvider";

import {
    changeDate
  } from "../../Redux/Slices/BokingSliceReducer";
import { validateBookingForm } from "../../Redux/Slices/BookingFormValidatorReducer";

function BookingDatePicker() {
  const { data } = useSelector((state) => state.booking);
  const { setLoader } = useLoaderContext(); 
  const calenderRef = useRef(); 
  const datePickerRef = useRef(null);
  const today = new Date(); // Get today's date
  const errors = useSelector((state) => state.validateForm.errors);
  const dispatch = useDispatch();

  const showCalender = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  const HandleDateChange = async (date) => {
    setLoader(true);
    await dispatch(
      changeDate({
        date: convertDateDYM(date),
      })
    );
    setLoader(false);
    let ers = {
      ...errors,
      bookeddate_error: "",
    };
    dispatch(validateBookingForm(ers));
  };

  const CustomDatePickerInput = React.forwardRef((props, ref) => {
    return (
      <TextField
        {...props}
        variant="standard" // Add any other TextField props you want to customize
        style={{ width: "100%" }} // Make the input field take up the full width
        fullWidth
      />
    );
  });
  
  return (
    <>
      <TextField
        className="w100"
        label="Select Date"
        id="outlined-start-adornment"
        ref={calenderRef}
        value={data.bookeddate}
        onFocus={() => showCalender()}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ width: "0%" }}>
              <DatePicker
                ref={datePickerRef}
                onChange={HandleDateChange}
                dateFormat="dd/MM/yyyy"
                minDate={today} // Set the minimum selectable date to today
                customInput={<CustomDatePickerInput />}
              />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="start">
              <CalendarMonthIcon />
            </InputAdornment>
          ),
        }}
      />
      {errors.bookeddate_error !== "" ? (
        <p className="errmsg ">{errors.bookeddate_error}</p>
      ) : (
        <p>&nbsp;</p>
      )}
    </>
  );
}

export default BookingDatePicker;
