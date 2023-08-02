import React from "react";
import "./App.css";
import Header from "./Header";
import "./policy.css";

import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import GrassIcon from "@mui/icons-material/Grass";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TextFieldWithIcon from "./components/MUI/TextFieldWithIcon"; 
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; 
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

function CartPaymenyPolicy() {
  return (
    <>
      <Header />
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
              <div>
                <h6 style={{ fontWeight: "bold", paddingLeft: "10px" }}>
                  Game and Venue Details
                </h6>
              </div>
              <div className="cart-item">
                <div className="flex flex-row items-center justify-start col-span-5 space-x-1 w100">
                  <div style={{ flex: "1 1" }}>
                    <div className="w- text-xs font-medium md:text-sm md:mt-0.5 pointer">
                      <SportsSoccerIcon style={{ color: "orange" }} />
                      <span className="cart-label">Soccer</span>
                    </div>
                  </div>
                  <div style={{ flex: "1 1" }}>
                    <div className="w- text-xs font-medium md:text-sm md:mt-0.5 pointer">
                      <GrassIcon style={{ color: "green" }} />
                      <span className="cart-label">Turf No# 2</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cart-item">
                <div className="flex flex-row items-center justify-start col-span-5 space-x-1 w100">
                  <div style={{ flex: "1 1" }}>
                    <div className="w- text-xs font-medium md:text-sm md:mt-0.5 pointer">
                      <EventAvailableIcon style={{ color: "orange" }} />
                      <span className="cart-label">05-08-2023</span>
                    </div>
                  </div>
                  <div style={{ flex: "1 1" }}>
                    <div className="w- text-xs font-medium md:text-sm md:mt-0.5 pointer">
                      <AccessTimeIcon style={{ color: "orange" }} />
                      <span className="cart-label">3:00 pm TO 6:00 pm</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cart-item">
                <div className="flex flex-row items-center justify-start col-span-5 space-x-1 w100">
                  <div style={{ flex: "1 1" }}>
                    <div className="w- text-xs font-medium md:text-sm md:mt-0.5 pointer">
                      <TimelapseIcon style={{ color: "orange" }} />
                      <span className="cart-label">3hrs</span>
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
                  <h6 style={{ fontWeight: "bold" }}><GrassIcon style={{color:'green'}}/> Turf Cost: </h6>
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
              <h6 style={{ fontWeight: "bold" }}><CardGiftcardIcon style={{color:'orange'}} /> Apply Coupon:</h6>
              <div style={{
                  display: "flex",
                  width: "100%", 
                  justifyContent:"flex-start",
                }}>
                <div><TextFieldWithIcon /> </div>
                  <div title={"Apply Coupon"} ><CheckCircleIcon style={{ color: "orange", cursor:'pointer'}} /> </div>
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
                  <h6 style={{ fontWeight: "bold" }}><CurrencyRupeeIcon style={{color:'black'}} /> Total Price: </h6>
                </div>
                <div className="flex-item text-center">
                  <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                  <CurrencyRupeeIcon style={{ fontSize: "15px" }} />3000
                  </span>
                </div>
              </div>

              <ul className="fancy-bullets">
                <li>
                  <strong style={{ fontSize: "11px" }}>Advance to pay: <CurrencyRupeeIcon style={{ fontSize: "15px" }} />1200</strong>  
                </li>
                <li>
                  <strong style={{ fontSize: "11px" }}>Amount to be paid at venue: <CurrencyRupeeIcon style={{ fontSize: "15px" }} />1800</strong>  
                </li>
              </ul>
              <div className="cart-footer">
              <button className="proceed-btn btn-block">Proceed To Pay</button> 
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPaymenyPolicy;
