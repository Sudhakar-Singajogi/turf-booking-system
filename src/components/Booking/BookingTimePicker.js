import React, { useRef } from "react";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { InputAdornment, TextField } from "@mui/material";
import {  getTimeformDateTime } from "../../Utils";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";

import {
  changeTimeSlot,
} from "../../Redux/Slices/BokingSliceReducer";
import { validateBookingForm } from "../../Redux/Slices/BookingFormValidatorReducer";
import useFormatDateYmd from "../../CustomHooks/useFormatDateYmd";
import useBooking from "../../CustomHooks/useBooking";

function BookingTimePicker() {
  const { data } = useSelector((state) => state.booking);
  const calenderRef = useRef();
  const errors = useSelector((state) => state.validateForm.errors);
  const dispatch = useDispatch();
  const { disabledTimes } = useSelector(
    (state) => state.venue.bookedSlots
  );

  console.log('disabledTimes:', disabledTimes)

  const { convertDateYmd } = useFormatDateYmd();
  const { useCurrentBookedDate } = useBooking();

  const CustomTimePickerInput = React.forwardRef((props, ref) => {
    return (
      <TextField
        {...props}
        variant="standard" // Add any other TextField props you want to customize
        style={{ width: "100%" }} // Make the input field take up the full width
        fullWidth
      />
    );
  });

  const showTimer = () => {
    if (TimeRef.current) {
      TimeRef.current.setOpen(true);
    }
  };

  const TimeRef = useRef();

  const handleTimeChange = async (time) => {
    let am_pm = getTimeformDateTime(time).split(" ");
    let timeSlot = getTimeformDateTime(time).split(":");
    await dispatch(
      changeTimeSlot(
        timeSlot[0] + ":" + timeSlot[1] + " " + am_pm[1].toLowerCase()
      )
    );
    let ers = {
      ...errors,
      timeslot_error: "",
    };
    dispatch(validateBookingForm(ers));
  };

  const getTimeClassName = (time) => {
    const hours = time.getHours();
    return hours < 12 ? "time-am" : "time-am";
  };

  var tday = "";

  if (data.bookeddate === "") {
    let newDtd = new Date();
    const day = newDtd.getDate();
    const month = newDtd.getMonth() + 1; // Month is 0-based, so add 1
    const year = newDtd.getFullYear();

    tday = `${day}/${month}/${year}`;
  } else if (data.bookeddate !== "") {
    console.log("data.bookeddate:", data.bookeddate);
    let newDtd = new Date(convertDateYmd(data.bookeddate));
    const day = newDtd.getDate();
    const month = newDtd.getMonth() + 1; // Month is 0-based, so add 1
    const year = newDtd.getFullYear();

    tday = `${day}/${month}/${year}`;
  }

  let currentTime = useCurrentBookedDate(tday);
  const minTime = currentTime; //new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 9, 0);
  const maxTime = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate(),
    23,
    30
  );

  return (
    <>
      <TextField
        className="w100"
        label="Start Time"
        id="outlined-start-adornment"
        ref={calenderRef}
        value={data.timeslot}
        onFocus={() => showTimer()}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ width: "0%" }}>
              <DatePicker
                ref={TimeRef}
                onChange={handleTimeChange}
                showTimeSelect // Show the time picker
                showTimeSelectOnly // Show only the time picker, hiding the date picker
                timeIntervals={5} // Set time intervals (in minutes)
                timeCaption="Time"
                timeFormat="hh:mm aa"
                dateFormat="MMMM d, yyyy h:mm aa"
                timeClassName={getTimeClassName} // Apply custom classes to time picker options
                minTime={minTime}
                excludeTimes={disabledTimes.map((slot) => slot.start)}
                filterTime={(time) => {
                  for (const interval of disabledTimes) {
                    if (time >= interval.start && time <= interval.end) {
                      return false;
                    } 
                  }
                  return true;
                }}
                maxTime={maxTime}
                customInput={<CustomTimePickerInput />}
              />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="start">
              <AccessTimeIcon />
            </InputAdornment>
          ),
        }}
      />
      {errors.timeslot_error !== "" ? (
        <p className="errmsg">{errors.timeslot_error}</p>
      ) : (
        <p>&nbsp;</p>
      )}
    </>
  );
}

export default BookingTimePicker;
