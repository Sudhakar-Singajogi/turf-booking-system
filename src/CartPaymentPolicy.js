import React, { useCallback, useState } from "react";
import "./App.css";
import "./policy.css";

import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import GrassIcon from "@mui/icons-material/Grass";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TextFieldWithIcon from "./components/MUI/TextFieldWithIcon";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors } from "./Redux/Slices/BookingFormValidatorReducer";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import useGetExactToTime from "./CustomHooks/useGetExactToTime";



function CartPaymentPolicy() {
  
  const { data: slot } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getExactToTime } = useGetExactToTime();
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
    duration = getExactToTime(slot.timeslot, slot.hrs * 60);
  }

  const disptimings = `${slot.timeslot} ${slot.hrs > 0 ? duration : ""}`;

  const game_venue_details = [
    [
      {
        value: slot.game,
        icon_comp: <SportsEsportsIcon style={{ color: "orange" }} />,
        css_class: "",
      },
      {
        value: slot.bookeddate,
        icon_comp: <EventAvailableIcon style={{ color: "orange" }} />,
        css_class: "flex-col-right",
      },
      {
        value: disptimings,
        extraparam: "",
        icon_comp: <AccessTimeIcon style={{ color: "orange" }} />,
        css_class: "txt-lower-case",
      },
    ],
    [
      {
        value: slot.turf,
        icon_comp: <GrassIcon style={{ color: "green" }} />,
        css_class: "flex-col-right",
      },
      {
        value: 3000,
        icon_comp: <CurrencyRupeeIcon style={{ color: "orange" }} />,
        css_class: "",
      },
      {
        value:
          slot.hrs > 0
            ? slot.hrs > 1
              ? `${slot.hrs} hrs`
              : `${slot.hrs} hr`
            : "Nill",
        icon_comp: <TimelapseIcon style={{ color: "orange" }} />,
        css_class: "flex-col-right",
      },
    ],
  ];

  const handlePaymentProcess = (e) => {
console.log('hey')
    // setModalOpen(true);    
    e.preventDefault();

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
                  <h5 style={{ fontWeight: "bold", fontSize: "18px" }}>
                    Ground Name
                  </h5>
                </div>
                <div className="flex-item text-right">
                  <h5 style={{ fontWeight: "bold", fontSize: "18px" }}>Game</h5>
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
              {game_venue_details.map((items) => (
                <div className="cart-item m-y-10">
                  <div className="flex flex-row  justify-start col-span-5 space-x-1 w100">
                    {items.map((item) => (
                      <div className="flex-col">
                        <div className="w- text-xs font-medium md:text-sm md:mt-0.5 pointer ">
                          {item.icon_comp}
                          <span className={`cart-label  ${item.css_class} `}>
                            {item.value !== "" ? item.value : "Nill"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <hr />
            <div className="dnt-show-at-765">
              <h6 style={{ fontWeight: "bold", fontSize: "18px" }}>
                Reschedule Policy:
              </h6>
              <ul className="fancy-bullets">
                <li>
                  <strong style={{ fontSize: "13px" }}>
                    Advance Notice Required:
                  </strong>{" "}
                  <span className="policy-bullet-points">
                    Rescheduling requests must be submitted at least 2 hours
                    prior to the scheduled booking time.
                  </span>
                </li>
                <li>
                  <strong style={{ fontSize: "13px" }}>
                    One-time Reschedule:
                  </strong>{" "}
                  <span className="policy-bullet-points">
                    Customers are allowed a single opportunity to reschedule
                    their booking. Once rescheduled, cancellations will no
                    longer be permitted.
                  </span>
                </li>
              </ul>
              <hr />
            </div>
            <div className="dnt-show-at-765">
              <h6 style={{ fontWeight: "bold", fontSize: "18px" }}>
                Cancellation Policy:
              </h6>
              <ul className="fancy-bullets">
                <li>
                  <strong style={{ fontSize: "13px" }}>
                    Cancellation Timeframe:
                  </strong>{" "}
                  <span className="policy-bullet-points">
                    Cancellation is not possible less than 2 hours prior to the
                    scheduled booking time.
                  </span>
                </li>
                <li>
                  <strong style={{ fontSize: "13px" }}>
                    Cancellation Fee:
                  </strong>{" "}
                  <span className="policy-bullet-points">
                    In case of cancellations made within the permissible
                    timeframe, a cancellation fee of 15% of the total booking
                    amount will be deducted.
                  </span>
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
                  <h5 style={{ fontWeight: "bold", fontSize: "18px" }}>
                    Price Details
                  </h5>
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
                  <span className="policy-bullet-points">
                    New ball, Two Heavy Duty Plastic Cricket Bat, Three Wickets
                  </span>
                </li>
                <li>
                  <strong style={{ fontSize: "13px" }}>After Game:</strong>{" "}
                  <span className="policy-bullet-points">
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
                <div style={{ position: "relative" }}>
                  <div title={"Apply Coupon"}>
                    <CheckCircleIcon
                      className="apply-coupon-btn"
                      style={{ color: "orange", cursor: "pointer" }}
                    />{" "}
                  </div>
                  <TextFieldWithIcon />{" "}
                </div>
              </div>
            </div>
            <hr />
            <div className="price-section dnt-show-at-765">
              <div className="flex-item dnt-show-at-765">
                <h6 style={{ fontWeight: "bold" }}>
                  <CurrencyRupeeIcon style={{ color: "black" }} /> Total Price:{" "}
                </h6>
              </div>
              <div className="flex-item text-center dnt-show-at-765">
                <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                  <CurrencyRupeeIcon style={{ fontSize: "15px" }} />
                  3000
                </span>
              </div>
            </div>

            <ul className="fancy-bullets dnt-show-at-765">
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
            <div className="cart-footer dnt-show-at-765">
              <button className="proceed-btn btn-block" onClick={(e) => { handlePaymentProcess(e)}}>Proceed To Pay</button>
            </div>
          </div>
        </div>
        <div class="div-c policy-terms show-at-765">
          <div>
            <h6 className="dnt-show-at-765" style={{ fontWeight: "bold" }}>
              Reschedule Policy:
            </h6>
            <h6 className="show-at-765" style={{ fontWeight: "bold" }}>
              Reschedule & Cancellation Policy:
            </h6>
            <ul className="fancy-bullets">
              <li>
                <strong style={{ fontSize: "14px" }}>
                  Advance Notice Required:
                </strong>{" "}
                <span className="policy-bullet-points">
                  Rescheduling requests must be submitted at least 2 hours prior
                  to the scheduled booking time.
                </span>
              </li>
              <li>
                <strong style={{ fontSize: "14px" }}>
                  One-time Reschedule:
                </strong>{" "}
                <span className="policy-bullet-points">
                  Customers are allowed a single opportunity to reschedule their
                  booking. Once rescheduled, cancellations will no longer be
                  permitted.
                </span>
              </li>
            </ul>

            <h6 className="dnt-show-at-765" style={{ fontWeight: "bold" }}>
              Cancellation Policy:
            </h6>

            <ul className="fancy-bullets">
              <li>
                <strong style={{ fontSize: "13px" }}>
                  Cancellation Timeframe:
                </strong>{" "}
                <span className="policy-bullet-points">
                  Cancellation is not possible less than 2 hours prior to the
                  scheduled booking time.
                </span>
              </li>
              <li>
                <strong style={{ fontSize: "13px" }}>Cancellation Fee:</strong>{" "}
                <span className="policy-bullet-points">
                  In case of cancellations made within the permissible
                  timeframe, a cancellation fee of 15% of the total booking
                  amount will be deducted.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="show-at-765">
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
              onClick={(e) => { handlePaymentProcess(e)}}
              style={{ color: "#fff" }}
            >
              <ArrowCircleRightIcon className="proceed-icon" />{" "}
            </Link>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default CartPaymentPolicy;
