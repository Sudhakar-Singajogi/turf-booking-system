import React, { useCallback, useEffect } from "react";
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
import useGetExactToTime from "../CustomHooks/useGetExactToTime";
import useValidateBooking from "../CustomHooks/useValidateBooking";
import useGetGame from "../CustomHooks/useGetGame";
import useGetTurf from "../CustomHooks/useGetTurf";

const Cart = () => {
  // Your cart items state and handlers go here
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.booking);
  const isAvailable = useSelector((state) => state.validateForm.isAvailable);
  const errors = useSelector((state) => state.validateForm.errors);
  const { getExactToTime } = useGetExactToTime();
  const { getGameName } = useGetGame();
  const { getTurfName } = useGetTurf();

  const { validateBooking, CheckAvailability } = useValidateBooking();

  const slot = data;
  let showCart = false;
  const navigate = useNavigate();
  const turfs = data.turfs;
  const sports = data.sports;
  const bookingAmount = data.bookingamount;

  if (
    slot.game !== 0 ||
    slot.turf !== 0 ||
    slot.hrs > 1 ||
    slot.timeslot !== "" ||
    slot.bookeddate !== ""
  ) {
    showCart = true;
  }

  let duration = "";
  if (slot.hrs > 0 && slot.timeslot !== "") {
    duration = getExactToTime(slot.timeslot, slot.hrs * 60);
  }

  // const ProceedToPolicy = async (e = null) => {
  //   e.preventDefault();
  //   const hasErros = await validateBooking();
  //   if (!hasErros) {
  //     await CheckAvailability();
  //   }
  // };

  const ProceedToPolicy = (e) => {
    e.preventDefault();
    validateBooking().then((hasErrors) => {
      if (!hasErrors) {
        // CheckAvailability();
      }
    });
  };
  


  /*
  useEffect(() => {
    let form_errors = { ...errors };
    console.log("use effect ran");

    if (isAvailable === "") {
    } else if (isAvailable === false) {
      form_errors.turf_error = "Turf is not available during this time slot";
      dispatch(validateBookingForm(form_errors));
    } else {
      navigate("/booking/confirm");
    }
    dispatch(validateBookingForm(form_errors));
  }, [isAvailable]);

  */

  return (
    <>
      <div className="show-mble">
        {/* <div className="footer">
          <div className="footer-icon">
            <ProductionQuantityLimitsIcon style={{ fontSize: "2rem" }} />
          </div>
          <div className="footer-middle flex-right">
            <div className="total-hours">



              {slot.hrs > 0 && slot.timeslot !== "" && <TimelapseIcon />}

              { (slot.hrs > 0 && slot.timeslot !== "")
                ? slot.hrs > 1
                  ? `${slot.hrs} hrs`
                  : `${slot.hrs} hr`
                : ""}
            </div>
            <div style={{ marginLeft: "20px" }}> </div>
            <div className="total-cost">
              {
                slot.timeslot !== "" ? (slot.hrs > 0 && <CurrencyRupeeIcon />) : ""
              }
              {
                slot.timeslot !== "" ? (slot.hrs > 0 && data.bookingamount.toFixed(2)) : ""
              }
              
            </div>
          </div>
          <div className="footer-icon">
            <Link
              to="/confirm-cart"
              onClick={(e) => ProceedToPolicy(e)}
              style={{ color: "#fff" }}
            >
              <ArrowCircleRightIcon className="proceed-icon" />{" "}
            </Link>
          </div>
        </div> */}
      </div>

      <div className="cart mx-10 dnt-show-mble">
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
                              ? getGameName(sports, slot.game)
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
                                ? getTurfName(turfs, slot.turf)
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
                            <span className="cart-label txt-lower-case">
                              {" "}
                              {slot.timeslot}{" "}
                              {slot.hrs > 0 ? ` To ${duration}` : " To Nill"}{" "}
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
                          <TimelapseIcon style={{ color: "orange" }} />
                          <span className="cart-label">
                            {slot.hrs > 0
                              ? slot.hrs > 1
                                ? `${slot.hrs} hrs`
                                : `${slot.hrs} hr`
                              : "Nill"}
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
                            <span className="cart-label ">{bookingAmount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cart-footer">
                  <Link to="/booking/confirm" onClick={(e) => ProceedToPolicy(e)}>
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
