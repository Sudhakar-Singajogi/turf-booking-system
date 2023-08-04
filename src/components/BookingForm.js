import React, { useEffect, useRef, useState } from "react";
import "./BookingForm.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changeDate,
  changeTimeSlot,
  changeTurf,
  changeGame,
} from "../Redux/Slices/BokingSliceReducer";

import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { InputAdornment, TextField } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GrassOutlinedIcon from "@mui/icons-material/GrassOutlined";
import { convertDateDYM, getTimeformDateTime } from "../Utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "bootstrap/dist/css/bootstrap.min.css";
import IncrementDecrement from "./IncrementDecrement";
import Cart from "./Cart";
import SelectGame from "./CustomComp/SelectGame";
import SelectTurf from "./CustomComp/SelectTurf";
import { validateBookingForm } from "../Redux/Slices/BookingFormValidatorReducer";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { clearErrors } from "../Redux/Slices/BookingFormValidatorReducer";

const BookingForm = ({ children }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.booking);
  const errors = useSelector((state) => state.validateForm.errors);

  const calenderRef = useRef();
  const TimeRef = useRef();
  const datePickerRef = useRef(null);
  const today = new Date(); // Get today's date

  useEffect(() => {}, [data]);

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

  const showCalender = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  const showTimer = () => {
    if (TimeRef.current) {
      TimeRef.current.setOpen(true);
    }
  };

  const handleGameChange = (value) => {
    // console.log(value);
    dispatch(changeGame(value));
    let ers = {
      ...errors,
      game_error: "",
    };
    dispatch(validateBookingForm(ers));
  };

  const handleDateChange = (date) => {
    // console.log(convertDateDYM(date));
    dispatch(changeDate(convertDateDYM(date)));
    let ers = {
      ...errors,
      bookeddate_error: "",
    };
    dispatch(validateBookingForm(ers));
  };

  const handleTimeChange = (time) => {
    let am_pm = getTimeformDateTime(time).split(" ");
    let timeSlot = getTimeformDateTime(time).split(":");
    dispatch(
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

  const handleturfChange = (value) => {
    dispatch(changeTurf(value));
    console.log({ ...errors });
    let ers = {
      ...errors,
      turf_error: "",
    };
    dispatch(validateBookingForm(ers));
  };

  const getTimeClassName = (time) => {
    const hours = time.getHours();
    return hours < 12 ? "time-am" : "time-pm";
  };

  return (
    <>
      <div className="booking-form-container "> 
        <div class="div-a ">
        <div className="form-container" >
            <div>
              <h1 className="font-bold text-md text-xl text-typography pos-rel">
                Box Cricket Information
                <CleaningServicesIcon  className="clear-form-fields" onClick={() => {
                    dispatch(clearErrors());
                  }} />
              </h1>
              <h6 style={{fontWeight:'bold', color:'#999'}}>Location</h6>

              
            </div>
            {/* Your form fields go here */}
            <div className="form-fields mar-tp30">
              <SelectGame
                options={[
                  {
                    label: "Cricket",
                    value: "cricket",
                    icon: <SportsCricketIcon style={{ color: "blue" }} />,
                  },
                  {
                    label: "Soccer",
                    value: "soccer",
                    icon: <SportsSoccerIcon style={{ color: "blue" }} />,
                  },
                ]}
                title={"Select Game"}
                onChange={(e) => handleGameChange(e)}
                defValue={data.game}
              />
              {errors.game_error !== "" ? (
                <p className="errmsg">{errors.game_error}</p>
              ) : (
                <p>&nbsp;</p>
              )}

              <div>
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
                          onChange={handleDateChange}
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
                          timeIntervals={30} // Set time intervals (in minutes)
                          timeCaption="Time"
                          timeClassName={getTimeClassName} // Apply custom classes to time picker options
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

                <IncrementDecrement
                  onDecrement={() => {}}
                  onIncrement={() => {}}
                />
                {errors.hrs_error !== 0 ? (
                  <p className="errmsg">{errors.hrs_error}</p>
                ) : (
                  <p style={{ marginBottom: "30px" }}> </p>
                )}

                <SelectTurf
                  wid80={"w100"}
                  options={[
                    {
                      label: "Turf 1",
                      value: "turf1 name goes here",
                      icon: <GrassOutlinedIcon style={{ color: "green" }} />,
                    },
                    {
                      label: "Turf 2",
                      value: "turf2 name goes here",
                      icon: <GrassOutlinedIcon style={{ color: "green" }} />,
                    },
                  ]}
                  title={"Select Turf"}
                  onChange={(e) => handleturfChange(e)}
                  defValue={""}
                />
                {errors.turf_error !== "" ? (
                  <p className="errmsg ">{errors.turf_error}</p>
                ) : (
                  <p>&nbsp;</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div class="div-b">
        <Cart />
        </div>
        <div class="show-mble">
        <Cart />
        </div>
        
      {/* </div> */}
         
      </div>
      
    </>
  );
};

export default BookingForm;
