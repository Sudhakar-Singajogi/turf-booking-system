import React, { useRef, useState } from "react";
import "./BookingForm.css";
import MUISelect from "./MUI/MUISelect";

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
// import BootstrapDatePickerComponent from "./BootstrapUI/BootstrapDatePickerComponent";
export const MUITextFields = () => {
  return (
    <>
      <TextField
        label="With normal TextField"
        id="outlined-start-adornment"
        sx={{ m: 1, width: "25ch" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <CalendarMonthIcon />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

const BookingForm = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [duration, setDuration] = useState(0);

  const calenderRef = useRef();
  const TimeRef = useRef();
  const datePickerRef = useRef(null);
  const today = new Date(); // Get today's date

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

  const handleDateChange = (date) => {
    console.log(convertDateDYM(date));
    setSelectedDate(convertDateDYM(date));
  };

  const handleTimeChange = (time) => {
    console.log(getTimeformDateTime(time));
    setSelectedTime(getTimeformDateTime(time));
  };

  const getTimeClassName = (time) => {
    const hours = time.getHours();
    return hours < 12 ? "time-am" : "time-pm";
  };

  const onIncrement = () => {};

  const onDecrement = () => {};

  return (
    <>
      <div className="booking-form">
        <div className="flex flex-row items-center justify-start gap-2 mx-3 ">
          <div >
            <div>
              <h1 className="font-bold text-md text-xl text-typography">
                Book your time slot
              </h1>
            </div>
            {/* Your form fields go here */}
            <div className="form-fields">
              <MUISelect
                wid80={"wid-80"}
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
                handleChange={() => {}}
              />
              <div>
                <TextField
                  className="wid-80"
                  label="Select Date"
                  id="outlined-start-adornment"
                  ref={calenderRef}
                  value={selectedDate}
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

                <TextField
                  className="wid-80"
                  label="Start Time"
                  id="outlined-start-adornment"
                  ref={calenderRef}
                  value={selectedTime}
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

                <IncrementDecrement
                  duration={duration}
                  onDecrement={onDecrement}
                  onIncrement={onIncrement}
                />

                <MUISelect
                  wid80={"wid-80"}
                  options={[
                    {
                      label: "Turf 1",
                      value: "turf1",
                      icon: <GrassOutlinedIcon style={{ color: "green" }} />,
                    },
                    {
                      label: "Turf 2",
                      value: "turf2",
                      icon: <GrassOutlinedIcon style={{ color: "green" }} />,
                    },
                  ]}
                  title={"Select Turf"}
                />
              </div>
            </div>
            <button onClick={() => {}}>Add to Cart</button>
          </div>
          <div style={{flex:'0 1 50%', marginTop:'3rem'}}>
            <Cart />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
