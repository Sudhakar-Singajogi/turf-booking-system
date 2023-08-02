import React from "react";
import "./App.css";
import SlideShow from "./components/SlideShow";
import BookingForm from "./components/BookingForm";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Header from "./Header";


function MyApp() {
  return (
    <div className="App">
      {/* Header Navigation */}
      <Header />

      {/* Main Content */}
      <main>
        <div className="container">
          <div className="content-wrapper"> 
              {/* <SlideShow /> */}
            <div className="booking-cart-wrapper column right-column">
              <BookingForm />    
              
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MyApp;
