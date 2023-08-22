import React, { useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import SlideShow from "./components/SlideShow";
import BookingForm from "./components/BookingForm";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Header from "./Header";
import CartPaymentPolicy from "./CartPaymentPolicy";
import { useDispatch } from "react-redux";
import { getVenuDetails } from "./Redux/Slices/BokingSliceReducer";

import sonetlogo from "./assets/SonetLogo.png";
import Loader from "./components/Loader";
import { context } from "./contexts/context"; 
import Home from "./components/Home";

function MyApp() {  
  const container  = (window. location. href === "http://localhost:3000/") ? "" : "container";
   return (
    <div className="App">
  
        <Loader  />
        <BrowserRouter>
          <Header logo={sonetlogo} />
          {/* Header Navigation */}

          {/* Main Content */}
          <main>
            <div className={container}>
              {/* <div className="content-wrapper"> */}
                {/* <SlideShow /> */}
                <div className="w100">
                  <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/booking" exact element={<BookingForm />} />
                    <Route
                      path="/confirm-slot"
                      exact
                      element={<CartPaymentPolicy />}
                    />
                  </Routes>
                </div>
              </div>
            {/* </div> */}
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
