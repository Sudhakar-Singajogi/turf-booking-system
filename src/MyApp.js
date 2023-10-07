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
import Dashboard from "./components/Areana/Dashboard";
import ConfigureArena from "./components/Areana/ConfigureArena";
import Admin from "./components/Areana/Admin";
import { useSelector } from "react-redux";
import BookSlot from "./components/Areana/BookSlot";

function MyApp() {
  const containerDivURLS = [
    "http://localhost:3000/",
    "http://localhost:3000/arena-login",
    "http://localhost:3000/arena-register",
    "http://localhost:3000/admin/dashboard",
    "/arena-login"
  ];
  const currentUrl = window.location.href;
  console.log("currentUrl is:", currentUrl);

  const container = containerDivURLS.includes(currentUrl)
    ? "fluid-container"
    : "container";

    const { admin } = useSelector((state) => state.venue);

  return (
    <div className="App">
      {currentUrl !== "http://localhost:3000/arena-login" &&
      currentUrl !== "http://localhost:3000/arena-register" ? (
        <Loader />
      ) : null}

      <BrowserRouter>
      {( parseInt(Object.keys(admin.info).length) === 0 ) && <Header logo={sonetlogo} /> }
        
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
                <Route path="admin/" element={<Admin />}>
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route path="/admin/book-slot" element={<BookSlot />} />
                  <Route
                    path="/admin/configure-arena"
                    element={<ConfigureArena />}
                  />
                </Route>
              </Routes>
            </div>
          </div>
          {/* </div> */}
        </main>
      </BrowserRouter>
      {/* Footer */}
      <div className="dnt-show-mble" style={{ marginTop: "1.7rem" }}>
      {( parseInt(Object.keys(admin.info).length) === 0 ) && <Footer /> }
        
        {/* {(currentUrl !== "http://localhost:3000/arena-login" || currentUrl !== "http://localhost:3000/arena-register" )  ? <Footer /> : null} */}
      </div>
    </div>
  );
}

export default MyApp;
