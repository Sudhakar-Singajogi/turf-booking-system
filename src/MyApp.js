import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SlideShow from "./components/SlideShow";
import BookingForm from "./components/BookingForm";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Header from "./Header";
import CartPaymenyPolicy from "./CartPaymenyPolicy";


function MyApp() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header  />
      {/* Header Navigation */}

      {/* Main Content */}
      <main>
        <div className="container">
          <div className="content-wrapper"> 
              {/* <SlideShow /> */}
            <div className="booking-cart-wrapper column right-column">
            <Routes>
              <Route path="/" exact element={<CartPaymenyPolicy /> } />
              {/* <Route path="/confirm-slot" exact element={<CartPaymenyPolicy /> } /> */}
              
              </Routes>
              
            </div>
          </div>
        </div>
      </main>
      </BrowserRouter>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MyApp;
