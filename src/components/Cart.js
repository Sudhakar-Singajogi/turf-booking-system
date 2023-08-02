import React from "react";
import "./Cart.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import GrassIcon from '@mui/icons-material/Grass';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const Cart = ({ cartItems = [] }) => {
  // Your cart items state and handlers go here

  return (
    <div className="cart mx-10">
      <div class="flex flex-col items-center justify-center space-y-10 text-typography">
        {cartItems.length > 0 ? (
          <div style={{ textAlign: "center" }}>
            <ShoppingCartIcon
              style={{ fontSize: "10rem", marginTop: "4rem" }}
            />
            <div class="font-semibold texl-lg">Cart Is Empty </div>
          </div>
        ) : (
          <div class="cart-container">
            <div class="cart-header">
              <div class="cart-title">Cart</div>
              <div class="cart-trash-icon">
                <i class="fa fa-trash">
                  <DeleteIcon className="trash-icon" />
                </i>
              </div>
            </div>

            <div class="cart-items">
              <div class="cart-item">
                <div class="flex flex-row items-center justify-start col-span-5 space-x-1 w100">
                  <div style={{ flex: "1 1" }}>
                    <div class="w- text-xs font-medium md:text-sm md:mt-0.5 pointer">
                      <SportsSoccerIcon style={{color:'orange'}} />
                      <span className="cart-label">Soccer</span>
                    </div>
                  </div>
                  <div style={{ flex: "1 1" }}>
                    <div class="w- text-xs font-medium md:text-sm md:mt-0.5 pointer">
                      <GrassIcon style={{color:'green'}} /> 
                      <span className="cart-label">Turf No# 2</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="cart-item">
                <div class="flex flex-row items-center justify-start col-span-5 space-x-1 w100">
                  <div style={{ flex: "1 1" }}>
                    <div class="w- text-xs font-medium md:text-sm md:mt-0.5 pointer">
                    <EventAvailableIcon style={{color:'orange'}} /> 
                      <span className="cart-label">05-08-2023</span>
                    </div>
                  </div>
                  <div style={{ flex: "1 1" }}>
                    <div class="w- text-xs font-medium md:text-sm md:mt-0.5 pointer">
                      <AccessTimeIcon style={{color:'orange'}} /> 
                      <span className="cart-label">3:00 pm TO 6:00 pm</span>
                    </div>
                  </div> 
                </div>
              </div>

              <div class="cart-item">
                <div class="flex flex-row items-center justify-start col-span-5 space-x-1 w100">
                  
                  <div style={{ flex: "1 1" }}>
                    <div class="w- text-xs font-medium md:text-sm md:mt-0.5 pointer">
                      <TimelapseIcon style={{color:'orange'}} /> 
                      <span className="cart-label">3hrs</span>
                    </div>
                  </div>

                  <div style={{ flex: "1 1" }}>
                    <div class="w- text-xs font-medium md:text-sm md:mt-0.5 pointer">
                    <CurrencyRupeeIcon style={{color:'orange'}} /> 
                      <span className="cart-label">3000</span>
                    </div>
                  </div> 
                </div>
              </div>
              

            </div>

            <div class="cart-footer">
              <button class="proceed-btn btn-block">Proceed To Pay</button> 
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
