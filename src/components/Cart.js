import React from "react";
import "./Cart.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import GrassIcon from "@mui/icons-material/Grass";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { useDispatch, useSelector } from "react-redux";
import { emptySlot } from "../Redux/Slices/BokingSliceReducer";

const Cart = () => {
  // Your cart items state and handlers go here
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.booking);
  const slot = data;
  let showCart = false;
  if (
    slot.game !== "" ||
    slot.turf !== "" ||
    slot.hrs > 0 ||
    slot.timeslot !== "" ||
    slot.bookeddate !== ""
  ) {
    showCart = true;
  }

  console.log("showCart: ", showCart);

  console.log("slot is: ", slot);
  let hours = slot.hrs;
  let duration = "";
  if (slot.hrs > 0) {
    let startTime = slot.timeslot.split(":");
    let endTime = parseInt(startTime[0]) + parseInt(hours);
    duration = endTime + ":" + startTime[1];
  }

  return (
    <div className="cart mx-10" style={{ width: "40%" }}>
      <div className="flex flex-col items-center justify-center space-y-10 text-typography">
        {!showCart ? (
          <div className="cart-container">
            <div style={{ textAlign: "center" }}>
              <ShoppingCartIcon
                style={{ fontSize: "10rem", marginTop: "4rem" }}
              />
              <div className="font-semibold texl-lg">Cart Is Empty </div>
            </div>
          </div>
        ) : (
          <div className="cart-container">
            <div className="cart-header">
              <div className="cart-title">Cart</div>
              <DeleteIcon
                onClick={() => {
                  dispatch(emptySlot());
                }}
                className="trash-icon"
              />
            </div>

            <div className="cart-items">
              <div className="cart-item">
                <div className="flex flex-row items-center justify-start col-span-5 space-x-1 w100">
                  <div style={{ flex: "1 1" }}>
                    <div className="w- text-xs font-medium md:text-sm md:mt-0.5 pointer">
                      <SportsEsportsIcon style={{ color: "orange" }} />
                      <span className="cart-label">
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
                        {" "}
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

            <div className="cart-footer">
              <button className="proceed-btn btn-block">Proceed To Pay</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
