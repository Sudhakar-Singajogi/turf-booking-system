import React, { useContext, useEffect, useRef, useState } from "react";
import "./BookingForm.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changeDate,
  changeTimeSlot,
  getVenuDetails,
} from "../Redux/Slices/BokingSliceReducer";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { InputAdornment, TextField } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { convertDateDYM, getTimeformDateTime } from "../Utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "bootstrap/dist/css/bootstrap.min.css";
import IncrementDecrement from "./IncrementDecrement"; 
import SelectGame from "./CustomComp/SelectGame";
import SelectTurf from "./CustomComp/SelectTurf";
import {
  closeSuccessMsg,
  validateBookingForm,
} from "../Redux/Slices/BookingFormValidatorReducer";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { clearErrors } from "../Redux/Slices/BookingFormValidatorReducer";

import CartFooter from "./CartFooter";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import useBooking from "../CustomHooks/useBooking";
import useFormatDateYmd from "../CustomHooks/useFormatDateYmd";
import { useLocation } from "react-router-dom";
import NotFound from "./NotFound";
import { useLoaderContext } from "../contexts/LoaderContextProvider";
import { useErrorBoundary } from "react-error-boundary";

const BookingForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const venueId = searchParams.get("venueid");
  const [isRendered, setIsRendered] = useState(false);

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.booking);
  const errors = useSelector((state) => state.validateForm.errors);
  const { disabledIntervals, disabledTimes } = useSelector(
    (state) => state.venue.bookedSlots
  );
  const { isLoading, setLoader } = useLoaderContext(); 


  const toggleLoader = (val) => {
    setLoader(val);
  };

  useEffect(() => {
    toggleLoader(true);
    setIsRendered(false);
    const getVenue = async () => {
      dispatch(getVenuDetails(venueId));
      toggleLoader(false);
      setIsRendered(true);
    };

    getVenue();
  }, []);

  const bookingSuccess = useSelector(
    (state) => state.validateForm.bookingSuccess
  );

  const { convertDateYmd } = useFormatDateYmd();
  const { useCurrentBookedDate } = useBooking();

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
    return hours < 12 ? "time-am" : "time-pm";
  };

  return (
    <>
      <div className="booking-cart-wrapper column right-column">
        {( data.venuedetails.hasOwnProperty("arena_id") === false && isRendered )? (
          <div className="booking-form-container ">
            <div className="div-a ">
              <NotFound message="Oops! The venue  does not exist." />
            </div>
          </div>
        ) : (
          <div className="booking-form-container ">
            <div className="div-a ">
              <div className="w100">
                <Stack sx={{ marginBottom: "1rem" }} spacing={2}>
                  {bookingSuccess !== "" ? (
                    bookingSuccess === true ? (
                      <>
                        <Alert
                          onClose={() => {
                            dispatch(closeSuccessMsg());
                          }}
                          sx={{ fontWeight: "bold" }}
                          severity="success"
                        >
                          Your slot has been successfully allocated
                        </Alert>
                      </>
                    ) : (
                      <></>
                    )
                  ) : (
                    ""
                  )}
                </Stack>
              </div>

              <div className="form-container">
                <div>
                  <h1 className="font-bold text-md text-xl text-typography pos-rel">
                    {data.venuedetails?.arena_name}
                    {!isLoading ? (
                      <CleaningServicesIcon
                        className="clear-form-fields"
                        onClick={() => {
                          dispatch(clearErrors());
                        }}
                      />
                    ) : null}
                  </h1>
                  <h6 style={{ fontWeight: "bold", color: "#999" }}>
                    {data.venuedetails?.arena_location}
                  </h6>
                </div>
                {/* Your form fields go here */}
                <div className="form-fields mar-tp30">
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

                    <SelectTurf
                      wid80={"w100"}
                      options={[]}
                      title={"Select Turf"}
                      onChange={(e) => {}}
                      defValue={""}
                    />
                    {errors.turf_error !== "" ? (
                      <p className="errmsg ">{errors.turf_error}</p>
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
                              timeIntervals={15} // Set time intervals (in minutes)
                              timeCaption="Time"
                              timeFormat="hh:mm aa"
                              dateFormat="MMMM d, yyyy h:mm aa"
                              timeClassName={getTimeClassName} // Apply custom classes to time picker options
                              minTime={minTime}
                              excludeTimes={disabledTimes.map(
                                (slot) => slot.start
                              )}
                              filterTime={(time) => {
                                for (const interval of disabledTimes) {
                                  if (
                                    time >= interval.start &&
                                    time <= interval.end
                                  ) {
                                    return false;
                                  } else {
                                    console.log("timeis:", time);
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

                    <SelectGame
                      options={[]}
                      title={"Select Game"}
                      onChange={(e) => {}}
                      defValue={data.game}
                    />
                    {errors.game_error !== "" ? (
                      <p className="errmsg">{errors.game_error}</p>
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
                  </div>
                </div>
              </div>
              <CartFooter />
            </div>
            {/* <div className="div-b">
            <Cart />
          </div> */}
            <div className="show-mble">{/* <Cart />  */}</div>

            {/* </div> */}
          </div>
        )}
      </div>
    </>
  );
};

export default BookingForm;
