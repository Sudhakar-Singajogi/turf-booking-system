import React from "react";
import "./App.css";
import "./policy.css";

import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import GrassIcon from "@mui/icons-material/Grass";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TextFieldWithIcon from "./components/MUI/TextFieldWithIcon";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors } from "./Redux/Slices/BookingFormValidatorReducer";

function CartPaymenyPolicy() {
  const { data: slot } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (
    slot.game !== "" ||
    slot.turf !== "" ||
    slot.hrs === 0 ||
    slot.timeslot !== "" ||
    slot.bookeddate !== ""
  ) {
    navigate("/");
  }

  let hours = slot.hrs;
  let duration = "";
  if (slot.hrs > 0) {
    let startTime = slot.timeslot.split(":");
    let endTime = parseInt(startTime[0]) + parseInt(hours);
    duration = endTime + ":" + startTime[1];
  }

  return (
    <>
      <div class="containers">
        <div class="div-a game-venue-details">
          <div className="policy-container ">
            <div className="cart-header">
              <div
                className="cart-title"
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div className="flex-item">
                  <h5 style={{ fontWeight: "bold" }}>Ground Name</h5>
                </div>
                <div className="flex-item text-right">
                  <h5 style={{ fontWeight: "bold" }}>Game</h5>
                </div>
              </div>
            </div>
            <div className="cart-items">
              <div style={{ position: "relative" }}>
                <h6 style={{ fontWeight: "bold", paddingLeft: "10px" }}>
                  Game and Venue Details
                </h6>
                <DeleteIcon
                  style={{ position: "absolute", right: "1rem", top: "0rem" }}
                  onClick={() => {
                    dispatch(clearErrors());
                    navigate("/");
                  }}
                  className="trash-icon"
                />
              </div>
              <div className="cart-item m-y-10">
                <div className="flex flex-row  justify-start col-span-5 space-x-1 w100">
                  <div className="flex-col">
                    <div className="w- text-xs font-medium md:text-sm md:mt-0.5 pointer ">
                      <SportsEsportsIcon style={{ color: "orange" }} />
                      <span className="cart-label">
                        {slot.game !== "" ? slot.game.toUpperCase() : "Nill"}
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
                          {slot.turf !== "" ? slot.turf.toUpperCase() : "Nill"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-col flex-col-right">
                    <div className="w- text-xs font-medium md:text-sm md:mt-0.5 pointer text-right">
                      <EventAvailableIcon style={{ color: "orange" }} />
                      <span className="cart-label">
                        {slot.bookeddate !== "" ? slot.bookeddate : "Nill"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cart-item">
                <div className="flex flex-row  justify-start col-span-5 space-x-1 w100">
                  <div className="flex-col">
                    <div className="w- text-xs font-medium md:text-sm md:mt-0.5 pointer">
                      <SportsEsportsIcon style={{ color: "orange" }} />
                      <span className="cart-label">
                        {slot.game !== "" ? slot.game.toUpperCase() : "Nill"}
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
                          {slot.turf !== "" ? slot.turf.toUpperCase() : "Nill"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-col flex-col-right">
                    <div className="w- text-xs font-medium md:text-sm md:mt-0.5 pointer text-right">
                      <EventAvailableIcon style={{ color: "orange" }} />
                      <span className="cart-label">
                        {slot.bookeddate !== "" ? slot.bookeddate : "Nill"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="only-for-desktop">
              <h6 style={{ fontWeight: "bold" }}>Reschedule Policy:</h6>
              <ul className="fancy-bullets">
                <li>
                  <strong style={{ fontSize: "14px" }}>
                    Advance Notice Required:
                  </strong>{" "}
                  Rescheduling requests must be submitted at least 2 hours prior
                  to the scheduled booking time.
                </li>
                <li>
                  <strong style={{ fontSize: "14px" }}>
                    One-time Reschedule:
                  </strong>{" "}
                  Customers are allowed a single opportunity to reschedule their
                  booking. Once rescheduled, cancellations will no longer be
                  permitted.
                </li>
              </ul>
              <hr />
            </div>
            <div className="only-for-desktop">
              <h6 style={{ fontWeight: "bold" }}>Cancellation Policy:</h6>
              <ul className="fancy-bullets">
                <li>
                  <strong style={{ fontSize: "14px" }}>
                    Cancellation Timeframe:
                  </strong>{" "}
                  Cancellation is not possible less than 2 hours prior to the
                  scheduled booking time.
                </li>
                <li>
                  <strong style={{ fontSize: "14px" }}>
                    Cancellation Fee:
                  </strong>{" "}
                  In case of cancellations made within the permissible
                  timeframe, a cancellation fee of 15% of the total booking
                  amount will be deducted.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="div-b pricing-details ">
          <div className="policy-container">
            <div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div className="flex-item">
                  <h5 style={{ fontWeight: "bold" }}>Price Details</h5>
                </div>
              </div>
            </div>
            <hr style={{ marginTop: "5px" }} />
            <div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div className="flex-item">
                  <h6 style={{ fontWeight: "bold" }}>
                    <GrassIcon style={{ color: "green" }} /> Turf Cost:{" "}
                  </h6>
                </div>
                <div className="flex-item text-center">
                  <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                    3000
                  </span>
                </div>
              </div>

              <ul className="fancy-bullets">
                <li>
                  <strong style={{ fontSize: "13px" }}>Incldues:</strong>{" "}
                  <span>
                    New ball, Two Heavy Duty Plastic Cricket Bat, Three Wickets
                  </span>
                </li>
                <li>
                  <strong style={{ fontSize: "13px" }}>After Game:</strong>{" "}
                  <span>
                    The person who booked the game will be responsbile to
                    handover the Bats, balls and wickets
                  </span>
                </li>
              </ul>
              <hr />
            </div>

            <div>
              <h6 style={{ fontWeight: "bold" }}>
                <CardGiftcardIcon style={{ color: "orange" }} /> Apply Coupon:
              </h6>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "flex-start",
                }}
              >
                <div>
                  <TextFieldWithIcon />{" "}
                </div>
                <div title={"Apply Coupon"}>
                  <CheckCircleIcon
                    style={{ color: "orange", cursor: "pointer" }}
                  />{" "}
                </div>
              </div>
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div className="flex-item">
                <h6 style={{ fontWeight: "bold" }}>
                  <CurrencyRupeeIcon style={{ color: "black" }} /> Total Price:{" "}
                </h6>
              </div>
              <div className="flex-item text-center">
                <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                  <CurrencyRupeeIcon style={{ fontSize: "15px" }} />
                  3000
                </span>
              </div>
            </div>

            <ul className="fancy-bullets">
              <li>
                <strong style={{ fontSize: "11px" }}>
                  Advance to pay:{" "}
                  <CurrencyRupeeIcon style={{ fontSize: "15px" }} />
                  1200
                </strong>
              </li>
              <li>
                <strong style={{ fontSize: "11px" }}>
                  Amount to be paid at venue:{" "}
                  <CurrencyRupeeIcon style={{ fontSize: "15px" }} />
                  1800
                </strong>
              </li>
            </ul>
            <div className="cart-footer">
              <button className="proceed-btn btn-block">Proceed To Pay</button>
            </div>
          </div>
        </div>
        <div class="div-c policy-terms dnt-show-mble">
          <div>
            <h6 style={{ fontWeight: "bold" }}>Reschedule Policy:</h6>
            <ul className="fancy-bullets">
              <li>
                <strong style={{ fontSize: "14px" }}>
                  Advance Notice Required:
                </strong>{" "}
                Rescheduling requests must be submitted at least 2 hours prior
                to the scheduled booking time.
              </li>
              <li>
                <strong style={{ fontSize: "14px" }}>
                  One-time Reschedule:
                </strong>{" "}
                Customers are allowed a single opportunity to reschedule their
                booking. Once rescheduled, cancellations will no longer be
                permitted.
              </li>
            </ul>
            <hr />
          </div>
          <div>
            <h6 style={{ fontWeight: "bold" }}>Cancellation Policy:</h6>
            <ul className="fancy-bullets">
              <li>
                <strong style={{ fontSize: "14px" }}>
                  Cancellation Timeframe:
                </strong>{" "}
                Cancellation is not possible less than 2 hours prior to the
                scheduled booking time.
              </li>
              <li>
                <strong style={{ fontSize: "14px" }}>Cancellation Fee:</strong>{" "}
                In case of cancellations made within the permissible timeframe,
                a cancellation fee of 15% of the total booking amount will be
                deducted.
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* 
      <div className="div-flex w100">
        <div className="flex-item policy-left-col">
          <div className="policy-container">
            <div className="cart-header">
              <div
                className="cart-title"
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div className="flex-item">
                  <h5 style={{ fontWeight: "bold" }}>Ground Name</h5>
                </div>
                <div className="flex-item text-right">
                  <h5 style={{ fontWeight: "bold" }}>Game</h5>
                </div>
              </div>
            </div>
            <div className="cart-items">
              <div style={{ position: "relative" }}>
                <h6 style={{ fontWeight: "bold", paddingLeft: "10px" }}>
                  Game and Venue Details
                </h6>
                <DeleteIcon
                  style={{ position: "absolute", right: "1rem", top: "0rem" }}
                  onClick={() => {
                    dispatch(clearErrors());
                    navigate("/");
                  }}
                  className="trash-icon"
                />
              </div>
              <div className="cart-item">
                <div className="flex flex-row items-center justify-start col-span-5 space-x-1 w100">
                  <div style={{ flex: "1 1" }}>
                    <div className="w- text-xs font-medium md:text-sm md:mt-0.5 pointer">
                      <SportsEsportsIcon style={{ color: "orange" }} />
                      <span className="cart-label">
                        {" "}
                        {slot.game !== "" ? slot.game.toUpperCase() : "Nill"}
                      </span>
                    </div>
                  </div>
                  <div style={{ flex: "1 1" }}>
                    <div className="w- text-xs font-medium md:text-sm md:mt-0.5 pointer">
                      <GrassIcon style={{ color: "green" }} />
                      <span className="cart-label">
                        {slot.turf !== "" ? slot.turf.toUpperCase() : "Nill"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cart-item">
                <div className="flex flex-row items-center justify-start col-span-5 space-x-1 w100">
                  <div style={{ flex: "1 1" }}>
                    <div className="w- text-xs font-medium md:text-sm md:mt-0.5 pointer">
                      <EventAvailableIcon style={{ color: "orange" }} />
                      <span className="cart-label">
                        {slot.bookeddate !== "" ? slot.bookeddate : "Nill"}
                      </span>
                    </div>
                  </div>
                  <div style={{ flex: "1 1" }}>
                    <div className="w- text-xs font-medium md:text-sm md:mt-0.5 pointer">
                      <AccessTimeIcon style={{ color: "orange" }} />
                      <span className="cart-label">
                        {slot.timeslot}{" "}
                        {slot.hrs > 0 ? ` To ${duration}` : "Nill"}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cart-item">
                <div className="flex flex-row items-center justify-start col-span-5 space-x-1 w100">
                  <div style={{ flex: "1 1" }}>
                    <div className="w- text-xs font-medium md:text-sm md:mt-0.5 pointer">
                      <TimelapseIcon style={{ color: "orange" }} />
                      <span className="cart-label">
                        {slot.hrs > 0 ? `${slot.hrs} hrs` : "Nill"}{" "}
                      </span>
                    </div>
                  </div>

                  <div style={{ flex: "1 1" }}>
                    <div className="w- text-xs font-medium md:text-sm md:mt-0.5 pointer">
                      <CurrencyRupeeIcon style={{ color: "orange" }} />
                      <span className="cart-label">3000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <h6 style={{ fontWeight: "bold" }}>Reschedule Policy:</h6>
              <ul className="fancy-bullets">
                <li>
                  <strong style={{ fontSize: "14px" }}>
                    Advance Notice Required:
                  </strong>{" "}
                  Rescheduling requests must be submitted at least 2 hours prior
                  to the scheduled booking time.
                </li>
                <li>
                  <strong style={{ fontSize: "14px" }}>
                    One-time Reschedule:
                  </strong>{" "}
                  Customers are allowed a single opportunity to reschedule their
                  booking. Once rescheduled, cancellations will no longer be
                  permitted.
                </li>
              </ul>
              <hr />
            </div>

            <div>
              <h6 style={{ fontWeight: "bold" }}>Cancellation Policy:</h6>
              <ul className="fancy-bullets">
                <li>
                  <strong style={{ fontSize: "14px" }}>
                    Cancellation Timeframe:
                  </strong>{" "}
                  Cancellation is not possible less than 2 hours prior to the
                  scheduled booking time.
                </li>
                <li>
                  <strong style={{ fontSize: "14px" }}>
                    Cancellation Fee:
                  </strong>{" "}
                  In case of cancellations made within the permissible
                  timeframe, a cancellation fee of 15% of the total booking
                  amount will be deducted.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex-item policy-right-col">
          <div className="policy-container">
            <div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div className="flex-item">
                  <h5 style={{ fontWeight: "bold" }}>Price Details</h5>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div className="flex-item">
                  <h6 style={{ fontWeight: "bold" }}>
                    <GrassIcon style={{ color: "green" }} /> Turf Cost:{" "}
                  </h6>
                </div>
                <div className="flex-item text-center">
                  <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                    3000
                  </span>
                </div>
              </div>

              <ul className="fancy-bullets">
                <li>
                  <strong style={{ fontSize: "13px" }}>Incldues:</strong> New
                  ball, Two Heavy Duty Plastic Cricket Bat, Three Wickets
                </li>
                <li>
                  <strong style={{ fontSize: "13px" }}>After Game:</strong> The
                  person who booked the game will be responsbile to handover the
                  Bats, balls and wickets
                </li>
              </ul>
              <hr />
            </div>

            <div>
              <h6 style={{ fontWeight: "bold" }}>
                <CardGiftcardIcon style={{ color: "orange" }} /> Apply Coupon:
              </h6>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "flex-start",
                }}
              >
                <div>
                  <TextFieldWithIcon />{" "}
                </div>
                <div title={"Apply Coupon"}>
                  <CheckCircleIcon
                    style={{ color: "orange", cursor: "pointer" }}
                  />{" "}
                </div>
              </div>
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div className="flex-item">
                <h6 style={{ fontWeight: "bold" }}>
                  <CurrencyRupeeIcon style={{ color: "black" }} /> Total Price:{" "}
                </h6>
              </div>
              <div className="flex-item text-center">
                <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                  <CurrencyRupeeIcon style={{ fontSize: "15px" }} />
                  3000
                </span>
              </div>
            </div>

            <ul className="fancy-bullets">
              <li>
                <strong style={{ fontSize: "11px" }}>
                  Advance to pay:{" "}
                  <CurrencyRupeeIcon style={{ fontSize: "15px" }} />
                  1200
                </strong>
              </li>
              <li>
                <strong style={{ fontSize: "11px" }}>
                  Amount to be paid at venue:{" "}
                  <CurrencyRupeeIcon style={{ fontSize: "15px" }} />
                  1800
                </strong>
              </li>
            </ul>
            <div className="cart-footer">
              <button className="proceed-btn btn-block">Proceed To Pay</button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default CartPaymenyPolicy;
