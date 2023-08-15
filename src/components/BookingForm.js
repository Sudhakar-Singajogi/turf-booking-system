import React, { useEffect, useRef, useState } from "react";
import "./BookingForm.css";
import { useDispatch, useSelector } from "react-redux";
import { changeDate, changeTimeSlot } from "../Redux/Slices/BokingSliceReducer";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { InputAdornment, TextField } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { convertDateDYM, getTimeformDateTime } from "../Utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "bootstrap/dist/css/bootstrap.min.css";
import IncrementDecrement from "./IncrementDecrement";
import Cart from "./Cart";
import SelectGame from "./CustomComp/SelectGame";
import SelectTurf from "./CustomComp/SelectTurf";
import { validateBookingForm } from "../Redux/Slices/BookingFormValidatorReducer";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { clearErrors } from "../Redux/Slices/BookingFormValidatorReducer";
import MUIModal from "./MUI/MUIModal";
import axios from "axios";
import CartFooter from "./CartFooter";
import { auth } from "./firebase-config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const BookingForm = ({ children }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.booking);
  const errors = useSelector((state) => state.validateForm.errors);
  const [modalOpen, setModalOpen] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [showVisibilityForm, setShowVisibilityForm] = useState(false);
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleModalClose = () => {
    setModalOpen(false);
    setShowOTP(false);
  };

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
    // console.log(convertDateDYM(date));
    dispatch(
      changeDate({
        date: convertDateDYM(date),
        arena_id: data.venuedetails.arena_id,
      })
    );
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

  const getTimeClassName = (time) => {
    const hours = time.getHours();
    return hours < 12 ? "time-am" : "time-pm";
  };

  const initiatePayment = async () => {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
      const resp = await fetch("http://127.0.0.1:8080/api/razor/create-order", {
        method: "POST",
      });
      if (!resp.result === "OK") {
        throw new Error("Failed to get response, contact admin");
      }
      const response = await resp.json();
      console.log("resp data: ", response.data[0]);

      const { order_id, amount } = response.data[0];
      setOrderId(order_id);
      console.log("amount is: ", amount);

      const options = {
        key: "rzp_test_kvq0flV7YLPMFu", // Enter the Key ID generated from the Dashboard
        amount: amount,
        name: "Sonet Info Labs.",
        description: "Test Transaction",
        image: "",
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post(
            "http://127.0.0.1:8080/api/razor/success",
            data
          );

          alert(result.data.message);
        },
        prefill: {
          name: "Soumya Dey",
          email: "SoumyaDey@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Soumya Dey Corporate Office",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const LoginComponent = () => {
    return (
      <>
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="left-section">
              <img
                src="https://c7.alamy.com/comp/2F4TF5W/four-happy-kids-playing-characters-2F4TF5W.jpg"
                alt="Graphic"
                className="graphic-image"
              />
            </div>
            <div className="right-section">
              <form style={{ marginTop: "1rem" }}>
                {!showOTP ? (
                  <>
                    <h4>Login</h4>
                    <input type="text" placeholder="Enter mobile number" />
                    {/* <h5 style={{ textAlign: "center", margin: "1rem" }}>Or </h5>
                    <input type="text" placeholder="Enter email id" /> */}
                    <button
                      className="send-otp-btn"
                      onClick={(e) => {
                        setShowOTP(true);
                        setShowVisibilityForm(true);
                        e.preventDefault();
                      }}
                    >
                      Send OTP
                    </button>
                  </>
                ) : (
                  <>
                    <div className="register-user">
                      <h4 style={{ marginBottom: "0.5rem" }}>
                        Enter OTP {showVisibilityForm}
                      </h4>
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        style={{ marginBottom: "1rem" }}
                      />
                      {showVisibilityForm ? (
                        <div>
                          <h4>Register your visibility</h4>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your full name"
                          />
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter email id"
                          />
                        </div>
                      ) : (
                        ""
                      )}

                      <button
                        className="validate-otp"
                        onClick={(e) => {
                          setShowOTP(true);
                          initiatePayment();
                          e.preventDefault();
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="booking-form-container ">
        <div className="div-a ">
          <div className="form-container">
            <div>
              <h1 className="font-bold text-md text-xl text-typography pos-rel">
                {data.venuedetails?.arena_name}
                <CleaningServicesIcon
                  className="clear-form-fields"
                  onClick={() => {
                    dispatch(clearErrors());
                  }}
                />
                {/* <CleaningServicesIcon
                  onClick={() => {
                    setModalOpen(true);
                  }}
                /> */}
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
              </div>

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
            </div>
            <CartFooter />
          </div>
        </div>
        <div className="div-b">
          <Cart />
        </div>
        <div className="show-mble">{/* <Cart />  */}</div>

        {/* </div> */}
      </div>
      <MUIModal
        params={{
          open: modalOpen,
          handleClose: handleModalClose,
          modalTitle: "Login",
          component: LoginComponent,
          width: 1000,
          adjustTop: "55%",
          showTitle: "yes",
        }}
      />
    </>
  );
};

export default BookingForm;
