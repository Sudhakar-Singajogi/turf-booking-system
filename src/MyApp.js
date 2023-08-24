import React, { useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import SlideShow from "./components/SlideShow";
import BookingForm from "./components/BookingForm";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Header from "./Header";
import CartPaymentPolicy from "./CartPaymentPolicy";

import sonetlogo from "./assets/SonetLogo.png";
import Loader from "./components/Loader";
import Home from "./components/Home";
import { ErrorBoundary } from "react-error-boundary";
import { GenericError } from "./errors/GenericError";
function MyApp() {
  const containerDivURLS = [
    "http://localhost:3000/",
    "http://localhost:3000/arena-login",
    "http://localhost:3000/arena-register",
  ];
  const currentUrl = window.location.href;
  console.log('currentUrl is:', currentUrl)

  const container = containerDivURLS.includes(currentUrl)
    ? "fluid-container"
    : "container";
  return (
    <div className="App">
      {(currentUrl !== "http://localhost:3000/arena-login" && currentUrl !== "http://localhost:3000/arena-register" )  ? <Loader /> : null}
      
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
                <Route
                  path="/booking"
                  exact
                  element={
                    <ErrorBoundary
                      FallbackComponent={GenericError}
                      onError={() => console.log("Error happened!")}
                    >
                      <BookingForm />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/booking/confirm"
                  exact
                  element={<CartPaymentPolicy />}
                />
                <Route path="/arena-login" element={<Home />} />
                <Route path="/arena-register" element={<Home />} />
              </Routes>
            </div>
          </div>
          {/* </div> */}
        </main>
      </BrowserRouter>
      {/* Footer */}
      <div className="dnt-show-mble" style={{ marginTop: "1.7rem" }}>
      <Footer />
        {/* {(currentUrl !== "http://localhost:3000/arena-login" || currentUrl !== "http://localhost:3000/arena-register" )  ? <Footer /> : null} */}
      </div>
    </div>
  );
}

export default MyApp;
