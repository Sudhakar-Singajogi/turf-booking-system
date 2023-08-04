import React, { useEffect } from "react";
import "./Cart.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import GrassIcon from "@mui/icons-material/Grass";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../Redux/Slices/BookingFormValidatorReducer";
import {
  validateBookingForm,
  checkTurfAvailability,
} from "../Redux/Slices/BookingFormValidatorReducer";
import { Link, useNavigate } from "react-router-dom";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
const Cart = () => {
  // Your cart items state and handlers go here
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.booking);
  const isAvailable = useSelector((state) => state.validateForm.isAvailable);
  const errors = useSelector((state) => state.validateForm.errors);

  const slot = data;
  let showCart = false;
  const navigate = useNavigate();

  if (
    slot.game !== "" ||
    slot.turf !== "" ||
    slot.hrs > 0 ||
    slot.timeslot !== "" ||
    slot.bookeddate !== ""
  ) {
    showCart = true;
  }

  let hours = slot.hrs;
  let duration = "";
  if (slot.hrs > 0) {
    let startTime = slot.timeslot.split(":");
    let endTime = parseInt(startTime[0]) + parseInt(hours);
    duration = endTime + ":" + startTime[1];
  }

  let hasError = false;

  const ProceedToPolicy = (e = null) => {
    let form_errors = {
      game_error: "",
      bookeddate_error: "",
      timeslot_error: "",
      hrs_error: 0,
      turf_error: "",
    };

    if (e) {
      e.preventDefault();
    }

    if (slot.game.trim() === "") {
      hasError = true;
      form_errors.game_error = "Please select a game";
    }

    if (slot.bookeddate.trim() === "") {
      hasError = true;
      form_errors.bookeddate_error = "Please select a date";
    } else {
      form_errors.bookeddate_error = "";
    }

    if (slot.timeslot.trim() === "") {
      hasError = true;
      form_errors.timeslot_error = "Please select a time slot";
    } else {
      form_errors.timeslot_error = "";
    }

    if (slot.turf.trim() === "") {
      hasError = true;
      form_errors.turf_error = "Please select a turf";
    } else {
      form_errors.turf_error = "";
    }

    console.log("hours:", slot.hrs);

    if (slot.hrs > 0) {
      form_errors.hrs_error = "";
    } else {
      if (slot.timeslot.trim() !== "") {
        hasError = true;
        form_errors.hrs_error = "Please select duration";
      } else {
        form_errors.hrs_error = "";
      }
    }

    /**
     * check whether the turf is free on that time or not
     * Has to do a api call to check if the turf is free
     * */
    if (hasError) {
      dispatch(validateBookingForm(form_errors));
      console.log("form_errors", form_errors);
    } else {
      dispatch(checkTurfAvailability({}));
      if (isAvailable === false) {
        form_errors.turf_error = "Turf is not available during this time slot";
        dispatch(validateBookingForm(form_errors));
      }
    }
  };

  useEffect(() => {
    let form_errors = { ...errors };
    console.log("use effect ran");

    if (isAvailable === "") {
    } else if (isAvailable === false) {
      form_errors.turf_error = "Turf is not available during this time slot";
      dispatch(validateBookingForm(form_errors));
    } else {
      navigate("/confirm-slot");
    }
    dispatch(validateBookingForm(form_errors));
  }, [isAvailable]);

  return (
    <>
      <div className="dnt-show-mble">
        <div class="footer">
          <div class="footer-icon">
            <ProductionQuantityLimitsIcon style={{ fontSize: "2rem" }} />
          </div>
          <div class="footer-middle flex-right">
            <div class="total-hours">
              <TimelapseIcon />:{" "}
              {slot.hrs > 0
                ? slot.hrs > 1
                  ? `${slot.hrs} hrs`
                  : `${slot.hrs} hr`
                : "Nill"}
            </div>
            <div style={{ marginLeft: "20px" }}> </div>
            <div class="total-cost">
              <CurrencyRupeeIcon /> 3000
            </div>
          </div>
          <div class="footer-icon">
            <Link
              to="/confirm-cart"
              onClick={(e) => ProceedToPolicy(e)}
              style={{ color: "#fff" }}
            >
              <ArrowCircleRightIcon className="proceed-icon" />{" "}
            </Link>
          </div>
        </div>
      </div>

      <div className="cart mx-10 only-for-desktop" style={{ width: "40%" }}>
        <div className="flex flex-col items-center justify-center space-y-10 text-typography">
          {!showCart ? (
            <div className="cart-container">
              <div style={{ textAlign: "center" }}>
                <AutoStoriesIcon className="book-icon" />
                <div
                  className="font-semibold texl-lg"
                  style={{ marginBottom: "6.8rem" }}
                >
                  <h2 className="book-empty-txt">Booking Is Empty</h2>
                  <h5 className="book-slot-txt">Book your slot</h5>
                </div>
              </div>
            </div>
          ) : (
            <div className="cart-container">
              <div className="cart-header">
                <div className="cart-title">Cart</div>
                <DeleteIcon
                  onClick={() => {
                    dispatch(clearErrors());
                  }}
                  className="trash-icon"
                />
              </div>
              <div>
                <div className="cart-items">
                  <div className="cart-item">
                    <div className="flex flex-row items-center justify-start col-span-5 space-x-1 w100">
                      <div className="flex-col">
                        <div className="w- text-xs font-medium md:text-sm md:mt-0.5 pointer">
                          <SportsEsportsIcon style={{ color: "orange" }} />
                          <span className="cart-label">
                            {slot.game !== ""
                              ? slot.game.toUpperCase()
                              : "Nill"}
                          </span>
                        </div>
                      </div>
                      <div className="flex-col flex-col-right">
                        <div className="each-booking-item pointer">
                          <div className="flex-col-right">
                            <GrassIcon
                              style={{ color: "green" }}
                              className="flex-col-items"
                            />
                            <span className="cart-label ">
                              {slot.turf !== ""
                                ? slot.turf.toUpperCase()
                                : "Nill"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="cart-item">
                    <div className="flex flex-row items-center justify-start col-span-5 space-x-1 w100">
                      <div className="flex-col">
                        <div className="w- text-xs font-medium md:text-sm md:mt-0.5 pointer">
                          <EventAvailableIcon style={{ color: "orange" }} />
                          <span className="cart-label">
                            {slot.bookeddate !== "" ? slot.bookeddate : "Nill"}
                          </span>
                        </div>
                      </div>
                      <div className="flex-col flex-col-right">
                        <div className="each-booking-item pointer">
                          <div className="flex-col-right">
                            <AccessTimeIcon
                              style={{ color: "orange" }}
                              className="flex-col-items"
                            />
                            <p className="cart-label ">
                              {" "}
                              {slot.timeslot}{" "}
                              {slot.hrs > 0 ? ` To ${duration}` : " To Nill"}{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="cart-item">
                    <div className="flex flex-row items-center justify-start col-span-5 space-x-1 w100">
                      <div className="flex-col">
                        <div className="w- text-xs font-medium md:text-sm md:mt-0.5 pointer">
                          <TimelapseIcon style={{ color: "orange" }} />
                          <span className="cart-label">
                            {slot.hrs > 0 ? `${slot.hrs} hrs` : "Nill"}
                          </span>
                        </div>
                      </div>
                      <div className="flex-col flex-col-right">
                        <div className="each-booking-item pointer">
                          <div className="flex-col-right">
                            <CurrencyRupeeIcon
                              style={{ color: "orange" }}
                              className="flex-col-items"
                            />
                            <span className="cart-label ">3000</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cart-footer">
                  <Link to="/confirm-cart" onClick={(e) => ProceedToPolicy(e)}>
                    <button className="proceed-btn btn-block">
                      Proceed To Pay
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
