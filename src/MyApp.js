import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SlideShow from "./components/SlideShow";
import BookingForm from "./components/BookingForm";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Header from "./Header"; 
import CartPaymentPolicy from "./CartPaymentPolicy";
import { useDispatch } from "react-redux";
import { getVenuDetails } from "./Redux/Slices/BokingSliceReducer";

import sonetlogo from "./assets/SonetLogo.png"


function MyApp() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVenuDetails())
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
      <Header logo={sonetlogo}  />
      {/* Header Navigation */}

      {/* Main Content */}
      <main>
        <div className="container">
          <div className="content-wrapper"> 
              {/* <SlideShow /> */}
            <div className="booking-cart-wrapper column right-column">
            <Routes>
              <Route path="/" exact element={<BookingForm /> } />
              <Route path="/confirm-slot" exact element={<CartPaymentPolicy /> } />
              
              </Routes>
              
            </div>
          </div>
        </div>
      </main>
      </BrowserRouter>

      {/* Footer */}
      <div className="dnt-show-mble">
      <Footer />

      </div>
    </div>
  );
}

export default MyApp;
